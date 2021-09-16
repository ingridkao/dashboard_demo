<template>
    <div class="keyFiguresContainer">
        <CommomHeader v-if="themeDatasetIndex === 0" :sub-data="subData" :view="view" :last-time="updateTime"/>
        <!-- <div v-if="alarm_data" class="alarmMsg" :class="{work: alarm_data.status &&  alarm_data.status > 0}">
            <i class="el-icon-warning-outline"/>{{alarm_data.title}}
            <marquee direction="right" scrollamount="3"  behavior="slide">{{alarm_data.desc}}</marquee>
        </div> -->
        <div v-if="figuresConfig" class="figuresContainer" :class="{basic: !isDashboard}">
            <div v-if="figuresConfig.main" class="mainFigures">
                <div v-for="(mainItem, i) in figuresConfig.main" :key="i">
                    <b v-if="mainItem.title !== ''">{{mainItem.title}}</b>
                    <h1>
                        <span class="decimalComma">{{(figureData[mainItem.title])? figureData[mainItem.title]: 0}}</span>
                        <span v-if="mainItem.unit" class="unit">{{mainItem.unit}}</span>
                    </h1>
                </div>
            </div>
            <div v-if="figuresConfig.sub" class="subFigures">
                <div v-for="(subItem, i) in figuresConfig.sub" :key="i">
                    <b v-if="subItem.title !== ''">{{subItem.title}}</b>
                    <h1>
                        <span class="decimalComma">{{(figureData[subItem.title])? figureData[subItem.title]: 0}}</span>
                        <span v-if="subItem.unit" class="unit">{{subItem.unit}}</span>
                    </h1>
                </div>
            </div>
        </div>
        <div v-if="pieChartConfig" class="pieContainer">
            <DoughnutChart 
                class="chartBox"
                :chart-data="pieData"
                :chart-mark="piechartMark"
                :title-lebel="(pieChartConfig.center && pieChartConfig.center.title)? pieChartConfig.center.title: ''"
            />
            <div class="lagendContent">
                <div v-if="totalConfig" class="totalItem">
                    <div class="legend">
                        <span class="ellipsis">{{totalConfig.title}}</span>
                    </div>
                    <div class="value">
                        <span>
                            {{totalCount}}
                            <span v-if="(totalConfig.unit)">{{totalConfig.unit}}</span>
                        </span>
                    </div>
                </div>
                <div v-for="(subItem, subIndex, i) in pieLagendData" :key="subIndex">
                    <div class="legend">
                        <span class="icon" :style="{background: colorArray[i]}"/>
                        <span class="ellipsis">{{subIndex}}</span>
                    </div>
                    <div class="value">
                        <span>
                            {{subItem}}
                            <span v-if="(pieChartConfig.unit)">{{pieChartConfig.unit}}</span>
                        </span>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="lineChartConfig" class="lineContainer">
            <LineChart 
                class="lineChart"
                :chart-datasets="lineData"
                :labels-data="lineLabelsData"
                :color-array="colorArray"
                :scales-show="!isDashboard"
                :data-unit="(lineChartConfig && lineChartConfig.dataUnit)?lineChartConfig.dataUnit: ''"
            />
        </div>
    </div>
</template>

<script>
import { decimalComma, percentageCommon, toFixedFunction } from '@/assets/js/commom.js'
import { ChartColors } from '@/assets/datas/appConfig.js'
import DoughnutChart from '@/assets/charts/doughnut.js'
import LineChart from '@/assets/charts/statisticLine.js'

import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import CommomHeader from '@/components/CommomHeader.vue'

