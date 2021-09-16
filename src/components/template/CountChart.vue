<template>
    <div class="countChartBox">
        <CommomHeader v-if="themeDatasetIndex === 0" :sub-data="subData" :view="view" :last-time="updateTime"/>
        <div class="countChartContainer pieContainer">
            <DoughnutChart 
                class="chartBox"
                :chart-data="pieData"
                :chart-mark="chartMark"
                :title-lebel="titleLebel"
                :last-value-total="lastDataTotalString"
            />
            <div class="lagendContainer">
                <h6 v-if="targetRequest && targetRequest.name">{{targetRequest.name}}</h6>
                <div class="nodata" v-if="Object.values(pieValueDataObj).length === 0">
                    無資料
                </div>
                <div class="lagendContent" v-else :class="{scroll : Object.keys(pieValueDataObj).length > 5}">
                    <div v-if="totalConfig" class="totalItem">
                        <div class="legend">
                            <span class="ellipsis">{{totalConfig.title}}</span>
                        </div>
                    </div>
                    <div v-for="(subItem, subIndex, i) in pieValueDataObj" :key="subIndex">
                        <div class="legend">
                            <span class="icon" :style="{background: colorArray[i]}"/>
                            <span class="ellipsis">{{spliteDataName(subIndex)}}</span>
                        </div>
                        <div class="value">
                            <span>
                                {{subItem}}
                                <span v-if="(requestConfig && requestConfig.titleDataUnit)">{{requestConfig.titleDataUnit}}</span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="countChartContainer alarmBarContent" v-if="Object.values(valueDataObj).length > 0">
            <div v-for="(subItem, subIndex) in valueDataObj" :key="subIndex" class="indent">
                <span class="ellipsis">{{spliteDataName(subIndex)}}</span>
                <span class="countProgress">
                    <div class="ZScoreProgress"
                        :style="{
                            width: getProgressWidth(zScoreDataObj[subIndex]),
                            background: zScoreColor
                        }"
                    />
                    <div class="valueProgress"
                        :style="{
                            width: getProgressWidth(subItem),
                            background: valueColors
                        }"
                    />
                </span>
                <span class="value" :class="{complexValue : view !== 'dashboard'}">{{subItem}}</span>
                <span v-if="zScoreShow" class="value alarm" :class="{show: (zScoreDataObj[subIndex] && subItem >= zScoreDataObj[subIndex])}">●</span>
            </div>
        </div>
    </div>
</template>

<script>
import { growthPercentageCommon, spliteName, toFixedFunction } from '@/assets/js/commom.js'
import { ChartColors } from '@/assets/datas/appConfig.js'
import DoughnutChart from '@/assets/charts/doughnut.js'

import CommomHeader from '@/components/CommomHeader.vue'

