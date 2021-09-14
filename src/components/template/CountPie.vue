<template>
    <div>
        <CommomHeader v-if="themeDatasetIndex === 0" :sub-data="subData" :view="view" :last-time="updateTime"/>
        <div class="countPieContainer pieContainer">
            <DoughnutChart 
                class="chartBox"
                :class="{otherComponent:otherComponentCount>1}"
                :chart-data="pieData"
                :chart-mark="chartMark"
                :title-lebel="titleLebel"
                :last-value-total="lastDataTotalString"
            />
            <div class="lagendContainer">
                <div class="lagendContent" :class="[{haveTitle: targetRequest && targetRequest.name},{scroll : Object.keys(pieListValueObj).length > 5}]">
                    <div v-if="totalTitle" class="totalItem">
                        <div class="legend">
                            <span class="ellipsis">{{totalTitle? totalTitle: '-'}}</span>
                        </div>
                        <div class="value">
                            <span>
                                {{displayCount}}
                                <span v-if="(showUnit)">{{showUnit}}</span>
                            </span>
                        </div>
                    </div>
                    <div v-for="(subItem, subIndex, i) in pieListValueObj" :key="subIndex">
                        <div class="legend">
                            <span class="icon" :style="{background: colorArray[i]}"/>
                            <span class="ellipsis">{{spliteDataName(subIndex)}}</span>
                        </div>
                        <div class="value">
                            <span>
                                {{subItem}}
                                <span v-if="(showUnit)">{{showUnit}}</span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { growthPercentageCommon, percentageToInt, growthIcon, spliteName, toFixedFunction } from '@/assets/js/commom.js'

import CommomHeader from '@/components/CommomHeader.vue'
import DoughnutChart from '@/assets/charts/doughnut.js'

import { ChartColors } from '@/assets/datas/appConfig.js'

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
        },
        otherComponentCount:{
            type: Number
        }
    },
    data() {
        return {
            targetRequest: null,
            updateTime: '',
            pieListValueObj: {},
            displayCount: 0,

            pieData: {},
            chartMark: '',
            lastDataTotalString: '',
            titleLebel: '',
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
        showTop(){
            if(!this.requestConfig) return false
            return (this.requestConfig.show_top10)? this.requestConfig.show_top10: (this.requestConfig.show_top? this.requestConfig.show_top: false)
        },
        showUnit(){
            if(!this.requestConfig) return null
            return (this.requestConfig.unit)? this.requestConfig.unit: null
        },
        totalTitle(){
            if(this.requestConfig){
                return (this.requestConfig.total && this.requestConfig.total.title)? this.requestConfig.total.title: (this.requestConfig.total_title? this.requestConfig.total_title: null)
            }else{
                return null
            }
        },
        centerTitle(){
            if(this.requestConfig){
                return (this.requestConfig.center && this.requestConfig.center.title)? this.requestConfig.center.title: (this.requestConfig.center_title? this.requestConfig.center_title: null)
            }else{
                return null
            }
        },
        centerFormula(){
            if(this.requestConfig){
                return (this.requestConfig.center && this.requestConfig.center.formula)? this.requestConfig.center.formula: (this.requestConfig.center_formula? this.requestConfig.center_formula: null)
            }else{
                return null
            }
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
            let selectKeys = []
            let pieKeys = []
            let datasetValues = []
            let lastDatasets = []

            this.updateTime = (dataset && dataset.updateTime)? dataset.updateTime: this.updateTime
            if(dataset && dataset.data && dataset.data.length > 0){
                const datasetData = dataset.data

                //1) Get array of select index: for center title
                if(this.requestConfig && this.requestConfig.select_array && this.requestConfig.select_array.length > 0){
                    selectKeys = this.requestConfig.select_array   
                }else{
                    datasetData.map((datasetItem, datasetIndex) => {
                        selectKeys.push(datasetItem.key)
                    })
                }
                if(selectKeys.length === 1){
                    this.titleLebel = selectKeys[0]
                }
                datasetData.map((datasetItem, datasetIndex) => {
                    const datasetOneItem = datasetItem.value[0]
                    if(selectKeys.includes(datasetItem.key)){
                        datasetValues.push(datasetOneItem.value)
                        lastDatasets.push((datasetOneItem['lastValue'])? datasetOneItem['lastValue']: 0)
                    }
                    pieKeys.push(datasetItem.key)
                    this.pieListValueObj[datasetItem.key] = datasetOneItem.value
                })

                //2) Get sum number
                const datasetValueSum = datasetValues.reduce((a,b)=>a+b)
                const datasetLastSum = lastDatasets.reduce((a,b)=>a+b)
                this.chartMark = 0
                selectKeys.map(item => {
                    this.chartMark += this.pieListValueObj[item]
                })
                if(this.centerFormula && this.centerFormula === 'except' && selectKeys.length > 1){
                    this.chartMark = percentageToInt(this.pieListValueObj[selectKeys[1]], this.pieListValueObj[selectKeys[0]])
                }
                this.chartMark = toFixedFunction(this.chartMark, true)
                this.chartMark = (this.chartMark > 0)? this.chartMark.toString(): '--'
                if(this.showUnit){
                    this.chartMark += this.showUnit
                }

                this.titleLebel = this.centerTitle ? this.centerTitle: this.titleLebel
                if(datasetLastSum> 0){
                    this.lastDataTotalString = `${growthIcon(datasetValueSum, datasetLastSum)}${growthPercentageCommon(datasetValueSum, datasetLastSum)}`
                }
                this.displayCount = toFixedFunction(datasetValueSum)

                if(datasetValues.length > 4 && this.showTop){
                    const top4XAxis = pieKeys.slice(0, 4)
                    const otherSum = datasetValues.slice(4).reduce((a,b)=>a+b)
                    this.pieListValueObj = top4XAxis.reduce((result, key) => {
                        result[key] = this.pieListValueObj[key]
                        return result
                    }, {})
                    this.pieListValueObj['其他'] = otherSum
                    pieKeys = Object.keys(this.pieListValueObj)
                    datasetValues = Object.values(this.pieListValueObj)
                }
            }
            this.pieData = {
                labels: pieKeys,
                datasets: [{
                    borderWidth: 0,
                    backgroundColor: this.colorArray,
                    data: datasetValues,
            //         previou: lastDatasets,
                }]
            }
        },
        spliteDataName(name){
            return spliteName(name)
        }
    }
}
</script>

<style lang="scss">
@import "~@/assets/scss/chart.scss";
$mapAsideChartWidth: 10rem;
#mapAside .countPieContainer{
    .chartBox{
        width: $mapAsideChartWidth;
    }
    .lagendContainer{
        width: calc(100% - #{ $mapAsideChartWidth + 2rem});
    }
    .legend{
        flex: 0 0 calc(100% - 4.25rem);
        max-width: calc(100% - 4.25rem);
    }
}
</style>
