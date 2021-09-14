<template>
    <div class="alarmBarContainer">
        <CommomHeader v-if="themeDatasetIndex === 0" :sub-data="subData" :view="view" :last-time="updateTime"/>
        <div class="boxCardInfo datasets" v-if="totalTitle">
            <h6>{{totalTitle}}</h6>
        </div>
        <div class="alarmBarContent" v-loading="pageLoading" element-loading-background="#171d20">
            <div v-for="(subItem, subIndex) in valueDataObj" :key="subIndex" class="indent">
                <span class="ellipsis">{{spliteDataName(subIndex)}}</span>
                <span class="countProgress">
                    <div v-if="zScoreDataObj[subIndex]" class="ZScoreProgress red"
                        :style="{
                            width: getProgressWidth(zScoreDataObj[subIndex]['red'])
                        }"
                    />
                    <!-- <div v-if="zScoreDataObj[subIndex]" class="ZScoreProgress yellow"
                        :style="{
                            width: getProgressWidth(zScoreDataObj[subIndex]['yellow']),
                            background: colorArray[0]
                        }"
                    /> -->
                    <div class="valueProgress"
                        :class="{hasZScore: zScoreDataObj[subIndex]}"
                        :style="{
                            width: getProgressWidth(subItem),
                            background: colorArray[0]
                        }"
                    />
                </span>
                <span class="value complexValue">{{subItem}}</span>
                <span
                    class="value alarm" 
                    :class="{show: zScoreDataObj[subIndex] && subItem >= zScoreDataObj[subIndex]['zScore']}"
                    :style="{color: zScoreDataObj[subIndex] && zScoreDataObj[subIndex]['color']}"
                >●</span>
            </div>
        </div>
    </div>
</template>

<script>
import { spliteName } from '@/assets/js/commom.js'
import CommomHeader from '@/components/CommomHeader.vue'
export default {
    components: { CommomHeader },
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
            zScoreColor: 'transparent',
            colorArray: [],
            pageLoading: false
        }
    },
    created() {
        this.targetRequest = (this.subData && this.subData.request_list)? this.subData.request_list[this.themeDatasetIndex]: null
        this.colorArray = (this.targetRequest && this.targetRequest.color)? [...this.targetRequest.color, '#27d5d7']: ['#27d5d7']
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
        totalTitle(){
            if(this.requestConfig){
                return (this.requestConfig.total && this.requestConfig.total.title)? this.requestConfig.total.title: (this.requestConfig.total_title? this.requestConfig.total_title: null)
            }else{
                return null
            }
        }
    },
    methods: {
        async initFunction() {
            this.pageLoading = true
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
            this.valueDataObj = {}
            if(dataset && dataset.data && dataset.data.length > 0){
                let valueArray = []
                let redArray = []
                dataset.data.map(item => {
                    let mainValue = 0
                    if(item.value.length > 1){
                        const yellow = item['value'].find(item => item.key === 'yellow')
                        const red = item['value'].find(item => item.key === 'red')
                        const average = item['value'].find(item => item.key === 'average')  

                        this.zScoreDataObj[item.key] = {
                            red: (red && red.value)? red.value: 0,
                            yellow: (yellow && yellow.value)? yellow.value: 0
                        }

                        let zScore = 0
                        this.zScoreColor = 'transparent'
                        mainValue = (average)? average.value: item.value[0]['value']
                        if(red && mainValue >= red.value){
                            zScore = red.value
                            this.zScoreColor = '#ae3427'
                        }else if(yellow && mainValue >= yellow.value){
                            zScore = yellow.value
                            this.zScoreColor = '#c59916'
                        }
                        this.zScoreDataObj[item.key] = {
                            ...this.zScoreDataObj[item.key],
                            zScore,
                            color: this.zScoreColor
                        }
                        redArray.push(parseInt(this.zScoreDataObj[item.key]['red']))
                    }else{
                        mainValue = (item.value[0]['value'])? item.value[0]['value']: 0
                    }
                    this.valueDataObj[item.key] = parseInt(mainValue)
                    valueArray.push(mainValue)
                })
                if(redArray.length > 0){
                    this.dataValueMax = Math.max(...redArray)
                }else{
                    this.dataValueMax = Math.max(...valueArray)
                }
            }
            this.pageLoading = false
        },
        spliteDataName(name){
            return spliteName(name)
        },
        getProgressWidth(values){
            if(values >= 0 && this.dataValueMax >= 0){
                const width = Math.round((values/this.dataValueMax *1000)/10)
                return (width >= 100)? '100%': width + '%'
            }else{
                return '0%'
            }
        }
    }
}
</script>

<style scoped lang="scss">
@import "~@/assets/scss/basic.scss";
@import "~@/assets/scss/scrollbar.scss";
@import "~@/assets/scss/chart.scss";
.alarmBarContainer{
    .indent{
        padding-left: .5rem;
        .ellipsis{
            flex-basis: 5em;
        }
    }
}
#dashboardContainer .alarmBarContainer{
    .alarmBarContent{
        height: 10rem;
        margin-bottom: 0.5rem;
        @include scrollbar_style;
        overflow-y: scroll;
        max-height: 10rem;
    }
}
.chartviewer{
    .alarmBarContent{
        max-height: calc(100vh - 19rem);
    }
}
// #overviewContainer .alarmBarContainer{
//     h6{
//         margin: .5rem 0;
//     }
//     .indent{
//         padding-left: 1rem;
//     }
//     .alarmBarContent{
//         @include scrollbar_style;
//         overflow-y: scroll;
//         max-height: 50vh;

//         margin-bottom: 1rem;
//     }
// }

#mapAside{
    .alarmBarContent > div{
        span{
            font-size: 1rem;
            line-height: 1.75rem;
        }
        .countProgress{
            flex-basis: 30%;
        }
    }
}
@media screen and (max-width: 1024px) { 
    .alarmBarContent > div{
        .ellipsis{
            flex-basis: 3em;
        }
        .countProgress{
            flex-basis: 40%;
        }
    }
    .chartviewer{
        .alarmBarContent{
            max-height: calc(100vh - 19rem - 22rem);
        }
    }
}
</style>
