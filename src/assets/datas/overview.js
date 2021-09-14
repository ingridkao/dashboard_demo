const topicListData = [
    {
        "index": "sentiment",
        id: 1,
        name: "民情熱議",
        groups: ['近期熱議', '民眾陳情'],
        components: [
            {
                "index": 'hotnews',
                name: '新聞熱議關鍵字',
                "group_index": 0,
                source_from: '新聞知識系統',
                sample_data: '2021-01-01T00:00:00+08:00',
                dashboard_show: true,
                overview_display: 30,
                request_list: [
                    {
                        "type": 'Keyword',
                        path:'/sentiment/component/hotnews',
                        form_data: { 
                            column: 'news_count'
                        }
                    }
                ]
            },
            {
                "index": 'councillor',
                name: '議員索資案件(本週)',
                "group_index": 0,
                source_from: '議員索資資料庫',
                sample_data: '樣本數據',
                overview_display: 70,
                "calculation_config":{"label":"議員索資案件"},
                request_list: [
                    {
                        type: 'CountChart',
                        path:'/sentiment/component/councillor',
                        color: ["#26d5d7", "#7EE4D3", "#219A86", "#A5ECE0", "#166759"],
                        form_data: {
                            column: '所屬機關',
                            start: "2020-12-25T00:00:00+08:00",
                            end: "2020-12-31T23:59:59+08:00"
                        },
                        config:{
                            display: '當週累積件數',
                            show_top: true 
                        }
                    }
                ]
            },
            {
                "index": 'camera',
                name: '監視器影像',
                "group_index": 0,
                source_from: '警察局',
                update_loop: 0,
                request_list: [
                    {
                        "type": 'MapDisplay',
                        path: '/traffic/component/cameraamount',
                        config: {
                            mapLabels: [
                                {
                                    select_array: '監視器位置',
                                    "symbol": 'cross1',
                                    "unit": '處'
                                }
                            ]   
                        }
                    }
                ],
                map_config: [
                    {
                        "raster":{
                            "index": 'patrol_camera_hls',
                            "title": '監視器位置',
                            "symbol": 'cross1',
                            "property": ['攝影機編號', '分局', '派出所', '攝向', 'hls']
                        }
                    }
                ]
            },
            {
                "index": 'hello_taipei',
                name: '1999話務案件(本週)',
                "group_index": 1,
                source_from: '1999話務系統',
                sample_data: '',
                overview_display: 40,
                request_list: [
                    {
                        type: 'CountPie',
                        config:{
                            center: {
                                "title": '當週累積件數'
                            },
                            show_top10: true 
                        },
                        path:'/sentiment/component/voicesystem',
                        form_data:{
                            column: '局處',
                            start: "2020-12-25T00:00:00+08:00",
                            end: "2020-12-31T23:59:59+08:00"
                        }
                    }
                ]
            },
            {
                "index": 'circular',
                name: '單一陳情系統案件(本週)',
                "group_index": 1,
                source_from: 'HelloTaipei陳情系統',
                sample_data: '',
                overview_display: 60,
                calculation_config:{"label":"單一陳情"},
                request_list: [
                    {
                        type: 'AlarmBar',
                        name: '累計件數',
                        color: ['#27d5d7'],
                        config:{
                            total: {
                                "title": '單一陳情系統案件累積件數',
                                "formula": 'sum'
                            }
                        },
                        path:'/sentiment/component/hellotaipei',
                        form_data: {
                            column: '案件主類',
                            start: "2020-12-25T00:00:00+08:00",
                            end: "2020-12-31T23:59:59+08:00"
                        }
                    }
                ]
            },
            {
                "index": 'dispatching',
                name: '派工案件(當週)',
                "group_index": 1,
                source_from: '派工系統',
                sample_data: '2020-12-31T00:00:00+08:00',
                overview_display: 100,
                "calculation_config":{"label":"派工案件","start":"2020-01-01T00:00:00+08:00","end":"2020-06-17T18:00:00+08:00"},
                request_list: [
                    {
                        "type": 'CountChart',
                        name: '派工類別',
                        color: ['#fc9f0b', '#dac117', '#FDD79B', '#CA7F09', '#555'],
                        config:{
                            display: '當週累積件數',
                            show_top: true 
                        },
                        path:'/sentiment/component/dispatching',
                        form_data: {
                            column: '案件類型',
                            start: "2020-12-25T00:00:00+08:00",
                            end: "2020-12-31T23:59:59+08:00"
                        }
                    }
                ],
                map_config: [
                    {
                        "raster":{
                            "index": "sentiment_dispatching",
                            "title": "派工類別",
                            "symbol": "heatmap",
                            "paint": {
                                "circle-color":["match",["get", "案件類型"],"大型廢棄物清運聯繫","#fc9f0b","場所與設施噪音舉發","#dac117","污染舉發","#FDD79B","路燈故障或設施損壞","#FDD79B","#555"]
                            },
                            "property": ["案件編號", "案件類型", "案件狀態", "成案時間", "結案時間", "案件內容"]
                        }
                    }
                ]
            }
        ]
    },
    {
        "index": "patrol",
        id: 2,
        name: "城市安防",
        groups: ['犯罪案件', '災情應變', '風險地區', '人口資訊'],
        components: [
            {
                "index": "patrol_criminalcase",
                name: "刑事統計",
                "group_index": 0,
                source_from: "警察局",
                sample_data: "2020-12-31T00:00:00+08:00",
                overview_display: 50,
                request_list: [
                    {
                        type: "StatisticLine",
                        path:"/patrol/component/criminalcase",
                        form_data: {
                            "type": "statistic_line",
                            "year": 109,
                            "month": 12
                        },
                        config:{
                            "line": {
                                "target_array": [
                                    {
                                        "select_index": "發生件數[件]",
                                        "select_name": "2020",
                                        "x_axes": "valueTime",
                                        "y_axes": "value"
                                    },
                                    {
                                        "select_index": "發生件數[件]",
                                        "select_name": "2019",
                                        "x_axes": "valueTime",
                                        "y_axes": "lastValue"
                                    }
                                ]
                            },
                            "figures": {
                                "main": [
                                    {
                                        "select_index": "發生件數[件]",
                                        "select_name": "案件總數"
                                    }
                                ],
                                "sub": [
                                    {
                                        "select_index": "破獲件數/總計[件]",
                                        "select_name": "破獲案件",
                                        "unit": "件"
                                    },
                                    {
                                        "select_index": "破獲率[%]",
                                        "select_name": "破獲率",
                                        "formula": "average",
                                        "unit": "%"
                                    }
                                ]
                            }
                        }
                    }
                ]
            },
            {
                "index": "crimehotspot",
                name: "犯罪點位",
                "group_index": 0,
                sample_data: "2020-12-31T00:00:00+08:00",
                source_from: "警察局",
                overview_display: 50,
                request_list: [
                    {
                        type: "CountPie",
                        color: ["#e06666", "#C53E5E", "#fb8c8c", "#F3847E", "#fdb7ba"],
                        config:{
                            center:{
                                "title": "總件數"
                            }
                        },
                        path:"/patrol/component/crimehotspot",
                        form_data: {
                            "year": 109,
                            "month": 12
                        }
                    }
                ],
                map_config: [
                    {
                        "raster":{
                            "index": "patrol_residential_burglary",
                            "title": "犯罪點位",
                            "symbol": "heatmap",
                            color: "#e06666",
                            "property": ["type", "date", "time", "location"]
                        }
                    },
                    {
                        "raster":{
                            "index": "patrol_car_theft",
                            "title": "犯罪點位",
                            "symbol": 'heatmap',
                            color: '#C53E5E',
                            "property": ['type', 'date', 'time', 'location']
                        }
                    },
                    {
                        "raster":{
                            "index": 'patrol_random_robber',
                            "title": '犯罪點位',
                            "symbol": 'heatmap',
                            color: '#fb8c8c',
                            "property": ['type', 'date', 'time', 'location']
                        }
                    },
                    {
                        "raster":{
                            "index": 'patrol_random_snatch',
                            "title": '犯罪點位',
                            "symbol": 'heatmap',
                            color: '#F3847E',
                            "property": ['type', 'date', 'time', 'location']
                        }
                    },
                    {
                        "raster":{
                            "index": 'patrol_motorcycle_theft',
                            "title": '犯罪點位',
                            "symbol": 'heatmap',
                            color: '#fdb7ba',
                            "property": ['type', 'date', 'time', 'location']
                        }
                    }
                ]
            },
            {
                "index": 'police_facility',
                name: '警察相關設施',
                "group_index": 0,
                source_from: '警察局',
                sample_data: '樣本數據',
                request_list: [
                    {
                        type: 'MapDisplay',
                        config: {
                            mapLabels: [
                                {
                                    select_array: '警察局',
                                    "symbol": 'triangle1',
                                },
                                {
                                    select_array: '警局轄區',
                                    "symbol": 'dasharray',
                                    color: '#009688'
                                },
                                {
                                    select_array: '巡邏箱',
                                    "symbol": 'circle',
                                    color: '#4cd9c1'
                                },
                                {
                                    select_array: '監視器',
                                    "symbol": 'cross1',
                                    color: '#4dd97a'
                                }
                            ]   
                        }
                    }
                ],
                map_config: [
                    {
                        geoJson: {
                            "index": 'police_station',
                            "title": '警察局',
                            "symbol": 'triangle1',
                            interactive:{
                                target: 'patrol_district',
                                trigger: 'STATION_NAME',
                                resultset: ['station', 'precinct']
                            },
                            "property": ['OFFICE_NAME', 'STATION_NAME']
                        }
                    },
                    {
                        geoJson: {
                            "index": 'patrol_district',
                            "title": '警局轄區',
                            "symbol": 'dasharray',
                            color: '#009688',
                            affected: 'police_station',
                            "property": []
                        }
                    },
                    {
                        "raster":{
                            "index": 'patrol_box',
                            "title": '巡邏箱',
                            "symbol": 'circle',
                            color: '#4cd9c1',
                            "property": ['precinct','office','box_type','location','discription']
                        }
                    },
                    {
                        "raster":{
                            "index": 'patrol_camera_hls',
                            "title": '監視器位置',
                            "symbol": 'cross1',
                            "property": ['攝影機編號', '分局', '派出所', '攝向', 'hls']
                        }
                    }
                ]
            },
            {
                "index": 'eoc',
                name: '防災即時資訊',
                alarm_data: true,
                "group_index": 1,
                sample_data: '樣本數據',
                source_from: 'EOC',
                overview_display: 60,
                request_list: [
                    {
                        "type": 'ComplexMsg'
                    }
                ]
            },
            {
                "index": 'designate',
                name: '避難收容地點',
                "group_index": 1,
                source_from: '消防局',
                sample_data: '樣本數據',
                overview_display: 40,
                request_list: [
                    {
                        type: 'MapDisplay',
                        path: '/patrol/component/patroldesignateplace',
                        config: {
                            mapLabels:[
                                {
                                    select_array: '避難場所',
                                    "symbol": 'circle_stroke',
                                    color: '#FDD79B',
                                    "unit": '處'
                                }
                            ],
                            statistic: true
                        } 
                    }
                ],
                map_config:[
                    {
                        "raster":{
                            "index": 'patrol_designate_place',
                            "title": '避難場所',
                            "symbol": 'circle',
                            color: '#4cd9c1',
                            "paint": {
                                "circle-opacity": 0,
                                "circle-stroke-width": 1,
                                'circle-stroke-color': '#FDD79B',
                                'circle-radius': [
                                    'interpolate', ['cubic-bezier', 0, 0.5, 1, 1],
                                    ["to-number", ["get", "容納人數"]],
                                    50,
                                    1,
                                    50000,
                                    100
                                ]
                            },
                            "property": ['名稱', '道路門牌', '服務里別','容納人數']
                        }
                    }
                ]
            },
            {
                "index": 'flood_risk',
                name: '水災風險地區',
                "group_index": 2,
                source_from: '消防局',
                sample_data: '2020-07-31T12:00:00+08:00',
                overview_display: 30,
                request_list: [
                    {
                        type: 'MapDisplay',
                        config: {
                            mapLabels:[
                                {
                                    select_array: '高風險地區',
                                    "symbol": 'Area',
                                    "unit": 'km²',
                                    color: '#baf4f5'
                                },
                                {
                                    select_array: '低風險地區',
                                    "symbol": 'Area',
                                    "unit": 'km²',
                                    color: '#009ff4'
                                },
                                {
                                    select_array: '中風險地區',
                                    "symbol": 'Area',
                                    "unit": 'km²',
                                    color: '#352ad1'
                                }
                            ],
                            calculation:{
                                "target": "近一小時降雨強度",
                                "unit": "mm/hr"
                            }
                        }
                    }
                ],
                map_config:[
                    {
                        "raster":{
                            "index": 'patrol_flood_100',
                            "title": '水災風險地區',
                            "symbol": 'fill',
                            "paint": {
                                'fill-color':[
                                    'match',
                                    ['get', 'name'],
                                    '1.0 m ~ 2.0 m',
                                    '#0a85f4',
                                    '0.30 m ~ 1.0 m',
                                    '#68ccf8',
                                    '0.15 m ~ 0.30 m',
                                    '#205CE6',
                                    '#ccc'
                                ]
                            },
                            "property": ['name']
                        }
                    },
                    {
                        "raster":{
                            "index": 'patrol_flood_78_8',
                            "title": '水災風險地區',
                            "symbol": 'fill',
                            "paint": {
                                'fill-color':[
                                    'match',
                                    ['get', 'name'],
                                    '1.0 m ~ 2.0 m',
                                    '#0a85f4',
                                    '0.30 m ~ 1.0 m',
                                    '#68ccf8',
                                    '0.15 m ~ 0.30 m',
                                    '#205CE6',
                                    '#ccc'
                                ]
                            },
                            "property": ['name']
                        }
                    },
                    {
                        "raster":{
                            "index": 'patrol_flood_130',
                            "title": '水災風險地區',
                            "symbol": 'fill',
                            "paint": {
                                'fill-color':[
                                    'match',
                                    ['get', 'name'],
                                    '1.0 m ~ 2.0 m',
                                    '#0a85f4',
                                    '0.30 m ~ 1.0 m',
                                    '#68ccf8',
                                    '0.15 m ~ 0.30 m',
                                    '#205CE6',
                                    '#ccc'
                                ]
                            },
                            "property": ['name']
                        }
                    }
                ]
            },
            {
                "index": 'flood_respondent',
                name: '水災應變設施',
                "group_index": 2,
                source_from: '消防局',
                sample_data: '樣本數據',
                request_list: [
                    {
                        type: 'MapDisplay',
                        config: {
                            mapLabels:[
                                {
                                    select_array: '消防隊',
                                    "symbol": 'triangle1'
                                }
                            ]
                        }
                    }
                ],
                map_config:[
                    {
                        "raster":{
                            "index": 'patrol_fire_brigade',
                            "title": '消防隊',
                            "symbol": 'triangle1',
                            "property": ['name']
                        }
                    }
                ]
            },
            {
                "index": 'patrol_fireriskarea',
                name: '火災風險地點',
                "group_index": 2,
                source_from: '消防局',
                sample_data: '樣本數據',
                overview_display: 30,
                request_list: [
                    {
                        type: 'MapDisplay',
                        path:'/patrol/component/fireriskarea',
                        config: {
                            mapLabels:[
                                {
                                    select_array: '救災搶救困難地區',
                                    "symbol": 'circleBig',
                                    color: '#f172bd',
                                    "unit": '處'
                                },
                                {
                                    select_array: '安檢不合格場所',
                                    "symbol": 'circleBig',
                                    color: '#FC0A9A',
                                    "unit": '處'
                                }
                            ]
                        }
                    }
                ],
                map_config:[
                    {
                        "raster":{
                            "index": 'patrol_fire_rescure',
                            "title": '救災搶救困難地區',
                            "symbol": 'circleBig',
                            color: '#f172bd',
                            "property": ['place','fire_exit']
                        }
                    },
                    {
                        "raster":{
                            "index": 'patrol_fire_disqualified',
                            "title": '安檢不合格場所',
                            "symbol": 'circleBig',
                            color: '#FC0A9A',
                            "property": ['place','violation_item','date','place_usage']
                        }
                    }
                ]
            },
            {
                "index": 'fire_respondent',
                name: '火災應變設施',
                "group_index": 2,
                source_from: '消防局',
                sample_data: '樣本數據',
                request_list: [
                    {
                        type: 'MapDisplay',
                        config: {
                            mapLabels:[
                                {
                                    select_array: '消防隊',
                                    "symbol": 'triangle1'
                                }
                            ]
                        }
                    }
                ],
                map_config:[
                    {
                        "raster":{
                            "index": 'patrol_fire_brigade',
                            "title": '消防隊',
                            "symbol": 'triangle1',
                            "property": ['name']
                        }
                    }
                ]
            },
            {
                "index": 'slope_area_risk',
                name: '山坡地風險地點',
                "group_index": 2,
                sample_data: '',
                source_from: '工務局',
                overview_display: 40,
                request_list: [
                    {
                        type: 'MapDisplay',
                        path:'/patrol/component/patroldebris',
                        config: {
                            mapLabels: [
                                {
                                    select_array: '土石流潛勢溪流',
                                    "symbol": 'line',
                                    "unit": '處',
                                    color: '#d7c500',
                                },
                                {
                                    select_array: '土石流影響範圍',
                                    "symbol": 'Area',
                                    "unit": '處',
                                    color: '#958f00',
                                },
                                {
                                    select_array: '列管邊坡',
                                    "symbol": 'line',
                                    "unit": '處',
                                    color: '#ff9800',
                                },
                                {
                                    select_array: '老舊聚落',
                                    "symbol": 'Area',
                                    "unit": '處',
                                    color: '#9e7b5c',
                                }
                            ]
                        }
                    }
                ],
                map_config:[
                    {
                        "raster":{
                            "index": 'patrol_debris',
                            "title": '土石流潛勢溪流',
                            "symbol": 'line',
                            color:  '#d7c500',
                            "property": ['mark','risk','stra_1','stra_2','basin','sub_basin','date','year']
                        }
                    },
                    {
                        "raster":{
                            "index": 'patrol_debrisarea',
                            "title": '土石流影響範圍',
                            "symbol": 'fill',
                            color: '#958f00',
                            "property": ['total_res','risk']
                        }
                    },
                    {
                        "raster":{
                            "index": 'patrol_artificial_slope',
                            "title": '列管邊坡',
                            "symbol": 'line',
                            color: '#ff9800',
                            "property": ['level']
                        }
                    },
                    {
                        "raster":{
                            "index": 'patrol_old_settlement',
                            "title": '老舊聚落',
                            "symbol": 'fill',
                            color: '#9e7b5c',
                            "property": ['name']
                        }
                    },
                ]
            },
            {
                "index": 'age_hr',
                name: '分時人口推估',
                "group_index": 3,
                source_from: '遠傳電信',
                sample_data: '2020-06-16T00:00:00+08:00',
                overview_display: 100,
                request_list: [
                    {
                        type: 'KeyFigures',
                        config:{
                            "figures":{
                                "main":[
                                    {
                                        "select_array":["人口"],
                                        "select_index":"value",
                                        "title":"同時段推估人口(17hr)",
                                        "formula":"sum"
                                    }
                                ]
                            },
                            "line":{
                                "select_array":["人口"],
                                "x_axes":"valueTime"
                            }
                        }
                    }
                ],
                map_config: [
                    {
                        "raster": {
                            "index": "tp_fet_age_hr",
                            "title": "分時人口",
                            "symbol": "fill-extrusion",
                            "paint": {
                                "fill-extrusion-color": [
                                    "interpolate",
                                    ["linear"],
                                    ["get", "pop_all"],
                                    0,
                                    "hsl(0, 0%, 3%)",
                                    15842,
                                    "#62fcfe"
                                ],
                                "fill-extrusion-height": [
                                    "interpolate",
                                    ["linear"],
                                    ["get", "pop_all"],
                                    0,
                                    0,
                                    15842,
                                    500
                                ],
                                "fill-extrusion-opacity": 0.5
                            },
                            "property": ["pop_all"]
                        }
                    }
                ]
            }
        ]
    },
    {
        "index": "Traffic",
        id: 3,
        name: "城市交通",
        groups: ['道路交通', '大眾運輸'],
        components: [
            {
                "index": 'traffic_live',
                name: '即時路況(路口感測)',
                "group_index": 0,
                source_from: '交通局',
                update_loop: 300000,
                dashboard_show: true,
                overview_display: 45,
                request_list: [
                    {
                        type: 'CountPie',
                        path: '/traffic/component/livecount',
                        color: ['#EC4037', '#ff8c1a', '#4dd97a'],
                        config:{
                            "select_array":["嚴重壅塞"],
                            "unit":"%",
                            "center":{
                                "title":"壅塞程度",
                                "formula":"sum"
                            }
                        }
                    },
                    {
                        type: 'StatisticLine',
                        path:'/traffic/component/livestatistic',
                        form_data: {
                            "time_unit": 'hour',
                            "time_step": '24'
                        },
                        color: ['#EC4037', '#ddd'],
                        config:{
                            "line": {
                                "target_array": [
                                    {
                                        "select_index": '壅塞路段',
                                        "select_name": '本日',
                                        "x_axes": 'valueTime',
                                        "y_axes": 'value'
                                    },
                                    {
                                        "select_index": '壅塞路段',
                                        "select_name": '去年同期',
                                        "x_axes": 'valueTime',
                                        "y_axes": 'lastValue'
                                    }
                                ],
                                "unit": '%'
                            }
                        }
                    }
                ],
                map_config: [
                    {
                        "raster":{
                            "index": 'traffic_live_view',
                            "title": '壅塞程度',
                            "symbol": 'fill',
                            "paint": {
                                'fill-color': [
                                    'match',
                                    ['get', '壅塞程度'],
                                    '壅塞',
                                    '#EC4037',
                                    '車多',
                                    '#ff8c1a',
                                    '順暢',
                                    '#4dd97a',
                                    '#ccc'
                                ]
                            },
                            "property": ['壅塞程度'],
                        }
                    }
                ]
            },
            {
                "index": 'traffic_gps',
                name: '即時路況(GPS推估)',
                "group_index": 0,
                source_from: 'Mapbox',
                update_loop: 1800000,
                request_list: [
                    {
                        type: 'MapDisplay'
                    }
                ],
                map_config:[
                    {
                        mapBox:{
                            mapBoxTrafficCtrl: true
                        }
                    }
                ]
            },
            {
                "index": 'traffic_todaywork',
                name: '即時道路施工',
                "group_index": 0,
                overview_display: 10,
                source_from: '公務局',
                update_loop: 600000,
                request_list: [
                    {
                        type: 'MapDisplay',
                        path: '/traffic/component/todayworkcount',
                        config:{
                            mapLabels: [
                                {
                                    select_array: '施工路段',
                                    "symbol": 'triangle2',
                                    "unit": '處'
                                }
                            ]
                        }
                    }
                ],
                map_config:[
                    {
                        "raster":{
                            "index": 'traffic_todaywork_view',
                            "title": '施工路段',
                            "symbol": 'triangle2',
                            "property": ['施工類型','主管機關','施工單位','起始日期','結束日期','施工時段']
                        }
                    }
                ]
            },
            {
                "index": 'camera',
                name: '監視器影像',
                "group_index": 0,
                source_from: '警察局',
                update_loop: 0,
                request_list: [
                    {
                        type: 'MapDisplay',
                        path: '/traffic/component/cameraamount',
                        config: {
                            mapLabels: [
                                {
                                    select_array: '監視器位置',
                                    "symbol": 'cross1',
                                    "unit": '處'
                                }
                            ]   
                        }
                    }
                ],
                map_config: [
                    {
                        "raster":{
                            "index": 'patrol_camera_hls',
                            "title": '監視器位置',
                            "symbol": 'cross1',
                            "property": ['攝影機編號', '分局', '派出所', '攝向', 'hls']
                        }
                    }
                ]
            },
            {
                "index": 'traffic_accident',
                name: '交通事故統計',
                "group_index": 0,
                source_from: '警察局',
                sample_data: '2021-02-28T00:00:00+08:00',
                overview_display: 45,
                //
                // calculation_config:[
                //     {
                //         label: ['A1'],
                //         data: [57,64,59,92,72,83,20,80,5,78,10,34]
                //     },
                //     {
                //         label: ['A2'],
                //         data: [837,952,887,865,776,445,851,770,799,783,718,133]
                //     },
                //     {
                //         label: ['A3'],
                //         data: [350,716,1139,2210,2315,1172,1258,1422,2293,2487,1588,1110]
                //     }
                // ],
                //
                request_list: [
                    {
                        type: 'KeyFigures',
                        path: '/traffic/component/accidentstatistic',
                        form_data: {
                            "year": 2021,
                            "month": 2,
                        },
                        config:{
                            "figures": {
                                "main": [
                                    {
                                        "select_array": ["A1事故件數", "A2事故件數", "A3事故件數", "A4事故件數"],
                                        "select_index": "lastValue",
                                        "title": "上月事故總數",
                                        "formula": "sum",
                                        "unit": "件"
                                    }
                                ],
                                "sub": [
                                    {
                                        "select_array": ["A1事故死亡"],
                                        "select_index": "value",
                                        "title": "本月A1事故死亡",
                                        "formula": "get",
                                        "unit": "人"
                                    },
                                    {
                                        "select_array": ["A1事故受傷","A2事故受傷"],
                                        "select_index": "value",
                                        "title": "本月A1+A2事故受傷",
                                        "formula": "sum",
                                        "unit": "人"
                                    },
                                ]
                            },
                            "pie": {
                                "select_array": ["A1事故件數", "A2事故件數", "A3事故件數", "A4事故件數"],
                                "select_name": ["本月A1事故件數", "本月A2事故件數", "本月A3事故件數", "本月A4事故件數"],
                                "select_index": "value",
                                "unit": "件",
                                "center": {
                                    "title": "本月事故累積",
                                    "formula": "sum"
                                }
                            }
                        }
                    }
                ],
                map_config: [
                    {
                        "raster":{
                            "index": 'traffic_accident_location_view',
                            "title": '交通事故統計',
                            "symbol": 'heatmap',
                            heatmap: {
                                filter:'type',
                                zoom: 16.5
                            },
                            "paint": {
                                'circle-color': [
                                    'match',
                                    ['get', 'type'],
                                    '1',
                                    '#CA0020',
                                    '2',
                                    '#F8C3AC',
                                    '3',
                                    '#D1D1D1',
                                    '#ccc'
                                ]
                            },
                            "property": ['處理別','位置','時間']
                        },
                    }
                ]
            },
            {
                "index": 'traffic_mrt',
                name: '即時捷運運行情形',
                alarm_data: true,
                "group_index": 1,
                update_loop: 900000,
                source_from: '捷運公司',
                overview_display: 35,
                request_list: [
                    {
                        "type": 'KeyFigures',
                        config:{
                            "figures": {
                                "main": [
                                    {
                                        select_array: ['進站'],
                                        "select_index": 'value',
                                        "title": '近一小時進站人數',
                                        "formula": 'last',
                                        "unit": '人'
                                    },
                                    {
                                        select_array: ['出站'],
                                        "select_index": 'value',
                                        "title": '近一小時出站人數',
                                        "formula": 'last',
                                        "unit": '人'
                                    }
                                ]
                            },
                            "line": {
                                select_array: ['進站', '出站'],
                                "x_axes": 'valueTime',
                                "y_axes": 'value'
                            }
                        }
                    }
                ],
                map_config: [
                    {
                        geoJson: {
                            "index": 'metrostationlive',
                            "title": '捷運站點',
                            url: '/traffic/component/metrostationlive',
                            interval: 15,
                            "symbol": 'metro',
                            "paint": {
                                'text-halo-color': [
                                    'match',
                                    ['get', 'Countdown'],
                                    '列車進站',
                                    '#68ccf8',
                                    "hsla(240, 0%, 100%, 0)"
                                ]
                            }
                        }
                    }
                ]
            },
            {
                "index": 'traffic_mrt_take',
                name: '今日各站搭乘情形',
                "group_index": 1,
                update_loop: 180000,
                source_from: '捷運公司',
                overview_display: 45,
                request_list: [
                    {
                        type: 'StackedBar',
                        color: ['#2d7b7d', '#38b19f', '#07a0d4', '#27d5d7', '#007aff', '#3975b7','#223477'],
                        config:{
                            "select_array": ["進站","出站"],
                            sort: {
                                column: '進站',
                                order: 'desc'
                            }
                        }
                    }
                ]
            },
            {
                "index": 'youbike',
                name: 'Youbike使用情況',
                "group_index": 1,
                update_loop: 180000,
                source_from: 'Youbike',
                overview_display: 45,
                request_list: [
                    {
                        "type": 'CountPie',
                        color: ['#A25FAD', '#655fad', '#9774CC', '#CBA5D0', '#9535a1', '#48274C'],
                        config:{
                            select_array: ['使用中', '可使用'],
                            "unit": '台',
                            center: {
                                "title": '當前使用率',
                                "formula": 'except',
                                "unit": '%',
                            },
                            total: {
                                "title": '車輛總數',
                                "formula": 'sum'
                            }
                        },
                        path: '/traffic/component/youbikeusagelive',
                        form_data: {
                            "time_unit": 'hour',
                            time_step: '3'
                        }
                    },
                    {
                        "type": 'StatisticLine',
                        color: ['#A25FAD', '#ddd'],
                        config:{
                            "line": {
                                "target_array": [
                                    {
                                        "select_index": '使用中',
                                        "x_axes": 'valueTime',
                                        "y_axes": 'value'
                                    }
                                ]
                            }
                        },
                        path:'/traffic/component/youbikehistorycapacity',
                        form_data: {
                            "time_unit": 'hour',
                            time_step: '5',
                        }
                    }
                ],
                map_config: [
                    {
                        "raster":{
                            "index": 'traffic_youbike_station',
                            "title": 'youbike站點',
                            "symbol": 'bike',
                            "property": ['station']
                        }
                    }
                ]
            },
            {
                "index": 'bus',
                name: '即時聯營公車資訊',
                "group_index": 1,
                update_loop: 15000,
                source_from: '交通局',
                overview_display: 35,
                request_list: [
                    {
                        type: 'Gauge',
                        path: '/traffic/component/buscount',
                        color: '#fc9f0b',
                        config:{
                            display: ['運行中公車', '運行中路線'],
                            label_name: ['運行中', '閒置']
                        }
                    }
                ],
                map_config: [{"raster":{"index":"traffic_bus_station_view","title":"公車站","symbol":"bus","property":["站名"]}},{"geoJson":{"index":"buslive","title":"運行中公車","url":"/traffic/component/buslive","property":["RouteName.Zh_tw"],"interval":15}}]
            }
        ]
    },
    {
        "index":"Construction",
        id: 4,
        name: "城市建設",
        groups: ['開發建設動態', '活化潛力', '土地分類'],
        components: [
            {
                "index": 'building_license',
                name: '建管處發照量',
                "group_index": 0,
                source_from: '建管處',
                sample_data: '',
                dashboard_show: true,
                overview_display: 40,
                request_list: [
                    {
                        "type": 'StatisticLine',
                        path: '/building/component/licensepermit',
                        form_data: { 
                            "year": 2021,
                            "season": 1
                        },
                        color: ['#0a85f4', '#4dd97a'],
                        config:{
                            "line": {
                                "target_array": [
                                    {
                                        "select_index": "證照",
                                        "x_axes": "valueTime",
                                        "y_axes": "value",
                                        "interval": "day"
                                    },
                                    {
                                        "select_index": "使照",
                                        "x_axes": "valueTime",
                                        "y_axes": "value",
                                        "interval": "day"
                                    }
                                ]
                            },
                            "figures": {
                                "main": [
                                    {
                                        "select_index": "證照總數",
                                        "select_name": "建照發照總量"
                                    },
                                    {
                                        "select_index": "使照總數",
                                        "select_name": "使照發照總量"
                                    }
                                ]
                            }
                        }
                    }
                ],
                map_config: [
                    {
                        "raster":{
                            "index": 'building_permit',
                            "title": '建照發照',
                            "symbol": 'fill',
                            color:  '#9dd2e3',
                            "paint": {
                                'fill-color': [
                                    'interpolate', ['linear'],
                                    ["to-number", ["get", "110年建造執照2_發照日期"]],
                                    1100101,
                                    '#1b5b70',
                                    1100331,
                                    '#9dd2e3'
                                ]
                            },
                            "property": ['110年建造執照2_執照號碼','110年建造執照2_發照日期']
                        }
                    },
                    {
                        "raster":{
                            "index": 'building_license',
                            "title": '使照發照',
                            "symbol": 'circleBig',
                            "paint": {
                                'circle-color': [
                                    'interpolate', ['linear'],
                                    ["to-number", ["get", "發照日期"]],
                                    1100101,
                                    '#4dd97a',
                                    1100231,
                                    '#8DE7AA'
                                ]
                            }
                        }
                    }
                ]
            },
            {
                "index": 'building_renew',
                name: '都市更新案件',
                "group_index": 0,
                source_from: '都市更新處',
                update_loop: 180000,
                overview_display: 30,
                request_list: [
                    {
                        type: 'CountPie',
                        // path: '/building/component/renewunit',
                        color: ['#e0e08c', '#f8ea21', '#f7ac3b', '#f7773b', '#f74922'],
                        config:{
                            center: {
                                "title": '總件數'
                            }
                        }
                    }
                ],
                map_config: [
                    {
                        "raster":{
                            "index":'building_renewunit_12',
                            "title": '都市更新',
                            "symbol": 'line',
                            color: '#e0e08c'
                        }
                    },
                    {
                        "raster":{
                            "index":'building_renewunit_20',
                            "title": '都市更新',
                            "symbol": 'line',
                            color: '#f8ea21'
                        },
                    },
                    {
                        "raster":{
                            "index": 'building_renewunit_30',
                            "title": '都市更新',
                            "symbol": 'line',
                            color: '#f7ac3b'
                        }
                    },
                ]
            },
            {
                "index": 'social_house',
                name: '社會住宅建設進度',
                "group_index": 0,
                source_from: '都發局',
                sample_data: '',
                dashboard_show: true,
                overview_display: 30,
                request_list: [
                    {
                        type: 'CountPie',
                        // path: '/building/component/socialhouse',
                        config:{
                            center: {
                                "title": '目標執行率'
                            }
                        }
                    }
                ],
                map_config: [
                    {
                        "raster":{
                            "index": 'building_social_house',
                            "title": '社會住宅',
                            "symbol": 'circle',
                            "paint": {
                                'circle-radius': 5,
                                'circle-color':[
                                    'match',
                                    ['get', 'progress'],
                                    '施工中及待開工',
                                    '#26d5d7',
                                    '已完工',
                                    '#7EE4D3',
                                    '都更連開分回',
                                    '#219A86',
                                    '規劃中',
                                    '#A5ECE0',
                                    '招標中及待上鋼',
                                    '#166759',
                                    '#ccc'
                                ],  
                            },
                            "property": ['name','progress','address','floors1']
                        }
                    }
                ]
            },
            {
                "index": 'building_unsued',
                name: '閒置市有財產',
                "group_index": 1,
                source_from: '財政局',
                sample_data: '',
                overview_display: 20,
                request_list: [
                    {
                        type: 'MapDisplay',
                        // path: '/building/component/landunuse',
                        config: {
                            mapLabels: [
                                {
                                    select_array: '閒置市有公有地',
                                    "symbol": 'Area',
                                    "unit": '處',
                                    color: '#A25FAD'
                                },
                                {
                                    select_array: '閒置市有(公用)建物',
                                    "symbol": 'circleBig',
                                    "unit": '處',
                                    color: '#655fad'
                                },
                                {
                                    select_array: '閒置市有(非公用)建物',
                                    "symbol": 'circleBig',
                                    "unit": '處',
                                    color: '#9774CC'
                                }
                            ]
                        }
                    }
                ],
                map_config: [
                    {
                        "raster":{
                            "index": 'building_unsued_land',
                            "title": '閒置市有公有地',
                            "symbol": 'fill',
                            color:  '#A25FAD',
                            "property": ['10712土地_1_土地權屬情形', '10712土地_1_管理機關']
                        }
                    },
                    {
                        "raster":{
                            "index": 'building_unsued_public',
                            "title": '閒置市有公有地',
                            "symbol": 'circleBig',
                            color: '#655fad',
                            "property": ['門牌','建物管理機關', '原使用用途','基地管理機關','基地所有權人', '房屋現況','目前執行情形', '閒置樓層_閒置樓層/該建物總樓層', '閒置面積㎡', '建物標示', '建築完成日期']
                        }
                    },
                    {
                        "raster":{
                            "index": 'building_unsued_nonpublic',
                            "title": '閒置市有(非公用)建物',
                            "symbol": 'circleBig',
                            color: '#9774CC',
                            "property": ['編號','門牌','管理機關','閒置面積_㎡']
                        }
                    }
                ]
            },
            {
                "index": 'building_age',
                name: '全市屋齡分布',
                "group_index": 1,
                sample_data: '',
                source_from: '建管處',
                overview_display: 80,
                request_list: [
                    {
                        type: 'VerticalBar',
                        path:'/building/component/agecount',
                        color: ['#073131','#0a4b4c', '#0f6c6e', '#118183', '#4cc2c4', '#93e4e6'],
                        config:{
                            select_array: ["<10","11-20","21-30","31-40","41-50",">50"],
                            label_name: '數量',
                            "figures": {
                                "select_index": "average",
                                "title": '全市平均屋齡(年)'
                            }
                        }
                    },
                    {
                        type: 'StackedBar',
                        path:'/building/component/agedistrictcount',
                        color: ['#073131','#0a4b4c', '#0f6c6e', '#118183', '#4cc2c4', '#93e4e6'],
                        config:{
                            select_array: ["<10","11-20","21-30","31-40","41-50",">50"],
                            sort: {
                                column: 'total',
                                order: 'desc'
                            }
                        }
                    }
                ],
                map_config: [
                    {
                        "raster":{
                            "index": 'building_age',
                            "title": '屋齡',
                            "symbol": 'circle',
                            "paint": {
                                'circle-radius': [
                                    "interpolate",
                                    ["linear"],
                                    ["zoom"],
                                    11.99,
                                    0,
                                    12,
                                    0.4,
                                    22,
                                    6
                                ],
                                'circle-color':[
                                    "interpolate",
                                    ["linear"],
                                    ["get", "age_2021"],
                                    4,
                                    '#073131',
                                    11,
                                    '#0a4b4c',
                                    21,
                                    '#0f6c6e',
                                    31,
                                    '#118183',
                                    41,
                                    '#4cc2c4',
                                    51,
                                    '#93e4e6'
                                ]
                            },
                            "property": ['age_2021']
                        }
                    }
                ]
            },
            {
                "index": 'work_live',
                name: '居職人口推估',
                "group_index": 1,
                sample_data: '2020-06-16T00:00:00+08:00',
                source_from: '遠傳電信',
                request_list: [
                    {
                        type: 'Proportion',
                        "path": "/building/component/fetworklive",
                        color: ['#77dddf', '#fa6000'],
                        config: {
                            select_array: ['residence', 'work'],
                            select_name: ['居住', '工作'],
                            "select_title": ['推估居住人口', '推估工作人口'],
                            bar_name: ['居住為主', '工作為主']
                        }
                    }
                ],
                map_config: [
                    {
                        "raster": {
                            "index": "tp_fet_work_live",
                            "title": '居職人口',
                            "symbol": 'fill-extrusion',
                            "paint": {
                                'fill-extrusion-color': [
                                    "interpolate",
                                    ["linear"],
                                    ["get", "work_l_w"],
                                    -11533,
                                    "#77dddf",
                                    -4,
                                    "#000000",
                                    8,
                                    "#000000",
                                    2551,
                                    "#fa6000"
                                ],
                                'fill-extrusion-height': [
                                    "interpolate",
                                    ["linear"],
                                    ["get", "work_l+w"],
                                    0,
                                    0,
                                    19895,
                                    250
                                ],
                                'fill-extrusion-opacity': 0.5
                            },
                            "property": ['pop_work', 'pop_live']
                        }
                    }
                ]
            },
            {
                "index": 'building_publand',
                name: '公有土地',
                "group_index": 2,
                sample_data: '',
                source_from: '地政局',
                overview_display: 50,
                request_list: [
                    {
                        type: 'TreeMap',
                        path:'/building/component/publand',
                        color: ['#2d7b7d', '#38b19f', '#07a0d4', '#27d5d7', '#007aff', '#3975b7','#223477'],
                        config: {
                            select_array: ['國有地', '臺北市有', '台北市共有地', '公私共有地', '臺北市及國有共有', '其他機關有地', '機關共有地'],
                            label_name: '面積',
                            "unit": '平方公尺',
                            "figures": {
                                select_array : ["台北市公有土地面積", "台北市總面積"]
                            }
                        }
                    }
                ],
                map_config: [
                    {
                        "raster":{
                            "index": 'building_publand',
                            "title": '公有土地',
                            "symbol": 'fill',
                            "paint":  {
                                'fill-color':[
                                    'match',
                                    ['get', 'publand_1_土地權屬情形'],
                                    '國有',
                                    '#2d7b7d',
                                    '臺北市有',
                                    '#38b19f',
                                    '公私共有或其他',
                                    '#07a0d4',
                                    '臺北市及國有共有',
                                    '#27d5d7',
                                    '其他政府機關有',
                                    '#007aff',
                                    '臺北市有、國有及其他政府機關共有',
                                    '#3975b7',
                                    '臺北市有及非國有政府機關共有',
                                    '#223477',
                                    '#ccc'
                                ]
                            },
                            "property": ['publand_1_類型', 'publand_1_土地權屬情形']
                        }
                    }
                ]
            },
            {
                "index": 'building_landuse',
                name: '都市計畫用地類型',
                "group_index": 2,
                source_from: '都發局',
                sample_data: '',
                overview_display: 50,
                request_list: [
                    {
                        type: 'TreeMap',
                        path:'/building/component/landuse',
                        color: ['#00ff00', '#ff003f', '#ffff00', '#b3b3b3', '#7fffff', '#7f3f00', '#bf7fff', '#70dcaf', '#007fff', '#7fff00', '#ff3f00', '#ff00ff', '#e6e6e6', '#ff8fad', '#e58bd8', '#e58bd8'],
                        config: {
                            label_name: '面積',
                            "unit": '平方公尺'
                        }  
                    }
                ],
                map_config: [
                    {
                        "raster":{
                            "index": 'building_landuse',
                            "title": '都市計畫用地類型',
                            "symbol": 'fill',
                            "paint": {
                                'fill-color':[
                                    'match',
                                    ['get', '顏色'],
                                    '0', '#00ff00',
                                    '3', '#ff003f',
                                    '4', '#ffff00',
                                    '5', '#b3b3b3',
                                    '7', '#7fffff',
                                    '9', '#7f3f00',
                                    '10', '#bf7fff',
                                    '11', '#70dcaf',
                                    '13', '#007fff',
                                    '14', '#7fff00',
                                    '15', '#00ff00',
                                    '16', '#ff3f00',
                                    '17', '#ff00ff',
                                    '18', '#e6e6e6',
                                    '19', '#00ff00',
                                    '29', '#ff8fad',
                                    '34', '#00ff00',
                                    '50', '#7fff00',
                                    '53', '#e58bd8',
                                    '82', '#00ff00',
                                    '#7fff00'
                                ]
                            },
                            "property": ['編號','使用分區']
                        }
                    }
                ]
            }
        ]
    }
]

