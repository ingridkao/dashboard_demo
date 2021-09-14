<template>
    <div class="proportionContainer">
        <CommomHeader v-if="themeDatasetIndex === 0" :sub-data="subData" :view="view" :last-time="''"/>
        <div class="texts">
            <b>{{(select_name[0])? select_name[0]: select_array[0]}}：{{(select_name[1])? select_name[1]: select_array[1]}}</b>
            <h1>{{proportionValue}}</h1>
        </div>
        <div class="texts" v-if="Object.keys(selectValue).length === 0">0:0</div>
        <div class="texts" v-else v-for="(selectItem, selectIndex, i) in selectValue" :key="selectIndex">
            <b>{{(select_title && select_title[i]? select_title[i]: selectIndex)}}</b>
            <b>{{decimalValueComma(selectItem)}}</b>
        </div>
        <div class="mapBar">
            <div class="bar" :style="{
                background : `linear-gradient(-90deg,  ${colorArray[0]}, ${colorArray[1]})`
            }"/>
            <div class="texts">
                <span v-for="(bar_name_item, bar_name_index) in bar_name" :key="bar_name_index">{{bar_name_item}}</span>
            </div>
        </div>
    </div>
</template>
<script>
import CommomHeader from '@/components/CommomHeader.vue'
import { decimalComma, toFixedFunction } from '@/assets/js/commom.js'

export default {
    components: { CommomHeader},
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
            selectValue: {},
            proportionValue: '',
            select_array: [],
            select_name: [],
            bar_name: [],
            colorArray: ['#77dddf', '#fa6000']
        }
    },
    created() {},
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
        targetRequest(){
            if(this.subData && this.subData.request_list){
                return this.subData.request_list[this.themeDatasetIndex]
            }else{
                return null
            }
        },
        requestConfig(){
            if(this.targetRequest && this.targetRequest.config){
                this.colorArray = (this.targetRequest.color)? this.targetRequest.color: this.colorArray
                return this.targetRequest.config
            }else if(this.formConfig){
                this.colorArray = (this.formConfig.colors )? [...this.formConfig.colors,...this.colorArray]: this.colorArray
                return this.formConfig
            }
        },
        select_title(){
            return (this.requestConfig && this.requestConfig.select_title)? this.requestConfig.select_title: null
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
            this.select_array = []
            this.updateTime = (dataset && dataset.updateTime)? dataset.updateTime: this.updateTime
            
            if(this.requestConfig){
                if(this.requestConfig.select_array && this.requestConfig.select_array.length > 0){
                    this.select_array = this.requestConfig.select_array   
                }
                if(this.requestConfig.select_name){
                    this.select_name = this.requestConfig.select_name
                }
            }else if(dataset && (dataset.data === null || dataset.data.length === 0)){
                this.select_array = ['1', '2'] 
            }
            if(dataset && dataset.data && dataset.data.length > 0){
                const datasetData = dataset.data
                //1) Get array of select index: for center title
                if(this.select_array.length === 0){
                    datasetData.map((datasetItem, datasetIndex) => {
                        if(datasetIndex <= 1){
                            this.select_array.push(datasetItem.key)
                        }
                    })
                }
                let selectValues = []
                let proportionResult = 0
                this.select_array.map((selectItem) => {
                    const targetDataset = dataset.data.find(item=> item.key === selectItem)
                    if(targetDataset){
                        const targetValue = targetDataset.value[0]['value']
                        selectValues.push(targetValue)
                        this.selectValue = {
                            ...this.selectValue,
                            [targetDataset.key] : targetValue
                        }
                    }
                })
                if(selectValues.length === 2){
                    proportionResult = selectValues[1]/selectValues[0]
                }
                this.proportionValue = `1:${toFixedFunction(proportionResult)}`
            }
            if(this.select_name.length === 0){
                this.select_name = this.select_array
            }
            this.bar_name = (this.requestConfig && this.requestConfig.bar_name)? this.requestConfig.bar_name: this.select_array
        },
        decimalValueComma(value){
            return value?decimalComma(value): '-'
        }
    }
}
</script>

<style scoped lang="scss">
@import "~@/assets/scss/basic.scss";
@import "~@/assets/scss/scrollbar.scss";
#dashboardContainer{
    .proportionContainer{
        min-height: 11rem;
    }
}
.texts{
    @extend %spaceBetween;
}
.mapBar{
    .bar{
        width: 90%;
        margin: 0.5rem auto;
        height: 1rem;
        background: #fff;
    }
}
</style>

