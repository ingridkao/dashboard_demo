<template>
    <div >
        <div 
            v-for="(requestItem, requestIndex) in subItem.request_list" 
            :key="requestIndex"
            class="boxItemContent"  
        >
            <div class="boxItemHeader" v-if="requestIndex === 0">
                <i class="el-icon-collection-tag"/>
                <div class="groupBtns">
                    <el-button round @click="routerPush(topicItem.index)" >
                        {{topicItem.name}}
                    </el-button>
                </div>
            </div>
            <component 
                v-bind:is="requestItem.type"
                :theme-dataset-index="requestIndex"

                :sub-data="subItem"
                :promise="promise"
            />
        </div>
    </div>
</template>

<script>
//Fetch content of all topic 
import { topiclContent } from '@/assets/datas/overview.js'

import Keyword from '@/components/template/Keyword.vue'
import AlarmBar from '@/components/template/AlarmBar.vue'
import CountPie from '@/components/template/CountPie.vue'
import RatioPie from '@/components/template/RatioPie.vue'
import StatisticLine from '@/components/template/StatisticLine.vue'
import ComplexMsg from '@/components/template/ComplexMsg.vue'
import KeyFigures from '@/components/template/KeyFigures.vue'
import Gauge from '@/components/template/Gauge.vue'
import TreeMap from '@/components/template/TreeMap.vue'
import VerticalBar from '@/components/template/VerticalBar.vue'
import StackedBar from '@/components/template/StackedBar.vue'
import { cloneDeep } from 'lodash'

export default {
    data() {
        return {
            promise: {},
            contentFakeData: []
        }
    },
    components: { Keyword, AlarmBar, CountPie, RatioPie, StatisticLine, ComplexMsg, KeyFigures, Gauge, TreeMap, VerticalBar, StackedBar },
    props: {
        subItem: {
            type: Object,
            default: () =>{return {}}
        }, 
        subIndex: {
            type: Number
        }, 
        topicItem: {
            type: Object,
            default: () =>{return {}}
        }, 
    },
    created() {
        if(this.topicItem && this.topicItem.index){
            this.contentFakeData = topiclContent[this.topicItem.index]
        }
        if(this.subItem.request_list && this.subItem.request_list.length > 0){
            this.init()
        }
    },
    methods: {
        routerPush(routeThemeType) {
            this.$router.push({ 
                name: 'OverViews', 
                params: { 
                    type: routeThemeType,
                }
            })
        },
        fetchRealAPI(themeRequest){
            if(this.topicItem.index && themeRequest && themeRequest.path){
                const postURL = `/api_server${themeRequest.path}`
                const formData = this.$postFormData(themeRequest.form_data)
                return new Promise(resolve => {
                    return this.$axios.post(postURL, formData).then(success => {
                        resolve(success.data)
                    }).catch(error => {
                        resolve({
                            error: error.response.data,
                            data: null
                        })
                    })
                })
            }else{
                return new Promise(resolve => {
                    resolve({
                        data: null
                    })
                })
            }
        },
        init(){
            if(!this.subItem || this.subItem.request_list.length === 0)return
            this.promise = Promise.all(
                this.subItem.request_list.map(async (themeRequest, i) => {
                    const realContent = await this.fetchRealAPI(themeRequest)
                    if(realContent.data){
                        return realContent
                    }else{
                        return (this.contentFakeData[this.subItem.index])? this.contentFakeData[this.subItem.index][i]: []
                    }
                })
            )
        }
    }
}
</script>
<style scoped lang="scss">
@import "~@/assets/scss/basic.scss";
.boxItemContent{
    >div{
        &.boxItemHeader{
            @extend %spaceBetween;
            padding: 0.5rem;
            .groupBtns > button{
                padding: 0.25rem 0.5rem;
                font-size: 0.5rem;
            }
        }
        &.boxItemBody{
            // border: 1px solid #555;
        }
    }
}
</style>
