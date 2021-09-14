<template>
    <div class="mapDisplayContainer" :style="{height: mapDisplayContainerHeight + 'rem'}">
        <CommomHeader v-if="themeDatasetIndex === 0" :sub-data="subData" :view="view" :last-time="updateTime"/>
        <div>
            <div v-if="calculation_target" class="subTitleData">
                <div class="calculationMsg">
                    <div>{{calculation_target}}</div>
                    <div>
                        <h1>{{calculateData? calculateData: '-'}}</h1>
                        <span v-if="calculation_unit">{{calculation_unit}}</span>
                    </div>
                </div>
            </div>
            <div v-if="Object.keys(statisticData).length > 0" class="subTitleData">
                <b v-for="(statisticItem, statisticIndex) in statisticData" :key="statisticIndex">
                    {{statisticIndex}}
                    <h1>
                        {{decimalValueComma(statisticItem)}}
                    </h1>
                </b>
            </div>
            <div v-if="mapLabelsConfig.length > 0" class="layerContainer" 
                :class="{
                    mapLabel: (Object.keys(mapLabelValueList).length > 0),
                    single: (mapLabelsConfig.length < 2)
                }
            ">
                <div class="layerItem" v-for="(contentItem, contentIndex) in mapLabelsConfig" :key="contentIndex">
                    <div>
                        <span 
                            class="mapIcon" 
                            :class="translateSymbol(contentItem.symbol)" 
                            :style="translateColor(contentItem, subData.color, contentIndex)"
                        />
                        <span>{{ (contentItem.name)? contentItem.name: (Object.keys(mapLabelValueList)[contentIndex]? Object.keys(mapLabelValueList)[contentIndex]: contentItem.select_array) }}</span>
                    </div>
                    <div v-if="Object.keys(mapLabelValueList).length > 0">
                        {{translateDecimalComma((contentItem.name)? contentItem.name: (Object.keys(mapLabelValueList)[contentIndex]? Object.keys(mapLabelValueList)[contentIndex]: contentItem.select_array))}}
                        {{(contentItem['unit']? contentItem['unit']: (Object.values(contentItem) && Object.values(contentItem)[0]['unit']? Object.values(contentItem)[0]['unit']: ''))}}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { MainColors } from '@/assets/datas/appConfig.js'
import { toFixedFunction } from '@/assets/js/commom.js'

import bike from '@/assets/images/mapbox/bike.png'
import bus from '@/assets/images/mapbox/bus.png'
import metro from '@/assets/images/mapbox/metro.png'
import cross1 from '@/assets/images/mapbox/cross_1.png'
import cross2 from '@/assets/images/mapbox/cross_2.png'
import triangle1 from '@/assets/images/mapbox/triangle_1.png'
import triangle2 from '@/assets/images/mapbox/triangle_2.png'

import CommomHeader from '@/components/CommomHeader.vue'

