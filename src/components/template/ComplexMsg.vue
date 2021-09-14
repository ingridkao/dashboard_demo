<template>
    <div class="alarmContainer">
        <CommomHeader v-if="themeDatasetIndex === 0" :sub-data="subData" :view="view" :last-time="updateTime"/>
        <div v-if="alarm_data" class="alarmMsg" :class="{work: alarm_data.status &&  alarm_data.status > 0}">
            <i class="el-icon-warning-outline"/>{{alarm_data.title}}
            <p class="desc">{{alarm_data.desc}}</p>
        </div>
        <div v-if="contentData" class="subTitleData">
            <div v-for="(subItem, i) in contentData" :key="i">
                <b>{{i}}</b>
                <h1>{{subItem.value}}</h1>
            </div>
        </div>
        <div v-if="descData" class="realtimeData subFontStyle">
            <div v-for="(messageItem, i) in descData" :key="i">
                <span>{{messageItem.desc}}</span>
                <span>{{messageItem.time}}</span>
            </div>
        </div>
    </div>
</template>
<script>
import dayjs from 'dayjs'

import CommomHeader from '@/components/CommomHeader.vue'

export default {
    components: { CommomHeader },
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
        },
        hideContext: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            dayjs,
            updateTime: '',
            alarm_data: null,
            contentData: null,
            descData: null,
            // targetRequest: {}
        }
    },
    // created(){
        // if(this.subData && this.subData.request_list){
        //     this.targetRequest = this.subData.request_list[this.themeDatasetIndex]
        // }
    // },
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
            if(dataset){
                this.alarm_data = ( dataset.alarm)? dataset.alarm: null
                this.contentData = ( dataset.data)? dataset.data: null
                this.descData = ( dataset.message)? dataset.message: null
                this.updateTime = (dataset.updateTime)? dataset.updateTime: this.updateTime
            }
        }
    }
}
</script>

<style scoped lang="scss">
@import "~@/assets/scss/basic.scss";
@import "~@/assets/scss/scrollbar.scss";
.realtimeData{
    @include scrollbar_style;
    max-height: 11rem;
    overflow-y: scroll;
    overflow-x: hidden;
    padding: 1rem 1rem 0.5rem 1rem;
    margin-bottom: .5rem;
    >div{
        @extend %spaceBetween;
        margin: .5rem 0;
    }
}
</style>
