<template>
    <el-container id="mapViewContainer">
        <MapAside 
            :groups-display="targetTopicGroups"
        />
        <MapboxContainer 
            :history-chart-index="historyChartIndex"
        />
        <HistoryChart/>
    </el-container>
</template>
<script>
import { cloneDeep } from 'lodash'

import MapAside from '@/components/mapview/MapAside'
import MapboxContainer from '@/components/mapview/MapContainer'
import HistoryChart from '@/components/mapview/HistoryChart'

import { FetchTagetAllList } from '@/assets/js/api_get'

export default {
    components: { MapAside, MapboxContainer, HistoryChart },
    data(){
        return {
            targetTopicData: {},
            targetTopicGroups : [],
            historyChartIndex: [],
        }
    },
    created() {
        this.initData()
    },
    methods: {
        initData(){
            const {id, type, componentid} = this.$route.query
            if(id && type){
                // FetchTagetAllList(`/api_server/manager/topcomp/${type}/${id}`, this).then(success => {
                //     const targetTopicData = cloneDeep(success)
                //     const historyMapIndex = []
                //     const topicToggleData = []
                //     this.targetTopicGroups = (type === 'fixed')? success.groups: []

                //     if(targetTopicData.components && targetTopicData.components.length > 0){
                //         targetTopicData.components.map(dataset => {
                //             topicToggleData.push({
                //                 ...dataset,
                //                 dataToggle: (dataset.id == componentid)
                //             })
                //             if(dataset.calculation_config){
                //                 this.historyChartIndex.push(dataset.index)
                //             }
                //             if(dataset.map_config && dataset.map_config.length > 0){
                //                 dataset.map_config.map(data => {
                //                     const dataItemConfig = data.raster? data.raster: data.geoJson
                //                     if(dataset.calculation_config){
                //                         historyMapIndex.push(dataItemConfig.index)
                //                     }
                //                 })
                //             }
                //         })
                //     }
                //     this.$store.commit('updateHistoryLineData', historyMapIndex)
                //     this.$store.commit('updateTopicContent', topicToggleData)
                // }).catch(e => {
                //     console.log(e)
                // })
            }
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
