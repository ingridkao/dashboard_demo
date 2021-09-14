<template>
    <el-aside id="mapAside" width="27rem" class="cardContainer">
        <div v-for="(groupName, groupIndex) in targetTopicGroup" :key="groupIndex" class="groupContainer">
            <div v-if="groupName.length > 0" class="groupItem">
                <h6>
                    <div>{{groupIndex}}</div>
                    <el-button 
                        type="text"
                        @click="toggleGroupComponent(groupIndex)"
                    >
                        <i :class="groupsButton[groupIndex]? 'el-icon-caret-top': 'el-icon-caret-bottom'"/>
                    </el-button>
                </h6>
                <el-card 
                    shadow="hover" 
                    class="boxCard" 
                    v-for="(componentItem, componentIndex) in groupName" 
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
import { cloneDeep } from 'lodash'
import { topiclContent } from '@/assets/datas/overview.js'
import { mapState } from 'vuex'

export default {
    data(){
        return {
            topicDiffArray: [],
            topicCacheArray: [],

            targetTopicGroup: {},
            groupsButton: {},
            initPromiseArr: [],
            promise: null,
            intervalObj: {},
            groupsNewDisplay: []
        }
    },
    props: {
        groupsDisplay: {
            type: Array,
            default: () =>{ return [] }
        }
    },
    computed: {
        ...mapState(['topicToggleDataset', 'topicFixedArray']),
        fixedTopic(){
            const {type} = this.$route.query
            const fixedBoolen = type && type === 'fixed'
            if(fixedBoolen){
                this.groupsNewDisplay = this.groupsDisplay
            }
            return fixedBoolen
        }
    },
    watch: {
        topicToggleDataset: {
            deep: true,
            immediate: true,
            handler: function(newArray, oldArray){
                if(oldArray && oldArray.length > 0){
                    this.checkDiff()
                }else{
                    this.$store.dispatch('fetchTopicData').then(e=>{
                        this.checkDiff(true)
                    })
                }
            }
        }
    },
    destroyed() {
        this.clearIntervalFunction()
    },
    methods: {
        clearIntervalFunction(){
            const values = Object.values(this.intervalObj)
            if(values.length > 0){
                values.map(intervalInstance => {
                    clearInterval(intervalInstance)
                })
                this.intervalObj = {}
            }
        },
        checkDiff(init){
            this.clearIntervalFunction()
            this.targetTopicGroup = {}
            this.topicDiffArray = this.topicToggleDataset.map((newItem, newIndex) => {
                if(init){
                    return newItem['dataToggle']
                }else{
                    return newItem['dataToggle'] && newItem['dataToggle'] != this.topicCacheArray[newIndex]
                }
            })
            this.topicCacheArray = cloneDeep(this.topicDiffArray)
            this.processGroup(init)
        },
        processGroup(init){
            this.topicToggleDataset.map((element, elementIndex)  => {
                if(init){
                    this.groupsButton = {
                        ...this.groupsButton,
                        [groupName]: element.dataToggle
                    }
                }

                //1) Check group 
                let groupName = null
                if(this.fixedTopic){
                    if(typeof element.group_index === "number"){
                        groupName = this.groupsDisplay[element.group_index]
                    }else{
                        groupName = '不分類'
                    }
                }else{
                    const targetTopic = this.topicFixedArray.find(item=> item.id === element.topic_id)
                    groupName = (targetTopic)? targetTopic.name: element.topic_id
                    this.groupsNewDisplay.push(groupName)
                }

                element.group_name = groupName
                element.promiseIndex = elementIndex

                if(typeof this.targetTopicGroup[groupName] === 'undefined'){
                    this.targetTopicGroup[groupName] = [element]
                }else{
                    this.targetTopicGroup[groupName].push(element)
                }

                const milliSecond = element.update_loop
                if(element.dataToggle && milliSecond > 0){
                    this.intervalObj[element.index] = setInterval(() => {
                        this.setIntervalFunction(element, elementIndex)
                    }, milliSecond)
                }
                this.initPromiseArr[elementIndex] = this.fetchComponentAPI(element, elementIndex)
            })
            // console.log(this.targetTopicGroup);
            // console.log(this.initPromiseArr);
            this.promise = Promise.all(this.initPromiseArr)
        },
        fetchComponentAPI(componentItem, componentIndex) {
            if(!componentItem) return null
            if(!this.topicDiffArray[componentIndex] && this.initPromiseArr[componentIndex]){
                return this.initPromiseArr[componentIndex]
            }

            const componentRequest = componentItem.request_list
            if(!componentRequest) return null
            return componentRequest.map(async (requestItem, requestIndex) => {
                const realContent = await this.fetchRealAPI(requestItem)
                if(realContent && realContent.data){
                    return realContent
                }else if(realContent && !realContent.data){
                    return null
                }else if(componentItem){
                    const targetTopic = this.topicFixedArray.find(item=> componentItem && componentItem.topic_id == item.id)
                    if(targetTopic && topiclContent[targetTopic.index]){
                        return topiclContent[targetTopic.index][componentItem.index][requestIndex]
                    }else{
                        return null
                    }
                }
            })
        },
        setIntervalFunction(dataset){
            const newPromiseArr = cloneDeep(this.initPromiseArr)
            // console.log(newPromiseArr);
            const targetIndex = this.topicToggleDataset.findIndex(componentItem => (componentItem.index === dataset.index))
            newPromiseArr[targetIndex] = this.fetchComponentAPI(dataset, true)
            this.promise = Promise.all(newPromiseArr)
        },
        fetchRealAPI(themeRequest){
            if(themeRequest && themeRequest.path){
                const postURL = `/api_server${themeRequest.path}`
                const formData = this.$postFormData(themeRequest.form_data)
                return new Promise(resolve => {
                    return this.$axios.post(postURL, formData).then(success => {
                        resolve(success.data)
                    }).catch(error => {
                        resolve({
                            error: (error && error.response.data)? error.response.dataL :error,
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
        toggleComponent(componentItem) {
            if(Object.keys(this.groupsButton).length === 0) return

            const targetName = componentItem.group_name
            if(targetName && this.targetTopicGroup[targetName].length > 0){
                let btnToggle = false
                this.targetTopicGroup[targetName].map(item => {
                    btnToggle = item.dataToggle
                })
                this.groupsButton[targetName] = btnToggle
            }
        },
        toggleGroupComponent(groupName) {
            // console.log('toggleGroupComponent');
            if(this.targetTopicGroup[groupName] && this.targetTopicGroup[groupName].length > 0){
                this.targetTopicGroup[groupName].map((item, index) => {
                    this.targetTopicGroup[groupName][index]['dataToggle'] = !this.groupsButton[groupName]
                })
            }
            this.groupsButton = {
                ...this.groupsButton,
                [groupName]: !this.groupsButton[groupName]
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
