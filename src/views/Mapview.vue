<template>
    <el-container id="mapViewContainer">
        <MapAside 
            :groups-display="displayGroup"
        />
        <MapboxContainer 
            :history-chart-index="historyChartIndex"
        />
        <HistoryChart/>
    </el-container>
</template>
<script>
import { cloneDeep } from 'lodash'
import { mapState } from 'vuex'

import { topicComponentList, topicContent } from '@/assets/datas/topicList.js'
import MapAside from '@/components/mapview/MapAside'
import MapboxContainer from '@/components/mapview/MapContainer'
import HistoryChart from '@/components/mapview/HistoryChart'

export default {
    components: { MapAside, MapboxContainer, HistoryChart },
    data(){
        return {
            displayComponent: [],
            displayGroup: [],

            historyChartIndex: [],
        }
    },
    created() {
        this.initData()
    },
    computed: {...mapState(['activedTopic'])},
    watch: {
        activedTopic: {
            deep: true,
            immediate: false,
            handler: function(newObj, oldObj){
                this.initData()
            }
        }
    },
    methods: {
        initData(){
            if(!this.activedTopic || Object.keys(this.activedTopic).length === 0) return
            const displayTopic = topicComponentList.find(topic => topic.index === this.activedTopic.index)
            const {componentindex} = this.$route.query

            this.displayComponent = []
            if(displayTopic && displayTopic.components){
                this.displayComponent = displayTopic.components
                this.displayGroup = displayTopic.groups
            }
            const topicToggleData = []
            const historyMapIndex = []
            if(componentindex && this.displayComponent && this.displayComponent.length > 0){
                this.displayComponent.map(dataset => {
                    topicToggleData.push({
                        ...dataset,
                        dataToggle: (dataset.index == componentindex)
                    })
                    if(dataset.map_config && dataset.map_config.length > 0){
                        dataset.map_config.map(data => {
                            const dataItemConfig = data.raster? data.raster: data.geoJson
                            if(dataset.calculation_config){
                                this.historyChartIndex.push(dataset.index)
                                historyMapIndex.push(dataItemConfig.index)
                            }
                        })
                    }
                })
            }
            this.$store.commit('updateTopicContent', topicToggleData)
            this.$store.commit('updateHistoryLineData', historyMapIndex)
        }
    }
}
</script>
<style lang="scss">
@import "~@/assets/scss/_color.scss";
@import "~@/assets/scss/basic.scss";
    #mapViewContainer{
        position: relative;
        height: calc(100vh - #{$appContainerHeaderHeight});
    }
</style>
