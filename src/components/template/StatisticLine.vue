<template>
    <div class="compareContainer">
        <CommomHeader v-if="themeDatasetIndex === 0" :sub-data="subData" :view="view" :last-time="updateTime"/>
        <div v-if="figuresConfig" class="figuresContainer" :class="{basic: !isDashboard}">
            <div v-if="figuresConfig.main" class="mainFigures">
                <div v-for="(mainItem, i) in figuresConfig.main" :key="i">
                    <b>{{(mainItem.select_name)? mainItem.select_name: mainItem.select_index}}</b>
                    <h1>
                        <span class="decimalComma">{{(figureData[mainItem.select_index])? translateDecimalComma(figureData[mainItem.select_index]): 0}}</span>
                        <span v-if="mainItem.unit" class="unit">{{mainItem.unit}}</span>
                    </h1>
                </div>
            </div>
            <div v-if="figuresConfig.sub" class="subFigures">
                <div v-for="(subItem, i) in figuresConfig.sub" :key="i">
                    <b>{{(subItem.select_name)? subItem.select_name: subItem.select_index}}</b>
                    <h1>
                        <span class="decimalComma">{{(figureData[subItem.select_index])? translateDecimalComma(figureData[subItem.select_index]): 0}}</span>
                        <span v-if="subItem.unit" class="unit">{{subItem.unit}}</span>
                    </h1>
                </div>
            </div>
        </div>
        <div class="lineChartBox">
            <LineChart 
                class="lineChart"
                :chart-datasets="chartDatasets"
                :labels-data="chartLabelsData"
                :color-array="colorArray"
                :scales-show="!isDashboard"
                :data-unit="(chartTargetArray[0] && chartTargetArray[0]['unit'])?chartTargetArray[0]['unit']: ''"
                :diff-style="diffChartStyle"
            />
        </div>
    </div>
</template>

<script>
//https://www.chartjs.org/samples/latest/scales/time/line-point-data.html
//https://www.chartjs.org/samples/latest/scales/time/financial.html
import dayjs from 'dayjs'
import LineChart from '@/assets/charts/statisticLine.js'
import CommomHeader from '@/components/CommomHeader.vue'
import { growthPercentageCommon, decimalComma, toFixedFunction } from '@/assets/js/commom.js'