export default {
    components: { CommomHeader, DoughnutChart },
    props: {
        promise: {
            type: Promise
        },
        themeDatasetIndex: {
            type: Number,
            default: 0
        },
        subData: {
            type: Object,
            default: () =>{return {}}
        },
        view: {
            type: String,
            default: 'dashboard'
        },
        componentIndex: {
            type: Number,
            default: 0
        },
        formConfig: {
            type: Object,
            default: () =>{return {}}
        }
    },
    data() {
        return {
            targetRequest: null,
            updateTime: '',

            dataValueMax: 0,
            valueDataObj: {},
            zScoreDataObj: {},
            zScoreShow: false,
            zScoreColor: 'transparent',

            pieData: {},
            chartMark: '',
            pieValueDataObj: {},
            lastDataTotalString: '',

            totalCount: 0,
            colorArray: []
        }
    },
    created() {
        this.targetRequest = (this.subData && this.subData.request_list)? this.subData.request_list[this.themeDatasetIndex]: null
        this.colorArray = (this.targetRequest && this.targetRequest.color)? [...this.targetRequest.color, ...ChartColors]: ChartColors
    },
    mounted() {
        this.initFunction()
    },
    watch: {
        formConfig: {
            deep: true,
            immediate: false,
            handler: function(newObj, oldObj){
                this.initFunction()
            }
        },
        promise: {
            deep: true,
            immediate: false,
            handler: function(newObj, oldObj){
                if(oldObj){
                    this.initFunction()
                }
            }
        }
    },
    computed:{
        requestConfig(){
            if(this.targetRequest && this.targetRequest.config){
                return this.targetRequest.config
            }else if(this.formConfig){
                this.colorArray = (this.formConfig.colors )? [...this.formConfig.colors,...this.colorArray]: this.colorArray
                return this.formConfig
            }
        },
        valueColors(){
            return this.colorArray[0]
        },
        pieConfig(){
            return (this.requestConfig && this.requestConfig.pie)? this.requestConfig.pie: null
        },
        titleLebel(){
            return (this.pieConfig && this.pieConfig.display)? this.pieConfig.display: (this.requestConfig && this.requestConfig.display? this.requestConfig.display: '')
        },
        showTop(){
            return (this.pieConfig && this.pieConfig.show_top)? this.pieConfig.show_top: (this.requestConfig && this.requestConfig.show_top? this.requestConfig.show_top: false)
        },
        totalConfig(){
            return (this.requestConfig && this.requestConfig.total)? this.requestConfig.total: null
        }
    },
    methods: {
        async initFunction() {
            const promisesArray = await this.promise
            if(promisesArray && promisesArray.length > 0){
                const componentDatas = await promisesArray[this.componentIndex]
                if(componentDatas){
                    if(this.view === 'dashboard'){
                        const themeDatas = await componentDatas[this.themeDatasetIndex]
                        this.clearUpData(await themeDatas)
                    }else{
                        componentDatas[this.themeDatasetIndex].then(dataset => {
                            this.clearUpData(dataset)
                        })
                    }
                }
            }else if(typeof promisesArray === 'object'){
                this.clearUpData(promisesArray)
            }
        },
        clearUpData(dataset){
            let chartXAxis = []
            let valueArray = []
            let zScoreArray = []
            let chartMarkValue = 0

            this.pieData = {}
            this.updateTime = (dataset && dataset.updateTime)? dataset.updateTime: this.updateTime

            if(dataset && dataset.data && dataset.data.length > 0){
                dataset.data.map(item => {
                    const value =  (item.value[0]['value'])? toFixedFunction(item.value[0]['value']): 0
                    const zScore =  item.value[0]['zScore']
                    this.valueDataObj[item.key] = value
                    valueArray.push(value)
                    chartXAxis.push(item.key)
                    if(zScore){
                        this.zScoreShow = true
                        this.zScoreDataObj[item.key] = zScore
                        zScoreArray.push(zScore)
                    }
                })
                if(this.zScoreShow){
                    this.zScoreColor = '#28303F'
                    this.dataValueMax = Math.max(...zScoreArray, ...valueArray)
                }else{
                    this.dataValueMax = Math.max(...valueArray)
                }

                if(valueArray.length > 4 && this.showTop){
                    const top4XAxis = chartXAxis.slice(0, 4)
                    const otherSum = valueArray.slice(4).reduce((a,b)=>parseFloat(a)+b)
                    this.pieValueDataObj = top4XAxis.reduce((result, key) => {
                        result[key] = this.valueDataObj[key]
                        return result
                    }, {})
                    this.pieValueDataObj['其他'] = (otherSum === 0)? 0: toFixedFunction(otherSum)
                    chartXAxis = Object.keys(this.pieValueDataObj)
                }else{
                    this.pieValueDataObj = this.valueDataObj
                }
            }
            if(valueArray.length > 0){
                chartMarkValue = valueArray.reduce((a,b)=>parseFloat(a)+b)
                chartMarkValue = toFixedFunction(chartMarkValue)
            }
            if(Object.keys(this.pieValueDataObj).length > 0){
                this.pieData = {
                    labels: Object.keys(this.pieValueDataObj),
                    datasets: [{
                        data: Object.values(this.pieValueDataObj),
                        borderWidth: 0,
                        backgroundColor: this.colorArray
                    }]
                }
            }
            if(this.requestConfig && this.requestConfig.targetObject){
                const titleDataTarget = (this.requestConfig.targetObject)? this.requestConfig.targetObject: null
                // if(titleDataTarget && this.requestConfig.formula === 'except'){
                    // const exceptRes = percentageCommon(this.displayData[titleDataTarget[1]]['value'], this.displayData[titleDataTarget[0]]['value'])
                    // this.chartMark = `${exceptRes}${(titleDataUnit)? titleDataUnit: ''}`
                // }else{
                    // this.chartMark = `${this.displayData[titleDataTarget[0]]['value']}${(titleDataUnit)? titleDataUnit: ''}`
                // }
            }else{
                this.chartMark = (chartMarkValue > 0)? chartMarkValue.toString(): 0
            }
            if(this.requestConfig && this.requestConfig.titleDataUnit){
                this.chartMark += this.requestConfig.titleDataUnit
            }
            this.chartMark = this.chartMark.toString()
        },
        growthPercentage(count, prev){
            return growthPercentageCommon(count, prev)
        },
        spliteDataName(name){
            return spliteName(name)
        },
        getProgressWidth(value){
            if(value >= 0 && this.dataValueMax >= 0){
                const width = Math.round((value/this.dataValueMax *1000)/10)
                return (width >= 100)? '100%': width + '%'
            }else{
                return '0%'
            }
        }
    }
}
</script>

<style scoped lang="scss">
@import "~@/assets/scss/chart.scss";
.pieContainer.countChartContainer{
    .lagendContainer{
        height: 8rem;
        .lagendContent{
            max-height: 8rem;
        }
    }
}
.alarmBarContent.countChartContainer{
    height: 15.5rem;
    .indent{
        padding-left: .5rem;
        .ellipsis{
            flex-basis: 5em;
        }
    }
}
#dashboardContainer{
    .countChartBox{
        height: 22rem;
    }
    .alarmBarContent.countChartContainer{
        height: 8.5rem;
    }
}
</style>
