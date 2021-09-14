<template>
    <main id="dashboardContainer" class="cardContainer">
        <!-- <div id="topicWrapper">
            <button class="topicBtn commonly" :class="{active: activedTopic && activedTopic.index === 'defaultFav'}" @click="routerUpdate()"><i class="el-icon-collection-tag"/></button>
            <div class="topicListContainer">
                <button v-for="(topicItem, topicIndex) in topiclSortArray" :key="topicIndex" 
                    class="topicBtn" :class="[topicItem.type, {active: activedTopic && activedTopic.index === topicItem.index}]" 
                    @click="routerUpdate(topicItem)"
                >
                    <span class="ellipsis">{{topicItem.name}}</span>
                </button>
            </div>
        </div> -->
        <!-- <div id="componentWrapper" v-loading="pageLoading" element-loading-background="#050709">
            <NotFound v-if="displayComponent.length === 0"  :message='`${$t("NotAdd")}${$t("CommonlyComponent")}`'/>
            <Waterfall v-else :options="{}" >
                <WaterfallItem
                    v-for="(componentItem, componentIndex) in displayComponent"
                    :key="componentIndex"
                    class="componentContainer"
                >
                    <div class="componentBox">
                        <div class="boxItemHeader">
                            <el-popover
                                v-if="activedTopic && activedTopic.type === 'fixed'"
                                trigger="manual"
                                placement="right"
                                class="custom"
                                v-model="popoverVisible[componentIndex]"
                            >
                                <header class="popoverHeader">
                                    <el-button
                                        icon="el-icon-check"
                                        type="text" 
                                        @click="addCommonlyComponent(componentItem.id, componentIndex)" 
                                        :disabled="AddCommonlyBtnShow"
                                    />
                                    <el-button
                                        icon="el-icon-close"
                                        type="text" 
                                        @click="resetAddCommonlySelect()"
                                        :disabled="AddCommonlyBtnShow"
                                    />
                                </header>
                                <div class="popoverBody">
                                    <el-checkbox-group v-model="addCommonlySelect">
                                        <el-checkbox label="defaultFav">常用組件</el-checkbox>
                                        <el-divider/>
                                        <el-checkbox
                                            v-for="item in topicCustomizedArray"
                                            :key="item.id"
                                            :label="item.name"
                                            :class="item.name"
                                        />
                                    </el-checkbox-group>
                                </div>
                                <el-button 
                                    slot="reference" 
                                    type="text" 
                                    icon="el-icon-collection-tag"
                                    class="tagBtn" 
                                    @click="popoverHandle(componentItem, componentIndex)"
                                />
                            </el-popover>
                            <el-popconfirm
                                v-else
                                :confirm-button-text='`${$t("Confirm")}${$t("Remove")}`'
                                :cancel-button-text='`${$t("Cancel2")}`'
                                :title='`${$t("ConfirmRemove")}${$t("DataComponent")}?`'
                                @confirm="removeCustomComponent(componentItem)"
                            >
                                <el-button 
                                    slot="reference" 
                                    type="text"
                                    icon="el-icon-collection-tag"
                                    class="tagBtn" 
                                    :class="{pin: (componentItem.dashboard_show || componentItem.alarm_data)}"
                                />
                            </el-popconfirm>
                            <div class="groupBtns">
                                <el-button 
                                    type="text" 
                                    icon="el-icon-arrow-right" 
                                    @click="routerPushMap(componentItem)"
                                />
                            </div>
                        </div>
                        <div v-for="(requestItem, requestIndex) in componentItem.request_list" :key="requestIndex">
                            <p v-if="requestIndex === 0" class="groupName">
                                {{componentItem.linkName? componentItem.linkName: '不分類'}}
                            </p>
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
        </div> -->
    </main>
</template>

<script>
import { cloneDeep, throttle } from 'lodash'
import { mapState } from 'vuex'
import { Waterfall, WaterfallItem } from 'vue2-waterfall'

import NotFound from '@/components/NotFound.vue'