export default {
    components: { CommomHeader },
    props: {
        promise: {
            type: [Promise, Object]
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
    data(){
        return {
            targetRequest: null,
            updateTime: '',
            colorArray: MainColors,

            calculation_target: null,
            calculation_unit: null,
            calculateData: null,

            statisticData: {},

            mapLabelValueList: {},

            bike,
            bus,
            metro,
            cross1,
            cross2,
            triangle1,
            triangle2
        } 
    },
    created(){
        this.targetRequest = (this.subData && this.subData.request_list)? this.subData.request_list[this.themeDatasetIndex]: null
    },
    computed:{
        requestConfig(){
            if(this.targetRequest && this.targetRequest.config){
                const targetRequestConfig = this.targetRequest.config
                if(targetRequestConfig){
                    const targetCalculation =  targetRequestConfig.calculation
                    this.calculation_target = targetCalculation &&　targetCalculation.target? targetCalculation.target: null
                    this.calculation_unit = targetCalculation && targetCalculation.unit? targetCalculation.unit: null
                } 
                return targetRequestConfig
            }else if(this.formConfig){
                this.colorArray = (this.formConfig.colors )? [...this.formConfig.colors,...this.colorArray]: this.colorArray
                return this.formConfig
            }
        },
        mapLabelsConfig(){
            return (this.requestConfig && this.requestConfig.mapLabels)? this.requestConfig.mapLabels: []
        },
        statisticShow(){
            return this.requestConfig && this.requestConfig.statistic
        },
        mapDisplayContainerHeight(){
            let h = 2
            h = h + (this.calculation_target? 2: 0)
            h = h + (Object.keys(this.statisticData).length > 0? 1: 0)
            h = h + (Object.keys(this.mapLabelValueList).length > 0? Object.keys(this.mapLabelValueList).length*2: (this.mapLabelsConfig? (this.mapLabelsConfig.length%4? this.mapLabelsConfig.length*2: 3):0))
            return h
        }
    },
    mounted() {
        this.initFunction()
    },
    watch: {
        subData: {
            deep: true,
            immediate: false,
            handler: function(newObj, oldObj){
                if(oldObj){
                    this.targetRequest = (newObj && newObj['request_list'])? newObj['request_list'][this.themeDatasetIndex]: null
                }
            }
        },
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
            }else if(promisesArray && typeof promisesArray === 'object'){
                this.clearUpData(promisesArray)
            }
        },
        clearUpData(dataset){
            this.updateTime = (dataset && dataset.updateTime)? dataset.updateTime: this.updateTime
            if(dataset && dataset.data && dataset.data.length > 0){
                const datasetData = dataset.data
                datasetData.map(item => {
                    this.mapLabelValueList = {
                        ...this.mapLabelValueList,
                        [item.key] : (typeof item.value[0]['value'] === 'number')? item.value[0]['value']: '-'
                    }
                })
                if(this.statisticShow){
                    this.statisticData = this.mapLabelValueList
                }
                if(this.calculation_target){
                    this.calculateData = this.mapLabelValueList[this.calculation_target]
                }
            }
        },
        translateSymbol(contentSymbol){
            return (contentSymbol)? contentSymbol: 'circle'
        },
        decimalValueComma(value){
            return typeof value === 'number'? toFixedFunction(value): '-'
        },
        translateDecimalComma(name){
            const value = this.mapLabelValueList[name]
            return this.decimalValueComma(value)
        },
        translateColor(content, subColor, index){
            const css = {}
            const color = (content && content.color)? content.color: this.colorArray[index]
            if(content){
                if(['bike', 'bus', 'metro', 'cross1', 'cross2', 'triangle1', 'triangle2'].includes(content.symbol)){
                    css.backgroundSize = 'contain'
                    if(content.symbol === 'bike'){ css.backgroundImage = `url(${bike})`}
                    if(content.symbol === 'bus'){ css.backgroundImage = `url(${bus})`}
                    if(content.symbol === 'metro'){ css.backgroundImage = `url(${metro})`}
                    if(content.symbol === 'cross1'){ css.backgroundImage = `url(${cross1})`}
                    if(content.symbol === 'cross2'){ css.backgroundImage = `url(${cross2})`}
                    if(content.symbol === 'triangle1'){ css.backgroundImage = `url(${triangle1})`}
                    if(content.symbol === 'triangle2'){ css.backgroundImage = `url(${triangle2})`}
                }else{
                    css.backgroundColor = color
                    css.borderColor = color     
                }
            }else if(subColor && subColor[index]){
                css.backgroundColor = subColor[index]
                css.borderColor = subColor[index]
            }
            return css
        }
    }
}
</script>
<style lang="scss">
@import "~@/assets/scss/basic.scss";
.mapDisplayContainer{
    min-height: 9.5rem;
}
.calculationMsg{
    width: 100%;
    @extend %spaceBetween;
    h1{
        display: inline-block;
    }
}
.layerContainer{
    margin: .5rem 0 1rem 0;
    @extend %spaceAround;
    &.mapLabel{
        justify-content: left;
        .layerItem{
            width: 100%;
            min-height: 2rem;
            @extend %spaceBetween;
        }
    }
    &.single{
        justify-content: left;
    }
}
$borderWidth:1.2rem;
$borderSmallWidth:.8rem;
$borderMinWidth:.2rem;
.layerItem{
    padding: 0.25rem;
    span{
        display: inline-block;
        vertical-align: middle;
        height: $borderWidth;
        line-height: $borderWidth;
        &.mapIcon{
            width: $borderWidth;
            margin-right: .5rem;
            &.circle,
            &.circle_stroke{
                width: $borderSmallWidth;
                height: $borderSmallWidth;
                border-radius: $borderWidth;
                border-width: $borderMinWidth;
                border-style: solid;
            }
            &.circle_stroke{
                border-radius: $borderWidth;
                border-width: 2px;
                background-color: transparent !important;
            }
            &.square{
                transform: rotate(45deg);
            }
            &.dasharray{
                width: 0.9rem;
                height: 0.9rem;
                background-color: transparent !important;
                border-width: $borderMinWidth;
                border-style: dotted;
                border-width: $borderMinWidth;
            }
            &.line{
                height: .3rem;
                border-radius: 0.3rem;
            }
        }
    }
}

</style>