export default {
    components: { CommomHeader, DoughnutChart, LineChart },
    props: {
        promise: {
            type: Promise
        },
        themeDatasetIndex: {
            type: Number
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
            type: Number
        }
    },
    data() {
        return {
            dayjs,
            clintTimeZone: '',

            targetRequest: null,
            requestConfig: null,
            figuresConfig: null,
            pieChartConfig: null,
            totalConfig: null,
            lineChartConfig: null,

            updateTime: '',
            apiData: {},
            figureData: {},
            // alarm_data: null,
            totalCount: 0,
            pieLagendData: [],
            pieData: {},
            piechartMark: '',
            lineData: [],
            lineLabelsData: [],
            diffChartStyle: false
        }
    },
    created() {
        this.dayjs.extend(utc)
        this.dayjs.extend(timezone)
        this.clintTimeZone = this.dayjs.tz.guess()

        this.targetRequest = (this.subData && this.subData.request_list)? this.subData.request_list[this.themeDatasetIndex]: null
        this.requestConfig = (this.targetRequest && this.targetRequest.config)? this.targetRequest.config: null
        if(this.requestConfig){
            this.figuresConfig = (this.requestConfig.figures)? this.requestConfig.figures: null
            this.pieChartConfig = (this.requestConfig.pie)? this.requestConfig.pie: null
            this.totalConfig = (this.requestConfig.total)? this.requestConfig.total: null
            this.lineChartConfig = (this.requestConfig.line)? this.requestConfig.line: null
        }
    },
    mounted() {
        this.initFunction()
    },
    computed:{
        colorArray(){
            return (this.targetRequest.color)? this.targetRequest.color: ChartColors
        },
        isDashboard(){
            return this.view === 'dashboard'
        }
    },
    methods: {
        async initFunction() {
            const promisesArray = await this.promise
            if(promisesArray && promisesArray.length > 0){
                const componentDatas = await promisesArray[this.componentIndex]
                if(componentDatas){
                    // if(this.view === 'dashboard'){
                        const themeDatas = await componentDatas[this.themeDatasetIndex]
                        this.clearUpData(await themeDatas)
                    // }else{
                    //     componentDatas[this.themeDatasetIndex].then(dataset => {
                    //         this.clearUpData(dataset)
                    //     })
                    // }
                }
            }else if(typeof promisesArray === 'object'){
                this.clearUpData(promisesArray)
            }
        },
        clearUpData(dataset){
            this.updateTime = (dataset && dataset.updateTime)? dataset.updateTime: this.updateTime
            if(dataset && dataset.data && dataset.data.length > 0){
                if(this.figuresConfig){
                    this.fetchDataToFigure(this.figuresConfig.main, dataset.data)
                    this.fetchDataToFigure(this.figuresConfig.sub, dataset.data)
                }
                this.apiData = (dataset.data)? dataset.data: {}
                // this.alarm_data = (dataset.alarm)? dataset.alarm: null
                if(this.pieChartConfig){
                    this.updatePieChartData(dataset.data)
                }
                if(this.lineChartConfig){
                    this.updateLineChartData(dataset.data)
                }
            }
        },
        fetchDataToFigure(figuresConfig, datasetData){
            if(figuresConfig && figuresConfig.length > 0){
                figuresConfig.map(figuresItem => {
                    let figuresSum = 0
                    let figuresLast = 0
                    datasetData.map(datasetItem => {
                        if(figuresItem.select_array.includes(datasetItem.key)){
                            const select_index = (figuresItem.select_index)? figuresItem.select_index: 'value'
                            const datasetArray = datasetItem.value
                            const sum = datasetArray.reduce((prev, element) => {
                                return prev + element[select_index] 
                            }, 0)
                            figuresSum += sum
                            figuresLast += datasetArray[datasetArray.length - 1][select_index]
                        }
                    })
                    let figuresValue = 0
                    if(figuresItem.formula === 'average'){
                        figuresValue = figuresSum/datasetItem.value.length
                    }else if(figuresItem.formula === 'sum' || figuresItem.formula === 'get'){
                        figuresValue = figuresSum
                    }else if(figuresItem.formula === 'last'){
                        figuresValue = figuresLast
                    }
                    this.figureData = {
                        ...this.figureData,
                        [figuresItem.title]: this.translateDecimalComma(figuresValue)
                    }
                })
            }
        },
        updatePieChartData(datasetData){
            let chartXAxis = []
            let currentDatasets = []
            // let diffDatasets = []
            this.pieLagendData = {}

            if(this.pieChartConfig.select_array.length > 0){
                this.pieChartConfig.select_array.map((selectItem, selectIndex) => {
                    const targetDataset = datasetData.find(item=> item.key === selectItem)
                    let sum = targetDataset.value.reduce((prev, targetDataItem)=> {
                        return prev + targetDataItem[this.pieChartConfig.select_index]
                    }, 0)
                    sum = toFixedFunction(sum, true)
                    this.pieLagendData = {
                        ...this.pieLagendData,
                        [selectItem]: sum
                    }
                    currentDatasets.push(sum)

                    const chartXAxisName = this.pieChartConfig.select_name? this.pieChartConfig.select_name[selectIndex]: selectItem
                    chartXAxis.push(chartXAxisName)
                })
                const pieChartConfigCenter = this.pieChartConfig.center
                if(pieChartConfigCenter){
                    if(pieChartConfigCenter.formula === 'sum'){
                        this.piechartMark = `${currentDatasets.reduce((a,b)=>a+b)}`
                    }else if(pieChartConfigCenter.formula === 'except'){
                        //     const centerConfig = pieChartConfigCenter
                        //     const molecular = (datasetData[centerConfig.select[0]])? datasetData[centerConfig.select[0]][0][centerConfig.select_index]: 0
                        //     const denominator = (datasetData[centerConfig.select[1]])? datasetData[centerConfig.select[1]][0][centerConfig.select_index]: 0
                        //     const except = percentageCommon(denominator, molecular)
                        //     this.piechartMark = except
                    }
                    if(pieChartConfigCenter.unit){
                        this.piechartMark = `${this.piechartMark}${pieChartConfigCenter.unit}`
                    }
                }

                //Total value
                // if(this.totalConfig && this.totalConfig.formula === 'sum'){
                //     this.totalCount = `${currentDatasets.reduce((a,b)=>a+b)}`
                // }
            }
            this.pieData = {
                labels: chartXAxis,
                datasets: [{
                    borderWidth: 0,
                    backgroundColor: this.colorArray,
                    data: currentDatasets,
                    // previou: diffDatasets,
                }]
            }
        },
        updateLineChartData(datasetData){
            this.lineData = []
            this.lineLabelsData = []
            let prevSelect = ''

            this.lineChartConfig.select_array.map((selectItem, selectIndex) => {
                this.diffChartStyle = (prevSelect !== '' && prevSelect === selectItem)
                prevSelect = selectItem

                const targetDataSet = datasetData.find(item=> item.key === selectItem)
                if(targetDataSet){
                    const sum = targetDataSet.value.map((targetDataItem)=> {
                        if(selectIndex === 0){
                            if(this.lineChartConfig.x_axes === 'valueTime'){
                                let dayjsformat = 'hh:mm'
                                let dayjsformatUnit = ''
                                if(this.formDataConfig && this.formDataConfig.interval === 'month'){
                                    dayjsformat = 'M'
                                    dayjsformatUnit = '月'
                                }
                                this.lineLabelsData.push(`${this.dayjs(targetDataItem[this.lineChartConfig.x_axes]).format(dayjsformat)}${dayjsformatUnit}`)
                            }else{
                                this.lineLabelsData.push(targetDataItem[this.lineChartConfig.x_axes])
                            }
                        }
                        const yAxesTarget = (this.lineChartConfig.y_axes)? this.lineChartConfig.y_axes: 'value'
                        const yAxesValue = targetDataItem[yAxesTarget]
                        return toFixedFunction(yAxesValue, true)
                    })
                    this.lineData.push({
                        label: (this.lineChartConfig.select_name? this.lineChartConfig.select_name[selectIndex]: selectItem),
                        data: sum
                    })
                }
            })
        },
        translateDecimalComma(num){
            return decimalComma(num)
        },
        // translateSub(figuresConfig){
        //     if(figuresConfig.select_index && figuresConfig.select_array.length >  0){
        //         let result = 0
        //         switch (figuresConfig.formula) {
        //             case 'minus':
        //                 figuresConfig.select_array.map((item, i) => {
        //                     const value = (this.apiData[item])? this.apiData[item][0][figuresConfig.select_index]: 0
        //                     if(i === 0){
        //                         result = value
        //                     }else{
        //                         result -= value
        //                     }
        //                 })
        //                 result = (result < 0)? 0: result
        //                 break
        //             default:
        //                 break;
        //         }
        //         return this.translateDecimalComma(result)
        //     }
        // }
    }
}
</script>