//All Topic dataset (之後從後端取出，並有即時資訊)
export const topiclContent = {
    sentiment : {
        hotnews: [
            {
                updateTime: "2021-03-31T00:00:00+08:00",
                data: [
                  {key: "疫情",value: [{value: 1000}]},
                  {key: "美國",value: [{value: 1000}]},
                  {key: "媒體",value: [{value: 1000}]},
                  {key: "防疫",value: [{value: 1000}]},
                  {key: "協助",value: [{value: 1000}]},
                  {key: "COVID-19",value: [{value: 1000}]},
                  {key: "調查",value: [{value: 1000}]},
                  {key: "日本",value: [{value: 1000}]},
                  {key: "高雄",value: [{value: 1000}]},
                  {key: "柯文哲",value: [{value: 1000}]}
                ]
            }
        ],
        councillor: [
            {
                updateTime: '2020-12-31T00:00:00+08:00',
                data: [
                    {key: "臺北市政府交通局" ,value: [{ value: 5}]},
                    {key: "臺北市政府文化局" ,value: [{ value: 10}]}
                ]
            }
        ],
        camera:[
            {
                updateTime: "2021-02-31T00:00:00+08:00",
                data: [
                    {key: "監視器位置",value: [{value: 1717}]}
                ]
            }  
        ],
        hello_taipei: [
            {
                updateTime: '2020-12-31T00:00:00+08:00',
                data: [
                    {key: "都發局" ,value: [{ value: 194}]},
                    {key: "工務局" ,value: [{ value: 93}]}
                ]
            }
        ],
        circular: [
            {
                updateTime: '2020-12-31T00:00:00+08:00',
                data:[
                    {
                        key: "衛福、勞動、民政及區政",
                        value :[
                            {value: 194, zScore: 194}
                        ]
                    },
                    {
                        key: "警消、法律及政風",
                        value :[
                            {value: 153, zScore: 116}
                        ]
                    },
                    {
                        key: "非屬前述各類之其他事項",
                        value :[
                            {value: 115, zScore: 116}
                        ]
                    },
                    {
                        key: "都市發展、建管、產業、財稅及地政",
                        value :[
                            {value: 190, zScore: 220}
                        ]
                    },
                    {
                        key: "文教、體育、資訊、觀光及媒體",
                        value :[
                            {value: 115, zScore: 194}
                        ]
                    },
                    {
                        key: "道路、山坡地、路樹及路燈",
                        value :[
                            {value: 100, zScore: 84}
                        ]
                    },
                    {
                        key: "交通運輸",
                        value :[
                            {value: 85, zScore: 75}
                        ]
                    },
                    {
                        key: "公園、排水溝、下水道及自來水",
                        value :[
                            {value: 120, zScore: 75}
                        ]
                    },
                    {
                        key: "垃圾、噪音、污染及資源回收",
                        value :[
                            {value: 50, zScore: 68}
                        ]
                    },
                    {
                        key: "員工事件通報",
                        value :[
                            {value: 54, zScore: 66}
                        ]
                    },
                ]
            }
        ],
        dispatching: [
            {
                updateTime:"2020-12-31T23:59:59.318643995Z",
                data:[
                    {key: "大型廢棄物清運聯繫",value: [{value:5522}]},
                    {key: "場所與設施噪音舉發",value: [{value:3251}]},
                    {key: "污染舉發",value: [{value:1029}]},
                    {key: "路燈故障或設施損壞",value: [{value:899}]},
                    {key: "市區道路坑洞處理",value: [{value:597}]},
                    {key: "道路散落物或油漬處理",value: [{value:591}]},
                    {key: "交通號誌異常",value: [{value:571}]},
                    {key: "鄰里無主垃圾清運",value: [{value:466}]},
                    {key: "用戶無水、漏水報修",value: [{value:286}]},
                    {key: "交通標誌及設施物損壞(含汙損)、傾斜",value: [{value:184}]},
                    {key: "路樹處理",value: [{value:113}]},
                    {key: "道路側溝溝蓋(含周邊)損壞遺失",value: [{value:104}]},
                    {key: "雨水下水道側溝清淤",value: [{value:71}]},
                    {key: "交通號誌電纜線垂落及設施損壞",value: [{value:59}]},
                    {key: "人孔蓋(含周邊)破損、遺失處理",value: [{value:44}]},
                    {key: "橋梁、隧道、車(人)行地下道及涵洞積淹水",value: [{value:17}]},
                    {key: "路面積淹水",value: [{value:9}]},
                    {key: "道路掏空",value: [{value:6}]},
                    {key: "消防局(災害應變中心)",value: [{value:5}]},
                    {key: "道路邊坡坍方",value: [{value:4}]},
                    {key: "道路側溝內溝牆(底)破損",value: [{value:3}]},
                    {key: "動物虐待傷害",value: [{value:1}]},
                    {key: "河濱自行車道破損",value: [{value:1}]}
                ]
            }
        ]
    },
    patrol : {
        patrol_criminalcase: [
            {
                updateTime:"2020-12-31T00:00:00+08:00",
                data: [
                    {
                        key: "發生件數[件]",
                        value: [
                            {value: 541, valueTime: "2020-07-01T01:00:00Z", lastValue: 488, lastValuetime: "2019-12-00T00:00:00Z"},
                            {value: 488, valueTime: "2020-08-01T02:00:00Z", lastValue: 535, lastValuetime: "2019-11-00T00:00:00Z"},
                            {value: 612, valueTime: "2020-09-01T03:00:00Z", lastValue: 292, lastValuetime: "2019-10-00T00:00:00Z"},
                            {value: 451, valueTime: "2020-10-01T04:00:00Z", lastValue: 498, lastValuetime: "2019-09-00T00:00:00Z"},
                            {value: 512, valueTime: "2020-11-01T05:00:00Z", lastValue: 775, lastValuetime: "2019-08-00T00:00:00Z"},
                            {value: 591, valueTime: "2020-12-01T06:00:00Z", lastValue: 700, lastValuetime: "2019-07-00T00:00:00Z"}
                        ]
                    },
                    {
                        key: "破獲件數/總計[件]",
                        value: [
                            {value: 341, valueTime: "2020-12-00T00:00:00Z", lastValue: 388, lastValuetime: "2019-12-00T00:00:00Z"},
                            {value: 388, valueTime: "2020-11-00T00:00:00Z", lastValue: 335, lastValuetime: "2019-11-00T00:00:00Z"},
                            {value: 412, valueTime: "2020-10-00T00:00:00Z", lastValue: 592, lastValuetime: "2019-10-00T00:00:00Z"},
                            {value: 551, valueTime: "2020-09-00T00:00:00Z", lastValue: 198, lastValuetime: "2019-09-00T00:00:00Z"},
                            {value: 412, valueTime: "2020-08-00T00:00:00Z", lastValue: 375, lastValuetime: "2019-08-00T00:00:00Z"},
                            {value: 491, valueTime: "2020-07-00T00:00:00Z", lastValue: 500, lastValuetime: "2019-07-00T00:00:00Z"}
                        ]
                    },
                    {
                        key: "破獲率[%]",
                        value: [
                            {value: 54, valueTime: "2020-12-00T00:00:00Z", lastValue: 48, lastValuetime: "2019-12-00T00:00:00Z"},
                            {value: 48, valueTime: "2020-11-00T00:00:00Z", lastValue: 35, lastValuetime: "2019-11-00T00:00:00Z"},
                            {value: 61, valueTime: "2020-10-00T00:00:00Z", lastValue: 92, lastValuetime: "2019-10-00T00:00:00Z"},
                            {value: 45, valueTime: "2020-09-00T00:00:00Z", lastValue: 92, lastValuetime: "2019-09-00T00:00:00Z"},
                            {value: 52, valueTime: "2020-08-00T00:00:00Z", lastValue: 75, lastValuetime: "2019-08-00T00:00:00Z"},
                            {value: 91, valueTime: "2020-07-00T00:00:00Z", lastValue: 70, lastValuetime: "2019-07-00T00:00:00Z"}
                        ]
                    },
                ]  
            }
        ],
        crimehotspot: [
            {
                updateTime: '2020-12-31T00:00:00+08:00',
                data: [
                    {key: "住宅竊盜" ,value: [{ value: 5, lastValue: 7}]},
                    {key: "機車竊盜" ,value: [{ value: 10, lastValue: 12}]},
                    {key: "強盜" ,value: [{ value: 12, lastValue: 0}]},
                    {key: "搶奪" ,value: [{ value: 0, lastValue: 1}]},
                    {key: "汽車竊盜" ,value: [{ value: 1, lastValue: 12}]}
                ]
            }
        ],
        police_facility:[],
        eoc: [
            {
                updateTime: '2020-12-31T00:00:00+08:00',
                alarm: {
                    // "title": 'EOC未開通',
                    // desc: '',
                    // status: 0
                    "title": '庫斯拉颱風一級應變',
                    // desc: '',
                    status: 1
                },
                data: {
                    '已通報': {
                        value: 888
                    },
                    '處理中': {
                        value: 624
                    },
                    '已完成': {
                        value: 125
                    }
                },
                message: [
                    {
                        desc: '信義仁愛路路樹倒塌',
                        time: '09.19 16:32'
                    },
                    {
                        desc: '光復路二段招牌掉落',
                        time: '09.19 16:32'
                    },
                    {
                        desc: '中山北路二段265-300號淹水',
                        time: '09.19 16:32'
                    },
                    {
                        desc: '仁愛路路樹倒塌',
                        time: '09.19 16:32'
                    },
                    {
                        desc: '信義仁愛路路樹倒塌',
                        time: '09.19 16:32'
                    },
                    {
                        desc: '光復路二段招牌掉落',
                        time: '09.19 16:32'
                    },
                    {
                        desc: '中山北路二段265-300號淹水',
                        time: '09.19 16:32'
                    },
                    {
                        desc: '仁愛路路樹倒塌',
                        time: '09.19 16:32'
                    }
                ]
            }
        ],
        designate: [
            {
                time: "2020-12-31T00:00:00+08:00",
                data: [
                    {key: "避難場所",value: [{value: 288}]},
                    {key: "收容情況",value: [{value: 209987}]},
                    {key: "即時收容場所",value: [{value: 0}]}
                ]
            }
        ],
        flood_risk: [
            {
                updateTime: '2020-12-31T00:00:00+08:00',
                data: [
                    {key: "低風險地區",value: [{value: 2.45}]},
                    {key: "中風險地區",value: [{value: 3.55}]},
                    {key: "高風險地區",value: [{value: 12.21}]},
                    {key: "近一小時降雨強度",value: [{value: 144}]}
                ]
            }
        ],
        flood_respondent: [],
        patrol_fireriskarea: [
            {
                updateTime: '2021-04-13T04:05:06.834122474Z',
                data: [
                    {key: "救災搶救困難地區",value: [{value: 715}]},
                    {key: "安檢不合格場所",value: [{value: 29}]}
                ]
            }
        ],
        fire_respondent: [],
        slope_area_risk: [
            {
                updateTime: '2021-04-13T04:07:40.528771109Z',
                data: [
                    {key: "土石流潛勢溪流",value: [{value: 50}]},
                    {key: "土石流影響範圍",value: [{value: 163}]},
                    {key: "列管邊坡",value: [{value: 34849}]},
                    {key: "老舊聚落",value: [{value: 32}]}
                ]
            }
        ],
        age_hr: [
            {
                updateTime:"2020-06-16T00:00:00+08:00",
                data: [
                    {
                        key: "人口",
                        value: [
                            {value: 22815, valueTime: "2020-06-15T16:10:46Z"},
                            {value: 29115, valueTime: "2020-06-15T17:10:46Z"},
                            {value: 35115, valueTime: "2020-06-15T18:10:46Z"},
                            {value: 19115, valueTime: "2020-06-15T19:10:46Z"},
                            {value: 17115, valueTime: "2020-06-15T20:10:46Z"},
                            {value: 15115, valueTime: "2020-06-15T21:10:46Z"}
                        ]
                    }
                ]
            }
        ]
    },
    Traffic : {
        traffic_live: [
            {
                updateTime: '2021-02-31T00:00:00+08:00',
                data: [
                    {key: "嚴重壅塞" ,value: [{ value: 1.85, lastValue: 2}]},
                    {key: "輕微壅塞" ,value: [{ value: 45.06, lastValue: 31}]},
                    {key: "道路順暢" ,value: [{ value: 53.09, lastValue: 60.1}]}
                ]
            },
            {
                updateTime: '2021-02-31T00:00:00+08:00',
                data: [
                    {
                        key: "壅塞路段",
                        value: [
                            {value: 0.47333333333333333, lastValue: 2, valueTime: "2021-03-30T16:00:00Z"},
                            {value: 0.3416666666666667, lastValue: 2, valueTime: "2021-03-30T16:30:00Z"},
                            {value: 0.525, lastValue: 2, valueTime: "2021-03-30T17:00:00Z"},
                            {value: 0.49166666666666664, lastValue: 2, valueTime: "2021-03-30T17:30:00Z"},
                            {value: 0.4816666666666667, lastValue: 2, valueTime: "2021-03-30T18:00:00Z"},
                            {value: 0.5166666666666667, lastValue: 2, valueTime: "2021-03-30T18:30:00Z"},
                            {value: 0.42333333333333334, lastValue: 2, valueTime: "2021-03-30T19:00:00Z"},
                            {value: 0.495, lastValue: 2, valueTime: "2021-03-30T19:30:00Z"},
                            {value: 0.43833333333333335, lastValue: 2, valueTime: "2021-03-30T20:00:00Z"},
                            {value: 0.335, lastValue: 2, valueTime: "2021-03-30T20:30:00Z"},
                            {value: 0.45166666666666666, lastValue: 2, valueTime: "2021-03-30T21:00:00Z"},
                            {value: 0.495, lastValue: 2, valueTime: "2021-03-30T21:30:00Z"},
                            {value: 0.5433333333333333, lastValue: 2, valueTime: "2021-03-30T22:00:00Z"},
                            {value: 0.53, lastValue: 2, valueTime: "2021-03-30T22:30:00Z"},
                            {value: 1.7283333333333333, lastValue: 2, valueTime: "2021-03-30T23:00:00Z"},
                            {value: 6.136666666666667, lastValue: 2, valueTime: "2021-03-30T23:30:00Z"},
                            {value: 8.838333333333333 ,valueTime: "2021-03-31T00:00:00Z"},
                            {value: 8.288333333333334, lastValue: 2, valueTime: "2021-03-31T00:30:00Z"},
                            {value: 5.96, lastValue: 2, valueTime: "2021-03-31T01:00:00Z"},
                            {value: 5.416666666666667, lastValue: 2, valueTime: "2021-03-31T01:30:00Z"},
                            {value: 3.6685714285714286, lastValue: 2, valueTime: "2021-03-31T02:00:00Z"},
                            {value: 3.408, lastValue: 2, valueTime: "2021-03-31T02:30:00Z"},
                            {value: 3.256666666666667, lastValue: 2, valueTime: "2021-03-31T03:00:00Z"},
                            {value: 3.7916666666666665, lastValue: 2, valueTime: "2021-03-31T03:30:00Z"},
                            {value: 3.7133333333333334, lastValue: 2, valueTime: "2021-03-31T04:00:00Z"},
                            {value: 2.9583333333333335, lastValue: 2, valueTime: "2021-03-31T04:30:00Z"},
                            {value: 3.21, lastValue: 2, valueTime: "2021-03-31T05:00:00Z"},
                            {value: 4.16, lastValue: 2, valueTime: "2021-03-31T05:30:00Z"},
                            {value: 5.548333333333333, lastValue: 2, valueTime: "2021-03-31T06:00:00Z"},
                            {value: 5.948333333333333, lastValue: 2, valueTime: "2021-03-31T06:30:00Z"},
                            {value: 5.428333333333334, lastValue: 2, valueTime: "2021-03-31T07:00:00Z"},
                            {value: 6.47, lastValue: 2, valueTime: "2021-03-31T07:30:00Z"},
                            {value: 6.006666666666667, lastValue: 2, valueTime: "2021-03-31T08:00:00Z"},
                            {value: 5.756666666666667, lastValue: 2, valueTime: "2021-03-31T08:30:00Z"},
                            {value: 6.273333333333333, lastValue: 2, valueTime: "2021-03-31T09:00:00Z"},
                            {value: 7.576666666666667, lastValue: 2, valueTime: "2021-03-31T09:30:00Z"},
                            {value: 9.68 ,valueTime: "2021-03-31T10:00:00Z"},
                            {value: 10.436666666666667, lastValue: 2, valueTime: "2021-03-31T10:30:00Z"},
                            {value: 6.318333333333333, lastValue: 2, valueTime: "2021-03-31T11:00:00Z"},
                            {value: 3.341666666666667, lastValue: 2, valueTime: "2021-03-31T11:30:00Z"},
                            {value: 2.3733333333333335, lastValue: 2, valueTime: "2021-03-31T12:00:00Z"},
                            {value: 2.1466666666666665, lastValue: 2, valueTime: "2021-03-31T12:30:00Z"},
                            {value: 1.6366666666666667, lastValue: 2, valueTime: "2021-03-31T13:00:00Z"},
                            {value: 1.6866666666666668, lastValue: 2, valueTime: "2021-03-31T13:30:00Z"},
                            {value: 1.3633333333333333, lastValue: 2, valueTime: "2021-03-31T14:00:00Z"},
                            {value: 0.8733333333333333, lastValue: 2, valueTime: "2021-03-31T14:30:00Z"},
                            {value: 0.97, lastValue: 2, valueTime: "2021-03-31T15:00:00Z"},
                            {value: 0.9116666666666666, lastValue: 2, valueTime: "2021-03-31T15:30:00Z"},
                            {value: 0.7283333333333334, lastValue: 2, valueTime: "2021-03-31T16:00:00Z"}
                        ]
                    }
                ]
            }
        ],
        traffic_todaywork: [
            {
                updateTime: "2021-02-31T00:00:00+08:00",
                data: [
                    {key: "施工路段",value: [{value: 13}]}
                ]
            }
        ],
        camera:[
            {
                updateTime: "2021-02-31T00:00:00+08:00",
                data: [
                    {key: "監視器位置",value: [{value: 1717}]}
                ]
            }  
        ],
        traffic_accident: [
            {
                time: '2020-12-31T00:00:00+08:00',
                data: [
                    {key: "A1事故件數",value: [{value: 6, lastValue: 5}]},
                    {key: "A1事故受傷",value: [{value: 2, lastValue: 2}]},
                    {key: "A1事故死亡",value: [{value: 6, lastValue: 5}]},
                    {key: "A2事故件數",value: [{value: 1947, lastValue: 2470}]},
                    {key: "A2事故受傷",value: [{value: 2624, lastValue: 3305}]},
                    {key: "A2事故死亡",value: [{value: 0, lastValue: 0}]},
                    {key: "A3事故件數",value: [{value: 1494, lastValue: 1996}]},
                    {key: "A3事故受傷",value: [{value: 0, lastValue: 0}]},
                    {key: "A3事故死亡",value: [{value: 0, lastValue: 0}]},
                    {key: "A4事故件數",value: [{value: 3798, lastValue: 4744}]},
                    {key: "A4事故受傷",value: [{value: 1, lastValue: 0}]},
                    {key: "A4事故死亡",value: [{value: 0, lastValue: 0}]}
                ]
            }
        ],
        traffic_mrt: [
            {
                updateTime: "2021-02-31T00:00:00+08:00",
                // alarm: {
                //     "title": "1號文湖線港墘站-劍南路站區間暫停營運",
                //     "desc": "因系統設備異常，請避開1號文湖線港墘站-劍南路站",
                //     "status": 2
                // },
                data: [
                    {
                        key: "進站",
                        value: [
                            {value:22815, valueTime:"2021-03-15T16:10:46Z"},
                            {value:29115, valueTime:"2021-03-15T17:10:46Z"},
                            {value:35115, valueTime:"2021-03-15T18:10:46Z"},
                            {value:19115, valueTime:"2021-03-15T19:10:46Z"},
                            {value:17115, valueTime:"2021-03-15T20:10:46Z"},
                            {value:15115, valueTime:"2021-03-15T21:10:46Z"}
                        ]
                    },
                    {
                        key: "出站",
                        value: [
                            {value:11075, valueTime:"2021-03-15T16:10:46Z"},
                            {value:14114, valueTime:"2021-03-15T17:10:46Z"},
                            {value:25114, valueTime:"2021-03-15T18:10:46Z"},
                            {value:34114, valueTime:"2021-03-15T19:10:46Z"},
                            {value:24114, valueTime:"2021-03-15T20:10:46Z"},
                            {value:14114, valueTime:"2021-03-15T21:10:46Z"}
                        ]
                    }
                ]
            }
        ],
        traffic_mrt_take: [
            {
                updateTime:"2021-04-13T11:59:00Z",
                data:[
                    {key:"七張",value:[{key:"出站",value:3698},{key:"進站",value:2041}]},
                    {key:"三和國中",value:[{key:"出站",value:3881},{key:"進站",value:826}]},
                    {key:"三民高中",value:[{key:"出站",value:4032},{key:"進站",value:609}]},
                    {key:"三重",value:[{key:"出站",value:1754},{key:"進站",value:718}]},
                    {key:"三重國小",value:[{key:"出站",value:3749},{key:"進站",value:736}]},
                    {key:"中原",value:[{key:"出站",value:318},{key:"進站",value:1309}]},
                    {key:"中和",value:[{key:"出站",value:1094},{key:"進站",value:612}]},
                    {key:"中山",value:[{key:"出站",value:7239},{key:"進站",value:8570}]},
                    {key:"中山國中",value:[{key:"出站",value:2751},{key:"進站",value:3500}]},
                    {key:"中山國小",value:[{key:"出站",value:2765},{key:"進站",value:4114}]},
                    {key:"中正紀念堂",value:[{key:"出站",value:3145},{key:"進站",value:4333}]},
                    {key:"丹鳳",value:[{key:"出站",value:2907},{key:"進站",value:582}]},
                    {key:"亞東醫院",value:[{key:"出站",value:5858},{key:"進站",value:2437}]},
                    {key:"信義安和",value:[{key:"出站",value:2798},{key:"進站",value:5226}]},
                    {key:"先嗇宮",value:[{key:"出站",value:612},{key:"進站",value:1713}]},
                    {key:"內湖",value:[{key:"出站",value:2855},{key:"進站",value:901}]},
                    {key:"公館",value:[{key:"出站",value:3979},{key:"進站",value:4477}]},
                    {key:"六張犁",value:[{key:"出站",value:2288},{key:"進站",value:2053}]},
                    {key:"劍南路站",value:[{key:"出站",value:1765},{key:"進站",value:2517}]},
                    {key:"劍潭",value:[{key:"出站",value:4380},{key:"進站",value:4517}]},
                    {key:"動物園",value:[{key:"出站",value:805},{key:"進站",value:461}]},
                    {key:"北投",value:[{key:"出站",value:5174},{key:"進站",value:2309}]},
                    {key:"北門",value:[{key:"出站",value:1889},{key:"進站",value:2482}]},
                    {key:"十四張",value:[{key:"出站",value:248},{key:"進站",value:338}]},
                    {key:"南京三民",value:[{key:"出站",value:2663},{key:"進站",value:5607}]},
                    {key:"南京復興",value:[{key:"出站",value:5445},{key:"進站",value:12149}]},
                    {key:"南勢角",value:[{key:"出站",value:5668},{key:"進站",value:1115}]},
                    {key:"南港展覽館",value:[{key:"出站",value:5049},{key:"進站",value:6780}]},
                    {key:"南港站",value:[{key:"出站",value:4153},{key:"進站",value:3518}]},
                    {key:"南港軟體園區",value:[{key:"出站",value:615},{key:"進站",value:2699}]},
                    {key:"古亭",value:[{key:"出站",value:5968},{key:"進站",value:6413}]},
                    {key:"台北101",value:[{key:"出站",value:2659},{key:"進站",value:7740}]},
                    {key:"台北小巨蛋",value:[{key:"出站",value:2606},{key:"進站",value:6493}]},
                    {key:"台北橋",value:[{key:"出站",value:2728},{key:"進站",value:770}]},
                    {key:"台北車站",value:[{key:"出站",value:20260},{key:"進站",value:18473}]},
                    {key:"台大醫院",value:[{key:"出站",value:1443},{key:"進站",value:4596}]},
                    {key:"台電大樓",value:[{key:"出站",value:3285},{key:"進站",value:2576}]},
                    {key:"唭哩岸",value:[{key:"出站",value:1786},{key:"進站",value:682}]},
                    {key:"善導寺",value:[{key:"出站",value:2691},{key:"進站",value:5345}]},
                    {key:"國父紀念館",value:[{key:"出站",value:2955},{key:"進站",value:4983}]},
                    {key:"圓山",value:[{key:"出站",value:5392},{key:"進站",value:3814}]},
                    {key:"土城",value:[{key:"出站",value:2237},{key:"進站",value:570}]},
                    {key:"士林",value:[{key:"出站",value:4463},{key:"進站",value:4349}]},
                    {key:"大坪林",value:[{key:"出站",value:4423},{key:"進站",value:4638}]},
                    {key:"大安",value:[{key:"出站",value:3569},{key:"進站",value:6285}]},
                    {key:"大安森林公園",value:[{key:"出站",value:1223},{key:"進站",value:1861}]},
                    {key:"大橋頭",value:[{key:"出站",value:1998},{key:"進站",value:2133}]},
                    {key:"大湖公園",value:[{key:"出站",value:841},{key:"進站",value:268}]},
                    {key:"大直",value:[{key:"出站",value:1981},{key:"進站",value:1379}]},
                    {key:"奇岩",value:[{key:"出站",value:1597},{key:"進站",value:1416}]},
                    {key:"小南門",value:[{key:"出站",value:1172},{key:"進站",value:2079}]},
                    {key:"小碧潭",value:[{key:"出站",value:665},{key:"進站",value:305}]},
                    {key:"市政府",value:[{key:"出站",value:7671},{key:"進站",value:14724}]},
                    {key:"幸福",value:[{key:"出站",value:1075},{key:"進站",value:423}]},
                    {key:"府中",value:[{key:"出站",value:7505},{key:"進站",value:2269}]},
                    {key:"後山埤",value:[{key:"出站",value:3386},{key:"進站",value:2049}]},
                    {key:"徐匯中學",value:[{key:"出站",value:4109},{key:"進站",value:671}]},
                    {key:"復興崗",value:[{key:"出站",value:914},{key:"進站",value:294}]},
                    {key:"忠孝復興",value:[{key:"出站",value:7089},{key:"進站",value:8638}]},
                    {key:"忠孝敦化",value:[{key:"出站",value:4917},{key:"進站",value:8184}]},
                    {key:"忠孝新生",value:[{key:"出站",value:3982},{key:"進站",value:7108}]},
                    {key:"忠義",value:[{key:"出站",value:414},{key:"進站",value:700}]},
                    {key:"文德",value:[{key:"出站",value:1213},{key:"進站",value:717}]},
                    {key:"新北產業園區",value:[{key:"出站",value:580},{key:"進站",value:1038}]},
                    {key:"新埔",value:[{key:"出站",value:11311},{key:"進站",value:4102}]},
                    {key:"新埔民生",value:[{key:"出站",value:1123},{key:"進站",value:671}]},
                    {key:"新店",value:[{key:"出站",value:2796},{key:"進站",value:1074}]},
                    {key:"新店市公所",value:[{key:"出站",value:3160},{key:"進站",value:1123}]},
                    {key:"新莊",value:[{key:"出站",value:3552},{key:"進站",value:882}]},
                    {key:"昆陽",value:[{key:"出站",value:2158},{key:"進站",value:3642}]},
                    {key:"明德",value:[{key:"出站",value:2737},{key:"進站",value:1275}]},
                    {key:"景安",value:[{key:"出站",value:7864},{key:"進站",value:2253}]},
                    {key:"景平",value:[{key:"出站",value:1138},{key:"進站",value:535}]},
                    {key:"景美",value:[{key:"出站",value:3726},{key:"進站",value:1974}]},
                    {key:"木柵",value:[{key:"出站",value:995},{key:"進站",value:457}]},
                    {key:"東湖站",value:[{key:"出站",value:2572},{key:"進站",value:606}]},
                    {key:"東門",value:[{key:"出站",value:3845},{key:"進站",value:4507}]},
                    {key:"松山",value:[{key:"出站",value:4679},{key:"進站",value:5041}]},
                    {key:"松山機場",value:[{key:"出站",value:618},{key:"進站",value:767}]},
                    {key:"松江南京",value:[{key:"出站",value:3874},{key:"進站",value:12927}]},
                    {key:"板新",value:[{key:"出站",value:756},{key:"進站",value:445}]},
                    {key:"板橋",value:[{key:"出站",value:11606},{key:"進站",value:6752}]},
                    {key:"橋和",value:[{key:"出站",value:174},{key:"進站",value:923}]},
                    {key:"民權西路",value:[{key:"出站",value:3155},{key:"進站",value:5968}]},
                    {key:"永安市場",value:[{key:"出站",value:7989},{key:"進站",value:1830}]},
                    {key:"永寧",value:[{key:"出站",value:3337},{key:"進站",value:1410}]},
                    {key:"永春",value:[{key:"出站",value:3925},{key:"進站",value:3578}]},
                    {key:"江子翠",value:[{key:"出站",value:7663},{key:"進站",value:2696}]},
                    {key:"海山",value:[{key:"出站",value:6929},{key:"進站",value:1322}]},
                    {key:"淡水",value:[{key:"出站",value:6712},{key:"進站",value:2666}]},
                    {key:"港墘站",value:[{key:"出站",value:2109},{key:"進站",value:6616}]},
                    {key:"石牌",value:[{key:"出站",value:5527},{key:"進站",value:3810}]},
                    {key:"秀朗橋",value:[{key:"出站",value:797},{key:"進站",value:192}]},
                    {key:"科技大樓",value:[{key:"出站",value:2586},{key:"進站",value:2964}]},
                    {key:"竹圍",value:[{key:"出站",value:2250},{key:"進站",value:731}]},
                    {key:"紅樹林",value:[{key:"出站",value:3028},{key:"進站",value:918}]},
                    {key:"芝山",value:[{key:"出站",value:4920},{key:"進站",value:3349}]},
                    {key:"菜寮",value:[{key:"出站",value:2783},{key:"進站",value:880}]},
                    {key:"萬芳社區",value:[{key:"出站",value:617},{key:"進站",value:150}]},
                    {key:"萬芳醫院",value:[{key:"出站",value:3731},{key:"進站",value:1212}]},
                    {key:"萬隆",value:[{key:"出站",value:2530},{key:"進站",value:1055}]},
                    {key:"葫洲",value:[{key:"出站",value:2286},{key:"進站",value:999}]},
                    {key:"蘆洲",value:[{key:"出站",value:4359},{key:"進站",value:695}]},
                    {key:"行天宮",value:[{key:"出站",value:3382},{key:"進站",value:7913}]},
                    {key:"西湖站",value:[{key:"出站",value:1388},{key:"進站",value:7028}]},
                    {key:"西門",value:[{key:"出站",value:9870},{key:"進站",value:8876}]},
                    {key:"象山",value:[{key:"出站",value:1623},{key:"進站",value:3753}]},
                    {key:"輔大站",value:[{key:"出站",value:2865},{key:"進站",value:1504}]},
                    {key:"辛亥",value:[{key:"出站",value:1001},{key:"進站",value:205}]},
                    {key:"迴龍",value:[{key:"出站",value:3114},{key:"進站",value:706}]},
                    {key:"關渡",value:[{key:"出站",value:1770},{key:"進站",value:2876}]},
                    {key:"雙連",value:[{key:"出站",value:2393},{key:"進站",value:3449}]},
                    {key:"頂埔",value:[{key:"出站",value:1668},{key:"進站",value:1658}]},
                    {key:"頂溪",value:[{key:"出站",value:11043},{key:"進站",value:2709}]},
                    {key:"頭前庄",value:[{key:"出站",value:1323},{key:"進站",value:814}]},
                    {key:"麟光",value:[{key:"出站",value:996},{key:"進站",value:346}]},
                    {key:"龍山寺",value:[{key:"出站",value:5280},{key:"進站",value:2863}]}
                ]
            }
        ],
        youbike: [
            {
                updateTime: '2020-12-31T12:00:00+08:00',
                data: [
                    {key: "使用中" ,value: [{ value: 4830}]},
                    {key: "可使用" ,value: [{ value: 10758}]}
                ]
            },
            {
                updateTime: "2021-02-31T00:00:00+08:00",
                data: [
                    {
                        key: "使用中",
                        value: [
                            {value: 3541, valueTime: "2020-07-01T01:00:00Z", lastValue: 488, lastValuetime: "2019-12-00T00:00:00Z"},
                            {value: 4488, valueTime: "2020-08-01T02:00:00Z", lastValue: 535, lastValuetime: "2019-11-00T00:00:00Z"},
                            {value: 4612, valueTime: "2020-09-01T03:00:00Z", lastValue: 292, lastValuetime: "2019-10-00T00:00:00Z"},
                            {value: 4451, valueTime: "2020-10-01T04:00:00Z", lastValue: 498, lastValuetime: "2019-09-00T00:00:00Z"},
                            {value: 3912, valueTime: "2020-11-01T05:00:00Z", lastValue: 775, lastValuetime: "2019-08-00T00:00:00Z"},
                            {value: 3591, valueTime: "2020-12-01T06:00:00Z", lastValue: 700, lastValuetime: "2019-07-00T00:00:00Z"}
                        ]
                    },
                    {
                        key: "可使用",
                        value: [
                            {value: 10541, valueTime: "2020-07-01T01:00:00Z", lastValue: 488, lastValuetime: "2019-12-00T00:00:00Z"},
                            {value: 10488, valueTime: "2020-08-01T02:00:00Z", lastValue: 535, lastValuetime: "2019-11-00T00:00:00Z"},
                            {value: 10612, valueTime: "2020-09-01T03:00:00Z", lastValue: 292, lastValuetime: "2019-10-00T00:00:00Z"},
                            {value: 10451, valueTime: "2020-10-01T04:00:00Z", lastValue: 498, lastValuetime: "2019-09-00T00:00:00Z"},
                            {value: 9512, valueTime: "2020-11-01T05:00:00Z", lastValue: 775, lastValuetime: "2019-08-00T00:00:00Z"},
                            {value: 9591, valueTime: "2020-12-01T06:00:00Z", lastValue: 700, lastValuetime: "2019-07-00T00:00:00Z"}

                        ]
                    }
                ]
            }
        ],
        bus: [
            {
                updateTime: "2021-02-31T00:00:00+08:00",
                data: [
                    {
                        key: "公車",
                        value: [
                            {key: "use", value: 593},
                            {key: "total", value: 690}
                        ]
                    },
                    {
                        key: "路線",
                        value: [
                            {key: "use", value: 593},
                            {key: "total", value: 690}
                        ]
                    }
                ]
            }
        ]
    },
    Construction: {
        building_license: [
            {
                updateTime: '2020-12-31T00:00:00+08:00',
                data: [
                    {
                        key: "建照",
                        value: [
                            {value:292, valueTime: "2020-01-15T00:00:00Z"},
                            {value:498, valueTime: "2020-02-16T00:00:00Z"},
                            {value:775, valueTime: "2020-03-17T00:00:00Z"},
                            {value:700, valueTime: "2020-04-20T00:00:00Z"},
                            {value:443, valueTime: "2020-05-21T00:00:00Z"},
                            {value:296, valueTime: "2020-06-22T00:00:00Z"}
                        ]
                    },
                    {
                        key: "使照",
                        value: [
                            {value:226, valueTime: "2020-01-11T00:00:00Z"},
                            {value:735, valueTime: "2020-02-12T00:00:00Z"},
                            {value:522, valueTime: "2020-03-13T00:00:00Z"},
                            {value:50, valueTime: "2020-04-14T00:00:00Z"},
                            {value:558, valueTime: "2020-05-15T00:00:00Z"},
                            {value:535, valueTime: "2020-06-17T00:00:00Z"}
                        ]
                    }
                ]
            }
        ],
        building_renew: [
            {
                updateTime: '2021-03-22T00:00:00+08:00',
                data: [
                    {key: "公劃地區內事業" ,value: [{ value: 4830}]},
                    {key: "公告自劃單元" ,value: [{ value: 10758}]},
                    {key: "核准自劃單元" ,value: [{ value: 10758}]}
                ]
            }
        ],
        social_house: [
            {
                updateTime: '2021-03-22T00:00:00+08:00',
                data: [
                    {key: "施工中及待開工" ,value: [{ value: 9832}]},
                    {key: "已完工" ,value: [{ value: 4213}]},
                    {key: "都更連開分回" ,value: [{ value: 2980}]},
                    {key: "規劃中" ,value: [{ value: 2246}]},
                    {key: "招標中及待上鋼" ,value: [{ value: 388}]}
                ]
            }
        ],
        building_unsued: [
            {
                updateTime: '2021-02-31T00:00:00+08:00',
                data: [
                    {key: "閒置市有公有地",value: [{value: 33}]},
                    {key: "土石流影響範圍",value: [{value: 24.5}]},
                    {key: "閒置市有(公用)建物",value: [{value: 32}]},
                    {key: "閒置市有(非公用)建物",value: [{value: 5}]}
                ]
            }
        ],
        work_live: [
            {
                data: [
                    {
                        key: "residence",
                        value: [{value:906271}]
                    },
                    {
                        key: "work",
                        value: [{value:1328392}]
                    }
                ]
            }
        ],
        building_age: [
            {
                updateTime: "2021-02-31T00:00:00+08:00",
                data: [
                    {
                        key: "<10",
                        value: [{value:5045}]
                    },
                    {
                        key: "11-20",
                        value: [{value:14499}]
                    },
                    {
                        key: "21-30",
                        value: [{value:21748}]
                    },
                    {
                        key: "31-40",
                        value: [{value:49315}]
                    },
                    {
                        key: "41-50",
                        value: [{value:81376}]
                    },
                    {
                        key: ">50",
                        value: [{value:81098}]
                    },
                    {
                        key: "average",
                        value: [{value: 44.23180325666486}]
                    }
                ]
            },
            {
                updateTime:"2021-04-13T13:33:02.85222631Z",
                data:[
                    {
                        key:"中正區",
                        value:[{key:"11-20",value:922},{key:"21-30",value:958},{key:"31-40",value:2216},{key:"41-50",value:4064},{key:"\u003c10",value:282},{key:"\u003e50",value:7499},{key:"total",value:15941}],
                    },{
                        key:"信義區",
                        value:[{key:"11-20",value:814},{key:"21-30",value:1953},{key:"31-40",value:4749},{key:"41-50",value:7834},{key:"\u003c10",value:213},{key:"\u003e50",value:4819},{key:"total",value:20382}],
                    },{
                        key:"內湖區",
                        value:[{key:"11-20",value:2617},{key:"21-30",value:4016},{key:"31-40",value:8350},{key:"41-50",value:4560},{key:"\u003c10",value:811},{key:"\u003e50",value:1500},{key:"total",value:21854}],
                    },{
                        key:"文山區",
                        value:[{key:"11-20",value:1522},{key:"21-30",value:3495},{key:"31-40",value:4719},{key:"41-50",value:7922},{key:"\u003c10",value:590},{key:"\u003e50",value:4788},{key:"total",value:23036}],
                    },{
                        key:"中山區",
                        value:[{key:"11-20",value:1490},{key:"21-30",value:1849},{key:"31-40",value:4194},{key:"41-50",value:6223},{key:"\u003c10",value:506},{key:"\u003e50",value:8931},{key:"total",value:23193}],
                    },{
                        key:"南港區",
                        value:[{key:"11-20",value:1051},{key:"21-30",value:817},{key:"31-40",value:2040},{key:"41-50",value:4605},{key:"\u003c10",value:312},{key:"\u003e50",value:1805},{key:"total",value:10630}],
                    },{
                        key:"士林區",
                        value:[{key:"11-20",value:1804},{key:"21-30",value:2263},{key:"31-40",value:5542},{key:"41-50",value:10450},{key:"\u003c10",value:622},{key:"\u003e50",value:10003},{key:"total",value:30684}],
                    },{
                        key:"大同區",
                        value:[{key:"11-20",value:693},{key:"21-30",value:762},{key:"31-40",value:1738},{key:"41-50",value:3987},{key:"\u003c10",value:357},{key:"\u003e50",value:8997},{key:"total",value:16534}],
                    },{
                        key:"大安區",
                        value:[{key:"11-20",value:1103},{key:"21-30",value:1524},{key:"31-40",value:5641},{key:"41-50",value:8921},{key:"\u003c10",value:404},{key:"\u003e50",value:11322},{key:"total",value:28915}],
                    },{
                        key:"松山區",
                        value:[{key:"11-20",value:565},{key:"21-30",value:1149},{key:"31-40",value:3045},{key:"41-50",value:6245},{key:"\u003c10",value:125},{key:"\u003e50",value:4610},{key:"total",value:15739}],
                    },{
                        key:"萬華區",
                        value:[{key:"11-20",value:492},{key:"21-30",value:795},{key:"31-40",value:2936},{key:"41-50",value:6626},{key:"\u003c10",value:238},{key:"\u003e50",value:11021},{key:"total",value:22108}],
                    },{
                        key:"北投區",
                        value:[{key:"11-20",value:1426},{key:"21-30",value:2167},{key:"31-40",value:4145},{key:"41-50",value:9939},{key:"\u003c10",value:585},{key:"\u003e50",value:5803},{key:"total",value:24065}]
                    }
                ]
            }
        ],
        building_publand:[
            {
                updateTime: '2020-12-31T00:00:00+08:00',
                data: [
                    {key: "國有地",value: [{value: 102123}]},
                    {key: "臺北市有",value: [{value: 6492}]},
                    {key: "台北市共有地",value: [{value: 8492}]},
                    {key: "公私共有地",value: [{value: 2123}]},
                    {key: "臺北市及國有共有",value: [{value: 1492}]},
                    {key: "其他機關有地",value: [{value: 4246}]},
                    {key: "機關共有地",value: [{value: 2123}]},
                    {key: "台北市公有土地面積",value: [{value: 1211928}]},
                    {key: "台北市總面積",value: [{value: 2815110}]},
                ]
            }
        ],
        building_landuse:[
            {
                updateTime: '2020-12-31T00:00:00+08:00',
                data: [
                    { key: '其他', value:[{value: 102123 }]},
                    { key: '居住用地', value:[{value: 34041 }]},
                    { key: '商業用地', value:[{value: 68082 }]},
                    { key: '綠地', value:[{value: 51061 }]},
                    { key: '水域', value:[{value: 51061 }]},
                    { key: '交通用地', value:[{value: 17020 }]},
                    { key: '機關用地', value:[{value: 17020 }]},
                    { key: '其他2', value:[{value: 8510 }]},
                    { key: '其他3', value:[{value: 8510 }]},
                    { key: '其他4', value:[{value: 4255 }]},
                    { key: '其他5', value:[{value: 4255 }]},
                    { key: '其他6', value:[{value: 4255 }]},
                    { key: '其他7', value:[{value: 4255 }]}
                ]
            }
        ]
    }
}

export default topicListData
