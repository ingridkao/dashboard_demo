<template>
    <div>
        <CommomHeader v-if="themeDatasetIndex === 0" :sub-data="subData" :view="view" :last-time="updateTime"/>
        <div class="stackedBarContainer">
            <StackedBarChart
                class="chartBox"
                :chart-datasets="chartDatasets"
                :labels-data="labelsData"
                :color-array="colorArray"
                :sort="sortCol"
            />
        </div>
    </div>
</template>

<script>
import CommomHeader from '@/components/CommomHeader.vue'
import StackedBarChart from '@/assets/charts/stackedBar.js'
import { GradientColors } from '@/assets/datas/appConfig.js'

export default {
    components: { CommomHeader, StackedBarChart },
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
                this.colorArray = (this.formConfig.colors )? [...this.formConfig.colors,...this.colorArray]: this.colorArray
                return this.formConfig
            }
        },
        sortCol(){
            if(this.requestConfig){
                if(this.requestConfig.sort && this.requestConfig.sort.order){
                    return this.requestConfig.sort.order === 'desc'
                }else if(typeof this.requestConfig.sort_order === 'boolean'){
                    return this.requestConfig.sort_order
                }else{
                    return true
                }
            }else{
                return true
            }
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
                    //     console.log(componentDatas);

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
            this.labelsData = []
            this.chartDatasets = []
            if(dataset && dataset.data && dataset.data.length>0){
                const datasetData = dataset.data

                //1) Get array of select label:
                let selectArray = []
                let selectArrayHave = false
                if(this.requestConfig && this.requestConfig.select_array && this.requestConfig.select_array.length > 0){
                    selectArray = this.requestConfig.select_array
                    selectArrayHave = true
                }

                //2) Get total of data:
                const labelTotal = {}
                datasetData.map((datasetItem, datasetIndex) => {
                    let total = 0
                    datasetItem.value.map(oneData => {
                        if(datasetIndex === 0 && !selectArrayHave){
                            selectArray.push(oneData.key)
                            total += oneData.value
                        }else if(selectArray.includes(oneData.key)){
                            total += oneData.value
                        }
                    })
                    labelTotal[datasetItem.key] = total
                })
                
                //3) sort total data:
                const sortable = Object.entries(labelTotal).sort(([,a],[,b]) => {
                    if(this.sortCol){
                        return b - a //big to small
                    }else{
                        return a - b //small to big
                    }
                }).reduce((r, [k, v]) => ({ ...r, [k]: v }), {});
                this.labelsData = Object.keys(sortable)
                //4) Insert chart:
                selectArray.map((selectKey, index) => {  
                    const dataArr = []
                    this.labelsData.map((labelItem) => {
                        const targetDataset = datasetData.find(item=> item.key === labelItem)
                        const targetSelect = targetDataset.value.find(item2=> item2.key === selectKey)
                        dataArr.push(targetSelect.value)
                    })
                    selectKey = selectKey ? selectKey: '數量'
                    this.chartDatasets.push({
                        label: selectKey,
                        data: dataArr
                    })
                })
            }            
        }
    }
}
</script>

<style scoped lang="scss">
@import "~@/assets/scss/scrollbar.scss";
.stackedBarContainer{
    padding: .5rem 0;
}
#componentCreateContainer,
#mapViewContainer{
   .stackedBarContainer{
        @include scrollbar_style;
        overflow-y: scroll;
    } 
}
#componentCreateContainer{
   .stackedBarContainer{
        max-height: 55vh;
    } 
}
#mapViewContainer{
   .stackedBarContainer{
        max-height: 17rem;
    } 
}
</style>