import { topiclContent } from '@/assets/datas/overview.js'
// import { SubColors } from '@/assets/datas/appConfig.js'
import { FetchTagetAllList } from '@/assets/js/api_get'

export default {
    data(){
        return {
            pageLoading: false,

            topiclSortArray: [],
            activedTopic: null,
            // topicColor: {},

            groupDisplay: {},
            displayComponent: [],

            popoverVisible: [],
            popoverCustomized: [],
            addCommonlySelect: [],

            promise: {},
            intervalObj: {}
        }
    },
    components: { Waterfall, WaterfallItem, NotFound },
    computed: {
        ...mapState(['topicDefaultObj', 'topicCustomizedArray', 'topicFixedArray']),
        addCommonlyComponentText(){
            return this.$t("Add") + this.$t("CommonlyComponent")
        },
        AddCommonlyBtnShow(){
            if(this.addCommonlySelect.length === 0 &&  this.popoverCustomized.length === 0) return true
            if(this.addCommonlySelect.length !== this.popoverCustomized.length) return false
            let anwser = false
            this.addCommonlySelect.map(item => {
                const initTopic = this.popoverCustomized.find(topic=> topic.TopicName === item )
                anwser = (typeof initTopic === 'object')
            })
            return anwser
        }
    },
    created() {
        this.$store.dispatch('fetchTopicData')
    },
    watch: {
        topicCustomizedArray: {
            deep: true,
            immediate: false,
            handler: function(newObj, oldObj){
                this.initActivedTopicl(newObj)
            }
        }
    },
    mounted() {
        document.addEventListener("click", this.bodyClosePopover)
    },
    beforeDestroy() {
        document.removeEventListener("click", this.bodyClosePopover)
    },
    destroyed() {
        this.removeInterval()
    },
    methods: {
        removeInterval(){
            Object.values(this.intervalObj).map(intervalInstance => {
                clearInterval(intervalInstance)
            })
            this.intervalObj = {}
        },
        bodyClosePopover(e) {
            if(e.target.className === 'el-icon-collection-tag') return
            if(this.popoverVisible && this.popoverVisible.length > 0){
                this.popoverReset(true)
            }
        },
        topicBtnStyle(topicItem){
            return
            // return (topicItem.type === "fixed")? {borderBottomColor: this.topicColor[topicItem.id]}: null
        },
        initActivedTopicl(newData, oldData){
            if(newData){
                this.topiclSortArray = this.topicCustomizedArray.concat(this.topicFixedArray)
            }
            if(oldData && oldData.length !== newData.length){
                //Delete Topic
            }else if(this.$route.query && Object.keys(this.$route.query).length > 0){
                //Have route query
                this.routerUpdate(this.$route.query)
            }else{
                this.routerUpdate()
            }
            // this.topicFixedArray.map((item, index) => {
            //     this.topicColor[item.id] = SubColors[index]
            // })
        },
        routerUpdate(topicItem){
            if(typeof topicItem === 'object'){
                this.activedTopic = topicItem
            }else{
                this.activedTopic = this.topicDefaultObj
            }
            this.$router.push({
                name: 'Dashboard',
                query: {
                    id: this.activedTopic.id,
                    index: this.activedTopic.index,
                    type: this.activedTopic.type
                }
            })
            this.fetchTargetTopicData()
        },
        routerPushMap(componentItem) {
            if(this.activedTopic && componentItem){
                this.$router.push({
                    name: 'MapView',
                    params: {
                        type: componentItem.topic
                    },
                    query: {
                        id: this.activedTopic.id,
                        index: this.activedTopic.index,
                        type: this.activedTopic.type,
                        componentid: componentItem.id,
                        componenindex: componentItem.id
                    }
                })
            }
        },
        fetchTargetTopicData(topicItem){
            if(Object.keys(this.activedTopic).length === 0) return
            const {id, type} = this.activedTopic
            this.popoverReset()
            this.removeInterval()

            this.displayComponent = []
            this.pageLoading = true

            FetchTagetAllList(`/api_server/manager/topcomp/${type}/${id}`, this).then(successData => {
                this.processComponentDisplay(successData, type)
            }).catch(e => {
                console.log(e)
            }).finally(r => {
                this.pageLoading = false
            })
        },
        processComponentDisplay(targetData, type){
            const processTopicSource = (topicItem) => {
                let alarm_dataArray = []
                let componentsArray = []
                const topicComponents = topicItem.components

                if(topicComponents && topicComponents.length > 0){
                    //display Group list objext
                    this.groupDisplay = {}
                    if(type === 'fixed'){
                        //1. Official theme: group classification
                        if(topicItem.groups && topicItem.groups.length > 0){
                            topicItem.groups.map((item, index)=>{
                                this.groupDisplay[index] = item
                            })
                        }
                    }else if(type === 'customized'){
                        // 2. custom theme: fixed topic name
                        this.groupDisplay = this.topicFixedArray   
                    }
                    topicComponents.map(obj => {
                        const newObj = cloneDeep(obj)
                        if(type === 'fixed'){
                            newObj.topic_id = topicItem.id
                            newObj.topic = topicItem.index
                            if(Object.keys(this.groupDisplay).length > 0 && typeof obj.group_index === 'number'){
                                newObj.linkName = (this.groupDisplay[obj.group_index])? this.groupDisplay[obj.group_index]: null
                            }
                        }else if(type === 'customized'){
                            const targetTopic = this.groupDisplay.find(item=> item.id === obj['topic_id'])
                            newObj.topic = targetTopic.index
                            // newObj.color = this.topicColor[targetTopic.id]
                            newObj.linkName = targetTopic.name
                        }
                        if(obj.alarm_data){
                            alarm_dataArray.push(newObj)
                        }else{
                            componentsArray.push(newObj)
                        }
                    })
                }
                this.displayComponent = alarm_dataArray.concat(componentsArray)
                if(this.displayComponent.length > 0){
                    this.promise = Promise.all(
                        this.displayComponent.map(conponentItem => {
                            return this.fetchOneComponentAPI(conponentItem, conponentItem.update_loop)
                        })
                    )
                    this.setIntervalFunction()
                }
            }
            if(targetData){
                processTopicSource(targetData)
            }
        },
        fetchRealAPI(requestItem, update_loop){
            if(requestItem && requestItem.path){
                const postURL = `/api_server${requestItem.path}`
                const formData = this.$postFormData(requestItem.form_data, update_loop)
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
        fetchOneComponentAPI(componentItem, update_loop) {
            if(!componentItem) return null
            const componentIndex = componentItem.index
            const componentRequest = componentItem.request_list
            if(!componentRequest || componentRequest.length === 0) return null

            return componentRequest.map(async (requestItem, requestIndex) => {
                const realContent = await this.fetchRealAPI(requestItem, update_loop)
                if(realContent && realContent.data){
                    return realContent
                }else if(realContent && !realContent.data){
                    return null
                }else if(topiclContent[componentItem.topic]){
                    return topiclContent[componentItem.topic][componentIndex][requestIndex]
                }
            })
        },
        fetchCustomizedtopics(component){
            const {id, topic_id} = component 
            this.popoverCustomized = []
            this.addCommonlySelect = []
            if(id && topic_id){
                this.$axios.get(`/api_server/manager/topcomp/customizedtopics/topic/${topic_id}/component/${id}`).then(success => {
                    const customizedtopicsData = success.data
                    if(customizedtopicsData && customizedtopicsData.length > 0){
                        this.popoverCustomized = cloneDeep(customizedtopicsData)
                        customizedtopicsData.map(item => {
                            this.addCommonlySelect.push(item.TopicName)
                        })
                    }
                }).catch(e => {
                    if(e.response.status === 401){
                            this.fetchCustomizedtopics(component)
                    }
                })
            }
        },
        popoverHandle: throttle(function(component, componentIndex){
            this.popoverTrigger = true
            this.popoverReset()
            this.fetchCustomizedtopics(component)
            this.popoverVisible[componentIndex] = !this.popoverVisible[componentIndex]
        },1000),
        resetAddCommonlySelect(){
            this.addCommonlySelect = []
            if(this.popoverCustomized.length > 0){
                this.popoverCustomized.map(item => {
                    this.addCommonlySelect.push(item.TopicName)
                })
            }
        },
        popoverReset(all){
            if(!this.popoverTrigger) return
            if(all){
                this.popoverTrigger = !this.popoverTrigger
            }
            this.popoverVisible.map((item, index) => {
                if(this.popoverVisible[index]){
                    this.$set(this.popoverVisible, index, false)
                }
            })
        },
        addCommonlyComponent(componentId, componentIndex){
            if(componentId && this.activedTopic && this.activedTopic.type === 'fixed'){
                const APIs = []
                this.addCommonlySelect.map((item) => {
                    if(item == this.activedTopic.name) return
                    if(item === 'defaultFav'){
                        const {id} = this.topicDefaultObj
                        APIs.push(this.$axios.post('/api_server/manager/topcomp/customized', {
                            admin_topic_id : this.activedTopic.id,
                            component_id : componentId,
                            topic_id : id
                        }))
                    }

                    const initTopic = this.popoverCustomized.find(topic=> topic.TopicName === item)
                    if(typeof initTopic === "object") return

                    const newTopic = this.topicCustomizedArray.find(topic=> topic.name === item)
                    if(typeof newTopic !== "object") return
                    APIs.push(this.$axios.post('/api_server/manager/topcomp/customized', {
                        admin_topic_id : this.activedTopic.id,
                        component_id : componentId,
                        topic_id : newTopic.id
                    }))
                })
                if(APIs.length > 0){
                    this.pageLoading = true
                    this.$axios.all(APIs).then((response) => {
                        this.$message({
                            type: 'success',
                            message: `${this.$t("SuccessAdd")}`
                        })
                    }).catch(error => { 
                        this.$message.error(error) 
                    }).finally(r => { 
                        this.pageLoading = false
                        this.popoverVisible[componentIndex] = false
                    })
                }
            }
        },
        removeCustomComponent(componentItem){
            if(componentItem && this.activedTopic && this.activedTopic.type === 'customized'){
                this.pageLoading = true
                this.$axios.delete(`/api_server/manager/topcomp/customized/${this.activedTopic.id}/topic/${componentItem.topic_id}/component/${componentItem.id}`).then(success => {
                    const message = this.$t("SuccessRemove") + ((this.activedTopic.id === this.topicDefaultObj.id)? this.$t("CommonlyComponent"): this.$t("CustomizedTopic"))
                    this.$message({ type: 'success', message })
                    this.routerUpdate(this.activedTopic)
                }).catch(error => { 
                    this.$message.error(error.response)
                    this.pageLoading = false
                })
            }
        },
        setIntervalFunction() {
            const intervalCallback = (dataset) => {
                const newPromiseArr = []
                this.displayComponent.map((componentItem, index) => {
                    let promiseArr = []
                    if(componentItem.index === dataset.index) {
                        promiseArr = this.fetchOneComponentAPI(dataset, dataset.update_loop)
                    }else{
                        componentItem.request_list.map((request) => {
                            promiseArr.push(new Promise(resolve => resolve()))
                        })
                    }
                    newPromiseArr.push(promiseArr)
                })
                // console.log(newPromiseArr);
                this.promise = Promise.all(newPromiseArr)
            }
            this.displayComponent.map((dataset2) => {
                if(this.intervalObj[dataset2.index]) return
                const milliSecond = dataset2.update_loop
                if(milliSecond && milliSecond > 0){
                    this.intervalObj[dataset2.index] = setInterval(() => {
                        intervalCallback(dataset2)
                    }, milliSecond)
                }
            })
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
            .groupName{
                display: inline-block;
                color: darken($borderColor, 30);
                font-size: 0.1rem;
                // border-bottom: 1px solid transparent;
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