<style scoped lang="scss">
@import "~@/assets/scss/basic.scss";
@import "~@/assets/scss/scrollbar.scss";
.pieContainer{
    width: 100%;
    height: 8em;
    margin: .5rem auto;
    >div{
        display: inline-block;
        vertical-align: middle;
        height: 100%;
        &.chartBox{
            width: 30%;
            margin: 0 1rem;
        }
        &.lagendContent{
            display: inline-flex;
            flex-direction: column;
            justify-content: center;
            width: calc(70% - 2rem);
            padding-right: .5rem;
            &> div{
                @extend %spaceBetween;
                &.totalItem{
                    margin-left: 1rem;
                }
                > div{
                    font-size: 1rem;
                    >span{
                        display: inline-block;
                        vertical-align: middle;
                    }
                    &.legend{
                        flex: 0 0 calc(100% - 8.5rem);
                        max-width: calc(100% - 8.5rem);
                        white-space: nowrap;
                        .icon{
                            margin-right: 0.25rem;
                            width: 0.8rem;
                            height: 0.8rem;
                            border-radius: 0.8rem;
                            background: #999;
                        }
                        .ellipsis{
                            max-width: 100%;
                        }
                    }
                    &.value > span{
                        padding-left: .25rem;
                        text-align: right;
                        width: 4rem;
                        &:first-child{
                            font-weight: bold;
                        }
                    }
                }
            }
        }
    }
}
.lineContainer{
    margin-bottom: 1rem;
    .lineChart{
        height: 10em;
        min-height: 10em;
    }
}
#overviewContainer .keyFiguresContainer{
    max-height: 30em;
    .pieContainer{
        height: 10em;
        margin: .25em auto .5em;
    }
    .chartBox{
        padding: .5em 0;
    }
    .lineContainer .lineChart{
        height: 15em;
    }
    h6{
        margin: .25em 0;
    }
    .lagendContent{
        @include scrollbar_style;
        overflow-y: scroll;
        max-height: 12em;
    }
}

$mapAsideChartWidth: 10rem;
#mapAside {
    .chartBox{
        width: $mapAsideChartWidth;
    }
    .lagendContent{
        width: calc(100% - #{ $mapAsideChartWidth + 2rem});
    }
    .legend{
        flex: 0 0 calc(100% - 4.25rem);
        max-width: calc(100% - 4.25rem);
    }
}

@media all and (min-width: 1900px){
    #overviewContainer .lineChart{
        height: 10em;
    }  
}
</style>
