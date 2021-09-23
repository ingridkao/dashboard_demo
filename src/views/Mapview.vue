<template>
    <el-container id="mapViewContainer">
        <MapAside 
            :groups-display="displayGroup"
        />
        <MapboxContainer 
            :history-chart-index="historyChartIndex"
        />
        <HistoryChart
            :topic-toggle-content="topicToggleContent"    
        />
    </el-container>
</template>
<script>
import { mapState } from 'vuex'

import { topicComponentList, topicList } from '@/assets/datas/topicList.js'
import MapAside from '@/components/mapview/MapAside'
import MapboxContainer from '@/components/mapview/MapContainer'
import HistoryChart from '@/components/mapview/HistoryChart'

export default {
    components: { MapAside, MapboxContainer, HistoryChart },
    data(){
        return {
            displayGroup: [],
            historyChartIndex: [],
            topicToggleContent: [],
            routeQuery: null
        }
    },
    created() {
        this.routeQuery = this.$route.query
        const topicItem =  topicList.find(topic => topic.index === this.routeQuery.topicindex)
        this.$store.commit('updateActivedTopic', topicItem)
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
            const displayTopic = topicComponentList.find(topic => topic.index === this.activedTopic.index)
            const displayComponent = (displayTopic && displayTopic.components)? displayTopic.components: []
            this.displayGroup = (displayTopic && displayTopic.groups)? displayTopic.groups: []

            this.topicToggleContent = []
            const historyMapIndex = []
            if(this.routeQuery.componentindex && displayComponent && displayComponent.length > 0){
                displayComponent.map(dataset => {
                    this.topicToggleContent.push({
                        ...dataset,
                        dataToggle: (dataset.index == this.routeQuery.componentindex)
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
            this.$store.commit('updateTopicContent', this.topicToggleContent)
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
