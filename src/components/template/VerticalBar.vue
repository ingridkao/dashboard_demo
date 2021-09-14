<template>
    <div class="verticalBarWrapper">
        <CommomHeader v-if="themeDatasetIndex === 0" :sub-data="subData" :view="view" :last-time="updateTime"/>
        <div class="horizontal justCenter" v-if="averageData && Object.keys(averageData).length > 0">
            <div class="horizontal spaceBetween topText alignEnd">
                <span class="keyText">{{ averageKeyText }}</span>
                <span class="valueText">{{ numToFixed(averageData) }}</span>
            </div>
        </div>
        <VerticalBarChart
            class="chartBox"
            :chart-datasets="chartDatasets" 
            :labels-data="labelsData"
            :color-array="colorArray"
        /> 
    </div>
</template>

<script>
import CommomHeader from '@/components/CommomHeader.vue'
import VerticalBarChart from '@/assets/charts/verticalBar.js'
import { toFixedFunction } from '@/assets/js/commom.js'
import { GradientColors } from '@/assets/datas/appConfig.js'

export default {
    components: { CommomHeader, VerticalBarChart },
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
            chartDatasets: [],
            labelsData: [],
            averageData: {},
            colorArray: []
        }
    },
    created() {
        this.targetRequest = (this.subData && this.subData.request_list)? this.subData.request_list[this.themeDatasetIndex]: null
        this.colorArray = (this.targetRequest && this.targetRequest.color)? [...this.targetRequest.color, ...GradientColors]: GradientColors
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
                this.colorArray = (this.formConfig.colors )? [...this.formConfig.colors, ...GradientColors]: this.colorArray
                return this.formConfig
            }
        },
        averageKeyText(){
            if(this.requestConfig){
                return this.requestConfig.figures && this.requestConfig.figures.title? this.requestConfig.figures.title: (this.requestConfig.averageTitle? this.requestConfig.averageTitle:'平均') 
            }else{
                return '平均'
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
            this.updateTime = (dataset && dataset.updateTime)? dataset.updateTime: this.updateTime
            this.labelsData = []
            const valueArr = []
            if(dataset && dataset.data && dataset.data.length > 0){
                const datasetData = dataset.data
                //Enter averageData
                this.averageData = datasetData.find(item=> item.key === 'average')

                //1) Get array of select label:
                let selectArray = []
                if(this.requestConfig && this.requestConfig.select_array && this.requestConfig.select_array.length > 0){
                    selectArray = this.requestConfig.select_array
                }else{
                    datasetData.map((datasetItem, datasetIndex) => {
                        selectArray.push(datasetItem.key)
                    })   
                }
                selectArray = selectArray.filter(item => item !== 'average')

                //2) Draw chart
                selectArray.map((selectValue, selectIndex) => {
                    const targetDataSet = datasetData.find(item=> item.key === selectValue)
                    const targetValue = (targetDataSet && targetDataSet.value)?targetDataSet.value[0]['value']: 0
                    this.labelsData.push(selectValue)
                    valueArr.push(targetValue)
                })
            }
            const chartLabel = this.requestConfig && this.requestConfig.label_name? this.requestConfig.label_name: '數量'
            this.chartDatasets = [{
                label: chartLabel,
                data: valueArr
            }]
        },
        numToFixed(averageData){
            if(averageData.value && averageData.value[0]['value']) return toFixedFunction(averageData.value[0]['value'])
        }
    }
}
</script>

<style scoped lang="scss">
@import "~@/assets/scss/basic.scss";
.verticalBarWrapper{
    .topText {
        width: 90%;
        .valueText {
            font-size: 1.8em;
        }
    }
    .chartBox{
        height: 15rem;
    }
}
#overviewContainer .chartBox{
    height: 8rem;
}
</style>
