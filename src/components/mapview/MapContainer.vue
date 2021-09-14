<template>
    <el-main 
        id="mapboxContainer" 
        v-loading="mapLoadong"
        element-loading-background="#050709"
    >
        <div id="mapboxBox" class="history"/>
        <!-- <button id="fitTaipeiBtn" @click="fitTaipei">Fit to Taipei</button> -->
    </el-main>
</template>
<script>
import { cloneDeep } from 'lodash'
import { mapState } from 'vuex'

import mapboxgl from 'mapbox-gl'
import MapboxTraffic from '@mapbox/mapbox-gl-traffic'
import 'mapbox-gl/dist/mapbox-gl.css'
const MAPBOXTOKEN = process.env.VUE_APP_MAPBOXTOKEN
const MapboxLanguage = require('@/assets/js/mapbox-gl-language.js')
import * as turf from '@turf/turf' 
// import '@/assets/js/threebox.js'

// import { lngLatConvertedBBox, getClickedInfo } from '@/assets/js/map_method.js'
import * as mapLayerStyle from '@/assets/datas/mapConfig.js'
import mapStyle from '@/assets/datas/mapStyle.js'

import { BasicColors } from '@/assets/datas/appConfig.js'
import { hexAToRGB } from '@/assets/js/commom.js'

import MapboxPopup from '@/components/mapbox/MapboxPopup.vue'

//SVG is not supported in mapbox
const bikePng = require('@/assets/images/mapbox/bike.png')
const busPng = require('@/assets/images/mapbox/bus.png')
const metroPng = require('@/assets/images/mapbox/metro.png')
const cross1Png = require('@/assets/images/mapbox/cross_1.png')
// const cross2Png = require('@/assets/images/mapbox/cross_2.png')
const triangle1Png = require('@/assets/images/mapbox/triangle_1.png')
const triangle2Png = require('@/assets/images/mapbox/triangle_2.png')

