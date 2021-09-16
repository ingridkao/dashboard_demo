<template>
    <div>
        <CommomHeader v-if="themeDatasetIndex === 0" :sub-data="subData" :view="view" :last-time="updateTime"/>
        <div class="countPieContainer" ref="gaugeContainer">
            <div 
                v-for="(contentItem , contentIndex, i) in chartDataArray" 
                :key="contentIndex" 
                class="chartBox"
                :style="{height: gaugeHeight}"
            >
                <GaugeChart
                    :chart-data="contentItem.data"
                    :chart-use="contentItem.use"
                    :chart-total="contentItem.total"
                    :title-lebel="titleLebel[i]"
                    :dark-mode="darkMode"
                />
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import CommomHeader from '@/components/CommomHeader.vue'
import GaugeChart from '@/assets/charts/gauge.js'

export default {
    components: { CommomHeader, GaugeChart },
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
            gaugeWidth: 0,
            gaugeHeight: '10rem',
            targetRequest: null,
            updateTime: '',
            chartDataArray: [],
            pieData: {},
            colorArray: ['#999', '#ddd'],
            chartData: {}
        }
    },
    created() {

        this.targetRequest = (this.subData && this.subData.request_list)? this.subData.request_list[this.themeDatasetIndex]: null
        this.colorArray = (this.targetRequest && this.targetRequest.color)? [this.targetRequest.color, '#999', '#ddd']: this.colorArray
    },
    mounted() {
        this.initFunction()
        this.gaugeWidth = this.$refs.gaugeContainer.clientWidth
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
        },
    },
    computed:{
        ...mapState(['darkMode']),
        requestConfig(){
            if(this.targetRequest && this.targetRequest.config){
                return this.targetRequest.config
            }else if(this.formConfig){
                this.colorArray = (this.formConfig.colors )? [...this.formConfig.colors, '#999', '#ddd']: this.colorArray
                return this.formConfig
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
            if(dataset && dataset.data && dataset.data.length > 0){
                const datasetData = dataset.data
                this.chartDataArray = {}
                //1) Get array of select label:
                this.titleLebel = []
                if(this.requestConfig && this.requestConfig.display && this.requestConfig.display.length > 0){
                    this.titleLebel = this.requestConfig.display
                }else{
                    datasetData.map((datasetItem, datasetIndex) => {
                        this.titleLebel.push(datasetItem.key)
                    })   
                }

                datasetData.map((datasetItem, datasetIndex) => {
                    let datasetValue = {}
                    datasetItem.value.map((valueItem, valueImdex) => {
                        datasetValue = {
                            ...datasetValue,
                            [valueItem.key] : valueItem.value
                        }
                    })
                    const idle = datasetValue.total - datasetValue.use
                    datasetValue = {
                        ...datasetValue,
                        data:{
                            labels: (this.requestConfig && this.requestConfig.label_name)? this.requestConfig.label_name: this.titleLebel,
                            datasets: [{
                                borderWidth: 0,
                                backgroundColor: this.colorArray,
                                data: [datasetValue.use, idle],
                            }]   
                        }
                    }
                    this.chartDataArray = {
                        ...this.chartDataArray,
                        [datasetItem.key]: datasetValue,
                    }
                })
            }
            this.gaugeHeight = (Object.keys(this.chartDataArray).length>0)? `${this.gaugeWidth/Object.keys(this.chartDataArray).length - 30}px`: '10rem'
        }
    }
}
</script>

<style scoped lang="scss">
@import "~@/assets/scss/basic.scss";
@import "~@/assets/scss/scrollbar.scss";
.countPieContainer{
    width: 100%;
    padding: 1em;
    .chartBox{
        position: relative;
        display: inline-block;
        width: 46%;
        margin: 0 2%;
        div{
            width: 100%;
            height: 100%;
        }
    }
}
</style>
