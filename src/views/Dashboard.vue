<template>
    <main id="dashboardContainer" class="cardContainer">
        <div id="topicWrapper">
            <div class="topicListContainer">
                <button v-for="(topicItem, topicIndex) in topicList" :key="topicIndex" 
                    class="topicBtn" :class="[{active: activedTopic && activedTopic.index === topicItem.index}]" 
                    @click="targetTopicTrigger(topicItem)"
                >
                    <span class="ellipsis">{{topicItem.name}}</span>
                </button>
            </div>
        </div>
        <div id="componentWrapper">
            <NotFound v-if="displayComponent.length === 0" :message='"沒有數據"'/>
            <Waterfall v-else :options="{}" >
                <WaterfallItem v-for="(componentItem, componentIndex) in displayComponent" :key="componentIndex" class="componentContainer">
                    <div class="componentBox" v-if="componentHaveData[componentItem.index]">
                        <div v-for="(requestItem, requestIndex) in componentItem.request_list" :key="requestIndex">
                            <div v-if="requestIndex === 0" class="componentHeader">
                                <p>{{displayGroup[componentItem.group_index]? displayGroup[componentItem.group_index]: '不分類'}}</p>
                                <el-button type="text" icon="el-icon-arrow-right" @click="routerPushMap(componentItem)"/>
                            </div>
                            <component 
                                v-bind:is="requestItem.type"
                                :ref="`${componentItem.index}/${requestIndex}`"

                                :promise="promise"
                                :theme-dataset-index="requestIndex"
                                :sub-data="componentItem"
                                :component-index="componentIndex"
                            />
                        </div>
                    </div>
                </WaterfallItem>
            </Waterfall>
        </div>
    </main>
</template>

<script>
import { mapState } from 'vuex'
import { Waterfall, WaterfallItem } from 'vue2-waterfall'

import { topicList, topicComponentList, topicContent } from '@/assets/datas/topicList.js'
import NotFound from '@/components/NotFound.vue'

export default {
    data(){
        return {
            topicList,
            displayComponent: [],
            displayGroup: [],
            componentHaveData: [],
            promise: {}
        }
    },
    components: { Waterfall, WaterfallItem, NotFound },
    computed: {...mapState(['activedTopic'])},
    created() {
        this.targetTopicTrigger(this.activedTopic)
    },
    watch: {
        activedTopic: {
            deep: true,
            immediate: false,
            handler: function(newObj, oldObj){
                this.targetTopicTrigger(newObj)
            }
        }
    },
    mounted() {},
    beforeDestroy() {},
    destroyed() {},
    methods: {
        targetTopicTrigger(topicItem){
            if(!topicItem || Object.keys(topicItem).length === 0) return
            this.$store.commit('updateActivedTopic', topicItem)
            this.$store.commit('setGlobalLoading', true)

            const displayTopic = topicComponentList.find(topic => topic.index === topicItem.index)

            this.displayComponent = []
            if(displayTopic && displayTopic.components){
                this.displayComponent = displayTopic.components
                this.displayGroup = displayTopic.groups
                this.componentHaveData = {}
                if(this.displayComponent.length > 0){
                    this.promise = Promise.all(
                        this.displayComponent.map(conponentItem => {
                            return this.fetchComponentDatas(displayTopic.index, conponentItem)
                        })
                    )
                }
            }
            this.$store.commit('setGlobalLoading', false)
        },
        fetchComponentDatas(topicIndex, componentItem) {
            if(!componentItem) return null
            const {index, request_list} = componentItem
            if(!request_list || request_list.length === 0) return null

            return request_list.map(async (requestItem, requestIndex) => {
                const data = topicContent[topicIndex][index][requestIndex]
                this.componentHaveData[index] = typeof data === 'object'
                return data
            })
        },
        routerPushMap(componentItem) {
            if(componentItem && componentItem.index){
                this.$router.push({
                    name: 'MapView',
                    query: {
                        componentindex: componentItem.index
                    }
                })
            }
        }
    }
}
</script>
<style scoped lang="scss">
@import "~@/assets/scss/basic.scss";
@import "~@/assets/scss/_color.scss";
#dashboardContainer{
    padding: 0.5rem 0 1rem;
    #topicWrapper{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: nowrap;
        width: 100%;
        height: 2rem;
        margin: 0 0 1rem 0;
        .topicListContainer{
            display: inline-block;
            overflow: hidden;
            max-width: calc(100% - 7.5rem);
        }
        button{
            min-width: 2rem;
            height: 2rem;
            margin: 0 0.25rem;
            padding: 0 1rem;
            border-radius: 0.25rem;
            border: 1px solid $whiteColor;
            color: $whiteColor;
            background-color: transparent;
            font-size: 1rem;
            opacity: 0.6;
            >span{
                color: $whiteColor;
                max-width: 5rem;
                height: 100%;
                line-height: 175%;
            }
            &.topicBtn{
                white-space: nowrap;
                padding: 0 .5rem;
                >span{
                    height: 75%;
                    line-height: 150%;
                }
                &.commonly{}
                &.customized{}
                &.fixed {
                    >span{
                        // border-bottom: 1px solid darken($grayColor, 5);
                    }
                }
                &.active{
                    opacity: 1;
                    background-color: rgba($whiteColor, 0.15);
                }
            }
            &:hover{
                opacity: 0.9;
            }
        }
    }
    #componentWrapper{
        height: calc(100vh - #{$appContainerHeaderHeight});
    }
    #noDataMsgBox{
        height: 80%;
    }
    .componentContainer{
        width:33.3%;
        .componentBox{
            margin: 0.5rem 0.25rem;
            .componentHeader{
                @extend %spaceBetween;
                margin: 0.25rem 0 0.5rem 0;
                color: darken($borderColor, 30);
                font-size: 0.1rem;
                button{
                    padding: 0;
                }
            }
        }
        .boxItemHeader{
            @extend %spaceBetween;
            color: darken($borderColor, 30);
            .tagBtn{
                background: transparent;
                color: darken($borderColor, 30);
                margin: 0;
                padding: 0.25rem;
                &.pin{
                    color: $borderColor;
                }
            }
            .groupBtns{
                button{
                    padding: 0.25rem;
                    color: darken($borderColor, 30);
                    &:hover{
                        color: #888;
                    }
                }
            }
        }
    }
}
@media screen and (max-width: 800px) and (min-width: 401px) {
    #dashboardContainer{
        .componentContainer{
            width:50%;
        }
    }
}
@media screen and (max-width: 400px) {
    #dashboardContainer{
        .componentContainer{
            width:100%;
        }
    }
}

</style>
