<template>
    <div id="historyChartBox" v-loading="chartLoad" element-loading-background="rgb(14,19,25,0.3)">
        <div class="filterDataBtn">
            <div>
                <el-button type="text" :disabled="filterBtnDisable" :class="{active : filterType === 'hour'}" @click="switchType('hour')">Last 24 hours</el-button>
                <el-button type="text" :disabled="filterBtnDisable" :class="{active : filterType === 'day'}" @click="switchType('day')">Last 30 days</el-button>
                <el-button type="text" :disabled="filterBtnDisable" :class="{active : filterType === 'month'}" @click="switchType('month')">Last 12 months</el-button>
            </div>   
            <div>
                <el-date-picker
                    v-model="datePicker"
                    :type="datePickerType"
                    :placeholder="datePickerplaceholder"
                    size="mini"
                    @change="fetchData"
                />
            </div>   
        </div>
        <LineChart 
            class="lineChartBox" 
            :labels-data="labelsData" 
            :chart-datasets="lineData" 
            :color-array="lineColor"
            @on-complete="chartLoadChange(false)"
            @on-receive="receiveChart"
        />
        <div v-if="chartNoData" id="chartNoData">沒有歷史資料</div>
    </div>
</template>
<script>
import dayjs from 'dayjs'
import { cloneDeep } from 'lodash'
import { mapState } from 'vuex'

import LineChart from '@/assets/charts/lineChart.js'
import { ChartColors } from '@/assets/datas/appConfig.js'

