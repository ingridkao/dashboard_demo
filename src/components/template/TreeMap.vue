<template>
    <div class="treeMapWrapper">
        <CommomHeader v-if="themeDatasetIndex === 0" :sub-data="subData" :view="view" :last-time="updateTime"/>
        <div class="horizontal spaceBetween alignEnd mb-5">
            <ul v-if="figuresData.length > 0" style="width: 75%">
                <li v-for="(figuresItem, key) in figuresData" :key="key" class="horizontal spaceBetween">
                    <span>{{ figuresItem.key }}</span>
                    <span>{{ figuresItem.value }}</span>
                </li>
            </ul>
        </div>
        <p v-if="requestConfig && requestConfig.unit" style="text-align: right;">{{ `(${ requestConfig.unit })` }}</p>
        <TreemapChart
            className="chartBox"
            :chart-datasets="chartDatasets" 
            :color-array="colorArray"
            :value-text="valueText"
        />
    </div>
</template>

<script>
import { setGradientHexColor, hexAToRGB, toFixedFunction } from '@/assets/js/commom.js'
import CommomHeader from '@/components/CommomHeader.vue'
import TreemapChart from '@/assets/charts/treemap.vue'
import { BuildingPublandColors } from '@/assets/datas/appConfig.js'

export default {
    components: { CommomHeader, TreemapChart },
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
            figuresData: []
        }
    },
    created() {
        this.targetRequest = (this.subData && this.subData.request_list)? this.subData.request_list[this.themeDatasetIndex]: null
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
                return this.formConfig
            }else{
                return null
            }
        },
        colorArray(){
            const steps = this.requestConfig && this.requestConfig.select_array && this.requestConfig.select_array.length > 5 ? this.requestConfig.select_array.length : 10
            const colorSample = BuildingPublandColors
            let colors = []
            if(this.targetRequest && this.targetRequest.color){
                colors = [...this.targetRequest.color, ...colorSample]
            }else if(this.formConfig && this.formConfig.colors){
                colors = [...this.formConfig.colors, ...colorSample]
            }else{
                colors = colorSample
            }
            const arr = []
            for (let i = 1; i <= steps; i++) {
                const hexColor = setGradientHexColor(i, colors[0], colors[1], colors[2], steps)
                const rgb = hexAToRGB(hexColor)
                arr.push(`rgba(${rgb},0.3)`)
            }
            return arr
        },
        figures_array(){
            if(this.requestConfig){
                return (this.requestConfig.figures && this.requestConfig.figures.select_array)? this.requestConfig.figures.select_array: ((this.requestConfig.figures_array)? this.requestConfig.figures_array : [])
            }else{
                return []
            }
        },
        valueText(){
            return (this.requestConfig && this.requestConfig.label_name)? this.requestConfig.label_name: '面積'
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
            // console.log(dataset);

            this.updateTime = (dataset && dataset.updateTime)? dataset.updateTime: this.updateTime
            this.figuresData = []
            this.chartDatasets = []

            const figuresKey = this.figures_array
            let requestResultKey = []

            if(dataset && dataset.data && dataset.data.length > 0){
                const datasetData = dataset.data
                //1) Get array of select index: for center title
                if(this.requestConfig && this.requestConfig.select_array && this.requestConfig.select_array.length > 0){
                    requestResultKey = this.requestConfig.select_array   
                }else{
                    datasetData.map((datasetItem, datasetIndex) => {
                        requestResultKey.push(datasetItem.key)
                    })
                }
                dataset.data.map(dataItem => {
                    //Enter figures
                    const targetkey = dataItem.key
                    const targetValue = toFixedFunction(dataItem.value[0]['value'], true)
                    if(figuresKey.includes(targetkey)) {
                        this.figuresData.push({
                            ...dataItem,
                            value : targetValue
                        })
                    }
                    //Draw chart
                    if(requestResultKey.includes(targetkey) && !figuresKey.includes(targetkey)){
                        this.chartDatasets.push({
                            ...dataItem,
                            [this.valueText] : targetValue
                        }) 
                    }
                })
            }
        }
    }
}
</script>