export default {
    components: { LineChart, CommomHeader },
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
        }
    },
    data(){
        return {
            dayjs,
            targetRequest: null,
            figuresConfig: null,

            updateTime: '',
            chartDatasets: [],
            chartLabelsData: [],
            diffChartStyle: false,
            datasetData: [],
            figureData: {},
            colorArray: ['#5b5b5b', '#fff']
        } 
    },
    created(){
        this.targetRequest = (this.subData && this.subData.request_list)? this.subData.request_list[this.themeDatasetIndex]: null
        this.colorArray = (this.targetRequest && this.targetRequest.color)? [...this.targetRequest.color, ...this.colorArray]: this.colorArray

        if(this.requestConfig){
            this.figuresConfig = (this.requestConfig.figures)? this.requestConfig.figures: null
        }
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
        isDashboard(){
            return this.view === 'dashboard'
        },
        requestConfig(){
            if(this.targetRequest && this.targetRequest.config){
                return this.targetRequest.config
            }else if(this.formConfig){
                this.colorArray = (this.formConfig.colors )? [...this.formConfig.colors,...this.colorArray]: this.colorArray
                return this.formConfig
            }else{
                return null
            }
        },
        chartTargetArray(){
            if(this.requestConfig && this.requestConfig.line && this.requestConfig.line.target_array){
                return this.requestConfig.line.target_array
            }else if (this.requestConfig && this.requestConfig.line_array){
                return this.requestConfig.line_array
            }else{
                return null
            }
        },
        formDataConfig(){
            return (this.targetRequest && this.targetRequest.form_data )? this.targetRequest.form_data: null
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
            this.updateTime = (dataset && dataset.updateTime)? dataset.updateTime: this.updateTime
            if(dataset && dataset.data && dataset.data.length > 0){
                const datasetData = dataset.data

                //1) Enter figure text
                if(this.figuresConfig){
                    this.fetchDataToFigure(this.figuresConfig.main, datasetData)
                    this.fetchDataToFigure(this.figuresConfig.sub, datasetData)
                }

                //2) Get array of select:
                let lineChartSelectIndex = this.chartTargetArray.map(item => item.select_index)
                if(lineChartSelectIndex.length === 0){
                    lineChartSelectIndex = datasetData.map(item => item.key)
                }

                //3) Draw line chart
                this.chartDatasets = []
                this.chartLabelsData = []
                this.chartTargetArray.map((targetItem, targetIndex) => {
                    this.diffChartStyle = (targetIndex > 0 && lineChartSelectIndex[targetIndex - 0] === lineChartSelectIndex[targetIndex])
                    const targetDataSet = datasetData.find(item=> item.key === lineChartSelectIndex[targetIndex])
                    let sum = 0
                    if(targetDataSet.value){
                        sum = targetDataSet.value.map((targetDataItem)=> {
                            if(targetIndex === 0){
                                if(targetItem.x_axes === 'valueTime'){
                                    let dayjsformat = 'HH:mm'
                                    let dayjsformatUnit = ''
                                    if(targetItem.interval === 'day'){
                                        dayjsformat = 'M/D'
                                    }else if(this.formDataConfig && this.formDataConfig.month){
                                        dayjsformat = 'M'
                                        dayjsformatUnit = '月'
                                    }
                                    this.chartLabelsData.push(`${this.dayjs(targetDataItem[targetItem.x_axes]).format(dayjsformat)}${dayjsformatUnit}`)
                                }else{
                                    this.chartLabelsData.push(targetDataItem[targetItem.x_axes])
                                }
                            }
                            return toFixedFunction(targetDataItem[targetItem.y_axes], true)
                        })
                    }
                    this.chartDatasets.push({
                        label: (targetItem.select_name? targetItem.select_name: lineChartSelectIndex[targetIndex]),
                        data: sum
                    })
                })
            }
        },
        countArray(array){
            return (array && array.length > 0)? array.reduce((a,b)=>a+b): 0
        },
        translateGrowthPercentage(currentSum, lastValueArray){
            const lastValueSum = this.countArray(lastValueArray)
            return growthPercentageCommon(currentSum, lastValueSum)
        },
        ratioArray(array){
            const sum = this.countArray(array)
            return (sum>0)? Math.round((sum/array.length *10))/10: 0
        },
        fetchDataToFigure(figuresConfig, datasetData){
            if(figuresConfig && figuresConfig.length > 0){
                figuresConfig.map(item => {
                    if(item.select_index){
                        const mainTargetData = datasetData.find(item2=> item2.key === item.select_index)
                        let sum = 0
                        if(mainTargetData.value){
                            sum = mainTargetData.value.reduce((prev,element) => {
                                return prev + parseFloat(element.value)
                            }, 0)
                        }
                        const figuresValue = (item.formula === 'average')? sum/mainTargetData.value.length: sum
                        this.figureData = {
                            ...this.figureData,
                            [item.select_index]: this.translateDecimalComma(figuresValue)
                        }
                    }
                })
            }
        },
        translateDecimalComma(num){
            return decimalComma(num)
        }
    }
}
</script>

<style scoped lang="scss">
@import "~@/assets/scss/basic.scss";
.compareContainer{
    .subname{
        height: 1rem;
    }
    .lineChartBox{
        position: relative;
        h6{
            position: absolute;
            top: 0;   
        }
        .lineChart{
            height: 10em;
        }
    }
}
#overviewContainer{
    .subTitleData{
        margin: 1rem 0;
    }
}
</style>