export default {
    components: { LineChart },
    data(){
        return {            
            newDataset : [],
            historyDatas: [],
            historyDataNames: [],

            labelsData: [],
            lineData: [],
            lineColor: [],
            chartLoad: false,
            chartNoData: false,

            filterType: 'day',
            filterBtnDisable: false,
            datePicker: dayjs(),
            // datePicker: '2020-12-31T15:59:59Z',
            datePickerplaceholder: '',
            endDay: null
        } 
    },
    // props: {},
    computed: {
        ...mapState(['topicToggleDataset']),
        datePickerType(){
            let type = ''
            switch (this.filterType) {
                case 'hour':
                    type = 'date'
                    this.datePickerplaceholder = '選擇日期'
                    break
                case 'day':
                    type = 'month'
                    this.datePickerplaceholder = '選擇月份'
                    break
                case 'month':
                    this.datePickerplaceholder = '選擇年份'
                    type = 'year'
                break
            }
            return type
        }
    },
    watch: {
        topicToggleDataset: {
            deep: true,
            immediate: false,
            handler: function(newObj, oldObj){
                this.newDataset = cloneDeep(newObj)
                if(newObj && newObj.length > 0 ){
                    this.fetchData()
                }
            }
        }
    },
    methods: {
        translateTimes(){
            if(!(this.filterType === 'hour' || this.filterType === 'day' || this.filterType === 'month')) return {}
            let startDate = ''
            let endDate = ''
            switch (this.filterType) {
                case 'hour':
                    endDate = dayjs(`${dayjs(this.datePicker).format('YYYY-MM-DD')} 23:59:59`, 'YYYY-MM-DD HH:mm:ss')
                    startDate = endDate.subtract(1, 'day')
                    break
                case 'day':
                    const daysInMonth = dayjs(this.datePicker).daysInMonth()
                    endDate = dayjs(`${dayjs(this.datePicker).format('YYYY-MM')}-${daysInMonth} 23:59:59`, 'YYYY-MM-DD HH:mm:ss')
                    startDate = endDate.subtract(30, 'day')
                    break
                case 'month':
                    const datePickerYear = dayjs(this.datePicker).format('YYYY')
                    endDate = dayjs(`${datePickerYear}-12-31 23:59:59`, 'YYYY-MM-DD HH:mm:ss')
                    startDate = dayjs(`${datePickerYear}-01-01 00:00:00`, 'YYYY-MM-DD HH:mm:ss')
                break
            }
            this.endDay = dayjs(endDate, 'YYYY-MM-DD HH:mm:ss')
            return {
                start_time: startDate.format('YYYY-MM-DD HH:mm:ssZ'),
                end_time: endDate.format('YYYY-MM-DD HH:mm:ssZ'),
                time_interval: this.filterType
            }
        },
        switchType(type){
            if(!type) return
            this.filterType = type
            this.fetchData()
        },
        fetchData(){
            const APIsURL = []

            this.historyDataNames = []
            this.lineColor = []
            this.historyDatas = []

            this.labelsData = []
            this.lineData = []

            this.filterBtnDisable = true
            this.chartLoadChange(true)

            let historyChartIndex = 0
            this.newDataset.map(dataTarget => {
                if(dataTarget.dataToggle && dataTarget.calculation_config){
                    const requestConfig = dataTarget.request_list[0]
                    const configs = cloneDeep(dataTarget.calculation_config)
                    const requestColorArray = (requestConfig && requestConfig.color)? requestConfig.color: ChartColors
                    
                    // option form data
                    const times = this.translateTimes()

                    // required form data
                    const formData1 = this.$postFormData({
                        table: configs.table,
                        fields: (configs.fields)? configs.fields: 'COUNT(*) AS count',
                        time_field: configs.time_field,
                        ...times
                    })
                    const dataTargetTitle = (dataTarget.name)? dataTarget.name: dataTarget.index
                    const chartTitle1 = (configs.title && configs.title != '')? configs.title: dataTargetTitle
                    this.historyDataNames.push(chartTitle1)
                    this.lineColor.push(requestColorArray[historyChartIndex])
                    APIsURL.push(this.$axios.post('/api_server/query/history', formData1))
                    historyChartIndex += 1

                    if(configs.other && configs.other.length > 0){
                        configs.other.map((otherItem, otherIndex) => {
                            const formData2 = this.$postFormData({
                                table: otherItem.table,
                                fields: (otherItem.fields)? otherItem.fields: 'COUNT(*) AS count',
                                time_field: otherItem.time_field,
                                ...times
                            })
                            const chartTitle2 = (otherItem.title && otherItem.title != '')? otherItem.title: dataTargetTitle
                            this.historyDataNames.push(chartTitle2)
                            this.lineColor.push(requestColorArray[otherIndex])
                            APIsURL.push(this.$axios.post('/api_server/query/history', formData2))   
                            historyChartIndex += 1
                        })
                    }
                }
            })
            if(APIsURL.length > 0){
                this.$axios.all(APIsURL).then((response) => {
                    response.map((rItem, rIndex) => {
                        if(rItem && typeof rItem.data === 'object'){
                            this.historyDatas.push(rItem.data)
                        }
                    })
                    this.updateChart()
                    this.filterBtnDisable = false
                }).catch(e=>{
                    console.log(e);
                })
                this.chartNoData = false
            }else{
                this.chartLoadChange(false)
                this.chartNoData = true
            }
        },
        updateChart(){
            this.historyDatas.map((dataItem, dataIndex) => {
                const targetLineDatas = []
                const targetLabelsData = []
                if(dataItem.data && dataItem.data[0]['value'] && dataItem.data[0]['value'].length > 0){
                    const datas = dataItem.data[0]['value']
                    if(datas && datas.length > 0){
                        datas.map(item => {
                            targetLineDatas.unshift(item.value)
                            if(dataIndex === 0){
                                switch (this.filterType) {
                                    case 'hour':
                                        targetLabelsData.unshift(`${dayjs(item.valueTime).format('H')}:00`)
                                        break;
                                    case 'day':
                                        targetLabelsData.unshift(`${dayjs(item.valueTime).format('M/D')}`)
                                        break;
                                    case 'month':
                                        targetLabelsData.unshift(`${dayjs(item.valueTime).format('M')}月`)
                                        break;
                                }
                                this.labelsData = targetLabelsData
                            }
                        })
                    }
                    const targetObj = {
                        label: this.historyDataNames[dataIndex],
                        data: targetLineDatas
                    }
                    this.lineData = this.lineData.concat(targetObj)
                }
            })
            // console.log(this.lineData.length);
            if(this.lineData.length === 0){
                this.chartNoData = true
                this.chartLoadChange(false)
            }
        },
        receiveChart(data){
            if(data){
                let filterStartTime = null
                let filterEndTime = null
                switch (this.filterType) {
                    case 'hour':
                        const yymmdd = this.endDay.format('YYYY-MM-DD')
                        const t = data.label.split(':')
                        filterStartTime = dayjs(`${yymmdd} ${t[0]}:00:00`, 'YYYY-MM-DD HH:mm:ss')
                        filterEndTime = dayjs(`${yymmdd} ${t[0]}:59:59`, 'YYYY-MM-DD HH:mm:ss')
                        break

                    case 'day':
                        const d = `${this.endDay.format('YYYY')}/${data.label}`
                        filterStartTime = dayjs(`${d} 00:00:00`, 'YYYY/M/D HH:mm:ss')     
                        filterEndTime = dayjs(`${d} 23:59:59`, 'YYYY/M/D HH:mm:ss')     
                        break

                    case 'month':
                        const str = data.label.split('月')
                        const ym = `${this.endDay.format('YYYY')}-${str[0]}`
                        const daysInMonth = dayjs(ym).daysInMonth()

                        filterStartTime = dayjs(`${ym}-01 00:00:00`, 'YYYY-M-DD HH:mm:ss')     
                        filterEndTime = dayjs(`${ym}-${daysInMonth} 23:59:59`, 'YYYY-M-DD HH:mm:ss')
                        break
                    default:
                        break
                }
                this.$store.commit('updateHistoryFilter', {
                    start: filterStartTime.unix(),
                    end: filterEndTime.unix()
                })
            }
        },
        chartLoadChange(complete){
            // console.log(complete);
            this.chartLoad = complete
        }
    }
}
</script>
<style lang="scss">
@import "~@/assets/scss/_color.scss";
@import "~@/assets/scss/basic.scss";
    #historyChartBox{
        position: absolute;
        width: calc(100% - 27rem);
        // height: 10rem;
        bottom: 0;
        right: 0;
        padding: 0.25rem;
        .filterDataBtn{
            @extend %spaceBetween;
            margin-left: 1rem;
            color: #b3b3b3;
            .el-button--text{
                font-size: 0.8rem;
                color: #b3b3b3;
                margin: 0;
                padding: 0.5rem;
                &.active{
                    color: #fff;
                }
                &.is-disabled{
                    opacity: 0.1;
                }
            }
            .el-date-editor{
                width: 9rem;
                .el-input__inner{
                    border: none;
                }
            }
        }
        .lineChartBox{
            width: calc(100% - 1rem);
            height: 8rem;
            margin: 0 auto;
            text-align: center;
        }
        #chartNoData{
            position: absolute;
            width: 6rem;
            height: 1rem;
            top: calc(50% - 1rem);
            left: calc(50% - 3rem);
            font-size: 0.8rem;
        }
    }
</style>