export default {
    data(){
        return {
            publicPath: process.env.BASE_URL,
            connectServer: true,

            MapBoxObject: null,
            MapboxTraffic: null,

            mapLoadong: true,
            mapDisplayLayers: [],        
            mapInitFetchLayers: {},
            mapRepeatingLayers: {},

            interactiveLayers: [],
            selectFeatureIndex: 0,
            clickFeatureDatas: [],

            hoveredFeature: {},
 	        intervalMapObj: {},
            animateToggle: false,
            frameCounter: 0,
            frameRate: 1800, //30*60sec

            intervalComponentFunctions: [],
            animationId: 0
        } 
    },
    mounted() {
        this.initMapBox()
    },
    destroyed() {
        //Clean up and release all internal resources associated with this map. This includes DOM elements, event bindings, web workers, and WebGL resources.
        this.MapBoxObject.remove()
        //Clear all intesal function
        Object.values(this.intervalMapObj).map(intervalInstance => {
            clearInterval(intervalInstance)
        })
        this.frameCounter = this.frameRate
    },
    props: {
        historyChartIndex:{
            type: Array ,
            default: () =>{ return [] }
        }
    },
    computed: {
        ...mapState(['topicToggleDataset', 'historyLineData', 'historyFilter']),
        nowFeatureData() {
            let obj = this.clickFeatureDatas[this.selectFeatureIndex]
            if(!obj) obj = this.clickFeatureDatas[0]
            return obj
        },
        propertyObj() {
            const obj = {}
            this.topicToggleDataset.map(component => {
                if(component.map_config && component.map_config.length > 0){
                    component.map_config.map(data => {
                        Object.keys(data).map(key => {
                            if(!data[key].property) return
                            obj[data[key].index] = data[key].property
                        })
                    })
                }
            })
            return obj
        }
    },
    watch: {
        topicToggleDataset: {
            handler: function(newObj){
                if(newObj && newObj.length > 0){
                    this.mapRepeatingLayers = {}
                    this.fetchDataToMap(newObj)
                }
            },
            deep: true,
            immediate: false
        },
        historyLineData: {
            handler: function(newArray){
                if(newArray && newArray.length > 0){
                    this.historyMapFilter()
                }
            },
            deep: true,
            immediate: false
        },
        historyFilter: {
            handler: function(newObj){
                this.historyMapFilter()
            },
            deep: true,
            immediate: false
        }
    },
    methods: {
        initMapBox() {
            mapboxgl.accessToken = MAPBOXTOKEN
            this.mapLoadong = true
            this.MapBoxObject = new mapboxgl.Map({
                antialias: true,
                container: "mapboxBox",
                style: mapStyle,
                // pitch: 45, //视野倾斜，0-60
                // bearing: -17, //视野旋转角度
                center: [121.536609, 25.044808],
                maxBounds: [
                    [121.3870596781498, 24.95733863075891], // Southwest coordinates
                    [121.6998231749096, 25.21179993640203] // Northeast coordinates
                ],
                zoom: 12.5, // Less than 15 GetFeatureInfo does not work
                minZoom: 11,
                maxZoom: 20
            })

            // Add zoom and rotation controls to the map.
            this.MapBoxObject.addControl( new mapboxgl.NavigationControl() )

            // Add language controls to the map.
            if (mapboxgl.getRTLTextPluginStatus() !== 'loaded') {
                mapboxgl.setRTLTextPlugin('/js/mapbox-gl-rtl-text.js') 
            }
            this.MapBoxObject.addControl(new MapboxLanguage({
                defaultLanguage: 'zh-Hant'
            }))

            // disable map zoom when using scroll
            // this.MapBoxObject.scrollZoom.disable();

            this.MapBoxObject.on("load", () => {
                this.mapLoadLayer()
            })
        },
        mapLoadLayer() {
            // MapBox 3D buildings from geoserver
            if(this.connectServer){
                this.addTaipeiBuildLayer()
            }else{
                this.MapBoxObject.addLayer(mapLayerStyle.buildingsIn3D)
            }
            this.addTaipeiTownLayer()

            if(this.topicToggleDataset && this.topicToggleDataset.length > 0){
                this.fetchDataToMap(this.topicToggleDataset)
            }

            this.MapBoxObject.on("click", (event) => {
                this.MapBoxObject.getCanvas().style.cursor = 'pointer'
                this.clickFeatureDatas = this.MapBoxObject.queryRenderedFeatures(event.point, { layers: this.mapDisplayLayers })
                if(this.clickFeatureDatas.length > 0){
                    this.mapboxPopupGetInfo(event)
                }
                // console.log( this.MapBoxObject.getBounds())
                // console.log( this.MapBoxObject.getZoom())
                // console.log(JSON.stringify(event.lngLat.wrap()))
            })
            // this.MapBoxObject.on('zoom', debounce(({ originalEvent: { wheelDelta } }) => {
            //     const zoomlevel = this.MapBoxObject.getZoom()
            //     this.animateToggle =  zoomlevel <= 13.5
            // }, 100))
        },
        fetchDataToMap(themeObj){
            if(themeObj && themeObj.length > 0){
                themeObj.map(themeItem => {
                    // toggle layer visibility by changing the layout object's visibility property
                    const dataItemConfig = themeItem.map_config
                    const themeToggle = themeItem.dataToggle
                    if(dataItemConfig && typeof dataItemConfig === 'object' && dataItemConfig.length > 0){
                        dataItemConfig.map(dataItem => {
                            if(dataItem.mapBox && dataItem.mapBox.mapBoxTrafficCtrl){
                                if(!this.MapboxTraffic){
                                    // Add MapboxTraffic ; https://github.com/mapbox/mapbox-gl-traffic
                                    this.MapboxTraffic = new MapboxTraffic()
                                    this.MapBoxObject.addControl(this.MapboxTraffic)
                                }else if(this.MapboxTraffic.options.showTraffic !== themeToggle){
                                    // The initial judgment data switch decides whether to trigger Traffic
                                    this.MapboxTraffic.toggleTraffic()
                                }
                            }else if(dataItem.raster || dataItem.geoJson){
                                const dataItemConfig = dataItem.raster? dataItem.raster: dataItem.geoJson
                                if(!dataItemConfig) return
                                const mapLayerIndex = dataItemConfig.index
                                if(!mapLayerIndex) return
                                this.updateMapBoxSource(dataItem, themeItem.dataToggle, mapLayerIndex)
                            }
                        })
                    }
                })
            }
        },
        mapboxPopupGetInfo(event){
            const clickedFeatureLayer = this.clickFeatureDatas[0]
            this.mapboxPopupSetDisplay(event)
            if(clickedFeatureLayer){
                this.targetEffectDisplay(clickedFeatureLayer)
                if(clickedFeatureLayer.properties){
                    this.toggleInteractiveLayer(clickedFeatureLayer.properties)
                }
            }
        },
        mapboxPopupSetDisplay(event){
            const clickedFeatureLayer = this.clickFeatureDatas[0]
            let clickedLayerId = clickedFeatureLayer.layer.id
            if(['buslive-route', 'buslive-point'].includes(clickedLayerId)) clickedLayerId = 'buslive'

            new mapboxgl.Popup()
            .setLngLat(event.lngLat)
            .setHTML('<div id="vue-popup-content"></div>')
            .addTo(this.MapBoxObject)

            new MapboxPopup({
                propsData: { 
                    title: this.mapInitFetchLayers[clickedLayerId]['title'],
                    featureArr: this.clickFeatureDatas,
                    setNowSelectPage: this.setNowSelectPage,
                    devProperty: this.propertyObj[clickedLayerId]
                },
            }).$mount('#vue-popup-content')
        },
        targetEffectDisplay(featureLayer){
            if(featureLayer.id){
                if(Object.keys(this.hoveredFeature).length > 0){
                    // cancel previous hover feature state
                    this.MapBoxObject.setFeatureState(
                        { id: this.hoveredFeature.id, source: this.hoveredFeature.source, sourceLayer: this.hoveredFeature.sourceLayer},
                        { hover: false }
                    )
                    this.hoveredFeature = {}
                }
                // set hover feature state
                this.MapBoxObject.setFeatureState(
                    { id: featureLayer.id, source: featureLayer.source, sourceLayer: featureLayer.sourceLayer},
                    { hover: true }
                )
                this.hoveredFeature = {
                    id: featureLayer.id,
                    source: featureLayer.source,
                    sourceLayer: featureLayer.sourceLayer,
                }
            }
        },
        toggleInteractiveLayer(featureProperties){
            const clickedFeatureLayer = this.clickFeatureDatas[0]
            const clickedLayerId = clickedFeatureLayer.layer.id
            this.interactiveLayers.map(item=>{
                if(clickedLayerId === item.id){
                    const triggerLayerIndex = item.target
                    const triggerTrigger = featureProperties[item.trigger]
                    if(this.MapBoxObject.getLayer(triggerLayerIndex) && item.resultset){
                        const filter = ['any']
                        item.resultset.map(items => {
                            filter.push(['==', items, triggerTrigger])
                        })
                        this.MapBoxObject.setFilter(triggerLayerIndex, ['any', filter])
                        this.MapBoxObject.setFilter(`${triggerLayerIndex}-affected`, ['any', filter])
                        this.MapBoxObject.setLayoutProperty(triggerLayerIndex, 'visibility', 'visible')
                        this.MapBoxObject.setLayoutProperty(`${triggerLayerIndex}-affected`, 'visibility', 'visible')
                    }
                }
            })
        },
        showHideTargetMaplayer(){
            Object.keys(this.mapInitFetchLayers).map(dataMapIndex => {
                const dataMapTarget = this.mapInitFetchLayers[dataMapIndex]
                const toggleStatus = this.mapRepeatingLayers[dataMapIndex]
                const showMap = (toggleStatus && toggleStatus.length > 0)? toggleStatus.includes(1): dataMapTarget.toggle === 1

                this.MapBoxObject.setLayoutProperty(dataMapIndex, 'visibility', (showMap)?'visible': 'none')
                if(dataMapTarget.symbol === 'heatmap'){
                    this.MapBoxObject.setLayoutProperty(`${dataMapIndex}-heat`, 'visibility', (showMap)? 'visible': 'none')
                }
                if(dataMapTarget.affected && !showMap){
                    this.MapBoxObject.setLayoutProperty(`${dataMapIndex}-affected`, 'visibility', 'none')
                }
            })
        },
        updateMapBoxSource(dataItem, themeToggle, mapLayerIndex){      
            const dataItemConfig = dataItem.raster? dataItem.raster: dataItem.geoJson
            const MapToggle = themeToggle? 1: 0
            if(dataItemConfig.interval > 0){
                this.createRealtimeLayer(dataItem, themeToggle)
                if(!themeToggle){
                    this.frameCounter = this.frameRate
                }
            }else if(this.mapDisplayLayers.includes(mapLayerIndex)){
                this.mapRepeatingLayers[mapLayerIndex] = [MapToggle]
                this.showHideTargetMaplayer()
            }else{
                this.mapInitFetchLayers = {
                    ...this.mapInitFetchLayers,
                    [mapLayerIndex]:{
                        symbol: dataItemConfig.symbol,
                        title: (dataItemConfig.title)? dataItemConfig.title: mapLayerIndex,
                        affected: (dataItemConfig.affected)? dataItemConfig.affected: null,
                        toggle: MapToggle
                    }
                }
                this.mapLoadong = true
                if(dataItem.raster){
                    //A source containing vector
                    this.MapBoxObject.addSource(`${mapLayerIndex}-source`, {
                        type: "vector",
                        scheme: "tms",
                        tiles: [ `${location.origin}/geo_server/gwc/service/tms/1.0.0/taipei_vioc:${mapLayerIndex}@EPSG:900913@pbf/{z}/{x}/{y}.pbf`],
                    })
                    this.createMapBoxLayer(themeToggle, mapLayerIndex, dataItem)
                    this.mapDisplayLayers.push(mapLayerIndex)
                }else if(dataItem.geoJson){
                    //A source containing GeoJSON
                    
                    const apiURL = (dataItem.geoJson.url)? `/api_server${dataItem.geoJson.url}`: `../../datas/${dataItem.geoJson.index}.geojson`
                    const apiMethod = (dataItem.geoJson.url)? 'post': 'get'
                    this.$axios({
                        method: apiMethod,
                        url: apiURL,
                    }).then(response => {
                        if(response.status === 200 && response.data){
                            this.MapBoxObject.addSource(`${mapLayerIndex}-source`, {
                                type: "geojson",
                                data: response.data
                            })
                            this.createMapBoxLayer(themeToggle, mapLayerIndex, dataItem)
                            this.mapDisplayLayers.push(mapLayerIndex)
                        }
                    }).catch(error => {
                        console.log(error)
                        this.mapLoadong = false
                    })
                }
            }
        },
        createMapBoxLayer(dataToggle, mapLayerIndex, dataItem){
            const dataItemConfig = dataItem.raster? dataItem.raster: dataItem.geoJson
            const mapIconColor = (dataItemConfig && dataItemConfig.color)? dataItemConfig.color: BasicColors[0]
            let symbolType = dataItemConfig.symbol
            let symbolPaint = {}
            let symbolLayout = {}
            if(symbolType=== 'circle'){
                symbolPaint = {...mapLayerStyle.circleCommonStyle, 'circle-color': mapIconColor}     
            }else if(symbolType=== 'circleBig'){
                symbolType = 'circle'
                symbolPaint = {...mapLayerStyle.circleBigStyle, 'circle-color': mapIconColor}
            }else if(symbolType=== 'heatmap'){
                symbolType = 'circle'
                symbolPaint = { ...mapLayerStyle.circleHeatmapStyle, 'circle-color': mapIconColor}
            }else if(symbolType=== 'line'){
                symbolPaint = {...mapLayerStyle.lineCommonStyle,'line-color': mapIconColor}     
            }else if(symbolType=== 'lineWide'){
                symbolType = 'line'
                symbolPaint = {...mapLayerStyle.lineWideStyle,'line-color': mapIconColor}     
            }else if(symbolType=== 'lineThin'){
                symbolType = 'line'
                symbolPaint = {...mapLayerStyle.lineThinStyle,'line-color': mapIconColor}     
            }else if(symbolType=== 'dasharray'){
                symbolType = 'line'
                symbolPaint = { ...mapLayerStyle.lineWideStyle, 'line-dasharray': [2, 2], 'line-color': mapIconColor}
            }else if(symbolType=== 'fill'){
                symbolPaint = { ...mapLayerStyle.fillCommonStyle, 'fill-color': mapIconColor}
            }else if(symbolType=== 'fill-extrusion'){
            }else{
                if(symbolType === 'triangle1' || symbolType=== 'triangle2'){
                    symbolLayout = {'icon-image': dataItemConfig.symbol}
                    if(symbolType=== 'triangle1'){
                        if(!this.MapBoxObject.hasImage('triangle1')){
                            this.MapBoxObject.loadImage(triangle1Png,(error, image) => {
                                if (error) throw error;
                                this.MapBoxObject.addImage('triangle1', image);
                            })   
                        }
                        symbolLayout = {...symbolLayout, ...mapLayerStyle.symbolShapeSmallStyle}
                    }else if(symbolType=== 'triangle2'){
                        if(!this.MapBoxObject.hasImage('triangle2')){
                            this.MapBoxObject.loadImage(triangle2Png,(error, image) => {
                                if (error) throw error;
                                this.MapBoxObject.addImage('triangle2', image);
                            })   
                        }
                        symbolLayout = {...symbolLayout, ...mapLayerStyle.symbolShapeBigStyle}
                    }
                }else if(symbolType=== 'bike'|| symbolType=== 'cross1'){
                    if(symbolType=== 'bike' && !this.MapBoxObject.hasImage('bike')){
                        this.MapBoxObject.loadImage(bikePng,(error, image) => {
                            if (error) throw error;
                            this.MapBoxObject.addImage('bike', image);
                        })
                    }else if(symbolType=== 'cross1' && !this.MapBoxObject.hasImage('cross1')){
                        this.MapBoxObject.loadImage(cross1Png,(error, image) => {
                            if (error) throw error;
                            this.MapBoxObject.addImage('cross1', image);
                        })
                    }
                    symbolLayout = { ...mapLayerStyle.symbolIconSmallStyle, 'icon-image': dataItemConfig.symbol}
                }else if(symbolType=== 'bus'){
                    if(!this.MapBoxObject.hasImage('bus1')){
                        this.MapBoxObject.loadImage(busPng,(error, image) => {
                            if (error) throw error;
                            this.MapBoxObject.addImage('bus1', image);
                        })
                    }
                    symbolLayout = {...mapLayerStyle.symbolIconMiniStyle, 'icon-image': 'bus1'}
                }else if(symbolType=== 'metro'){
                    if(!this.MapBoxObject.hasImage('metro')){
                        this.MapBoxObject.loadImage(metroPng,(error, image) => {
                            if (error) throw error;
                            this.MapBoxObject.addImage('metro', image);
                        })
                    }
                    symbolLayout = { ...mapLayerStyle.symbolIconBigStyle, 'icon-image': symbolType } 
                }else if(symbolType=== 'symbol'){
                    symbolLayout = { ...mapLayerStyle.symbolHaloStyle, 'icon-image': symbolType + '-15'}
                    symbolPaint = { "text-halo-width": 1, "text-halo-color": mapIconColor }
                }
                symbolType = 'symbol'
            }
            
            if(dataItemConfig.paint){
                if(typeof dataItemConfig.paint === "string"){
                    dataItemConfig.paint = JSON.parse(dataItemConfig.paint)
                }
                symbolPaint = {
                    ...symbolPaint,
                    ...dataItemConfig.paint
                }
            }

            const layerBeforeId = this.getDataLayerBeforeId()
            if(dataItemConfig.affected){
                const rgb = hexAToRGB(mapIconColor)
                this.MapBoxObject.addLayer({
                    id: `${mapLayerIndex}-affected`,
                    type: 'fill',
                    source: `${dataItemConfig.index}-source`,
                    layout: {
                        ...symbolLayout,
                        'visibility': 'none'
                    },
                    paint: {
                        'fill-color': `rgba(${rgb},0.1)`,
                        'fill-outline-color': mapIconColor,
                    }
                }, layerBeforeId)
            }
            const mapLayerConfig = {
                id: mapLayerIndex,
                type: symbolType,
                source: `${dataItemConfig.index}-source`,
                layout: {
                    ...symbolLayout,
                    'visibility': (dataToggle)? 'visible': 'none'
                },
                paint: symbolPaint
            }
            if(dataItem.raster){
                mapLayerConfig['source-layer'] = dataItemConfig.index
            }
            this.MapBoxObject.addLayer(mapLayerConfig, layerBeforeId)
            //https://docs.mapbox.com/mapbox-gl-js/example/heatmap-layer/
            if(dataItemConfig.symbol === 'heatmap'){
                this.MapBoxObject.addLayer({
                    ...mapLayerConfig,
                    id: `${mapLayerIndex}-heat`,
                    type: 'heatmap',
                    paint: mapLayerStyle.heatmapCommonStyle
                })
            }
            if(dataItemConfig.interactive){
                const interactiveLayer = {
                    ...dataItemConfig.interactive,
                    id: dataItemConfig.index
                }
                this.interactiveLayers.push(interactiveLayer)
            }
            this.mapLoadong = false
        },
        createRealtimeLayer(dataItem, dataToggle){
            if(!dataItem) return
            const dataItemConfig = dataItem.raster? dataItem.raster: dataItem.geoJson
            const realtimeItemIndex = dataItemConfig.index
            clearInterval(this.intervalMapObj[realtimeItemIndex])
            if(dataToggle){
                const interval = dataItemConfig.interval * 1000
                const postInterval = (interval < this.frameRate)? this.frameRate: interval
                this.intervalMapObj[realtimeItemIndex] = setInterval(() => {
                    this.realtimeDataToMap(dataItemConfig, dataToggle)
                }, postInterval)
                this.realtimeDataToMap(dataItemConfig, dataToggle)
            }
            if(realtimeItemIndex === 'buslive' && (this.MapBoxObject.getSource(`${realtimeItemIndex}-route`) || this.MapBoxObject.getSource(`${realtimeItemIndex}-point`))){
                this.MapBoxObject.setLayoutProperty(`${realtimeItemIndex}-route`, 'visibility', (dataToggle)? 'visible': 'none')
                this.MapBoxObject.setLayoutProperty(`${realtimeItemIndex}-point`, 'visibility', (dataToggle)? 'visible': 'none')
            }else if(this.MapBoxObject.getSource(realtimeItemIndex)){
                this.MapBoxObject.setLayoutProperty(`${realtimeItemIndex}`, 'visibility', (dataToggle)? 'visible': 'none')
            }
        },
        addTaipeiBuildLayer(){
            //Taipei 3D buildings
            this.MapBoxObject.addSource('TaipeiBuild', {
                type: "vector",
                scheme: "tms",
                tiles: [ `${location.origin}/geo_server/gwc/service/tms/1.0.0/taipei_vioc:tp_building_height@EPSG:900913@pbf/{z}/{x}/{y}.pbf`]
            }).addLayer(mapLayerStyle.taipeiBuilding)
        },
        addTaipeiTownLayer(){
             //Unstable Geoserver source - taipei_village & tp_village
            this.$api_method.get(`../../datas/taipei_town.geojson`).then((response) => {
                this.MapBoxObject.addSource('taipei_town', { type: 'geojson', data: response }).addLayer(mapLayerStyle.taipeiTown)
            })
            this.$api_method.get(`../../datas/taipei_village.geojson`).then((response) => {
                this.MapBoxObject.addSource('taipei_village', { type: 'geojson', data: response }).addLayer(mapLayerStyle.taipeiVillage)
            })
        },
        fitTaipei(){
            this.MapBoxObject.fitBounds([
                [121.6292953491211,24.978589201164247],
                [121.4542007446289, 25.21363862583486]
            ]);
            // this.MapBoxObject.flyTo({
            //     center: [121.56631545908374, 25.038401440665552],
            //     zoom: 13,
            //     speed: 0.2,
            //     curve: 2
            // })
        },
        getTargetColor(componentColorArray) {
            const targetColor =  (componentColorArray)? componentColorArray: BasicColors[0]
            return (targetColor)? targetColor: targetColor[0]
        },
        getDataLayerBeforeId(){
            // Add the layer before the existing `3d-buildings` | `hessen` layer
            const target = (this.connectServer)? 'hessen': '3d-buildings'
            const targetLayer = this.MapBoxObject.getStyle().layers.find(item => (item.id === target))
            return (targetLayer)? target: null
        },
        realtimeDataToMap(realtimeConfig){
            if(!this.MapBoxObject) return
            // Api request parameter
            const formData = (realtimeConfig.form_data)? realtimeConfig.form_data: {}
            if(realtimeConfig.index === 'buslive'){
                const {lng, lat} = this.MapBoxObject.getCenter()
                const Bounds = this.MapBoxObject.getBounds()
                const options = {units: 'kilometers'}
                const distance = turf.distance([lng, lat], [Bounds._sw.lng, Bounds._sw.lat], options)

                formData.lat = lat
                formData.lon = lng
                formData.distance = (distance > 7)? 7000: ((distance*1000).toFixed())
                cancelAnimationFrame(this.animationId)
            }
            this.$axios.post(`/api_server${realtimeConfig.url}`, this.$postFormData(formData)).then(response => {
                if(response.status === 200){
                    const responseData = response.data
                    if(realtimeConfig.index === 'buslive'){
                        responseData.features = responseData.features.filter(line => {
                            const lineDistance = turf.length(line, {units: 'kilometers'})
                            return lineDistance < 5
                        })
                        if(this.MapBoxObject.getSource(`${realtimeConfig.index}-route`) || this.MapBoxObject.getSource(`${realtimeConfig.index}-point`)){
                            // Update
                            this.MapBoxObject.getSource(`${realtimeConfig.index}-route`).setData(responseData);
                            this.CreateAnimatePoint(realtimeConfig, responseData, false)
                        }else{
                            // Create 
                            this.mapDisplayLayers.push(`${realtimeConfig.index}-route`)
                            this.mapDisplayLayers.push(`${realtimeConfig.index}-point`)

                            this.MapBoxObject.addSource(`${realtimeConfig.index}-route`, { type: 'geojson', data: responseData })
                            this.MapBoxObject.addLayer({
                                id: `${realtimeConfig.index}-route`,
                                source: `${realtimeConfig.index}-route`,
                                type: 'line',
                                paint: {
                                    'line-width': 2,
                                    'line-color': 'rgba(176, 97,10,0.3)'
                                }
                            })
                            this.CreateAnimatePoint(realtimeConfig, responseData, true)
                        }
                    }else{
                        if(this.MapBoxObject.getSource(realtimeConfig.index)){
                            // Update
                            this.MapBoxObject.getSource(realtimeConfig.index).setData(responseData);
                        }else{
                            // Create 
                            this.mapDisplayLayers.push(realtimeConfig.index)
                            this.MapBoxObject.addSource(realtimeConfig.index, { type: 'geojson', data: responseData })
                            if(!this.MapBoxObject.hasImage('metro')){
                                this.MapBoxObject.loadImage(metroPng,(error, image) => {
                                    if (error) throw error;
                                    if(!this.MapBoxObject.hasImage('metro')) {
                                        this.MapBoxObject.addImage('metro', image);
                                    }
                                })
                            }
                            this.MapBoxObject.addLayer({
                                id: realtimeConfig.index,
                                source: realtimeConfig.index,
                                type: 'symbol',
                                paint: {
                                    "text-halo-width": 1,
                                    ...realtimeConfig.paint
                                },
                                layout: {
                                    ...mapLayerStyle.symbolIconBigStyle,
                                    'icon-image': realtimeConfig.symbol
                                }
                            })
                        }
                    }
                }
            }).catch(error => {
                console.log(error)
            })
        },
        CreateAnimatePoint(realtimeConfig, responseData, create){
            if(responseData.features.length > 0){
                const animateArray = responseData.features.map((item, index)=>{
                    // Takes a GeoJSON and measures its length
                    const lineDistance = turf.length(item)
                    if(lineDistance === 0){
                        return item
                    }else{
                        let arc = [];
                        // Draw an arc between the `origin` & `destination` of the two points
                        for (let i = 0; i < lineDistance; i += lineDistance / this.frameRate) {
                            const segment = turf.along(item, i);
                            arc.push(segment.geometry.coordinates);
                        }
                        // Update the route with calculated arc coordinates
                        item.geometry.coordinates = arc
                        return item
                    }
                })
                this.frameCounter = 0
                const animate = () => {
                    if(this.frameCounter === this.frameRate) return

                    // Update point geometry to a new position based on counter denoting the index to access the arc
                    let frameObj = {
                        type: "FeatureCollection",
                        features: []
                    }
                    animateArray.map((item, index)=>{
                        const coordinate = (item.geometry.coordinates.length > 2)? item.geometry.coordinates[this.frameCounter]: item.geometry.coordinates[0]
                        frameObj.features[index] = {
                            type: "Feature",
                            properties: item.properties,
                            geometry: {
                                type: "Point",
                                coordinates: coordinate
                            }
                        }
                    })
                    if(create && this.frameCounter === 0){
                        this.MapBoxObject.addSource(`${realtimeConfig.index}-point`, { type: 'geojson', data: frameObj })
                        this.MapBoxObject.addLayer({
                            id: `${realtimeConfig.index}-point`,
                            source: `${realtimeConfig.index}-point`,
                            type: 'circle',
                            paint : {
                                ...mapLayerStyle.animateCircleStyle,
                                'circle-color': 'rgba(234,154,63,0.8)'
                            }
                        })
                    }else{
                        this.MapBoxObject.getSource(`${realtimeConfig.index}-point`).setData(frameObj);
                    }
                    this.frameCounter = this.frameCounter + 1
                    if(this.frameCounter < this.frameRate) {
                        this.animationId = requestAnimationFrame(animate)
                    }
                }
                animate(this.frameCounter)
            }
        },
        setNowSelectPage(currentPage) {
            this.selectFeatureIndex = currentPage - 1
        },
        historyMapFilter(){
            if(this.historyFilter && this.historyFilter.start && this.historyFilter.end){
                const MapBoxObjectProperty = [
                    "any",  
                    ['!', ['has', 'epoch_time']],
                    ["all", ["has", 'epoch_time'], [">=", ['get', 'epoch_time'], this.historyFilter.start],["<=", ['get', 'epoch_time'], this.historyFilter.end]]
                ]
                this.historyLineData.map(historyItem => {
                    this.MapBoxObject.setFilter(historyItem, MapBoxObjectProperty)
                    if(this.MapBoxObject.getLayer(`${historyItem}-heat`)){
                        this.MapBoxObject.setFilter(`${historyItem}-heat`, MapBoxObjectProperty)
                    }
                })
            }
        }
    }
}
</script>