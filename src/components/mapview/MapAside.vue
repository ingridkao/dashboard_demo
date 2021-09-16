<template>
    <el-aside id="mapAside" width="27rem" class="cardContainer">
        <div v-for="(groupItem, groupIndex) in targetTopicToGroup" :key="groupIndex" class="groupContainer">
            <div v-if="groupItem.length > 0" class="groupItem">
                <h6>
                    <div>{{groupIndex}}</div>
                    <el-button type="text" @click="toggleGroupComponent(groupIndex)">
                        <i :class="groupsButton[groupIndex]? 'el-icon-caret-top': 'el-icon-caret-bottom'"/>
                    </el-button>
                </h6>
                <el-card 
                    shadow="hover" 
                    class="boxCard" 
                    v-for="(componentItem, componentIndex) in groupItem" 
                    :key="componentIndex" 
                    :body-style="{height: (componentItem && componentItem.dataToggle)? 'calc(100% - 2rem)': 0}" 
                >
                    <div slot="header">
                        <el-switch
                            :width="28"
                            active-color="#519cab"
                            v-model="componentItem.dataToggle"
                            @change="toggleComponent(componentItem)"
                        />
                    </div>
                    <div class="boxCardContent" v-if="promise !== null">
                        <div
                            v-for="(requestItem, requestIndex) in componentItem.request_list" 
                            :key="requestIndex"
                        >
                            <component 
                                v-bind:is="requestItem.type"
                                :ref="`${componentItem.index}/${requestIndex}`"
                                :view="'mapview'"

                                :promise="promise"
                                :theme-dataset-index="requestIndex"
                                :sub-data="componentItem" 
                                :component-index="componentItem.promiseIndex"
                                :hide-context="componentItem.dataToggle"
                            />
                        </div>
                    </div>
                </el-card>
            </div>
        </div>
    </el-aside>
</template>
<script>
import { mapState } from 'vuex'
import { cloneDeep } from 'lodash'

import { topicContent } from '@/assets/datas/topicList.js'


export default {
    data(){
        return {
            targetTopicToGroup: {},
            groupsButton: {},

            targetDiffArray: [],
            targetCacheArray: [],

            initPromiseArr: [],
            promise: null
        }
    },
    props: {
        groupsDisplay: {
            type: Array,
            default: () =>{ return [] }
        }
    },
    computed: {
        ...mapState(['topicToggleDataset', 'activedTopic', 'topicFixedArray'])
    },
    watch: {
        topicToggleDataset: {
            deep: true,
            immediate: true,
            handler: function(newArray, oldArray){
                this.checkDiff(!oldArray || oldArray.length === 0)
            }
        }
    },
    destroyed() {},
    methods: {
        checkDiff(init){
            this.targetDiffArray = this.topicToggleDataset.map((newItem, newIndex) => {
                if(init){
                    return newItem['dataToggle']
                }else{
                    return newItem['dataToggle'] && newItem['dataToggle'] != this.targetCacheArray[newIndex]
                }
            })
            this.targetCacheArray = cloneDeep(this.targetDiffArray)
            this.processGroup()
        },
        processGroup(){
            this.targetTopicToGroup = {}
            this.initPromiseArr = []
            this.topicToggleDataset.map((element, elementIndex)  => {
                //1) Check group 
                const groupName = (typeof element.group_index === "number")? this.groupsDisplay[element.group_index]: '不分類'
                element.group_name = groupName
                element.promiseIndex = elementIndex
                if(typeof this.targetTopicToGroup[groupName] === 'undefined'){
                    this.targetTopicToGroup[groupName] = [element]
                }else{
                    this.targetTopicToGroup[groupName].push(element)
                }
                //2) Fetch data
                this.initPromiseArr.push(this.fetchComponentAPI(element, elementIndex))
            })
            this.promise = Promise.all(this.initPromiseArr)
        },
        fetchComponentAPI(componentItem, componentIndex) {
            if(!componentItem) return null

            if(!this.targetDiffArray[componentIndex] && this.initPromiseArr[componentIndex]){
                return this.initPromiseArr[componentIndex]
            }

            const { index, request_list } = componentItem
            if(!request_list || !index) return null

            const activedTopicIndex = this.activedTopic.index
            if(!activedTopicIndex) return null

            return request_list.map(async (requestItem, requestIndex) => {
                const targetTopic = topicContent[activedTopicIndex]
                const targetComponent = targetTopic[index]
                return (targetComponent.length > 0)? (targetComponent[requestIndex]? targetComponent[requestIndex]: null): null
            })
        },
        toggleGroupComponent(groupName) {
            if(this.targetTopicToGroup[groupName] && this.targetTopicToGroup[groupName].length > 0){
                this.targetTopicToGroup[groupName].map((item, index) => {
                    this.targetTopicToGroup[groupName][index]['dataToggle'] = !this.groupsButton[groupName]
                })
            }
            this.groupsButton = {
                ...this.groupsButton,
                [groupName]: !this.groupsButton[groupName]
            }
        },
        toggleComponent(componentItem) {
            if(Object.keys(this.groupsButton).length === 0) return

            const targetName = componentItem.group_name
            if(targetName && this.targetTopicToGroup[targetName].length > 0){
                let btnToggle = false
                this.targetTopicToGroup[targetName].map(item => {
                    btnToggle = item.dataToggle
                })
                this.groupsButton[targetName] = btnToggle
            }
        }
    }
}
</script>
<style scoped lang="scss">
@import "~@/assets/scss/basic.scss";
@import "~@/assets/scss/scrollbar.scss";
#mapAside{
    @include scrollbar_style;
    overflow-y: scroll;

    height: calc(100% - 2rem);
    margin: .75rem 0 .75rem .75rem;
    padding-right: .75rem;
    .boxCard{
        flex: 0 0 100%;
        margin-bottom: 1rem;
        .el-card__header > div{
            @extend %spaceBetween;
            justify-content: flex-end;
        }
    }
    .groupItem{
        h6{
            @extend %spaceBetween;
        }
        button{
            :hover{
                color: $whiteColor;
                .el-icon-caret-top{
                    color: $PrimaryColor;
                }
            }
            .el-icon-caret-top{
                color: $buttonColor;
            }
        }
    }
}
</style>
