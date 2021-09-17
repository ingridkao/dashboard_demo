<template>
    <div id="historyChartBox" v-loading="chartLoad" :element-loading-background="loadingBackground">
        <div class="filterDataBtn">
            <div>
                <el-button type="text" :disabled="filterBtnDisable" :class="{active : filterType === 'hour'}" @click="switchType('hour')">Last 24 hours</el-button>
                <el-button type="text" :disabled="filterBtnDisable" :class="{active : filterType === 'day'}" @click="switchType('day')">Last 30 days</el-button>
                <el-button type="text" :disabled="filterBtnDisable" :class="{active : filterType === 'month'}" @click="switchType('month')">Last 12 months</el-button>
            </div>   
        </div>
        <LineChart 
            class="lineChartBox" 
            :labels-data="labelsData" 
            :chart-datasets="lineData" 
            :color-array="lineColor"
            :dark-mode="darkMode"
            @on-complete="chartLoad = false"
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
            datePicker: '2020-12-31T15:59:59Z',
            endDay: null
        } 
    },
    computed: {
        ...mapState(['topicToggleContent', 'darkMode']),
        loadingBackground(){
            return this.darkMode === 'dark'? 'rgb(14,19,25,0.3)': 'rgb(234,234,234,0.8)'
        }
    },
    watch: {
        topicToggleContent: {
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
            let endDate = ''
            switch (this.filterType) {
                case 'hour':
                    endDate = dayjs(`${dayjs(this.datePicker).format('YYYY-MM-DD')} 23:59:59`, 'YYYY-MM-DD HH:mm:ss')
                    break
                case 'day':
                    const daysInMonth = dayjs(this.datePicker).daysInMonth()
                    endDate = dayjs(`${dayjs(this.datePicker).format('YYYY-MM')}-${daysInMonth} 23:59:59`, 'YYYY-MM-DD HH:mm:ss')
                    break
                case 'month':
                    const datePickerYear = dayjs(this.datePicker).format('YYYY')
                    endDate = dayjs(`${datePickerYear}-12-31 23:59:59`, 'YYYY-MM-DD HH:mm:ss')
                break
            }
            this.endDay = dayjs(endDate, 'YYYY-MM-DD HH:mm:ss')
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
            this.chartLoad = true

            let historyChartIndex = 0
            this.newDataset.map(dataTarget => {
                if(dataTarget.dataToggle && dataTarget.calculation_config){
                    const requestConfig = dataTarget.request_list[0]
                    const requestColorArray = (requestConfig && requestConfig.color)? requestConfig.color: ChartColors

                    this.historyDataNames.push((dataTarget.name)? dataTarget.name: dataTarget.index)
                    this.lineColor.push(requestColorArray[historyChartIndex])

                    APIsURL.push(this.$axios.get(`../../datas/${this.filterType}/${dataTarget.calculation_config.table}.json`))   
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
                this.chartLoad = false                
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
            if(this.lineData.length === 0){
                this.chartNoData = true
                this.chartLoad = false
            }
        },
        receiveChart(data){
            this.translateTimes()

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
        bottom: 0;
        right: 0;
        padding: 0 0.25rem;
        .filterDataBtn{
            @extend %spaceBetween;
            margin-left: 1rem;
            color: #a8a6a6;
            .el-button--text{
                font-size: 0.8rem;
                color: #a8a6a6;
                margin: 0;
                padding: 0.5rem;
                opacity: 0.7;
                &.active{
                    opacity: 1;
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
