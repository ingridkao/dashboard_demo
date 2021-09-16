export const topicList = [
    {
        index: 'Sentiment',
        name: '民情熱議',
        desc: 'dadsadd',
        thumbnail: 'telecom_data'
    },
    {
        index: 'Patrol',
        name: '城市安防',
        desc: 'dadsadd',
        thumbnail: 'telecom_data'
    },
    {
        index: 'Traffic',
        name: '城市交通',
        desc: 'dadsadd',
        thumbnail: 'telecom_data'
    },
    {
        index: 'Construction',
        name: '城市建設',
        desc: '電信數據電信數據居住動態人口推估',
        thumbnail: 'telecom_data'
    }
]

export const topicComponentList = [
    {
        index: "Sentiment",
        groups: ['民眾陳情'],
        components: [
            {
                index: 'circular',
                name: '單一陳情系統案件(本週)',
                group_index: 0,
                source_from: 'HelloTaipei陳情系統',
                sample_data: '',
                calculation_config:{"label":"單一陳情"},
                request_list: [
                    {
                        type: 'AlarmBar',
                        name: '累計件數',
                        color: ['#27d5d7'],
                        config:{
                            total: {
                                title: '單一陳情系統案件累積件數',
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
                index: 'dispatching',
                name: '派工案件(當週)',
                group_index: 0,
                source_from: '派工系統',
                sample_data: '2020-12-31T00:00:00+08:00',
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
                        form_data: {
                            column: '案件類型',
                            start: "2020-12-25T00:00:00+08:00",
                            end: "2020-12-31T23:59:59+08:00"
                        }
                    }
                ],
                map_config: [
                    {
                        raster:{
                            index: "sentiment_dispatching",
                            title: "派工類別",
                            symbol: "heatmap",
                            paint: {
                                "circle-color":["match",["get", "案件類型"],"大型廢棄物清運聯繫","#fc9f0b","場所與設施噪音舉發","#dac117","污染舉發","#FDD79B","路燈故障或設施損壞","#FDD79B","#555"]
                            },
                            property: ["案件編號", "案件類型", "案件狀態", "成案時間", "結案時間", "案件內容"]
                        }
                    }
                ]
            }
        ]
    },
    {
        index: 'Patrol',
        groups: ['災情應變', '風險地區'],
        components: [
            {
                index: 'designate',
                name: '避難收容地點',
                group_index: 0,
                source_from: '消防局',
                sample_data: '樣本數據',
                request_list: [
                    {
                        type: 'MapDisplay',
                        path: '/patrol/component/patroldesignateplace',
                        config: {
                            mapLabels:[
                                {
                                    select_array: '避難場所',
                                    symbol: 'circle_stroke',
                                    color: '#FDD79B',
                                    unit: '處'
                                }
                            ],
                            statistic: true
                        } 
                    }
                ],
                map_config:[
                    {
                        raster:{
                            index: 'patrol_designate_place',
                            title: '避難場所',
                            symbol: 'circle',
                            color: '#4cd9c1',
                            paint: {
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
                            property: ['名稱', '道路門牌', '服務里別','容納人數']
                        }
                    }
                ]
            },
            {
                index: 'flood_risk',
                name: '水災風險地區',
                group_index: 1,
                source_from: '消防局',
                sample_data: '2020-07-31T12:00:00+08:00',
                request_list: [
                    {
                        type: 'MapDisplay',
                        config: {
                            mapLabels:[
                                {
                                    select_array: '高風險地區',
                                    symbol: 'Area',
                                    unit: 'km²',
                                    color: '#baf4f5'
                                },
                                {
                                    select_array: '低風險地區',
                                    symbol: 'Area',
                                    unit: 'km²',
                                    color: '#009ff4'
                                },
                                {
                                    select_array: '中風險地區',
                                    symbol: 'Area',
                                    unit: 'km²',
                                    color: '#352ad1'
                                }
                            ]
                        }
                    }
                ],
                map_config:[
                    {
                        raster:{
                            index: 'patrol_flood_100',
                            title: '水災風險地區',
                            symbol: 'fill',
                            paint: {
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
                            property: ['name']
                        }
                    },
                    {
                        raster:{
                            index: 'patrol_flood_78_8',
                            title: '水災風險地區',
                            symbol: 'fill',
                            paint: {
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
                            property: ['name']
                        }
                    },
                    {
                        raster:{
                            index: 'patrol_flood_130',
                            title: '水災風險地區',
                            symbol: 'fill',
                            paint: {
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
                            property: ['name']
                        }
                    }
                ]
            },
            {
                index: 'slope_area_risk',
                name: '山坡地風險地點',
                group_index: 1,
                sample_data: '',
                source_from: '工務局',
                request_list: [
                    {
                        type: 'MapDisplay',
                        path:'/patrol/component/patroldebris',
                        config: {
                            mapLabels: [
                                {
                                    select_array: '土石流潛勢溪流',
                                    symbol: 'line',
                                    unit: '處',
                                    color: '#d7c500',
                                },
                                {
                                    select_array: '土石流影響範圍',
                                    symbol: 'Area',
                                    unit: '處',
                                    color: '#958f00',
                                },
                                {
                                    select_array: '列管邊坡',
                                    symbol: 'line',
                                    unit: '處',
                                    color: '#ff9800',
                                },
                                {
                                    select_array: '老舊聚落',
                                    symbol: 'Area',
                                    unit: '處',
                                    color: '#9e7b5c',
                                }
                            ]
                        }
                    }
                ],
                map_config:[
                    {
                        raster:{
                            index: 'patrol_debris',
                            title: '土石流潛勢溪流',
                            symbol: 'line',
                            color:  '#d7c500',
                            property: ['mark','risk','stra_1','stra_2','basin','sub_basin','date','year']
                        }
                    },
                    {
                        raster:{
                            index: 'patrol_debrisarea',
                            title: '土石流影響範圍',
                            symbol: 'fill',
                            color: '#958f00',
                            property: ['total_res','risk']
                        }
                    },
                    {
                        raster:{
                            index: 'patrol_artificial_slope',
                            title: '列管邊坡',
                            symbol: 'line',
                            color: '#ff9800',
                            property: ['level']
                        }
                    },
                    {
                        raster:{
                            index: 'patrol_old_settlement',
                            title: '老舊聚落',
                            symbol: 'fill',
                            color: '#9e7b5c',
                            property: ['name']
                        }
                    },
                ]
            }
        ]
    },
    {
        index: 'Traffic',
        groups: ['道路交通', '大眾運輸'],
        components: [
            {
                index: 'traffic_live',
                name: '即時路況(路口感測)',
                group_index: 0,
                source_from: '交通局',
                update_loop: 300000,
                request_list: [
                    {
                        type: 'StatisticLine',
                        color: ['#EC4037', '#ddd'],
                        config:{
                            line: {
                                target_array: [
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
                                y_axes_unit: '%'
                            }
                        }
                    },
                    {
                        type: 'CountPie',
                        color: ['#EC4037', '#ff8c1a', '#4dd97a'],
                        config:{
                            select_array:["嚴重壅塞"],
                            unit:"%",
                            center:{
                                title:"壅塞程度",
                                "formula":"sum"
                            }
                        }
                    }
                ],
                map_config: [
                    {
                        raster:{
                            index: 'traffic_live_view',
                            title: '壅塞程度',
                            symbol: 'fill',
                            paint: {
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
                            property: ['壅塞程度'],
                        }
                    }
                ]
            },
            {
                index: 'traffic_todaywork',
                name: '即時道路施工',
                group_index: 0,
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
                                    symbol: 'triangle2',
                                    unit: '處'
                                }
                            ]
                        }
                    }
                ],
                map_config:[
                    {
                        raster:{
                            index: 'traffic_todaywork_view',
                            title: '施工路段',
                            symbol: 'triangle2',
                            property: ['施工類型','主管機關','施工單位','起始日期','結束日期','施工時段']
                        }
                    }
                ]
            },
            {
                index: 'traffic_accident',
                name: '交通事故統計',
                group_index: 0,
                source_from: '警察局',
                sample_data: '2021-02-28T00:00:00+08:00',
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
                                        select_array: ["A1事故件數", "A2事故件數", "A3事故件數", "A4事故件數"],
                                        "select_index": "lastValue",
                                        title: "上月事故總數",
                                        "formula": "sum",
                                        unit: "件"
                                    }
                                ],
                                "sub": [
                                    {
                                        select_array: ["A1事故死亡"],
                                        "select_index": "value",
                                        title: "本月A1事故死亡",
                                        "formula": "get",
                                        unit: "人"
                                    },
                                    {
                                        select_array: ["A1事故受傷","A2事故受傷"],
                                        "select_index": "value",
                                        title: "本月A1+A2事故受傷",
                                        "formula": "sum",
                                        unit: "人"
                                    },
                                ]
                            },
                            "pie": {
                                select_array: ["A1事故件數", "A2事故件數", "A3事故件數", "A4事故件數"],
                                "select_name": ["本月A1事故件數", "本月A2事故件數", "本月A3事故件數", "本月A4事故件數"],
                                "select_index": "value",
                                unit: "件",
                                center: {
                                    title: "本月事故累積",
                                    "formula": "sum"
                                }
                            }
                        }
                    }
                ],
                map_config: [
                    {
                        raster:{
                            index: 'traffic_accident_location_view',
                            title: '交通事故統計',
                            symbol: 'heatmap',
                            heatmap: {
                                filter:'type',
                                zoom: 16.5
                            },
                            paint: {
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
                            property: ['處理別','位置','時間']
                        },
                    }
                ]
            },
            {
                index: 'traffic_mrt',
                name: '即時捷運運行情形',
                group_index: 1,
                update_loop: 900000,
                source_from: '捷運公司',
                request_list: [
                    {
                        "type": 'KeyFigures',
                        config:{
                            "figures": {
                                "main": [
                                    {
                                        select_array: ['進站'],
                                        "select_index": 'value',
                                        title: '近一小時進站人數',
                                        "formula": 'last',
                                        unit: '人'
                                    },
                                    {
                                        select_array: ['出站'],
                                        "select_index": 'value',
                                        title: '近一小時出站人數',
                                        "formula": 'last',
                                        unit: '人'
                                    }
                                ]
                            },
                            line: {
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
                            index: 'metrostationlive',
                            title: '捷運站點',
                            url: '/traffic/component/metrostationlive',
                            interval: 15,
                            symbol: 'metro',
                            paint: {
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
            }
        ]
    },
    {
        index: 'Construction',
        groups: ['開發建設動態', '活化潛力', '土地分類'],
        components: [
            {
                index: 'building_renew',
                name: '都市更新案件',
                group_index: 0,
                source_from: '都市更新處',
                update_loop: 180000,
                request_list: [
                    {
                        type: 'CountPie',
                        color: ['#e0e08c', '#f8ea21', '#f7ac3b', '#f7773b', '#f74922'],
                        config:{
                            center: {
                                title: '總件數'
                            }
                        },
                        config:{
                            center:{
                                title:"總件數"
                            }
                        }

                    }
                ],
                map_config: [
                    {
                        raster:{
                            index:'building_renewunit_12',
                            title: '都市更新',
                            symbol: 'line',
                            color: '#e0e08c'
                        }
                    },
                    {
                        raster:{
                            index:'building_renewunit_20',
                            title: '都市更新',
                            symbol: 'line',
                            color: '#f8ea21'
                        },
                    },
                    {
                        raster:{
                            index: 'building_renewunit_30',
                            title: '都市更新',
                            symbol: 'line',
                            color: '#f7ac3b'
                        }
                    },
                ]
            },
            {
                index: 'social_house',
                name: '社會住宅建設進度',
                group_index: 0,
                source_from: '都發局',
                sample_data: '',
                request_list: [
                    {
                        type: 'CountPie',
                        config:{
                            center: {
                                title: '目標執行率'
                            }
                        }
                    }
                ],
                map_config: [
                    {
                        raster:{
                            index: 'building_social_house',
                            title: '社會住宅',
                            symbol: 'circle',
                            paint: {
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
                            property: ['name','progress','address','floors1']
                        }
                    }
                ]
            },
            {
                index: 'building_age',
                name: '全市屋齡分布',
                group_index: 1,
                sample_data: '',
                source_from: '建管處',
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
                                title: '全市平均屋齡(年)'
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
                        raster:{
                            index: 'building_age',
                            title: '屋齡',
                            symbol: 'circle',
                            paint: {
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
                            property: ['age_2021']
                        }
                    }
                ]
            }
        ]
    }
]

export const topicContent = {
    Sentiment : {
        circular: [
            {"updateTime":"2020-12-31T23:58:32+08:00","data":[{"key":"交通運輸","value":[{"key":"average","value":226.85714285714286},{"key":"yellow","value":286.21664942861094},{"key":"red","value":345.57615600007904}]},{"key":"垃圾、噪音、污染及資源回收","value":[{"key":"average","value":130.28571428571428},{"key":"yellow","value":150.65175244251054},{"key":"red","value":171.0177905993068}]},{"key":"都市發展、建管、產業、財稅及地政","value":[{"key":"average","value":129.57142857142858},{"key":"yellow","value":169.64584913708953},{"key":"red","value":209.7202697027505}]},{"key":"衛福、勞動、民政及區政","value":[{"key":"average","value":117},{"key":"yellow","value":158.50043029036826},{"key":"red","value":200.00086058073651}]},{"key":"警消、法律及政風","value":[{"key":"average","value":108.14285714285714},{"key":"yellow","value":136.46966711618992},{"key":"red","value":164.79647708952274}]},{"key":"道路、山坡地、路樹及路燈","value":[{"key":"average","value":76.42857142857143},{"key":"yellow","value":100.469353106243},{"key":"red","value":124.5101347839146}]},{"key":"文教、體育、資訊、觀光及媒體","value":[{"key":"average","value":61.285714285714285},{"key":"yellow","value":92.9433212962363},{"key":"red","value":124.60092830675833}]},{"key":"非屬前述各類之其他事項","value":[{"key":"average","value":60},{"key":"yellow","value":87.09243436828814},{"key":"red","value":114.18486873657626}]},{"key":"公園、排水溝、下水道及自來水","value":[{"key":"average","value":42},{"key":"yellow","value":51.10258989832799},{"key":"red","value":60.20517979665599}]},{"key":"員工事件通報","value":[{"key":"average","value":3.5},{"key":"yellow","value":6.701562118716424},{"key":"red","value":9.903124237432849}]}]}
        ],
        dispatching: [
            {"updateTime":"2020-12-31T23:58:32+08:00","data":[{"key":"大型廢棄物清運聯繫","value":[{"key":"average","value":207},{"key":"yellow","value":249.33539552532508},{"key":"red","value":291.67079105065017}]},{"key":"場所與設施噪音舉發","value":[{"key":"average","value":106.28571428571429},{"key":"yellow","value":124.80762629527194},{"key":"red","value":143.32953830482958}]},{"key":"污染舉發","value":[{"key":"average","value":36.142857142857146},{"key":"yellow","value":43.059267678234406},{"key":"red","value":49.975678213611666}]},{"key":"交通號誌異常","value":[{"key":"average","value":24},{"key":"yellow","value":37.92838827718412},{"key":"red","value":51.85677655436824}]},{"key":"路燈故障或設施損壞","value":[{"key":"average","value":22.571428571428573},{"key":"yellow","value":26.42062673865928},{"key":"red","value":30.26982490588999}]},{"key":"道路散落物或油漬處理","value":[{"key":"average","value":20.285714285714285},{"key":"yellow","value":25.058083739568588},{"key":"red","value":29.830453193422894}]},{"key":"鄰里無主垃圾清運","value":[{"key":"average","value":17},{"key":"yellow","value":20.070597894314954},{"key":"red","value":23.141195788629908}]},{"key":"市區道路坑洞處理","value":[{"key":"average","value":14.285714285714286},{"key":"yellow","value":20.349995793368894},{"key":"red","value":26.4142773010235}]},{"key":"用戶無水、漏水報修","value":[{"key":"average","value":10.857142857142858},{"key":"yellow","value":14.170689572783772},{"key":"red","value":17.48423628842469}]},{"key":"交通標誌及設施物損壞(含汙損)、傾斜","value":[{"key":"average","value":8.142857142857142},{"key":"yellow","value":12.086335354812075},{"key":"red","value":16.029813566767004}]},{"key":"道路側溝溝蓋(含周邊)損壞遺失","value":[{"key":"average","value":4.285714285714286},{"key":"yellow","value":7.480097110713985},{"key":"red","value":10.674479935713684}]},{"key":"路樹處理","value":[{"key":"average","value":3.142857142857143},{"key":"yellow","value":5.674292163809907},{"key":"red","value":8.205727184762672}]},{"key":"雨水下水道側溝清淤","value":[{"key":"average","value":2.5},{"key":"yellow","value":3.7583057392117913},{"key":"red","value":5.016611478423583}]},{"key":"人孔蓋(含周邊)破損、遺失處理","value":[{"key":"average","value":2.4},{"key":"yellow","value":4.254723699099141},{"key":"red","value":6.109447398198281}]},{"key":"交通號誌電纜線垂落及設施損壞","value":[{"key":"average","value":2.2857142857142856},{"key":"yellow","value":2.7374682371669112},{"key":"red","value":3.189222188619537}]},{"key":"橋梁、隧道、車(人)行地下道及涵洞積淹水","value":[{"key":"average","value":1.5},{"key":"yellow","value":2.3660254037844384},{"key":"red","value":3.232050807568877}]},{"key":"道路掏空","value":[{"key":"average","value":1},{"key":"yellow","value":1},{"key":"red","value":1}]},{"key":"道路側溝內溝牆(底)破損","value":[{"key":"average","value":1},{"key":"yellow","value":1},{"key":"red","value":1}]},{"key":"河濱自行車道破損","value":[{"key":"average","value":0},{"key":"yellow","value":0},{"key":"red","value":0}]},{"key":"消防局(災害應變中心)","value":[{"key":"average","value":0},{"key":"yellow","value":0},{"key":"red","value":0}]},{"key":"動物虐待傷害","value":[{"key":"average","value":0},{"key":"yellow","value":0},{"key":"red","value":0}]},{"key":"路面積淹水","value":[{"key":"average","value":0},{"key":"yellow","value":0},{"key":"red","value":0}]},{"key":"道路邊坡坍方","value":[{"key":"average","value":0},{"key":"yellow","value":0},{"key":"red","value":0}]}]}
        ]
    },
    Patrol : {
        designate: [
            {"updateTime":"2021-09-15T07:29:09.135237427Z","data":[{"key":"避難場所","value":[{"value":289}]},{"key":"收容情況","value":[{"value":209987}]},{"key":"即時收容場所","value":[{"value":0}]}]}
        ],
        flood_risk: [],
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
        ]
    },
    Traffic : {
        traffic_live: [
            {"updateTime":"2021-09-15T07:18:41.162049371Z","data":[{"key":"壅塞路段","value":[{"value":5.821666666666666,"valueTime":"2021-09-14T15:20:00+08:00"},{"value":6.901666666666666,"valueTime":"2021-09-14T15:50:00+08:00"},{"value":7.373333333333333,"valueTime":"2021-09-14T16:20:00+08:00"},{"value":7.788333333333333,"valueTime":"2021-09-14T16:50:00+08:00"},{"value":11.395,"valueTime":"2021-09-14T17:20:00+08:00"},{"value":16.048333333333332,"valueTime":"2021-09-14T17:50:00+08:00"},{"value":18.721666666666668,"valueTime":"2021-09-14T18:20:00+08:00"},{"value":16.473333333333333,"valueTime":"2021-09-14T18:50:00+08:00"},{"value":10.226666666666667,"valueTime":"2021-09-14T19:20:00+08:00"},{"value":4.766666666666667,"valueTime":"2021-09-14T19:50:00+08:00"},{"value":2.9233333333333333,"valueTime":"2021-09-14T20:20:00+08:00"},{"value":1.5933333333333333,"valueTime":"2021-09-14T20:50:00+08:00"},{"value":1.3166666666666667,"valueTime":"2021-09-14T21:20:00+08:00"},{"value":1.3166666666666667,"valueTime":"2021-09-14T21:50:00+08:00"},{"value":0.9066666666666666,"valueTime":"2021-09-14T22:20:00+08:00"},{"value":0.6583333333333333,"valueTime":"2021-09-14T22:50:00+08:00"},{"value":0.6583333333333333,"valueTime":"2021-09-14T23:20:00+08:00"},{"value":0.5,"valueTime":"2021-09-14T23:50:00+08:00"},{"value":0.5,"valueTime":"2021-09-15T00:20:00+08:00"},{"value":0.20333333333333334,"valueTime":"2021-09-15T00:50:00+08:00"},{"value":0.205,"valueTime":"2021-09-15T01:20:00+08:00"},{"value":0.5016666666666667,"valueTime":"2021-09-15T01:50:00+08:00"},{"value":0.07,"valueTime":"2021-09-15T02:20:00+08:00"},{"value":0.13666666666666666,"valueTime":"2021-09-15T02:50:00+08:00"},{"value":0.06833333333333333,"valueTime":"2021-09-15T03:20:00+08:00"},{"value":0.09166666666666666,"valueTime":"2021-09-15T03:50:00+08:00"},{"value":0,"valueTime":"2021-09-15T04:20:00+08:00"},{"value":0.09166666666666666,"valueTime":"2021-09-15T04:50:00+08:00"},{"value":0.295,"valueTime":"2021-09-15T05:20:00+08:00"},{"value":0.45166666666666666,"valueTime":"2021-09-15T05:50:00+08:00"},{"value":0.7483333333333333,"valueTime":"2021-09-15T06:20:00+08:00"},{"value":1.6566666666666667,"valueTime":"2021-09-15T06:50:00+08:00"},{"value":7.01,"valueTime":"2021-09-15T07:20:00+08:00"},{"value":10.66,"valueTime":"2021-09-15T07:50:00+08:00"},{"value":11.636666666666667,"valueTime":"2021-09-15T08:20:00+08:00"},{"value":9.908333333333333,"valueTime":"2021-09-15T08:50:00+08:00"},{"value":7.058333333333334,"valueTime":"2021-09-15T09:20:00+08:00"},{"value":5.14,"valueTime":"2021-09-15T09:50:00+08:00"},{"value":3.99,"valueTime":"2021-09-15T10:20:00+08:00"},{"value":4.636666666666667,"valueTime":"2021-09-15T10:50:00+08:00"},{"value":4.723333333333334,"valueTime":"2021-09-15T11:20:00+08:00"},{"value":5.153333333333333,"valueTime":"2021-09-15T11:50:00+08:00"},{"value":4.583333333333333,"valueTime":"2021-09-15T12:20:00+08:00"},{"value":3.87,"valueTime":"2021-09-15T12:50:00+08:00"},{"value":3.56,"valueTime":"2021-09-15T13:20:00+08:00"},{"value":5.166666666666667,"valueTime":"2021-09-15T13:50:00+08:00"},{"value":6.75,"valueTime":"2021-09-15T14:20:00+08:00"},{"value":7.318333333333333,"valueTime":"2021-09-15T14:50:00+08:00"},{"value":0,"valueTime":"2021-09-15T15:20:00+08:00"}]}]},
            {"updateTime":"2021-09-15T15:15:03+08:00","data":[
                {"key":"嚴重壅塞","value":[{"value":6.75,"lastValue":7.75}]},
                {"key":"輕微壅塞","value":[{"value":43.18,"lastValue":41.41}]},
                {"key":"道路順暢","value":[{"value":49.51,"lastValue":50.28}]}
            ]}
        ],
        traffic_todaywork: [
            {"updateTime":"2021-09-15T15:05:57+08:00","data":[{"key":"施工路段","value":[{"value":108}]}]}
        ],
        traffic_accident: [
            {"updateTime":"2021-02-28T23:42:00+08:00","data":[{"key":"A3事故件數","value":[{"value":1497,"lastValue":2034}]},{"key":"A4事故件數","value":[{"value":3800,"lastValue":4798}]},{"key":"A2事故受傷","value":[{"value":2628,"lastValue":3317}]},{"key":"A4事故受傷","value":[{"value":1,"lastValue":0}]},{"key":"A2事故死亡","value":[{"value":0,"lastValue":0}]},{"key":"A3事故死亡","value":[{"value":0,"lastValue":0}]},{"key":"A4事故死亡","value":[{"value":0,"lastValue":0}]},{"key":"A1事故件數","value":[{"value":6,"lastValue":5}]},{"key":"A2事故件數","value":[{"value":1946,"lastValue":2482}]},{"key":"A1事故受傷","value":[{"value":2,"lastValue":2}]},{"key":"A3事故受傷","value":[{"value":0,"lastValue":0}]},{"key":"A1事故死亡","value":[{"value":6,"lastValue":5}]}]}
        ],
        traffic_mrt: [
            {
                "updateTime": "2021-05-31T15:29:00Z",
                "data": [
                    {
                        "key": "進站",
                        "value": [
                            {
                                "value": 0,
                                "valueTime": "2021-04-30T16:00:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-04-30T16:30:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-04-30T17:00:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-04-30T17:30:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-04-30T18:00:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-04-30T18:30:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-04-30T19:00:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-04-30T19:30:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-04-30T20:00:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-04-30T20:30:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-04-30T21:00:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-04-30T21:30:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-04-30T22:00:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-04-30T22:30:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-04-30T23:00:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-04-30T23:30:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-01T00:00:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-01T00:30:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-01T01:00:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-01T01:30:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-01T02:00:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-01T02:30:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-01T03:00:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-01T03:30:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-01T04:00:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-01T04:30:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-01T05:00:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-01T05:30:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-01T06:00:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-01T06:30:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-01T07:00:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-01T07:30:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-01T08:00:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-01T08:30:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-01T09:00:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-01T09:30:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-01T10:00:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-01T10:30:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-01T11:00:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-01T11:30:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-01T12:00:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-01T12:30:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-01T13:00:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-01T13:30:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-01T14:00:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-01T14:30:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-01T15:00:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-01T15:30:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-01T16:00:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-01T16:30:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-01T17:00:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-01T17:30:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-01T18:00:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-01T18:30:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-01T19:00:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-01T19:30:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-01T20:00:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-01T20:30:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-01T21:00:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-01T21:30:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-01T22:00:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-01T22:30:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-01T23:00:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-01T23:30:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-02T00:00:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-02T00:30:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-02T01:00:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-02T01:30:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-02T02:00:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-02T02:30:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-02T03:00:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-02T03:30:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-02T04:00:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-02T04:30:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-02T05:00:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-02T05:30:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-02T06:00:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-02T06:30:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-02T07:00:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-02T07:30:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-02T08:00:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-02T08:30:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-02T09:00:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-02T09:30:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-02T10:00:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-02T10:30:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-02T11:00:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-02T11:30:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-02T12:00:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-02T12:30:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-02T13:00:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-02T13:30:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-02T14:00:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-02T14:30:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-02T15:00:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-02T15:30:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-02T16:00:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-02T16:30:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-02T17:00:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-02T17:30:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-02T18:00:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-02T18:30:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-02T19:00:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-02T19:30:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-02T20:00:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-02T20:30:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-02T21:00:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-02T21:30:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-02T22:00:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-02T22:30:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-02T23:00:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-02T23:30:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-03T00:00:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-03T00:30:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-03T01:00:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-03T01:30:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-03T02:00:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-03T02:30:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-03T03:00:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-03T03:30:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-03T04:00:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-03T04:30:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-03T05:00:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-03T05:30:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-03T06:00:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-03T06:30:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-03T07:00:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-03T07:30:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-03T08:00:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-03T08:30:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-03T09:00:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-03T09:30:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-03T10:00:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-03T10:30:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-03T11:00:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-03T11:30:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-03T12:00:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-03T12:30:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-03T13:00:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-03T13:30:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-03T14:00:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-03T14:30:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-03T15:00:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-03T15:30:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-03T16:00:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-03T16:30:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-03T17:00:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-03T17:30:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-03T18:00:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-03T18:30:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-03T19:00:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-03T19:30:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-03T20:00:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-03T20:30:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-03T21:00:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-03T21:30:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-03T22:00:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-03T22:30:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-03T23:00:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-03T23:30:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-04T00:00:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-04T00:30:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-04T01:00:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-04T01:30:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-04T02:00:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-04T02:30:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-04T03:00:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-04T03:30:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-04T04:00:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-04T04:30:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-04T05:00:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-04T05:30:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-04T06:00:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-04T06:30:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-04T07:00:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-04T07:30:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-04T08:00:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-04T08:30:00Z"
                            },
                            {
                                "value": 90750,
                                "valueTime": "2021-05-04T09:29:00Z"
                            },
                            {
                                "value": 116578,
                                "valueTime": "2021-05-04T09:59:00Z"
                            },
                            {
                                "value": 134949,
                                "valueTime": "2021-05-04T10:29:00Z"
                            },
                            {
                                "value": 105928,
                                "valueTime": "2021-05-04T10:59:00Z"
                            },
                            {
                                "value": 68063,
                                "valueTime": "2021-05-04T11:29:00Z"
                            },
                            {
                                "value": 49705,
                                "valueTime": "2021-05-04T11:59:00Z"
                            },
                            {
                                "value": 43993,
                                "valueTime": "2021-05-04T12:29:00Z"
                            },
                            {
                                "value": 39108,
                                "valueTime": "2021-05-04T12:59:00Z"
                            },
                            {
                                "value": 50734,
                                "valueTime": "2021-05-04T13:29:00Z"
                            },
                            {
                                "value": 42876,
                                "valueTime": "2021-05-04T13:59:00Z"
                            },
                            {
                                "value": 33805,
                                "valueTime": "2021-05-04T14:29:00Z"
                            },
                            {
                                "value": 16538,
                                "valueTime": "2021-05-04T14:59:00Z"
                            },
                            {
                                "value": 10664,
                                "valueTime": "2021-05-04T15:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-04T15:29:00Z"
                            },
                            {
                                "value": 2707,
                                "valueTime": "2021-05-04T16:29:00Z"
                            },
                            {
                                "value": 399,
                                "valueTime": "2021-05-04T16:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-04T17:29:00Z"
                            },
                            {
                                "value": 32,
                                "valueTime": "2021-05-04T17:59:00Z"
                            },
                            {
                                "value": 18,
                                "valueTime": "2021-05-04T18:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-04T18:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-04T18:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-04T19:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-04T19:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-04T20:29:00Z"
                            },
                            {
                                "value": 3,
                                "valueTime": "2021-05-04T21:29:00Z"
                            },
                            {
                                "value": 7863,
                                "valueTime": "2021-05-04T21:59:00Z"
                            },
                            {
                                "value": 18124,
                                "valueTime": "2021-05-04T22:29:00Z"
                            },
                            {
                                "value": 38822,
                                "valueTime": "2021-05-04T22:59:00Z"
                            },
                            {
                                "value": 66174,
                                "valueTime": "2021-05-04T23:29:00Z"
                            },
                            {
                                "value": 96373,
                                "valueTime": "2021-05-04T23:59:00Z"
                            },
                            {
                                "value": 103695,
                                "valueTime": "2021-05-05T00:29:00Z"
                            },
                            {
                                "value": 76915,
                                "valueTime": "2021-05-05T00:59:00Z"
                            },
                            {
                                "value": 54767,
                                "valueTime": "2021-05-05T01:29:00Z"
                            },
                            {
                                "value": 46160,
                                "valueTime": "2021-05-05T01:59:00Z"
                            },
                            {
                                "value": 28200,
                                "valueTime": "2021-05-05T02:29:00Z"
                            },
                            {
                                "value": 25338,
                                "valueTime": "2021-05-05T02:59:00Z"
                            },
                            {
                                "value": 26253,
                                "valueTime": "2021-05-05T03:29:00Z"
                            },
                            {
                                "value": 27632,
                                "valueTime": "2021-05-05T03:59:00Z"
                            },
                            {
                                "value": 35611,
                                "valueTime": "2021-05-05T04:29:00Z"
                            },
                            {
                                "value": 34102,
                                "valueTime": "2021-05-05T04:59:00Z"
                            },
                            {
                                "value": 32060,
                                "valueTime": "2021-05-05T05:29:00Z"
                            },
                            {
                                "value": 30200,
                                "valueTime": "2021-05-05T05:59:00Z"
                            },
                            {
                                "value": 30393,
                                "valueTime": "2021-05-05T06:29:00Z"
                            },
                            {
                                "value": 30648,
                                "valueTime": "2021-05-05T06:59:00Z"
                            },
                            {
                                "value": 32748,
                                "valueTime": "2021-05-05T07:29:00Z"
                            },
                            {
                                "value": 33124,
                                "valueTime": "2021-05-05T07:59:00Z"
                            },
                            {
                                "value": 47232,
                                "valueTime": "2021-05-05T08:29:00Z"
                            },
                            {
                                "value": 51713,
                                "valueTime": "2021-05-05T08:59:00Z"
                            },
                            {
                                "value": 73559,
                                "valueTime": "2021-05-05T09:29:00Z"
                            },
                            {
                                "value": 92935,
                                "valueTime": "2021-05-05T09:59:00Z"
                            },
                            {
                                "value": 109657,
                                "valueTime": "2021-05-05T10:29:00Z"
                            },
                            {
                                "value": 88600,
                                "valueTime": "2021-05-05T10:59:00Z"
                            },
                            {
                                "value": 71101,
                                "valueTime": "2021-05-05T11:29:00Z"
                            },
                            {
                                "value": 51791,
                                "valueTime": "2021-05-05T11:59:00Z"
                            },
                            {
                                "value": 45709,
                                "valueTime": "2021-05-05T12:29:00Z"
                            },
                            {
                                "value": 42237,
                                "valueTime": "2021-05-05T12:59:00Z"
                            },
                            {
                                "value": 48849,
                                "valueTime": "2021-05-05T13:29:00Z"
                            },
                            {
                                "value": 46991,
                                "valueTime": "2021-05-05T13:59:00Z"
                            },
                            {
                                "value": 35405,
                                "valueTime": "2021-05-05T14:29:00Z"
                            },
                            {
                                "value": 17918,
                                "valueTime": "2021-05-05T14:59:00Z"
                            },
                            {
                                "value": 11590,
                                "valueTime": "2021-05-05T15:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-05T15:29:00Z"
                            },
                            {
                                "value": 3089,
                                "valueTime": "2021-05-05T16:29:00Z"
                            },
                            {
                                "value": 401,
                                "valueTime": "2021-05-05T16:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-05T16:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-05T17:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-05T17:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-05T18:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-05T18:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-05T19:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-05T19:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-05T20:29:00Z"
                            },
                            {
                                "value": 1,
                                "valueTime": "2021-05-05T21:29:00Z"
                            },
                            {
                                "value": 8261,
                                "valueTime": "2021-05-05T21:59:00Z"
                            },
                            {
                                "value": 17055,
                                "valueTime": "2021-05-05T22:29:00Z"
                            },
                            {
                                "value": 41254,
                                "valueTime": "2021-05-05T22:59:00Z"
                            },
                            {
                                "value": 77911,
                                "valueTime": "2021-05-05T23:29:00Z"
                            },
                            {
                                "value": 83728,
                                "valueTime": "2021-05-05T23:59:00Z"
                            },
                            {
                                "value": 89242,
                                "valueTime": "2021-05-06T00:29:00Z"
                            },
                            {
                                "value": 64036,
                                "valueTime": "2021-05-06T00:59:00Z"
                            },
                            {
                                "value": 42693,
                                "valueTime": "2021-05-06T01:29:00Z"
                            },
                            {
                                "value": 31629,
                                "valueTime": "2021-05-06T01:59:00Z"
                            },
                            {
                                "value": 26321,
                                "valueTime": "2021-05-06T02:29:00Z"
                            },
                            {
                                "value": 23574,
                                "valueTime": "2021-05-06T02:59:00Z"
                            },
                            {
                                "value": 24207,
                                "valueTime": "2021-05-06T03:29:00Z"
                            },
                            {
                                "value": 24921,
                                "valueTime": "2021-05-06T03:59:00Z"
                            },
                            {
                                "value": 30454,
                                "valueTime": "2021-05-06T04:29:00Z"
                            },
                            {
                                "value": 29153,
                                "valueTime": "2021-05-06T04:59:00Z"
                            },
                            {
                                "value": 30476,
                                "valueTime": "2021-05-06T05:29:00Z"
                            },
                            {
                                "value": 26793,
                                "valueTime": "2021-05-06T05:59:00Z"
                            },
                            {
                                "value": 27170,
                                "valueTime": "2021-05-06T06:29:00Z"
                            },
                            {
                                "value": 25115,
                                "valueTime": "2021-05-06T06:59:00Z"
                            },
                            {
                                "value": 29595,
                                "valueTime": "2021-05-06T07:29:00Z"
                            },
                            {
                                "value": 31475,
                                "valueTime": "2021-05-06T07:59:00Z"
                            },
                            {
                                "value": 43892,
                                "valueTime": "2021-05-06T08:29:00Z"
                            },
                            {
                                "value": 46368,
                                "valueTime": "2021-05-06T08:59:00Z"
                            },
                            {
                                "value": 81863,
                                "valueTime": "2021-05-06T09:29:00Z"
                            },
                            {
                                "value": 104861,
                                "valueTime": "2021-05-06T09:59:00Z"
                            },
                            {
                                "value": 122539,
                                "valueTime": "2021-05-06T10:29:00Z"
                            },
                            {
                                "value": 97480,
                                "valueTime": "2021-05-06T10:59:00Z"
                            },
                            {
                                "value": 70707,
                                "valueTime": "2021-05-06T11:29:00Z"
                            },
                            {
                                "value": 51957,
                                "valueTime": "2021-05-06T11:59:00Z"
                            },
                            {
                                "value": 45770,
                                "valueTime": "2021-05-06T12:29:00Z"
                            },
                            {
                                "value": 42169,
                                "valueTime": "2021-05-06T12:59:00Z"
                            },
                            {
                                "value": 48971,
                                "valueTime": "2021-05-06T13:29:00Z"
                            },
                            {
                                "value": 47794,
                                "valueTime": "2021-05-06T13:59:00Z"
                            },
                            {
                                "value": 36788,
                                "valueTime": "2021-05-06T14:29:00Z"
                            },
                            {
                                "value": 19021,
                                "valueTime": "2021-05-06T14:59:00Z"
                            },
                            {
                                "value": 12291,
                                "valueTime": "2021-05-06T15:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-06T15:29:00Z"
                            },
                            {
                                "value": 3188,
                                "valueTime": "2021-05-06T16:29:00Z"
                            },
                            {
                                "value": 465,
                                "valueTime": "2021-05-06T16:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-06T16:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-06T17:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-06T17:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-06T18:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-06T18:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-06T19:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-06T19:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-06T20:29:00Z"
                            },
                            {
                                "value": 3,
                                "valueTime": "2021-05-06T21:29:00Z"
                            },
                            {
                                "value": 8071,
                                "valueTime": "2021-05-06T21:59:00Z"
                            },
                            {
                                "value": 17415,
                                "valueTime": "2021-05-06T22:29:00Z"
                            },
                            {
                                "value": 40534,
                                "valueTime": "2021-05-06T22:59:00Z"
                            },
                            {
                                "value": 74704,
                                "valueTime": "2021-05-06T23:29:00Z"
                            },
                            {
                                "value": 105340,
                                "valueTime": "2021-05-06T23:59:00Z"
                            },
                            {
                                "value": 114707,
                                "valueTime": "2021-05-07T00:29:00Z"
                            },
                            {
                                "value": 84247,
                                "valueTime": "2021-05-07T00:59:00Z"
                            },
                            {
                                "value": 56555,
                                "valueTime": "2021-05-07T01:29:00Z"
                            },
                            {
                                "value": 44274,
                                "valueTime": "2021-05-07T01:59:00Z"
                            },
                            {
                                "value": 35986,
                                "valueTime": "2021-05-07T02:29:00Z"
                            },
                            {
                                "value": 33614,
                                "valueTime": "2021-05-07T02:59:00Z"
                            },
                            {
                                "value": 34840,
                                "valueTime": "2021-05-07T03:29:00Z"
                            },
                            {
                                "value": 40313,
                                "valueTime": "2021-05-07T03:59:00Z"
                            },
                            {
                                "value": 14836,
                                "valueTime": "2021-05-07T04:29:00Z"
                            },
                            {
                                "value": 43804,
                                "valueTime": "2021-05-07T04:59:00Z"
                            },
                            {
                                "value": 42170,
                                "valueTime": "2021-05-07T05:29:00Z"
                            },
                            {
                                "value": 40322,
                                "valueTime": "2021-05-07T05:59:00Z"
                            },
                            {
                                "value": 38704,
                                "valueTime": "2021-05-07T06:29:00Z"
                            },
                            {
                                "value": 38004,
                                "valueTime": "2021-05-07T06:59:00Z"
                            },
                            {
                                "value": 42533,
                                "valueTime": "2021-05-07T07:29:00Z"
                            },
                            {
                                "value": 43615,
                                "valueTime": "2021-05-07T07:59:00Z"
                            },
                            {
                                "value": 59920,
                                "valueTime": "2021-05-07T08:29:00Z"
                            },
                            {
                                "value": 66865,
                                "valueTime": "2021-05-07T08:59:00Z"
                            },
                            {
                                "value": 88126,
                                "valueTime": "2021-05-07T09:29:00Z"
                            },
                            {
                                "value": 109226,
                                "valueTime": "2021-05-07T09:59:00Z"
                            },
                            {
                                "value": 127800,
                                "valueTime": "2021-05-07T10:29:00Z"
                            },
                            {
                                "value": 104899,
                                "valueTime": "2021-05-07T10:59:00Z"
                            },
                            {
                                "value": 76326,
                                "valueTime": "2021-05-07T11:29:00Z"
                            },
                            {
                                "value": 57249,
                                "valueTime": "2021-05-07T11:59:00Z"
                            },
                            {
                                "value": 49427,
                                "valueTime": "2021-05-07T12:29:00Z"
                            },
                            {
                                "value": 46126,
                                "valueTime": "2021-05-07T12:59:00Z"
                            },
                            {
                                "value": 52184,
                                "valueTime": "2021-05-07T13:29:00Z"
                            },
                            {
                                "value": 51952,
                                "valueTime": "2021-05-07T13:59:00Z"
                            },
                            {
                                "value": 47197,
                                "valueTime": "2021-05-07T14:29:00Z"
                            },
                            {
                                "value": 26632,
                                "valueTime": "2021-05-07T14:59:00Z"
                            },
                            {
                                "value": 17507,
                                "valueTime": "2021-05-07T15:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-07T15:29:00Z"
                            },
                            {
                                "value": 5350,
                                "valueTime": "2021-05-07T16:29:00Z"
                            },
                            {
                                "value": 684,
                                "valueTime": "2021-05-07T16:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-07T16:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-07T17:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-07T17:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-07T18:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-07T18:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-07T19:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-07T19:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-07T20:29:00Z"
                            },
                            {
                                "value": 1,
                                "valueTime": "2021-05-07T21:29:00Z"
                            },
                            {
                                "value": 5708,
                                "valueTime": "2021-05-07T21:59:00Z"
                            },
                            {
                                "value": 10112,
                                "valueTime": "2021-05-07T22:29:00Z"
                            },
                            {
                                "value": 14495,
                                "valueTime": "2021-05-07T22:59:00Z"
                            },
                            {
                                "value": 20864,
                                "valueTime": "2021-05-07T23:29:00Z"
                            },
                            {
                                "value": 24574,
                                "valueTime": "2021-05-07T23:59:00Z"
                            },
                            {
                                "value": 31504,
                                "valueTime": "2021-05-08T00:29:00Z"
                            },
                            {
                                "value": 34815,
                                "valueTime": "2021-05-08T00:59:00Z"
                            },
                            {
                                "value": 37008,
                                "valueTime": "2021-05-08T01:29:00Z"
                            },
                            {
                                "value": 38926,
                                "valueTime": "2021-05-08T01:59:00Z"
                            },
                            {
                                "value": 39555,
                                "valueTime": "2021-05-08T02:29:00Z"
                            },
                            {
                                "value": 45954,
                                "valueTime": "2021-05-08T02:59:00Z"
                            },
                            {
                                "value": 36288,
                                "valueTime": "2021-05-08T03:29:00Z"
                            },
                            {
                                "value": 45103,
                                "valueTime": "2021-05-08T03:59:00Z"
                            },
                            {
                                "value": 50176,
                                "valueTime": "2021-05-08T04:29:00Z"
                            },
                            {
                                "value": 52743,
                                "valueTime": "2021-05-08T04:59:00Z"
                            },
                            {
                                "value": 53342,
                                "valueTime": "2021-05-08T05:29:00Z"
                            },
                            {
                                "value": 51729,
                                "valueTime": "2021-05-08T05:59:00Z"
                            },
                            {
                                "value": 48488,
                                "valueTime": "2021-05-08T06:29:00Z"
                            },
                            {
                                "value": 48483,
                                "valueTime": "2021-05-08T06:59:00Z"
                            },
                            {
                                "value": 48745,
                                "valueTime": "2021-05-08T07:29:00Z"
                            },
                            {
                                "value": 48265,
                                "valueTime": "2021-05-08T07:59:00Z"
                            },
                            {
                                "value": 53344,
                                "valueTime": "2021-05-08T08:29:00Z"
                            },
                            {
                                "value": 58436,
                                "valueTime": "2021-05-08T08:59:00Z"
                            },
                            {
                                "value": 64799,
                                "valueTime": "2021-05-08T09:29:00Z"
                            },
                            {
                                "value": 60838,
                                "valueTime": "2021-05-08T09:59:00Z"
                            },
                            {
                                "value": 55521,
                                "valueTime": "2021-05-08T10:29:00Z"
                            },
                            {
                                "value": 47208,
                                "valueTime": "2021-05-08T10:59:00Z"
                            },
                            {
                                "value": 41009,
                                "valueTime": "2021-05-08T11:29:00Z"
                            },
                            {
                                "value": 36188,
                                "valueTime": "2021-05-08T11:59:00Z"
                            },
                            {
                                "value": 36875,
                                "valueTime": "2021-05-08T12:29:00Z"
                            },
                            {
                                "value": 36211,
                                "valueTime": "2021-05-08T12:59:00Z"
                            },
                            {
                                "value": 40360,
                                "valueTime": "2021-05-08T13:29:00Z"
                            },
                            {
                                "value": 39254,
                                "valueTime": "2021-05-08T13:59:00Z"
                            },
                            {
                                "value": 37394,
                                "valueTime": "2021-05-08T14:29:00Z"
                            },
                            {
                                "value": 23410,
                                "valueTime": "2021-05-08T14:59:00Z"
                            },
                            {
                                "value": 14477,
                                "valueTime": "2021-05-08T15:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-08T15:29:00Z"
                            },
                            {
                                "value": 4291,
                                "valueTime": "2021-05-08T16:29:00Z"
                            },
                            {
                                "value": 555,
                                "valueTime": "2021-05-08T16:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-08T16:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-08T17:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-08T17:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-08T18:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-08T18:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-08T19:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-08T19:59:00Z"
                            },
                            {
                                "value": 1,
                                "valueTime": "2021-05-08T20:59:00Z"
                            },
                            {
                                "value": 2,
                                "valueTime": "2021-05-08T21:29:00Z"
                            },
                            {
                                "value": 4571,
                                "valueTime": "2021-05-08T21:59:00Z"
                            },
                            {
                                "value": 7448,
                                "valueTime": "2021-05-08T22:29:00Z"
                            },
                            {
                                "value": 9495,
                                "valueTime": "2021-05-08T22:59:00Z"
                            },
                            {
                                "value": 13180,
                                "valueTime": "2021-05-08T23:29:00Z"
                            },
                            {
                                "value": 14999,
                                "valueTime": "2021-05-08T23:59:00Z"
                            },
                            {
                                "value": 20082,
                                "valueTime": "2021-05-09T00:29:00Z"
                            },
                            {
                                "value": 23631,
                                "valueTime": "2021-05-09T00:59:00Z"
                            },
                            {
                                "value": 26323,
                                "valueTime": "2021-05-09T01:29:00Z"
                            },
                            {
                                "value": 28552,
                                "valueTime": "2021-05-09T01:59:00Z"
                            },
                            {
                                "value": 29304,
                                "valueTime": "2021-05-09T02:29:00Z"
                            },
                            {
                                "value": 33247,
                                "valueTime": "2021-05-09T02:59:00Z"
                            },
                            {
                                "value": 36326,
                                "valueTime": "2021-05-09T03:29:00Z"
                            },
                            {
                                "value": 34694,
                                "valueTime": "2021-05-09T03:59:00Z"
                            },
                            {
                                "value": 37632,
                                "valueTime": "2021-05-09T04:29:00Z"
                            },
                            {
                                "value": 38199,
                                "valueTime": "2021-05-09T04:59:00Z"
                            },
                            {
                                "value": 39454,
                                "valueTime": "2021-05-09T05:29:00Z"
                            },
                            {
                                "value": 39898,
                                "valueTime": "2021-05-09T05:59:00Z"
                            },
                            {
                                "value": 39662,
                                "valueTime": "2021-05-09T06:29:00Z"
                            },
                            {
                                "value": 39691,
                                "valueTime": "2021-05-09T06:59:00Z"
                            },
                            {
                                "value": 39853,
                                "valueTime": "2021-05-09T07:29:00Z"
                            },
                            {
                                "value": 46299,
                                "valueTime": "2021-05-09T07:59:00Z"
                            },
                            {
                                "value": 22882,
                                "valueTime": "2021-05-09T08:29:00Z"
                            },
                            {
                                "value": 46643,
                                "valueTime": "2021-05-09T08:59:00Z"
                            },
                            {
                                "value": 49563,
                                "valueTime": "2021-05-09T09:29:00Z"
                            },
                            {
                                "value": 45562,
                                "valueTime": "2021-05-09T09:59:00Z"
                            },
                            {
                                "value": 40418,
                                "valueTime": "2021-05-09T10:29:00Z"
                            },
                            {
                                "value": 38775,
                                "valueTime": "2021-05-09T10:59:00Z"
                            },
                            {
                                "value": 35341,
                                "valueTime": "2021-05-09T11:29:00Z"
                            },
                            {
                                "value": 34004,
                                "valueTime": "2021-05-09T11:59:00Z"
                            },
                            {
                                "value": 32489,
                                "valueTime": "2021-05-09T12:29:00Z"
                            },
                            {
                                "value": 31525,
                                "valueTime": "2021-05-09T12:59:00Z"
                            },
                            {
                                "value": 31254,
                                "valueTime": "2021-05-09T13:29:00Z"
                            },
                            {
                                "value": 29898,
                                "valueTime": "2021-05-09T13:59:00Z"
                            },
                            {
                                "value": 23591,
                                "valueTime": "2021-05-09T14:29:00Z"
                            },
                            {
                                "value": 15033,
                                "valueTime": "2021-05-09T14:59:00Z"
                            },
                            {
                                "value": 10741,
                                "valueTime": "2021-05-09T15:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-09T15:59:00Z"
                            },
                            {
                                "value": 2772,
                                "valueTime": "2021-05-09T16:29:00Z"
                            },
                            {
                                "value": 318,
                                "valueTime": "2021-05-09T16:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-09T16:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-09T17:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-09T17:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-09T18:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-09T18:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-09T19:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-09T19:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-09T20:29:00Z"
                            },
                            {
                                "value": 2,
                                "valueTime": "2021-05-09T21:29:00Z"
                            },
                            {
                                "value": 8626,
                                "valueTime": "2021-05-09T21:59:00Z"
                            },
                            {
                                "value": 17258,
                                "valueTime": "2021-05-09T22:29:00Z"
                            },
                            {
                                "value": 39932,
                                "valueTime": "2021-05-09T22:59:00Z"
                            },
                            {
                                "value": 71127,
                                "valueTime": "2021-05-09T23:29:00Z"
                            },
                            {
                                "value": 101132,
                                "valueTime": "2021-05-09T23:59:00Z"
                            },
                            {
                                "value": 113974,
                                "valueTime": "2021-05-10T00:29:00Z"
                            },
                            {
                                "value": 84556,
                                "valueTime": "2021-05-10T00:59:00Z"
                            },
                            {
                                "value": 55730,
                                "valueTime": "2021-05-10T01:29:00Z"
                            },
                            {
                                "value": 43052,
                                "valueTime": "2021-05-10T01:59:00Z"
                            },
                            {
                                "value": 33131,
                                "valueTime": "2021-05-10T02:29:00Z"
                            },
                            {
                                "value": 31023,
                                "valueTime": "2021-05-10T02:59:00Z"
                            },
                            {
                                "value": 31235,
                                "valueTime": "2021-05-10T03:29:00Z"
                            },
                            {
                                "value": 31680,
                                "valueTime": "2021-05-10T03:59:00Z"
                            },
                            {
                                "value": 37743,
                                "valueTime": "2021-05-10T04:29:00Z"
                            },
                            {
                                "value": 36332,
                                "valueTime": "2021-05-10T04:59:00Z"
                            },
                            {
                                "value": 34735,
                                "valueTime": "2021-05-10T05:29:00Z"
                            },
                            {
                                "value": 33622,
                                "valueTime": "2021-05-10T05:59:00Z"
                            },
                            {
                                "value": 32281,
                                "valueTime": "2021-05-10T06:29:00Z"
                            },
                            {
                                "value": 31958,
                                "valueTime": "2021-05-10T06:59:00Z"
                            },
                            {
                                "value": 35749,
                                "valueTime": "2021-05-10T07:29:00Z"
                            },
                            {
                                "value": 36354,
                                "valueTime": "2021-05-10T07:59:00Z"
                            },
                            {
                                "value": 51224,
                                "valueTime": "2021-05-10T08:29:00Z"
                            },
                            {
                                "value": 55867,
                                "valueTime": "2021-05-10T08:59:00Z"
                            },
                            {
                                "value": 78663,
                                "valueTime": "2021-05-10T09:29:00Z"
                            },
                            {
                                "value": 100910,
                                "valueTime": "2021-05-10T09:59:00Z"
                            },
                            {
                                "value": 121606,
                                "valueTime": "2021-05-10T10:29:00Z"
                            },
                            {
                                "value": 97054,
                                "valueTime": "2021-05-10T10:59:00Z"
                            },
                            {
                                "value": 70142,
                                "valueTime": "2021-05-10T11:29:00Z"
                            },
                            {
                                "value": 50258,
                                "valueTime": "2021-05-10T11:59:00Z"
                            },
                            {
                                "value": 43899,
                                "valueTime": "2021-05-10T12:29:00Z"
                            },
                            {
                                "value": 40159,
                                "valueTime": "2021-05-10T12:59:00Z"
                            },
                            {
                                "value": 42537,
                                "valueTime": "2021-05-10T13:29:00Z"
                            },
                            {
                                "value": 43360,
                                "valueTime": "2021-05-10T13:59:00Z"
                            },
                            {
                                "value": 31506,
                                "valueTime": "2021-05-10T14:29:00Z"
                            },
                            {
                                "value": 16404,
                                "valueTime": "2021-05-10T14:59:00Z"
                            },
                            {
                                "value": 10731,
                                "valueTime": "2021-05-10T15:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-10T15:29:00Z"
                            },
                            {
                                "value": 2691,
                                "valueTime": "2021-05-10T16:29:00Z"
                            },
                            {
                                "value": 357,
                                "valueTime": "2021-05-10T16:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-10T16:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-10T17:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-10T17:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-10T18:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-10T18:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-10T19:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-10T19:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-10T20:29:00Z"
                            },
                            {
                                "value": 4,
                                "valueTime": "2021-05-10T21:29:00Z"
                            },
                            {
                                "value": 8194,
                                "valueTime": "2021-05-10T21:59:00Z"
                            },
                            {
                                "value": 19030,
                                "valueTime": "2021-05-10T22:29:00Z"
                            },
                            {
                                "value": 41752,
                                "valueTime": "2021-05-10T22:59:00Z"
                            },
                            {
                                "value": 69105,
                                "valueTime": "2021-05-10T23:29:00Z"
                            },
                            {
                                "value": 95583,
                                "valueTime": "2021-05-10T23:59:00Z"
                            },
                            {
                                "value": 69336,
                                "valueTime": "2021-05-11T00:29:00Z"
                            },
                            {
                                "value": 75581,
                                "valueTime": "2021-05-11T00:59:00Z"
                            },
                            {
                                "value": 51012,
                                "valueTime": "2021-05-11T01:29:00Z"
                            },
                            {
                                "value": 39074,
                                "valueTime": "2021-05-11T01:59:00Z"
                            },
                            {
                                "value": 30130,
                                "valueTime": "2021-05-11T02:29:00Z"
                            },
                            {
                                "value": 28714,
                                "valueTime": "2021-05-11T02:59:00Z"
                            },
                            {
                                "value": 30255,
                                "valueTime": "2021-05-11T03:29:00Z"
                            },
                            {
                                "value": 31201,
                                "valueTime": "2021-05-11T03:59:00Z"
                            },
                            {
                                "value": 37636,
                                "valueTime": "2021-05-11T04:29:00Z"
                            },
                            {
                                "value": 35583,
                                "valueTime": "2021-05-11T04:59:00Z"
                            },
                            {
                                "value": 35084,
                                "valueTime": "2021-05-11T05:29:00Z"
                            },
                            {
                                "value": 32536,
                                "valueTime": "2021-05-11T05:59:00Z"
                            },
                            {
                                "value": 31724,
                                "valueTime": "2021-05-11T06:29:00Z"
                            },
                            {
                                "value": 30753,
                                "valueTime": "2021-05-11T06:59:00Z"
                            },
                            {
                                "value": 34754,
                                "valueTime": "2021-05-11T07:29:00Z"
                            },
                            {
                                "value": 35406,
                                "valueTime": "2021-05-11T07:59:00Z"
                            },
                            {
                                "value": 53181,
                                "valueTime": "2021-05-11T08:29:00Z"
                            },
                            {
                                "value": 56690,
                                "valueTime": "2021-05-11T08:59:00Z"
                            },
                            {
                                "value": 77668,
                                "valueTime": "2021-05-11T09:29:00Z"
                            },
                            {
                                "value": 96519,
                                "valueTime": "2021-05-11T09:59:00Z"
                            },
                            {
                                "value": 113338,
                                "valueTime": "2021-05-11T10:29:00Z"
                            },
                            {
                                "value": 92640,
                                "valueTime": "2021-05-11T10:59:00Z"
                            },
                            {
                                "value": 66279,
                                "valueTime": "2021-05-11T11:29:00Z"
                            },
                            {
                                "value": 48321,
                                "valueTime": "2021-05-11T11:59:00Z"
                            },
                            {
                                "value": 40325,
                                "valueTime": "2021-05-11T12:29:00Z"
                            },
                            {
                                "value": 37369,
                                "valueTime": "2021-05-11T12:59:00Z"
                            },
                            {
                                "value": 41127,
                                "valueTime": "2021-05-11T13:29:00Z"
                            },
                            {
                                "value": 40833,
                                "valueTime": "2021-05-11T13:59:00Z"
                            },
                            {
                                "value": 28684,
                                "valueTime": "2021-05-11T14:29:00Z"
                            },
                            {
                                "value": 14612,
                                "valueTime": "2021-05-11T14:59:00Z"
                            },
                            {
                                "value": 10062,
                                "valueTime": "2021-05-11T15:29:00Z"
                            },
                            {
                                "value": 1,
                                "valueTime": "2021-05-11T15:59:00Z"
                            },
                            {
                                "value": 2460,
                                "valueTime": "2021-05-11T16:29:00Z"
                            },
                            {
                                "value": 356,
                                "valueTime": "2021-05-11T16:59:00Z"
                            },
                            {
                                "value": 4,
                                "valueTime": "2021-05-11T17:29:00Z"
                            },
                            {
                                "value": 1,
                                "valueTime": "2021-05-11T17:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-11T17:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-11T18:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-11T18:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-11T19:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-11T19:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-11T20:29:00Z"
                            },
                            {
                                "value": 2,
                                "valueTime": "2021-05-11T21:29:00Z"
                            },
                            {
                                "value": 8083,
                                "valueTime": "2021-05-11T21:59:00Z"
                            },
                            {
                                "value": 17178,
                                "valueTime": "2021-05-11T22:29:00Z"
                            },
                            {
                                "value": 38975,
                                "valueTime": "2021-05-11T22:59:00Z"
                            },
                            {
                                "value": 68421,
                                "valueTime": "2021-05-11T23:29:00Z"
                            },
                            {
                                "value": 96662,
                                "valueTime": "2021-05-11T23:59:00Z"
                            },
                            {
                                "value": 104369,
                                "valueTime": "2021-05-12T00:29:00Z"
                            },
                            {
                                "value": 76197,
                                "valueTime": "2021-05-12T00:59:00Z"
                            },
                            {
                                "value": 48563,
                                "valueTime": "2021-05-12T01:29:00Z"
                            },
                            {
                                "value": 37160,
                                "valueTime": "2021-05-12T01:59:00Z"
                            },
                            {
                                "value": 29975,
                                "valueTime": "2021-05-12T02:29:00Z"
                            },
                            {
                                "value": 27161,
                                "valueTime": "2021-05-12T02:59:00Z"
                            },
                            {
                                "value": 26831,
                                "valueTime": "2021-05-12T03:29:00Z"
                            },
                            {
                                "value": 28013,
                                "valueTime": "2021-05-12T03:59:00Z"
                            },
                            {
                                "value": 34086,
                                "valueTime": "2021-05-12T04:29:00Z"
                            },
                            {
                                "value": 32652,
                                "valueTime": "2021-05-12T04:59:00Z"
                            },
                            {
                                "value": 29544,
                                "valueTime": "2021-05-12T05:29:00Z"
                            },
                            {
                                "value": 28155,
                                "valueTime": "2021-05-12T05:59:00Z"
                            },
                            {
                                "value": 26426,
                                "valueTime": "2021-05-12T06:29:00Z"
                            },
                            {
                                "value": 29630,
                                "valueTime": "2021-05-12T06:59:00Z"
                            },
                            {
                                "value": 31409,
                                "valueTime": "2021-05-12T07:29:00Z"
                            },
                            {
                                "value": 30809,
                                "valueTime": "2021-05-12T07:59:00Z"
                            },
                            {
                                "value": 43285,
                                "valueTime": "2021-05-12T08:29:00Z"
                            },
                            {
                                "value": 50086,
                                "valueTime": "2021-05-12T08:59:00Z"
                            },
                            {
                                "value": 70165,
                                "valueTime": "2021-05-12T09:29:00Z"
                            },
                            {
                                "value": 85900,
                                "valueTime": "2021-05-12T09:59:00Z"
                            },
                            {
                                "value": 107872,
                                "valueTime": "2021-05-12T10:29:00Z"
                            },
                            {
                                "value": 84529,
                                "valueTime": "2021-05-12T10:59:00Z"
                            },
                            {
                                "value": 61183,
                                "valueTime": "2021-05-12T11:29:00Z"
                            },
                            {
                                "value": 42871,
                                "valueTime": "2021-05-12T11:59:00Z"
                            },
                            {
                                "value": 37094,
                                "valueTime": "2021-05-12T12:29:00Z"
                            },
                            {
                                "value": 32879,
                                "valueTime": "2021-05-12T12:59:00Z"
                            },
                            {
                                "value": 35320,
                                "valueTime": "2021-05-12T13:29:00Z"
                            },
                            {
                                "value": 34737,
                                "valueTime": "2021-05-12T13:59:00Z"
                            },
                            {
                                "value": 26825,
                                "valueTime": "2021-05-12T14:29:00Z"
                            },
                            {
                                "value": 13502,
                                "valueTime": "2021-05-12T14:59:00Z"
                            },
                            {
                                "value": 8952,
                                "valueTime": "2021-05-12T15:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-12T15:29:00Z"
                            },
                            {
                                "value": 2387,
                                "valueTime": "2021-05-12T16:29:00Z"
                            },
                            {
                                "value": 296,
                                "valueTime": "2021-05-12T16:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-12T16:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-12T17:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-12T17:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-12T18:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-12T18:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-12T19:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-12T19:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-12T20:29:00Z"
                            },
                            {
                                "value": 8,
                                "valueTime": "2021-05-12T21:29:00Z"
                            },
                            {
                                "value": 7744,
                                "valueTime": "2021-05-12T21:59:00Z"
                            },
                            {
                                "value": 16401,
                                "valueTime": "2021-05-12T22:29:00Z"
                            },
                            {
                                "value": 39470,
                                "valueTime": "2021-05-12T22:59:00Z"
                            },
                            {
                                "value": 69415,
                                "valueTime": "2021-05-12T23:29:00Z"
                            },
                            {
                                "value": 99453,
                                "valueTime": "2021-05-12T23:59:00Z"
                            },
                            {
                                "value": 107405,
                                "valueTime": "2021-05-13T00:29:00Z"
                            },
                            {
                                "value": 77335,
                                "valueTime": "2021-05-13T00:59:00Z"
                            },
                            {
                                "value": 51263,
                                "valueTime": "2021-05-13T01:29:00Z"
                            },
                            {
                                "value": 38515,
                                "valueTime": "2021-05-13T01:59:00Z"
                            },
                            {
                                "value": 29095,
                                "valueTime": "2021-05-13T02:29:00Z"
                            },
                            {
                                "value": 24553,
                                "valueTime": "2021-05-13T02:59:00Z"
                            },
                            {
                                "value": 25080,
                                "valueTime": "2021-05-13T03:29:00Z"
                            },
                            {
                                "value": 25726,
                                "valueTime": "2021-05-13T03:59:00Z"
                            },
                            {
                                "value": 31266,
                                "valueTime": "2021-05-13T04:29:00Z"
                            },
                            {
                                "value": 29726,
                                "valueTime": "2021-05-13T04:59:00Z"
                            },
                            {
                                "value": 28514,
                                "valueTime": "2021-05-13T05:29:00Z"
                            },
                            {
                                "value": 26807,
                                "valueTime": "2021-05-13T05:59:00Z"
                            },
                            {
                                "value": 26024,
                                "valueTime": "2021-05-13T06:29:00Z"
                            },
                            {
                                "value": 25329,
                                "valueTime": "2021-05-13T06:59:00Z"
                            },
                            {
                                "value": 29518,
                                "valueTime": "2021-05-13T07:29:00Z"
                            },
                            {
                                "value": 31015,
                                "valueTime": "2021-05-13T07:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-13T07:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-13T08:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-13T08:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-13T09:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-13T09:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-13T10:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-13T10:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-13T11:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-13T11:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-13T12:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-13T12:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-13T13:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-13T13:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-13T14:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-13T14:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-13T15:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-13T15:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-13T16:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-13T16:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-13T17:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-13T17:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-13T18:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-13T18:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-13T19:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-13T19:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-13T20:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-13T20:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-13T21:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-13T21:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-13T22:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-13T22:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-13T23:29:00Z"
                            },
                            {
                                "value": 114956,
                                "valueTime": "2021-05-14T00:29:00Z"
                            },
                            {
                                "value": 78942,
                                "valueTime": "2021-05-14T00:59:00Z"
                            },
                            {
                                "value": 50756,
                                "valueTime": "2021-05-14T01:29:00Z"
                            },
                            {
                                "value": 36151,
                                "valueTime": "2021-05-14T01:59:00Z"
                            },
                            {
                                "value": 22195,
                                "valueTime": "2021-05-14T02:29:00Z"
                            },
                            {
                                "value": 21005,
                                "valueTime": "2021-05-14T02:59:00Z"
                            },
                            {
                                "value": 22114,
                                "valueTime": "2021-05-14T03:29:00Z"
                            },
                            {
                                "value": 24547,
                                "valueTime": "2021-05-14T03:59:00Z"
                            },
                            {
                                "value": 40427,
                                "valueTime": "2021-05-14T04:29:00Z"
                            },
                            {
                                "value": 36221,
                                "valueTime": "2021-05-14T04:59:00Z"
                            },
                            {
                                "value": 31372,
                                "valueTime": "2021-05-14T05:29:00Z"
                            },
                            {
                                "value": 28770,
                                "valueTime": "2021-05-14T05:59:00Z"
                            },
                            {
                                "value": 27325,
                                "valueTime": "2021-05-14T06:29:00Z"
                            },
                            {
                                "value": 26684,
                                "valueTime": "2021-05-14T06:59:00Z"
                            },
                            {
                                "value": 30111,
                                "valueTime": "2021-05-14T07:29:00Z"
                            },
                            {
                                "value": 30118,
                                "valueTime": "2021-05-14T07:59:00Z"
                            },
                            {
                                "value": 39436,
                                "valueTime": "2021-05-14T08:29:00Z"
                            },
                            {
                                "value": 41695,
                                "valueTime": "2021-05-14T08:59:00Z"
                            },
                            {
                                "value": 56378,
                                "valueTime": "2021-05-14T09:29:00Z"
                            },
                            {
                                "value": 73053,
                                "valueTime": "2021-05-14T09:59:00Z"
                            },
                            {
                                "value": 86474,
                                "valueTime": "2021-05-14T10:29:00Z"
                            },
                            {
                                "value": 71076,
                                "valueTime": "2021-05-14T10:59:00Z"
                            },
                            {
                                "value": 48400,
                                "valueTime": "2021-05-14T11:29:00Z"
                            },
                            {
                                "value": 38269,
                                "valueTime": "2021-05-14T11:59:00Z"
                            },
                            {
                                "value": 30572,
                                "valueTime": "2021-05-14T12:29:00Z"
                            },
                            {
                                "value": 26596,
                                "valueTime": "2021-05-14T12:59:00Z"
                            },
                            {
                                "value": 26290,
                                "valueTime": "2021-05-14T13:29:00Z"
                            },
                            {
                                "value": 24782,
                                "valueTime": "2021-05-14T13:59:00Z"
                            },
                            {
                                "value": 23383,
                                "valueTime": "2021-05-14T14:29:00Z"
                            },
                            {
                                "value": 13033,
                                "valueTime": "2021-05-14T14:59:00Z"
                            },
                            {
                                "value": 9322,
                                "valueTime": "2021-05-14T15:29:00Z"
                            },
                            {
                                "value": 5,
                                "valueTime": "2021-05-14T15:59:00Z"
                            },
                            {
                                "value": 2690,
                                "valueTime": "2021-05-14T16:29:00Z"
                            },
                            {
                                "value": 360,
                                "valueTime": "2021-05-14T16:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-14T16:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-14T17:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-14T17:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-14T18:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-14T19:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-14T19:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-14T19:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-14T20:29:00Z"
                            },
                            {
                                "value": 1,
                                "valueTime": "2021-05-14T21:29:00Z"
                            },
                            {
                                "value": 4441,
                                "valueTime": "2021-05-14T21:59:00Z"
                            },
                            {
                                "value": 7717,
                                "valueTime": "2021-05-14T22:29:00Z"
                            },
                            {
                                "value": 10330,
                                "valueTime": "2021-05-14T22:59:00Z"
                            },
                            {
                                "value": 13775,
                                "valueTime": "2021-05-14T23:29:00Z"
                            },
                            {
                                "value": 14420,
                                "valueTime": "2021-05-14T23:59:00Z"
                            },
                            {
                                "value": 17927,
                                "valueTime": "2021-05-15T00:29:00Z"
                            },
                            {
                                "value": 19166,
                                "valueTime": "2021-05-15T00:59:00Z"
                            },
                            {
                                "value": 20659,
                                "valueTime": "2021-05-15T01:29:00Z"
                            },
                            {
                                "value": 21404,
                                "valueTime": "2021-05-15T01:59:00Z"
                            },
                            {
                                "value": 20303,
                                "valueTime": "2021-05-15T02:29:00Z"
                            },
                            {
                                "value": 19396,
                                "valueTime": "2021-05-15T02:59:00Z"
                            },
                            {
                                "value": 19353,
                                "valueTime": "2021-05-15T03:29:00Z"
                            },
                            {
                                "value": 20804,
                                "valueTime": "2021-05-15T03:59:00Z"
                            },
                            {
                                "value": 18038,
                                "valueTime": "2021-05-15T04:29:00Z"
                            },
                            {
                                "value": 20385,
                                "valueTime": "2021-05-15T04:59:00Z"
                            },
                            {
                                "value": 18372,
                                "valueTime": "2021-05-15T05:29:00Z"
                            },
                            {
                                "value": 16884,
                                "valueTime": "2021-05-15T05:59:00Z"
                            },
                            {
                                "value": 18154,
                                "valueTime": "2021-05-15T06:29:00Z"
                            },
                            {
                                "value": 14887,
                                "valueTime": "2021-05-15T06:59:00Z"
                            },
                            {
                                "value": 14794,
                                "valueTime": "2021-05-15T07:29:00Z"
                            },
                            {
                                "value": 14175,
                                "valueTime": "2021-05-15T07:59:00Z"
                            },
                            {
                                "value": 15085,
                                "valueTime": "2021-05-15T08:29:00Z"
                            },
                            {
                                "value": 16036,
                                "valueTime": "2021-05-15T08:59:00Z"
                            },
                            {
                                "value": 18788,
                                "valueTime": "2021-05-15T09:29:00Z"
                            },
                            {
                                "value": 16604,
                                "valueTime": "2021-05-15T09:59:00Z"
                            },
                            {
                                "value": 15192,
                                "valueTime": "2021-05-15T10:29:00Z"
                            },
                            {
                                "value": 12668,
                                "valueTime": "2021-05-15T10:59:00Z"
                            },
                            {
                                "value": 11528,
                                "valueTime": "2021-05-15T11:29:00Z"
                            },
                            {
                                "value": 9921,
                                "valueTime": "2021-05-15T11:59:00Z"
                            },
                            {
                                "value": 10036,
                                "valueTime": "2021-05-15T12:29:00Z"
                            },
                            {
                                "value": 8795,
                                "valueTime": "2021-05-15T12:59:00Z"
                            },
                            {
                                "value": 9766,
                                "valueTime": "2021-05-15T13:29:00Z"
                            },
                            {
                                "value": 8596,
                                "valueTime": "2021-05-15T13:59:00Z"
                            },
                            {
                                "value": 11781,
                                "valueTime": "2021-05-15T14:29:00Z"
                            },
                            {
                                "value": 5739,
                                "valueTime": "2021-05-15T14:59:00Z"
                            },
                            {
                                "value": 4092,
                                "valueTime": "2021-05-15T15:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-15T15:29:00Z"
                            },
                            {
                                "value": 1030,
                                "valueTime": "2021-05-15T16:29:00Z"
                            },
                            {
                                "value": 140,
                                "valueTime": "2021-05-15T16:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-15T16:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-15T17:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-15T17:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-15T18:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-15T18:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-15T19:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-15T19:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-15T20:29:00Z"
                            },
                            {
                                "value": 2,
                                "valueTime": "2021-05-15T21:29:00Z"
                            },
                            {
                                "value": 2891,
                                "valueTime": "2021-05-15T21:59:00Z"
                            },
                            {
                                "value": 4856,
                                "valueTime": "2021-05-15T22:29:00Z"
                            },
                            {
                                "value": 6324,
                                "valueTime": "2021-05-15T22:59:00Z"
                            },
                            {
                                "value": 7318,
                                "valueTime": "2021-05-15T23:29:00Z"
                            },
                            {
                                "value": 6333,
                                "valueTime": "2021-05-15T23:59:00Z"
                            },
                            {
                                "value": 7139,
                                "valueTime": "2021-05-16T00:29:00Z"
                            },
                            {
                                "value": 7770,
                                "valueTime": "2021-05-16T00:59:00Z"
                            },
                            {
                                "value": 8835,
                                "valueTime": "2021-05-16T01:29:00Z"
                            },
                            {
                                "value": 9889,
                                "valueTime": "2021-05-16T01:59:00Z"
                            },
                            {
                                "value": 8562,
                                "valueTime": "2021-05-16T02:29:00Z"
                            },
                            {
                                "value": 7656,
                                "valueTime": "2021-05-16T02:59:00Z"
                            },
                            {
                                "value": 7918,
                                "valueTime": "2021-05-16T03:29:00Z"
                            },
                            {
                                "value": 7983,
                                "valueTime": "2021-05-16T03:59:00Z"
                            },
                            {
                                "value": 8766,
                                "valueTime": "2021-05-16T04:29:00Z"
                            },
                            {
                                "value": 11068,
                                "valueTime": "2021-05-16T04:59:00Z"
                            },
                            {
                                "value": 9319,
                                "valueTime": "2021-05-16T05:29:00Z"
                            },
                            {
                                "value": 8578,
                                "valueTime": "2021-05-16T05:59:00Z"
                            },
                            {
                                "value": 8283,
                                "valueTime": "2021-05-16T06:29:00Z"
                            },
                            {
                                "value": 8190,
                                "valueTime": "2021-05-16T06:59:00Z"
                            },
                            {
                                "value": 8337,
                                "valueTime": "2021-05-16T07:29:00Z"
                            },
                            {
                                "value": 8219,
                                "valueTime": "2021-05-16T07:59:00Z"
                            },
                            {
                                "value": 8762,
                                "valueTime": "2021-05-16T08:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-16T08:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-16T08:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-16T09:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-16T09:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-16T10:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-16T10:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-16T11:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-16T11:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-16T12:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-16T12:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-16T13:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-16T13:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-16T14:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-16T14:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-16T15:29:00Z"
                            },
                            {
                                "value": 815,
                                "valueTime": "2021-05-16T16:29:00Z"
                            },
                            {
                                "value": 110,
                                "valueTime": "2021-05-16T16:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-16T16:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-16T17:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-16T17:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-16T18:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-16T18:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-16T19:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-16T19:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-16T20:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-16T20:59:00Z"
                            },
                            {
                                "value": 6166,
                                "valueTime": "2021-05-16T21:59:00Z"
                            },
                            {
                                "value": 12412,
                                "valueTime": "2021-05-16T22:29:00Z"
                            },
                            {
                                "value": 28074,
                                "valueTime": "2021-05-16T22:59:00Z"
                            },
                            {
                                "value": 47915,
                                "valueTime": "2021-05-16T23:29:00Z"
                            },
                            {
                                "value": 58662,
                                "valueTime": "2021-05-16T23:59:00Z"
                            },
                            {
                                "value": 56273,
                                "valueTime": "2021-05-17T00:29:00Z"
                            },
                            {
                                "value": 36281,
                                "valueTime": "2021-05-17T00:59:00Z"
                            },
                            {
                                "value": 24588,
                                "valueTime": "2021-05-17T01:29:00Z"
                            },
                            {
                                "value": 18769,
                                "valueTime": "2021-05-17T01:59:00Z"
                            },
                            {
                                "value": 14765,
                                "valueTime": "2021-05-17T02:29:00Z"
                            },
                            {
                                "value": 12521,
                                "valueTime": "2021-05-17T02:59:00Z"
                            },
                            {
                                "value": 11902,
                                "valueTime": "2021-05-17T03:29:00Z"
                            },
                            {
                                "value": 12522,
                                "valueTime": "2021-05-17T03:59:00Z"
                            },
                            {
                                "value": 13032,
                                "valueTime": "2021-05-17T04:29:00Z"
                            },
                            {
                                "value": 13281,
                                "valueTime": "2021-05-17T04:59:00Z"
                            },
                            {
                                "value": 12972,
                                "valueTime": "2021-05-17T05:29:00Z"
                            },
                            {
                                "value": 11423,
                                "valueTime": "2021-05-17T05:59:00Z"
                            },
                            {
                                "value": 11230,
                                "valueTime": "2021-05-17T06:29:00Z"
                            },
                            {
                                "value": 11153,
                                "valueTime": "2021-05-17T06:59:00Z"
                            },
                            {
                                "value": 11979,
                                "valueTime": "2021-05-17T07:29:00Z"
                            },
                            {
                                "value": 12260,
                                "valueTime": "2021-05-17T07:59:00Z"
                            },
                            {
                                "value": 21049,
                                "valueTime": "2021-05-17T08:29:00Z"
                            },
                            {
                                "value": 22881,
                                "valueTime": "2021-05-17T08:59:00Z"
                            },
                            {
                                "value": 33001,
                                "valueTime": "2021-05-17T09:29:00Z"
                            },
                            {
                                "value": 42601,
                                "valueTime": "2021-05-17T09:59:00Z"
                            },
                            {
                                "value": 49906,
                                "valueTime": "2021-05-17T10:29:00Z"
                            },
                            {
                                "value": 38381,
                                "valueTime": "2021-05-17T10:59:00Z"
                            },
                            {
                                "value": 27613,
                                "valueTime": "2021-05-17T11:29:00Z"
                            },
                            {
                                "value": 18325,
                                "valueTime": "2021-05-17T11:59:00Z"
                            },
                            {
                                "value": 15793,
                                "valueTime": "2021-05-17T12:29:00Z"
                            },
                            {
                                "value": 13839,
                                "valueTime": "2021-05-17T12:59:00Z"
                            },
                            {
                                "value": 9955,
                                "valueTime": "2021-05-17T13:29:00Z"
                            },
                            {
                                "value": 9138,
                                "valueTime": "2021-05-17T13:59:00Z"
                            },
                            {
                                "value": 5695,
                                "valueTime": "2021-05-17T14:29:00Z"
                            },
                            {
                                "value": 3518,
                                "valueTime": "2021-05-17T14:59:00Z"
                            },
                            {
                                "value": 2726,
                                "valueTime": "2021-05-17T15:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-17T15:29:00Z"
                            },
                            {
                                "value": 743,
                                "valueTime": "2021-05-17T16:29:00Z"
                            },
                            {
                                "value": 122,
                                "valueTime": "2021-05-17T16:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-17T16:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-17T17:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-17T17:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-17T18:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-17T18:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-17T19:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-17T19:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-17T20:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-17T20:59:00Z"
                            },
                            {
                                "value": 4742,
                                "valueTime": "2021-05-17T21:59:00Z"
                            },
                            {
                                "value": 8218,
                                "valueTime": "2021-05-17T22:29:00Z"
                            },
                            {
                                "value": 16554,
                                "valueTime": "2021-05-17T22:59:00Z"
                            },
                            {
                                "value": 32317,
                                "valueTime": "2021-05-17T23:29:00Z"
                            },
                            {
                                "value": 51739,
                                "valueTime": "2021-05-17T23:59:00Z"
                            },
                            {
                                "value": 49385,
                                "valueTime": "2021-05-18T00:29:00Z"
                            },
                            {
                                "value": 30753,
                                "valueTime": "2021-05-18T00:59:00Z"
                            },
                            {
                                "value": 18035,
                                "valueTime": "2021-05-18T01:29:00Z"
                            },
                            {
                                "value": 12775,
                                "valueTime": "2021-05-18T01:59:00Z"
                            },
                            {
                                "value": 11723,
                                "valueTime": "2021-05-18T02:29:00Z"
                            },
                            {
                                "value": 10753,
                                "valueTime": "2021-05-18T02:59:00Z"
                            },
                            {
                                "value": 9273,
                                "valueTime": "2021-05-18T03:29:00Z"
                            },
                            {
                                "value": 7969,
                                "valueTime": "2021-05-18T03:59:00Z"
                            },
                            {
                                "value": 8927,
                                "valueTime": "2021-05-18T04:29:00Z"
                            },
                            {
                                "value": 8700,
                                "valueTime": "2021-05-18T04:59:00Z"
                            },
                            {
                                "value": 8646,
                                "valueTime": "2021-05-18T05:29:00Z"
                            },
                            {
                                "value": 8227,
                                "valueTime": "2021-05-18T05:59:00Z"
                            },
                            {
                                "value": 8310,
                                "valueTime": "2021-05-18T06:29:00Z"
                            },
                            {
                                "value": 8466,
                                "valueTime": "2021-05-18T06:59:00Z"
                            },
                            {
                                "value": 8827,
                                "valueTime": "2021-05-18T07:29:00Z"
                            },
                            {
                                "value": 8398,
                                "valueTime": "2021-05-18T07:59:00Z"
                            },
                            {
                                "value": 10816,
                                "valueTime": "2021-05-18T08:29:00Z"
                            },
                            {
                                "value": 15716,
                                "valueTime": "2021-05-18T08:59:00Z"
                            },
                            {
                                "value": 27121,
                                "valueTime": "2021-05-18T09:29:00Z"
                            },
                            {
                                "value": 36718,
                                "valueTime": "2021-05-18T09:59:00Z"
                            },
                            {
                                "value": 40584,
                                "valueTime": "2021-05-18T10:29:00Z"
                            },
                            {
                                "value": 31653,
                                "valueTime": "2021-05-18T10:59:00Z"
                            },
                            {
                                "value": 22102,
                                "valueTime": "2021-05-18T11:29:00Z"
                            },
                            {
                                "value": 14620,
                                "valueTime": "2021-05-18T11:59:00Z"
                            },
                            {
                                "value": 14616,
                                "valueTime": "2021-05-18T12:29:00Z"
                            },
                            {
                                "value": 10580,
                                "valueTime": "2021-05-18T12:59:00Z"
                            },
                            {
                                "value": 8776,
                                "valueTime": "2021-05-18T13:29:00Z"
                            },
                            {
                                "value": 6255,
                                "valueTime": "2021-05-18T13:59:00Z"
                            },
                            {
                                "value": 5390,
                                "valueTime": "2021-05-18T14:29:00Z"
                            },
                            {
                                "value": 3104,
                                "valueTime": "2021-05-18T14:59:00Z"
                            },
                            {
                                "value": 2670,
                                "valueTime": "2021-05-18T15:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-18T15:29:00Z"
                            },
                            {
                                "value": 754,
                                "valueTime": "2021-05-18T16:29:00Z"
                            },
                            {
                                "value": 136,
                                "valueTime": "2021-05-18T16:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-18T16:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-18T17:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-18T17:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-18T18:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-18T19:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-18T19:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-18T19:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-18T20:29:00Z"
                            },
                            {
                                "value": 2,
                                "valueTime": "2021-05-18T21:29:00Z"
                            },
                            {
                                "value": 4735,
                                "valueTime": "2021-05-18T21:59:00Z"
                            },
                            {
                                "value": 8142,
                                "valueTime": "2021-05-18T22:29:00Z"
                            },
                            {
                                "value": 16122,
                                "valueTime": "2021-05-18T22:59:00Z"
                            },
                            {
                                "value": 30500,
                                "valueTime": "2021-05-18T23:29:00Z"
                            },
                            {
                                "value": 42574,
                                "valueTime": "2021-05-18T23:59:00Z"
                            },
                            {
                                "value": 41239,
                                "valueTime": "2021-05-19T00:29:00Z"
                            },
                            {
                                "value": 26091,
                                "valueTime": "2021-05-19T00:59:00Z"
                            },
                            {
                                "value": 17741,
                                "valueTime": "2021-05-19T01:29:00Z"
                            },
                            {
                                "value": 10830,
                                "valueTime": "2021-05-19T01:59:00Z"
                            },
                            {
                                "value": 10661,
                                "valueTime": "2021-05-19T02:29:00Z"
                            },
                            {
                                "value": 9599,
                                "valueTime": "2021-05-19T02:59:00Z"
                            },
                            {
                                "value": 8546,
                                "valueTime": "2021-05-19T03:29:00Z"
                            },
                            {
                                "value": 7535,
                                "valueTime": "2021-05-19T03:59:00Z"
                            },
                            {
                                "value": 8426,
                                "valueTime": "2021-05-19T04:29:00Z"
                            },
                            {
                                "value": 8111,
                                "valueTime": "2021-05-19T04:59:00Z"
                            },
                            {
                                "value": 8181,
                                "valueTime": "2021-05-19T05:29:00Z"
                            },
                            {
                                "value": 7442,
                                "valueTime": "2021-05-19T05:59:00Z"
                            },
                            {
                                "value": 7552,
                                "valueTime": "2021-05-19T06:29:00Z"
                            },
                            {
                                "value": 7410,
                                "valueTime": "2021-05-19T06:59:00Z"
                            },
                            {
                                "value": 7935,
                                "valueTime": "2021-05-19T07:29:00Z"
                            },
                            {
                                "value": 8045,
                                "valueTime": "2021-05-19T07:59:00Z"
                            },
                            {
                                "value": 10384,
                                "valueTime": "2021-05-19T08:29:00Z"
                            },
                            {
                                "value": 14546,
                                "valueTime": "2021-05-19T08:59:00Z"
                            },
                            {
                                "value": 26062,
                                "valueTime": "2021-05-19T09:29:00Z"
                            },
                            {
                                "value": 38682,
                                "valueTime": "2021-05-19T09:59:00Z"
                            },
                            {
                                "value": 38917,
                                "valueTime": "2021-05-19T10:29:00Z"
                            },
                            {
                                "value": 28923,
                                "valueTime": "2021-05-19T10:59:00Z"
                            },
                            {
                                "value": 21009,
                                "valueTime": "2021-05-19T11:29:00Z"
                            },
                            {
                                "value": 13771,
                                "valueTime": "2021-05-19T11:59:00Z"
                            },
                            {
                                "value": 13817,
                                "valueTime": "2021-05-19T12:29:00Z"
                            },
                            {
                                "value": 10121,
                                "valueTime": "2021-05-19T12:59:00Z"
                            },
                            {
                                "value": 8357,
                                "valueTime": "2021-05-19T13:29:00Z"
                            },
                            {
                                "value": 5847,
                                "valueTime": "2021-05-19T13:59:00Z"
                            },
                            {
                                "value": 5074,
                                "valueTime": "2021-05-19T14:29:00Z"
                            },
                            {
                                "value": 2989,
                                "valueTime": "2021-05-19T14:59:00Z"
                            },
                            {
                                "value": 2510,
                                "valueTime": "2021-05-19T15:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-19T15:29:00Z"
                            },
                            {
                                "value": 704,
                                "valueTime": "2021-05-19T16:29:00Z"
                            },
                            {
                                "value": 119,
                                "valueTime": "2021-05-19T16:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-19T16:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-19T17:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-19T17:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-19T18:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-19T18:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-19T19:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-19T19:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-19T20:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-19T20:59:00Z"
                            },
                            {
                                "value": 4451,
                                "valueTime": "2021-05-19T21:59:00Z"
                            },
                            {
                                "value": 7678,
                                "valueTime": "2021-05-19T22:29:00Z"
                            },
                            {
                                "value": 14970,
                                "valueTime": "2021-05-19T22:59:00Z"
                            },
                            {
                                "value": 29375,
                                "valueTime": "2021-05-19T23:29:00Z"
                            },
                            {
                                "value": 42642,
                                "valueTime": "2021-05-19T23:59:00Z"
                            },
                            {
                                "value": 33442,
                                "valueTime": "2021-05-20T00:29:00Z"
                            },
                            {
                                "value": 25039,
                                "valueTime": "2021-05-20T00:59:00Z"
                            },
                            {
                                "value": 16169,
                                "valueTime": "2021-05-20T01:29:00Z"
                            },
                            {
                                "value": 11339,
                                "valueTime": "2021-05-20T01:59:00Z"
                            },
                            {
                                "value": 9641,
                                "valueTime": "2021-05-20T02:29:00Z"
                            },
                            {
                                "value": 9419,
                                "valueTime": "2021-05-20T02:59:00Z"
                            },
                            {
                                "value": 8107,
                                "valueTime": "2021-05-20T03:29:00Z"
                            },
                            {
                                "value": 6997,
                                "valueTime": "2021-05-20T03:59:00Z"
                            },
                            {
                                "value": 7963,
                                "valueTime": "2021-05-20T04:29:00Z"
                            },
                            {
                                "value": 7604,
                                "valueTime": "2021-05-20T04:59:00Z"
                            },
                            {
                                "value": 7603,
                                "valueTime": "2021-05-20T05:29:00Z"
                            },
                            {
                                "value": 7253,
                                "valueTime": "2021-05-20T05:59:00Z"
                            },
                            {
                                "value": 7593,
                                "valueTime": "2021-05-20T06:29:00Z"
                            },
                            {
                                "value": 7257,
                                "valueTime": "2021-05-20T06:59:00Z"
                            },
                            {
                                "value": 7670,
                                "valueTime": "2021-05-20T07:29:00Z"
                            },
                            {
                                "value": 7627,
                                "valueTime": "2021-05-20T07:59:00Z"
                            },
                            {
                                "value": 9858,
                                "valueTime": "2021-05-20T08:29:00Z"
                            },
                            {
                                "value": 14403,
                                "valueTime": "2021-05-20T08:59:00Z"
                            },
                            {
                                "value": 25535,
                                "valueTime": "2021-05-20T09:29:00Z"
                            },
                            {
                                "value": 33492,
                                "valueTime": "2021-05-20T09:59:00Z"
                            },
                            {
                                "value": 36878,
                                "valueTime": "2021-05-20T10:29:00Z"
                            },
                            {
                                "value": 27324,
                                "valueTime": "2021-05-20T10:59:00Z"
                            },
                            {
                                "value": 19638,
                                "valueTime": "2021-05-20T11:29:00Z"
                            },
                            {
                                "value": 12808,
                                "valueTime": "2021-05-20T11:59:00Z"
                            },
                            {
                                "value": 13401,
                                "valueTime": "2021-05-20T12:29:00Z"
                            },
                            {
                                "value": 9790,
                                "valueTime": "2021-05-20T12:59:00Z"
                            },
                            {
                                "value": 7907,
                                "valueTime": "2021-05-20T13:29:00Z"
                            },
                            {
                                "value": 5596,
                                "valueTime": "2021-05-20T13:59:00Z"
                            },
                            {
                                "value": 4825,
                                "valueTime": "2021-05-20T14:29:00Z"
                            },
                            {
                                "value": 2641,
                                "valueTime": "2021-05-20T14:59:00Z"
                            },
                            {
                                "value": 2414,
                                "valueTime": "2021-05-20T15:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-20T15:29:00Z"
                            },
                            {
                                "value": 740,
                                "valueTime": "2021-05-20T16:29:00Z"
                            },
                            {
                                "value": 101,
                                "valueTime": "2021-05-20T16:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-20T16:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-20T17:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-20T17:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-20T18:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-20T18:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-20T19:29:00Z"
                            },
                            {
                                "value": 1,
                                "valueTime": "2021-05-20T20:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-20T20:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-20T20:59:00Z"
                            },
                            {
                                "value": 4471,
                                "valueTime": "2021-05-20T21:59:00Z"
                            },
                            {
                                "value": 7460,
                                "valueTime": "2021-05-20T22:29:00Z"
                            },
                            {
                                "value": 13911,
                                "valueTime": "2021-05-20T22:59:00Z"
                            },
                            {
                                "value": 27420,
                                "valueTime": "2021-05-20T23:29:00Z"
                            },
                            {
                                "value": 37574,
                                "valueTime": "2021-05-20T23:59:00Z"
                            },
                            {
                                "value": 36867,
                                "valueTime": "2021-05-21T00:29:00Z"
                            },
                            {
                                "value": 23536,
                                "valueTime": "2021-05-21T00:59:00Z"
                            },
                            {
                                "value": 15025,
                                "valueTime": "2021-05-21T01:29:00Z"
                            },
                            {
                                "value": 10671,
                                "valueTime": "2021-05-21T01:59:00Z"
                            },
                            {
                                "value": 10017,
                                "valueTime": "2021-05-21T02:29:00Z"
                            },
                            {
                                "value": 8889,
                                "valueTime": "2021-05-21T02:59:00Z"
                            },
                            {
                                "value": 7987,
                                "valueTime": "2021-05-21T03:29:00Z"
                            },
                            {
                                "value": 6646,
                                "valueTime": "2021-05-21T03:59:00Z"
                            },
                            {
                                "value": 7620,
                                "valueTime": "2021-05-21T04:29:00Z"
                            },
                            {
                                "value": 7825,
                                "valueTime": "2021-05-21T04:59:00Z"
                            },
                            {
                                "value": 7190,
                                "valueTime": "2021-05-21T05:29:00Z"
                            },
                            {
                                "value": 6916,
                                "valueTime": "2021-05-21T05:59:00Z"
                            },
                            {
                                "value": 7273,
                                "valueTime": "2021-05-21T06:29:00Z"
                            },
                            {
                                "value": 7128,
                                "valueTime": "2021-05-21T06:59:00Z"
                            },
                            {
                                "value": 7802,
                                "valueTime": "2021-05-21T07:29:00Z"
                            },
                            {
                                "value": 7797,
                                "valueTime": "2021-05-21T07:59:00Z"
                            },
                            {
                                "value": 9955,
                                "valueTime": "2021-05-21T08:29:00Z"
                            },
                            {
                                "value": 13773,
                                "valueTime": "2021-05-21T08:59:00Z"
                            },
                            {
                                "value": 23210,
                                "valueTime": "2021-05-21T09:29:00Z"
                            },
                            {
                                "value": 31113,
                                "valueTime": "2021-05-21T09:59:00Z"
                            },
                            {
                                "value": 35041,
                                "valueTime": "2021-05-21T10:29:00Z"
                            },
                            {
                                "value": 26534,
                                "valueTime": "2021-05-21T10:59:00Z"
                            },
                            {
                                "value": 19355,
                                "valueTime": "2021-05-21T11:29:00Z"
                            },
                            {
                                "value": 12814,
                                "valueTime": "2021-05-21T11:59:00Z"
                            },
                            {
                                "value": 13054,
                                "valueTime": "2021-05-21T12:29:00Z"
                            },
                            {
                                "value": 9520,
                                "valueTime": "2021-05-21T12:59:00Z"
                            },
                            {
                                "value": 7998,
                                "valueTime": "2021-05-21T13:29:00Z"
                            },
                            {
                                "value": 5693,
                                "valueTime": "2021-05-21T13:59:00Z"
                            },
                            {
                                "value": 4827,
                                "valueTime": "2021-05-21T14:29:00Z"
                            },
                            {
                                "value": 2966,
                                "valueTime": "2021-05-21T14:59:00Z"
                            },
                            {
                                "value": 2660,
                                "valueTime": "2021-05-21T15:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-21T15:29:00Z"
                            },
                            {
                                "value": 689,
                                "valueTime": "2021-05-21T16:29:00Z"
                            },
                            {
                                "value": 98,
                                "valueTime": "2021-05-21T16:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-21T16:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-21T17:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-21T17:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-21T18:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-21T18:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-21T19:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-21T19:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-21T20:29:00Z"
                            },
                            {
                                "value": 1,
                                "valueTime": "2021-05-21T21:29:00Z"
                            },
                            {
                                "value": 2541,
                                "valueTime": "2021-05-21T21:59:00Z"
                            },
                            {
                                "value": 3703,
                                "valueTime": "2021-05-21T22:29:00Z"
                            },
                            {
                                "value": 4329,
                                "valueTime": "2021-05-21T22:59:00Z"
                            },
                            {
                                "value": 5715,
                                "valueTime": "2021-05-21T23:29:00Z"
                            },
                            {
                                "value": 5185,
                                "valueTime": "2021-05-21T23:59:00Z"
                            },
                            {
                                "value": 5849,
                                "valueTime": "2021-05-22T00:29:00Z"
                            },
                            {
                                "value": 5617,
                                "valueTime": "2021-05-22T00:59:00Z"
                            },
                            {
                                "value": 5895,
                                "valueTime": "2021-05-22T01:29:00Z"
                            },
                            {
                                "value": 6107,
                                "valueTime": "2021-05-22T01:59:00Z"
                            },
                            {
                                "value": 7134,
                                "valueTime": "2021-05-22T02:29:00Z"
                            },
                            {
                                "value": 7083,
                                "valueTime": "2021-05-22T02:59:00Z"
                            },
                            {
                                "value": 5858,
                                "valueTime": "2021-05-22T03:29:00Z"
                            },
                            {
                                "value": 5555,
                                "valueTime": "2021-05-22T03:59:00Z"
                            },
                            {
                                "value": 1542,
                                "valueTime": "2021-05-22T04:29:00Z"
                            },
                            {
                                "value": 4761,
                                "valueTime": "2021-05-22T04:59:00Z"
                            },
                            {
                                "value": 4943,
                                "valueTime": "2021-05-22T05:29:00Z"
                            },
                            {
                                "value": 4632,
                                "valueTime": "2021-05-22T05:59:00Z"
                            },
                            {
                                "value": 4588,
                                "valueTime": "2021-05-22T06:29:00Z"
                            },
                            {
                                "value": 4283,
                                "valueTime": "2021-05-22T06:59:00Z"
                            },
                            {
                                "value": 4952,
                                "valueTime": "2021-05-22T07:29:00Z"
                            },
                            {
                                "value": 4574,
                                "valueTime": "2021-05-22T07:59:00Z"
                            },
                            {
                                "value": 4879,
                                "valueTime": "2021-05-22T08:29:00Z"
                            },
                            {
                                "value": 5306,
                                "valueTime": "2021-05-22T08:59:00Z"
                            },
                            {
                                "value": 6730,
                                "valueTime": "2021-05-22T09:29:00Z"
                            },
                            {
                                "value": 6089,
                                "valueTime": "2021-05-22T09:59:00Z"
                            },
                            {
                                "value": 6136,
                                "valueTime": "2021-05-22T10:29:00Z"
                            },
                            {
                                "value": 5313,
                                "valueTime": "2021-05-22T10:59:00Z"
                            },
                            {
                                "value": 5091,
                                "valueTime": "2021-05-22T11:29:00Z"
                            },
                            {
                                "value": 3842,
                                "valueTime": "2021-05-22T11:59:00Z"
                            },
                            {
                                "value": 7078,
                                "valueTime": "2021-05-22T12:29:00Z"
                            },
                            {
                                "value": 5167,
                                "valueTime": "2021-05-22T12:59:00Z"
                            },
                            {
                                "value": 4511,
                                "valueTime": "2021-05-22T13:29:00Z"
                            },
                            {
                                "value": 3091,
                                "valueTime": "2021-05-22T13:59:00Z"
                            },
                            {
                                "value": 3047,
                                "valueTime": "2021-05-22T14:29:00Z"
                            },
                            {
                                "value": 1855,
                                "valueTime": "2021-05-22T14:59:00Z"
                            },
                            {
                                "value": 1828,
                                "valueTime": "2021-05-22T15:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-22T15:29:00Z"
                            },
                            {
                                "value": 567,
                                "valueTime": "2021-05-22T16:29:00Z"
                            },
                            {
                                "value": 106,
                                "valueTime": "2021-05-22T16:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-22T16:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-22T17:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-22T17:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-22T18:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-22T18:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-22T19:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-22T19:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-22T20:29:00Z"
                            },
                            {
                                "value": 1,
                                "valueTime": "2021-05-22T21:29:00Z"
                            },
                            {
                                "value": 2030,
                                "valueTime": "2021-05-22T21:59:00Z"
                            },
                            {
                                "value": 2897,
                                "valueTime": "2021-05-22T22:29:00Z"
                            },
                            {
                                "value": 3121,
                                "valueTime": "2021-05-22T22:59:00Z"
                            },
                            {
                                "value": 3827,
                                "valueTime": "2021-05-22T23:29:00Z"
                            },
                            {
                                "value": 3256,
                                "valueTime": "2021-05-22T23:59:00Z"
                            },
                            {
                                "value": 3598,
                                "valueTime": "2021-05-23T00:29:00Z"
                            },
                            {
                                "value": 3417,
                                "valueTime": "2021-05-23T00:59:00Z"
                            },
                            {
                                "value": 3837,
                                "valueTime": "2021-05-23T01:29:00Z"
                            },
                            {
                                "value": 4149,
                                "valueTime": "2021-05-23T01:59:00Z"
                            },
                            {
                                "value": 5192,
                                "valueTime": "2021-05-23T02:29:00Z"
                            },
                            {
                                "value": 4941,
                                "valueTime": "2021-05-23T02:59:00Z"
                            },
                            {
                                "value": 4058,
                                "valueTime": "2021-05-23T03:29:00Z"
                            },
                            {
                                "value": 3163,
                                "valueTime": "2021-05-23T03:59:00Z"
                            },
                            {
                                "value": 3187,
                                "valueTime": "2021-05-23T04:29:00Z"
                            },
                            {
                                "value": 3083,
                                "valueTime": "2021-05-23T04:59:00Z"
                            },
                            {
                                "value": 3316,
                                "valueTime": "2021-05-23T05:29:00Z"
                            },
                            {
                                "value": 3380,
                                "valueTime": "2021-05-23T05:59:00Z"
                            },
                            {
                                "value": 3495,
                                "valueTime": "2021-05-23T06:29:00Z"
                            },
                            {
                                "value": 3425,
                                "valueTime": "2021-05-23T06:59:00Z"
                            },
                            {
                                "value": 3775,
                                "valueTime": "2021-05-23T07:29:00Z"
                            },
                            {
                                "value": 3639,
                                "valueTime": "2021-05-23T07:59:00Z"
                            },
                            {
                                "value": 4178,
                                "valueTime": "2021-05-23T08:29:00Z"
                            },
                            {
                                "value": 5124,
                                "valueTime": "2021-05-23T08:59:00Z"
                            },
                            {
                                "value": 1574,
                                "valueTime": "2021-05-23T09:29:00Z"
                            },
                            {
                                "value": 4853,
                                "valueTime": "2021-05-23T09:59:00Z"
                            },
                            {
                                "value": 4959,
                                "valueTime": "2021-05-23T10:29:00Z"
                            },
                            {
                                "value": 4244,
                                "valueTime": "2021-05-23T10:59:00Z"
                            },
                            {
                                "value": 4490,
                                "valueTime": "2021-05-23T11:29:00Z"
                            },
                            {
                                "value": 3636,
                                "valueTime": "2021-05-23T11:59:00Z"
                            },
                            {
                                "value": 6584,
                                "valueTime": "2021-05-23T12:29:00Z"
                            },
                            {
                                "value": 5584,
                                "valueTime": "2021-05-23T12:59:00Z"
                            },
                            {
                                "value": 4256,
                                "valueTime": "2021-05-23T13:29:00Z"
                            },
                            {
                                "value": 2910,
                                "valueTime": "2021-05-23T13:59:00Z"
                            },
                            {
                                "value": 2869,
                                "valueTime": "2021-05-23T14:29:00Z"
                            },
                            {
                                "value": 1885,
                                "valueTime": "2021-05-23T14:59:00Z"
                            },
                            {
                                "value": 1706,
                                "valueTime": "2021-05-23T15:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-23T15:29:00Z"
                            },
                            {
                                "value": 531,
                                "valueTime": "2021-05-23T16:29:00Z"
                            },
                            {
                                "value": 67,
                                "valueTime": "2021-05-23T16:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-23T16:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-23T17:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-23T17:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-23T18:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-23T18:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-23T19:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-23T19:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-23T20:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-23T20:59:00Z"
                            },
                            {
                                "value": 4510,
                                "valueTime": "2021-05-23T21:59:00Z"
                            },
                            {
                                "value": 7318,
                                "valueTime": "2021-05-23T22:29:00Z"
                            },
                            {
                                "value": 14202,
                                "valueTime": "2021-05-23T22:59:00Z"
                            },
                            {
                                "value": 26652,
                                "valueTime": "2021-05-23T23:29:00Z"
                            },
                            {
                                "value": 36737,
                                "valueTime": "2021-05-23T23:59:00Z"
                            },
                            {
                                "value": 35485,
                                "valueTime": "2021-05-24T00:29:00Z"
                            },
                            {
                                "value": 21807,
                                "valueTime": "2021-05-24T00:59:00Z"
                            },
                            {
                                "value": 16156,
                                "valueTime": "2021-05-24T01:29:00Z"
                            },
                            {
                                "value": 9786,
                                "valueTime": "2021-05-24T01:59:00Z"
                            },
                            {
                                "value": 9030,
                                "valueTime": "2021-05-24T02:29:00Z"
                            },
                            {
                                "value": 8169,
                                "valueTime": "2021-05-24T02:59:00Z"
                            },
                            {
                                "value": 7205,
                                "valueTime": "2021-05-24T03:29:00Z"
                            },
                            {
                                "value": 6125,
                                "valueTime": "2021-05-24T03:59:00Z"
                            },
                            {
                                "value": 6876,
                                "valueTime": "2021-05-24T04:29:00Z"
                            },
                            {
                                "value": 6697,
                                "valueTime": "2021-05-24T04:59:00Z"
                            },
                            {
                                "value": 6505,
                                "valueTime": "2021-05-24T05:29:00Z"
                            },
                            {
                                "value": 6409,
                                "valueTime": "2021-05-24T05:59:00Z"
                            },
                            {
                                "value": 6597,
                                "valueTime": "2021-05-24T06:29:00Z"
                            },
                            {
                                "value": 6156,
                                "valueTime": "2021-05-24T06:59:00Z"
                            },
                            {
                                "value": 6146,
                                "valueTime": "2021-05-24T07:29:00Z"
                            },
                            {
                                "value": 6610,
                                "valueTime": "2021-05-24T07:59:00Z"
                            },
                            {
                                "value": 8710,
                                "valueTime": "2021-05-24T08:29:00Z"
                            },
                            {
                                "value": 12915,
                                "valueTime": "2021-05-24T08:59:00Z"
                            },
                            {
                                "value": 22997,
                                "valueTime": "2021-05-24T09:29:00Z"
                            },
                            {
                                "value": 30171,
                                "valueTime": "2021-05-24T09:59:00Z"
                            },
                            {
                                "value": 32923,
                                "valueTime": "2021-05-24T10:29:00Z"
                            },
                            {
                                "value": 24745,
                                "valueTime": "2021-05-24T10:59:00Z"
                            },
                            {
                                "value": 17704,
                                "valueTime": "2021-05-24T11:29:00Z"
                            },
                            {
                                "value": 11266,
                                "valueTime": "2021-05-24T11:59:00Z"
                            },
                            {
                                "value": 11780,
                                "valueTime": "2021-05-24T12:29:00Z"
                            },
                            {
                                "value": 7935,
                                "valueTime": "2021-05-24T12:59:00Z"
                            },
                            {
                                "value": 6630,
                                "valueTime": "2021-05-24T13:29:00Z"
                            },
                            {
                                "value": 5158,
                                "valueTime": "2021-05-24T13:59:00Z"
                            },
                            {
                                "value": 1391,
                                "valueTime": "2021-05-24T14:29:00Z"
                            },
                            {
                                "value": 2330,
                                "valueTime": "2021-05-24T14:59:00Z"
                            },
                            {
                                "value": 2137,
                                "valueTime": "2021-05-24T15:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-24T15:29:00Z"
                            },
                            {
                                "value": 644,
                                "valueTime": "2021-05-24T16:29:00Z"
                            },
                            {
                                "value": 99,
                                "valueTime": "2021-05-24T16:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-24T16:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-24T17:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-24T17:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-24T18:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-24T18:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-24T19:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-24T19:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-24T20:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-24T20:59:00Z"
                            },
                            {
                                "value": 4358,
                                "valueTime": "2021-05-24T21:59:00Z"
                            },
                            {
                                "value": 7172,
                                "valueTime": "2021-05-24T22:29:00Z"
                            },
                            {
                                "value": 13506,
                                "valueTime": "2021-05-24T22:59:00Z"
                            },
                            {
                                "value": 26076,
                                "valueTime": "2021-05-24T23:29:00Z"
                            },
                            {
                                "value": 34851,
                                "valueTime": "2021-05-24T23:59:00Z"
                            },
                            {
                                "value": 33864,
                                "valueTime": "2021-05-25T00:29:00Z"
                            },
                            {
                                "value": 21290,
                                "valueTime": "2021-05-25T00:59:00Z"
                            },
                            {
                                "value": 14025,
                                "valueTime": "2021-05-25T01:29:00Z"
                            },
                            {
                                "value": 9680,
                                "valueTime": "2021-05-25T01:59:00Z"
                            },
                            {
                                "value": 8939,
                                "valueTime": "2021-05-25T02:29:00Z"
                            },
                            {
                                "value": 8224,
                                "valueTime": "2021-05-25T02:59:00Z"
                            },
                            {
                                "value": 7147,
                                "valueTime": "2021-05-25T03:29:00Z"
                            },
                            {
                                "value": 5883,
                                "valueTime": "2021-05-25T03:59:00Z"
                            },
                            {
                                "value": 6649,
                                "valueTime": "2021-05-25T04:29:00Z"
                            },
                            {
                                "value": 6458,
                                "valueTime": "2021-05-25T04:59:00Z"
                            },
                            {
                                "value": 6471,
                                "valueTime": "2021-05-25T05:29:00Z"
                            },
                            {
                                "value": 6012,
                                "valueTime": "2021-05-25T05:59:00Z"
                            },
                            {
                                "value": 6258,
                                "valueTime": "2021-05-25T06:29:00Z"
                            },
                            {
                                "value": 6134,
                                "valueTime": "2021-05-25T06:59:00Z"
                            },
                            {
                                "value": 6731,
                                "valueTime": "2021-05-25T07:29:00Z"
                            },
                            {
                                "value": 6545,
                                "valueTime": "2021-05-25T07:59:00Z"
                            },
                            {
                                "value": 8422,
                                "valueTime": "2021-05-25T08:29:00Z"
                            },
                            {
                                "value": 12309,
                                "valueTime": "2021-05-25T08:59:00Z"
                            },
                            {
                                "value": 21913,
                                "valueTime": "2021-05-25T09:29:00Z"
                            },
                            {
                                "value": 28954,
                                "valueTime": "2021-05-25T09:59:00Z"
                            },
                            {
                                "value": 31959,
                                "valueTime": "2021-05-25T10:29:00Z"
                            },
                            {
                                "value": 23928,
                                "valueTime": "2021-05-25T10:59:00Z"
                            },
                            {
                                "value": 17421,
                                "valueTime": "2021-05-25T11:29:00Z"
                            },
                            {
                                "value": 11174,
                                "valueTime": "2021-05-25T11:59:00Z"
                            },
                            {
                                "value": 12043,
                                "valueTime": "2021-05-25T12:29:00Z"
                            },
                            {
                                "value": 8399,
                                "valueTime": "2021-05-25T12:59:00Z"
                            },
                            {
                                "value": 6713,
                                "valueTime": "2021-05-25T13:29:00Z"
                            },
                            {
                                "value": 4746,
                                "valueTime": "2021-05-25T13:59:00Z"
                            },
                            {
                                "value": 4148,
                                "valueTime": "2021-05-25T14:29:00Z"
                            },
                            {
                                "value": 2418,
                                "valueTime": "2021-05-25T14:59:00Z"
                            },
                            {
                                "value": 2218,
                                "valueTime": "2021-05-25T15:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-25T15:29:00Z"
                            },
                            {
                                "value": 629,
                                "valueTime": "2021-05-25T16:29:00Z"
                            },
                            {
                                "value": 94,
                                "valueTime": "2021-05-25T16:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-25T16:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-25T17:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-25T17:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-25T18:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-25T19:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-25T19:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-25T19:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-25T20:29:00Z"
                            },
                            {
                                "value": 1,
                                "valueTime": "2021-05-25T21:29:00Z"
                            },
                            {
                                "value": 4298,
                                "valueTime": "2021-05-25T21:59:00Z"
                            },
                            {
                                "value": 6850,
                                "valueTime": "2021-05-25T22:29:00Z"
                            },
                            {
                                "value": 12942,
                                "valueTime": "2021-05-25T22:59:00Z"
                            },
                            {
                                "value": 24735,
                                "valueTime": "2021-05-25T23:29:00Z"
                            },
                            {
                                "value": 33781,
                                "valueTime": "2021-05-25T23:59:00Z"
                            },
                            {
                                "value": 32955,
                                "valueTime": "2021-05-26T00:29:00Z"
                            },
                            {
                                "value": 21108,
                                "valueTime": "2021-05-26T00:59:00Z"
                            },
                            {
                                "value": 13947,
                                "valueTime": "2021-05-26T01:29:00Z"
                            },
                            {
                                "value": 9391,
                                "valueTime": "2021-05-26T01:59:00Z"
                            },
                            {
                                "value": 8751,
                                "valueTime": "2021-05-26T02:29:00Z"
                            },
                            {
                                "value": 8399,
                                "valueTime": "2021-05-26T02:59:00Z"
                            },
                            {
                                "value": 7075,
                                "valueTime": "2021-05-26T03:29:00Z"
                            },
                            {
                                "value": 5910,
                                "valueTime": "2021-05-26T03:59:00Z"
                            },
                            {
                                "value": 6720,
                                "valueTime": "2021-05-26T04:29:00Z"
                            },
                            {
                                "value": 6467,
                                "valueTime": "2021-05-26T04:59:00Z"
                            },
                            {
                                "value": 6614,
                                "valueTime": "2021-05-26T05:29:00Z"
                            },
                            {
                                "value": 6118,
                                "valueTime": "2021-05-26T05:59:00Z"
                            },
                            {
                                "value": 6183,
                                "valueTime": "2021-05-26T06:29:00Z"
                            },
                            {
                                "value": 6230,
                                "valueTime": "2021-05-26T06:59:00Z"
                            },
                            {
                                "value": 6884,
                                "valueTime": "2021-05-26T07:29:00Z"
                            },
                            {
                                "value": 6491,
                                "valueTime": "2021-05-26T07:59:00Z"
                            },
                            {
                                "value": 8658,
                                "valueTime": "2021-05-26T08:29:00Z"
                            },
                            {
                                "value": 12245,
                                "valueTime": "2021-05-26T08:59:00Z"
                            },
                            {
                                "value": 21995,
                                "valueTime": "2021-05-26T09:29:00Z"
                            },
                            {
                                "value": 28449,
                                "valueTime": "2021-05-26T09:59:00Z"
                            },
                            {
                                "value": 30866,
                                "valueTime": "2021-05-26T10:29:00Z"
                            },
                            {
                                "value": 23209,
                                "valueTime": "2021-05-26T10:59:00Z"
                            },
                            {
                                "value": 17302,
                                "valueTime": "2021-05-26T11:29:00Z"
                            },
                            {
                                "value": 10968,
                                "valueTime": "2021-05-26T11:59:00Z"
                            },
                            {
                                "value": 11353,
                                "valueTime": "2021-05-26T12:29:00Z"
                            },
                            {
                                "value": 8253,
                                "valueTime": "2021-05-26T12:59:00Z"
                            },
                            {
                                "value": 6745,
                                "valueTime": "2021-05-26T13:29:00Z"
                            },
                            {
                                "value": 4541,
                                "valueTime": "2021-05-26T13:59:00Z"
                            },
                            {
                                "value": 4131,
                                "valueTime": "2021-05-26T14:29:00Z"
                            },
                            {
                                "value": 2317,
                                "valueTime": "2021-05-26T14:59:00Z"
                            },
                            {
                                "value": 2130,
                                "valueTime": "2021-05-26T15:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-26T15:29:00Z"
                            },
                            {
                                "value": 620,
                                "valueTime": "2021-05-26T16:29:00Z"
                            },
                            {
                                "value": 81,
                                "valueTime": "2021-05-26T16:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-26T16:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-26T17:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-26T17:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-26T18:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-26T18:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-26T19:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-26T19:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-26T20:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-26T20:59:00Z"
                            },
                            {
                                "value": 4271,
                                "valueTime": "2021-05-26T21:59:00Z"
                            },
                            {
                                "value": 6913,
                                "valueTime": "2021-05-26T22:29:00Z"
                            },
                            {
                                "value": 13009,
                                "valueTime": "2021-05-26T22:59:00Z"
                            },
                            {
                                "value": 24638,
                                "valueTime": "2021-05-26T23:29:00Z"
                            },
                            {
                                "value": 33408,
                                "valueTime": "2021-05-26T23:59:00Z"
                            },
                            {
                                "value": 32394,
                                "valueTime": "2021-05-27T00:29:00Z"
                            },
                            {
                                "value": 20041,
                                "valueTime": "2021-05-27T00:59:00Z"
                            },
                            {
                                "value": 13412,
                                "valueTime": "2021-05-27T01:29:00Z"
                            },
                            {
                                "value": 9347,
                                "valueTime": "2021-05-27T01:59:00Z"
                            },
                            {
                                "value": 8747,
                                "valueTime": "2021-05-27T02:29:00Z"
                            },
                            {
                                "value": 8007,
                                "valueTime": "2021-05-27T02:59:00Z"
                            },
                            {
                                "value": 6744,
                                "valueTime": "2021-05-27T03:29:00Z"
                            },
                            {
                                "value": 5670,
                                "valueTime": "2021-05-27T03:59:00Z"
                            },
                            {
                                "value": 6346,
                                "valueTime": "2021-05-27T04:29:00Z"
                            },
                            {
                                "value": 6263,
                                "valueTime": "2021-05-27T04:59:00Z"
                            },
                            {
                                "value": 6274,
                                "valueTime": "2021-05-27T05:29:00Z"
                            },
                            {
                                "value": 5906,
                                "valueTime": "2021-05-27T05:59:00Z"
                            },
                            {
                                "value": 6109,
                                "valueTime": "2021-05-27T06:29:00Z"
                            },
                            {
                                "value": 5974,
                                "valueTime": "2021-05-27T06:59:00Z"
                            },
                            {
                                "value": 6653,
                                "valueTime": "2021-05-27T07:29:00Z"
                            },
                            {
                                "value": 6442,
                                "valueTime": "2021-05-27T07:59:00Z"
                            },
                            {
                                "value": 8370,
                                "valueTime": "2021-05-27T08:29:00Z"
                            },
                            {
                                "value": 12157,
                                "valueTime": "2021-05-27T08:59:00Z"
                            },
                            {
                                "value": 21402,
                                "valueTime": "2021-05-27T09:29:00Z"
                            },
                            {
                                "value": 28280,
                                "valueTime": "2021-05-27T09:59:00Z"
                            },
                            {
                                "value": 30947,
                                "valueTime": "2021-05-27T10:29:00Z"
                            },
                            {
                                "value": 22746,
                                "valueTime": "2021-05-27T10:59:00Z"
                            },
                            {
                                "value": 16662,
                                "valueTime": "2021-05-27T11:29:00Z"
                            },
                            {
                                "value": 10745,
                                "valueTime": "2021-05-27T11:59:00Z"
                            },
                            {
                                "value": 11179,
                                "valueTime": "2021-05-27T12:29:00Z"
                            },
                            {
                                "value": 8077,
                                "valueTime": "2021-05-27T12:59:00Z"
                            },
                            {
                                "value": 6620,
                                "valueTime": "2021-05-27T13:29:00Z"
                            },
                            {
                                "value": 4570,
                                "valueTime": "2021-05-27T13:59:00Z"
                            },
                            {
                                "value": 4158,
                                "valueTime": "2021-05-27T14:29:00Z"
                            },
                            {
                                "value": 2298,
                                "valueTime": "2021-05-27T14:59:00Z"
                            },
                            {
                                "value": 2133,
                                "valueTime": "2021-05-27T15:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-27T15:29:00Z"
                            },
                            {
                                "value": 626,
                                "valueTime": "2021-05-27T16:29:00Z"
                            },
                            {
                                "value": 88,
                                "valueTime": "2021-05-27T16:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-27T16:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-27T17:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-27T17:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-27T18:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-27T18:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-27T19:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-27T19:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-27T20:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-27T20:59:00Z"
                            },
                            {
                                "value": 4218,
                                "valueTime": "2021-05-27T21:59:00Z"
                            },
                            {
                                "value": 6885,
                                "valueTime": "2021-05-27T22:29:00Z"
                            },
                            {
                                "value": 12856,
                                "valueTime": "2021-05-27T22:59:00Z"
                            },
                            {
                                "value": 23773,
                                "valueTime": "2021-05-27T23:29:00Z"
                            },
                            {
                                "value": 32791,
                                "valueTime": "2021-05-27T23:59:00Z"
                            },
                            {
                                "value": 32009,
                                "valueTime": "2021-05-28T00:29:00Z"
                            },
                            {
                                "value": 20333,
                                "valueTime": "2021-05-28T00:59:00Z"
                            },
                            {
                                "value": 13589,
                                "valueTime": "2021-05-28T01:29:00Z"
                            },
                            {
                                "value": 9703,
                                "valueTime": "2021-05-28T01:59:00Z"
                            },
                            {
                                "value": 9119,
                                "valueTime": "2021-05-28T02:29:00Z"
                            },
                            {
                                "value": 8385,
                                "valueTime": "2021-05-28T02:59:00Z"
                            },
                            {
                                "value": 7304,
                                "valueTime": "2021-05-28T03:29:00Z"
                            },
                            {
                                "value": 6305,
                                "valueTime": "2021-05-28T03:59:00Z"
                            },
                            {
                                "value": 7094,
                                "valueTime": "2021-05-28T04:29:00Z"
                            },
                            {
                                "value": 6918,
                                "valueTime": "2021-05-28T04:59:00Z"
                            },
                            {
                                "value": 2089,
                                "valueTime": "2021-05-28T05:29:00Z"
                            },
                            {
                                "value": 6580,
                                "valueTime": "2021-05-28T05:59:00Z"
                            },
                            {
                                "value": 6865,
                                "valueTime": "2021-05-28T06:29:00Z"
                            },
                            {
                                "value": 6869,
                                "valueTime": "2021-05-28T06:59:00Z"
                            },
                            {
                                "value": 7423,
                                "valueTime": "2021-05-28T07:29:00Z"
                            },
                            {
                                "value": 7496,
                                "valueTime": "2021-05-28T07:59:00Z"
                            },
                            {
                                "value": 9571,
                                "valueTime": "2021-05-28T08:29:00Z"
                            },
                            {
                                "value": 12924,
                                "valueTime": "2021-05-28T08:59:00Z"
                            },
                            {
                                "value": 21670,
                                "valueTime": "2021-05-28T09:29:00Z"
                            },
                            {
                                "value": 27619,
                                "valueTime": "2021-05-28T09:59:00Z"
                            },
                            {
                                "value": 30260,
                                "valueTime": "2021-05-28T10:29:00Z"
                            },
                            {
                                "value": 23084,
                                "valueTime": "2021-05-28T10:59:00Z"
                            },
                            {
                                "value": 17400,
                                "valueTime": "2021-05-28T11:29:00Z"
                            },
                            {
                                "value": 11242,
                                "valueTime": "2021-05-28T11:59:00Z"
                            },
                            {
                                "value": 11669,
                                "valueTime": "2021-05-28T12:29:00Z"
                            },
                            {
                                "value": 8806,
                                "valueTime": "2021-05-28T12:59:00Z"
                            },
                            {
                                "value": 6877,
                                "valueTime": "2021-05-28T13:29:00Z"
                            },
                            {
                                "value": 4943,
                                "valueTime": "2021-05-28T13:59:00Z"
                            },
                            {
                                "value": 4420,
                                "valueTime": "2021-05-28T14:29:00Z"
                            },
                            {
                                "value": 2529,
                                "valueTime": "2021-05-28T14:59:00Z"
                            },
                            {
                                "value": 2321,
                                "valueTime": "2021-05-28T15:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-28T15:29:00Z"
                            },
                            {
                                "value": 671,
                                "valueTime": "2021-05-28T16:29:00Z"
                            },
                            {
                                "value": 81,
                                "valueTime": "2021-05-28T16:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-28T16:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-28T17:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-28T17:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-28T18:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-28T18:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-28T19:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-28T19:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-28T20:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-28T20:59:00Z"
                            },
                            {
                                "value": 2477,
                                "valueTime": "2021-05-28T21:59:00Z"
                            },
                            {
                                "value": 3516,
                                "valueTime": "2021-05-28T22:29:00Z"
                            },
                            {
                                "value": 4349,
                                "valueTime": "2021-05-28T22:59:00Z"
                            },
                            {
                                "value": 5712,
                                "valueTime": "2021-05-28T23:29:00Z"
                            },
                            {
                                "value": 5139,
                                "valueTime": "2021-05-28T23:59:00Z"
                            },
                            {
                                "value": 5781,
                                "valueTime": "2021-05-29T00:29:00Z"
                            },
                            {
                                "value": 5430,
                                "valueTime": "2021-05-29T00:59:00Z"
                            },
                            {
                                "value": 6032,
                                "valueTime": "2021-05-29T01:29:00Z"
                            },
                            {
                                "value": 6438,
                                "valueTime": "2021-05-29T01:59:00Z"
                            },
                            {
                                "value": 7483,
                                "valueTime": "2021-05-29T02:29:00Z"
                            },
                            {
                                "value": 7317,
                                "valueTime": "2021-05-29T02:59:00Z"
                            },
                            {
                                "value": 5872,
                                "valueTime": "2021-05-29T03:29:00Z"
                            },
                            {
                                "value": 5071,
                                "valueTime": "2021-05-29T03:59:00Z"
                            },
                            {
                                "value": 5223,
                                "valueTime": "2021-05-29T04:29:00Z"
                            },
                            {
                                "value": 5052,
                                "valueTime": "2021-05-29T04:59:00Z"
                            },
                            {
                                "value": 5176,
                                "valueTime": "2021-05-29T05:29:00Z"
                            },
                            {
                                "value": 5262,
                                "valueTime": "2021-05-29T05:59:00Z"
                            },
                            {
                                "value": 5707,
                                "valueTime": "2021-05-29T06:29:00Z"
                            },
                            {
                                "value": 966,
                                "valueTime": "2021-05-29T06:59:00Z"
                            },
                            {
                                "value": 5174,
                                "valueTime": "2021-05-29T07:29:00Z"
                            },
                            {
                                "value": 5017,
                                "valueTime": "2021-05-29T07:59:00Z"
                            },
                            {
                                "value": 5395,
                                "valueTime": "2021-05-29T08:29:00Z"
                            },
                            {
                                "value": 5697,
                                "valueTime": "2021-05-29T08:59:00Z"
                            },
                            {
                                "value": 7183,
                                "valueTime": "2021-05-29T09:29:00Z"
                            },
                            {
                                "value": 6528,
                                "valueTime": "2021-05-29T09:59:00Z"
                            },
                            {
                                "value": 6726,
                                "valueTime": "2021-05-29T10:29:00Z"
                            },
                            {
                                "value": 5355,
                                "valueTime": "2021-05-29T10:59:00Z"
                            },
                            {
                                "value": 5340,
                                "valueTime": "2021-05-29T11:29:00Z"
                            },
                            {
                                "value": 4226,
                                "valueTime": "2021-05-29T11:59:00Z"
                            },
                            {
                                "value": 7129,
                                "valueTime": "2021-05-29T12:29:00Z"
                            },
                            {
                                "value": 5515,
                                "valueTime": "2021-05-29T12:59:00Z"
                            },
                            {
                                "value": 4286,
                                "valueTime": "2021-05-29T13:29:00Z"
                            },
                            {
                                "value": 3008,
                                "valueTime": "2021-05-29T13:59:00Z"
                            },
                            {
                                "value": 2983,
                                "valueTime": "2021-05-29T14:29:00Z"
                            },
                            {
                                "value": 1795,
                                "valueTime": "2021-05-29T14:59:00Z"
                            },
                            {
                                "value": 1716,
                                "valueTime": "2021-05-29T15:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-29T15:29:00Z"
                            },
                            {
                                "value": 559,
                                "valueTime": "2021-05-29T16:29:00Z"
                            },
                            {
                                "value": 73,
                                "valueTime": "2021-05-29T16:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-29T16:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-29T17:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-29T17:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-29T18:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-29T18:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-29T19:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-29T19:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-29T20:29:00Z"
                            },
                            {
                                "value": 2,
                                "valueTime": "2021-05-29T21:29:00Z"
                            },
                            {
                                "value": 1941,
                                "valueTime": "2021-05-29T21:59:00Z"
                            },
                            {
                                "value": 2812,
                                "valueTime": "2021-05-29T22:29:00Z"
                            },
                            {
                                "value": 3084,
                                "valueTime": "2021-05-29T22:59:00Z"
                            },
                            {
                                "value": 3617,
                                "valueTime": "2021-05-29T23:29:00Z"
                            },
                            {
                                "value": 3094,
                                "valueTime": "2021-05-29T23:59:00Z"
                            },
                            {
                                "value": 3478,
                                "valueTime": "2021-05-30T00:29:00Z"
                            },
                            {
                                "value": 3241,
                                "valueTime": "2021-05-30T00:59:00Z"
                            },
                            {
                                "value": 3887,
                                "valueTime": "2021-05-30T01:29:00Z"
                            },
                            {
                                "value": 4096,
                                "valueTime": "2021-05-30T01:59:00Z"
                            },
                            {
                                "value": 5067,
                                "valueTime": "2021-05-30T02:29:00Z"
                            },
                            {
                                "value": 5275,
                                "valueTime": "2021-05-30T02:59:00Z"
                            },
                            {
                                "value": 4602,
                                "valueTime": "2021-05-30T03:29:00Z"
                            },
                            {
                                "value": 3448,
                                "valueTime": "2021-05-30T03:59:00Z"
                            },
                            {
                                "value": 3430,
                                "valueTime": "2021-05-30T04:29:00Z"
                            },
                            {
                                "value": 3315,
                                "valueTime": "2021-05-30T04:59:00Z"
                            },
                            {
                                "value": 3540,
                                "valueTime": "2021-05-30T05:29:00Z"
                            },
                            {
                                "value": 3147,
                                "valueTime": "2021-05-30T05:59:00Z"
                            },
                            {
                                "value": 3249,
                                "valueTime": "2021-05-30T06:29:00Z"
                            },
                            {
                                "value": 3114,
                                "valueTime": "2021-05-30T06:59:00Z"
                            },
                            {
                                "value": 3443,
                                "valueTime": "2021-05-30T07:29:00Z"
                            },
                            {
                                "value": 3428,
                                "valueTime": "2021-05-30T07:59:00Z"
                            },
                            {
                                "value": 4076,
                                "valueTime": "2021-05-30T08:29:00Z"
                            },
                            {
                                "value": 4296,
                                "valueTime": "2021-05-30T08:59:00Z"
                            },
                            {
                                "value": 4878,
                                "valueTime": "2021-05-30T09:29:00Z"
                            },
                            {
                                "value": 4412,
                                "valueTime": "2021-05-30T09:59:00Z"
                            },
                            {
                                "value": 4728,
                                "valueTime": "2021-05-30T10:29:00Z"
                            },
                            {
                                "value": 4047,
                                "valueTime": "2021-05-30T10:59:00Z"
                            },
                            {
                                "value": 4954,
                                "valueTime": "2021-05-30T11:29:00Z"
                            },
                            {
                                "value": 756,
                                "valueTime": "2021-05-30T11:59:00Z"
                            },
                            {
                                "value": 6698,
                                "valueTime": "2021-05-30T12:29:00Z"
                            },
                            {
                                "value": 5376,
                                "valueTime": "2021-05-30T12:59:00Z"
                            },
                            {
                                "value": 3885,
                                "valueTime": "2021-05-30T13:29:00Z"
                            },
                            {
                                "value": 2688,
                                "valueTime": "2021-05-30T13:59:00Z"
                            },
                            {
                                "value": 2585,
                                "valueTime": "2021-05-30T14:29:00Z"
                            },
                            {
                                "value": 1741,
                                "valueTime": "2021-05-30T14:59:00Z"
                            },
                            {
                                "value": 1628,
                                "valueTime": "2021-05-30T15:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-30T15:29:00Z"
                            },
                            {
                                "value": 464,
                                "valueTime": "2021-05-30T16:29:00Z"
                            },
                            {
                                "value": 72,
                                "valueTime": "2021-05-30T16:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-30T16:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-30T17:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-30T17:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-30T18:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-30T18:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-30T19:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-30T19:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-30T20:29:00Z"
                            },
                            {
                                "value": 3,
                                "valueTime": "2021-05-30T21:29:00Z"
                            },
                            {
                                "value": 4326,
                                "valueTime": "2021-05-30T21:59:00Z"
                            },
                            {
                                "value": 7075,
                                "valueTime": "2021-05-30T22:29:00Z"
                            },
                            {
                                "value": 13671,
                                "valueTime": "2021-05-30T22:59:00Z"
                            },
                            {
                                "value": 56412,
                                "valueTime": "2021-05-30T23:29:00Z"
                            },
                            {
                                "value": 76443,
                                "valueTime": "2021-05-30T23:59:00Z"
                            },
                            {
                                "value": 73429,
                                "valueTime": "2021-05-31T00:29:00Z"
                            },
                            {
                                "value": 45999,
                                "valueTime": "2021-05-31T00:59:00Z"
                            },
                            {
                                "value": 29554,
                                "valueTime": "2021-05-31T01:29:00Z"
                            },
                            {
                                "value": 10342,
                                "valueTime": "2021-05-31T01:59:00Z"
                            },
                            {
                                "value": 9478,
                                "valueTime": "2021-05-31T02:29:00Z"
                            },
                            {
                                "value": 8871,
                                "valueTime": "2021-05-31T02:59:00Z"
                            },
                            {
                                "value": 7660,
                                "valueTime": "2021-05-31T03:29:00Z"
                            },
                            {
                                "value": 6459,
                                "valueTime": "2021-05-31T03:59:00Z"
                            },
                            {
                                "value": 7458,
                                "valueTime": "2021-05-31T04:29:00Z"
                            },
                            {
                                "value": 7319,
                                "valueTime": "2021-05-31T04:59:00Z"
                            },
                            {
                                "value": 7236,
                                "valueTime": "2021-05-31T05:29:00Z"
                            },
                            {
                                "value": 6611,
                                "valueTime": "2021-05-31T05:59:00Z"
                            },
                            {
                                "value": 6814,
                                "valueTime": "2021-05-31T06:29:00Z"
                            },
                            {
                                "value": 6932,
                                "valueTime": "2021-05-31T06:59:00Z"
                            },
                            {
                                "value": 7295,
                                "valueTime": "2021-05-31T07:29:00Z"
                            },
                            {
                                "value": 6915,
                                "valueTime": "2021-05-31T07:59:00Z"
                            },
                            {
                                "value": 9377,
                                "valueTime": "2021-05-31T08:29:00Z"
                            },
                            {
                                "value": 12994,
                                "valueTime": "2021-05-31T08:59:00Z"
                            },
                            {
                                "value": 22905,
                                "valueTime": "2021-05-31T09:29:00Z"
                            },
                            {
                                "value": 29233,
                                "valueTime": "2021-05-31T09:59:00Z"
                            },
                            {
                                "value": 31142,
                                "valueTime": "2021-05-31T10:29:00Z"
                            },
                            {
                                "value": 23703,
                                "valueTime": "2021-05-31T10:59:00Z"
                            },
                            {
                                "value": 17626,
                                "valueTime": "2021-05-31T11:29:00Z"
                            },
                            {
                                "value": 12130,
                                "valueTime": "2021-05-31T11:59:00Z"
                            },
                            {
                                "value": 12349,
                                "valueTime": "2021-05-31T12:29:00Z"
                            },
                            {
                                "value": 7923,
                                "valueTime": "2021-05-31T12:59:00Z"
                            },
                            {
                                "value": 6992,
                                "valueTime": "2021-05-31T13:29:00Z"
                            },
                            {
                                "value": 4881,
                                "valueTime": "2021-05-31T13:59:00Z"
                            },
                            {
                                "value": 4300,
                                "valueTime": "2021-05-31T14:29:00Z"
                            },
                            {
                                "value": 2501,
                                "valueTime": "2021-05-31T14:59:00Z"
                            },
                            {
                                "value": 2204,
                                "valueTime": "2021-05-31T15:29:00Z"
                            }
                        ]
                    },
                    {
                        "key": "出站",
                        "value": [
                            {
                                "value": 0,
                                "valueTime": "2021-04-30T16:00:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-04-30T16:30:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-04-30T17:00:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-04-30T17:30:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-04-30T18:00:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-04-30T18:30:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-04-30T19:00:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-04-30T19:30:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-04-30T20:00:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-04-30T20:30:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-04-30T21:00:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-04-30T21:30:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-04-30T22:00:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-04-30T22:30:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-04-30T23:00:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-04-30T23:30:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-01T00:00:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-01T00:30:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-01T01:00:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-01T01:30:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-01T02:00:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-01T02:30:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-01T03:00:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-01T03:30:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-01T04:00:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-01T04:30:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-01T05:00:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-01T05:30:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-01T06:00:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-01T06:30:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-01T07:00:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-01T07:30:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-01T08:00:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-01T08:30:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-01T09:00:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-01T09:30:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-01T10:00:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-01T10:30:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-01T11:00:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-01T11:30:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-01T12:00:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-01T12:30:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-01T13:00:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-01T13:30:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-01T14:00:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-01T14:30:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-01T15:00:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-01T15:30:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-01T16:00:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-01T16:30:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-01T17:00:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-01T17:30:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-01T18:00:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-01T18:30:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-01T19:00:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-01T19:30:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-01T20:00:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-01T20:30:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-01T21:00:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-01T21:30:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-01T22:00:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-01T22:30:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-01T23:00:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-01T23:30:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-02T00:00:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-02T00:30:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-02T01:00:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-02T01:30:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-02T02:00:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-02T02:30:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-02T03:00:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-02T03:30:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-02T04:00:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-02T04:30:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-02T05:00:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-02T05:30:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-02T06:00:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-02T06:30:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-02T07:00:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-02T07:30:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-02T08:00:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-02T08:30:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-02T09:00:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-02T09:30:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-02T10:00:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-02T10:30:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-02T11:00:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-02T11:30:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-02T12:00:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-02T12:30:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-02T13:00:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-02T13:30:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-02T14:00:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-02T14:30:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-02T15:00:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-02T15:30:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-02T16:00:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-02T16:30:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-02T17:00:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-02T17:30:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-02T18:00:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-02T18:30:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-02T19:00:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-02T19:30:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-02T20:00:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-02T20:30:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-02T21:00:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-02T21:30:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-02T22:00:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-02T22:30:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-02T23:00:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-02T23:30:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-03T00:00:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-03T00:30:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-03T01:00:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-03T01:30:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-03T02:00:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-03T02:30:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-03T03:00:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-03T03:30:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-03T04:00:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-03T04:30:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-03T05:00:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-03T05:30:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-03T06:00:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-03T06:30:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-03T07:00:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-03T07:30:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-03T08:00:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-03T08:30:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-03T09:00:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-03T09:30:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-03T10:00:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-03T10:30:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-03T11:00:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-03T11:30:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-03T12:00:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-03T12:30:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-03T13:00:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-03T13:30:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-03T14:00:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-03T14:30:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-03T15:00:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-03T15:30:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-03T16:00:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-03T16:30:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-03T17:00:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-03T17:30:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-03T18:00:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-03T18:30:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-03T19:00:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-03T19:30:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-03T20:00:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-03T20:30:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-03T21:00:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-03T21:30:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-03T22:00:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-03T22:30:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-03T23:00:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-03T23:30:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-04T00:00:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-04T00:30:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-04T01:00:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-04T01:30:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-04T02:00:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-04T02:30:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-04T03:00:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-04T03:30:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-04T04:00:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-04T04:30:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-04T05:00:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-04T05:30:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-04T06:00:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-04T06:30:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-04T07:00:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-04T07:30:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-04T08:00:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-04T08:30:00Z"
                            },
                            {
                                "value": 69692,
                                "valueTime": "2021-05-04T09:29:00Z"
                            },
                            {
                                "value": 96849,
                                "valueTime": "2021-05-04T09:59:00Z"
                            },
                            {
                                "value": 119662,
                                "valueTime": "2021-05-04T10:29:00Z"
                            },
                            {
                                "value": 129477,
                                "valueTime": "2021-05-04T10:59:00Z"
                            },
                            {
                                "value": 88552,
                                "valueTime": "2021-05-04T11:29:00Z"
                            },
                            {
                                "value": 64197,
                                "valueTime": "2021-05-04T11:59:00Z"
                            },
                            {
                                "value": 47781,
                                "valueTime": "2021-05-04T12:29:00Z"
                            },
                            {
                                "value": 42373,
                                "valueTime": "2021-05-04T12:59:00Z"
                            },
                            {
                                "value": 45920,
                                "valueTime": "2021-05-04T13:29:00Z"
                            },
                            {
                                "value": 43973,
                                "valueTime": "2021-05-04T13:59:00Z"
                            },
                            {
                                "value": 40478,
                                "valueTime": "2021-05-04T14:29:00Z"
                            },
                            {
                                "value": 29500,
                                "valueTime": "2021-05-04T14:59:00Z"
                            },
                            {
                                "value": 14995,
                                "valueTime": "2021-05-04T15:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-04T15:29:00Z"
                            },
                            {
                                "value": 6041,
                                "valueTime": "2021-05-04T16:29:00Z"
                            },
                            {
                                "value": 2556,
                                "valueTime": "2021-05-04T16:59:00Z"
                            },
                            {
                                "value": 250,
                                "valueTime": "2021-05-04T17:29:00Z"
                            },
                            {
                                "value": 16,
                                "valueTime": "2021-05-04T17:59:00Z"
                            },
                            {
                                "value": 3,
                                "valueTime": "2021-05-04T18:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-04T18:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-04T18:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-04T19:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-04T19:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-04T20:29:00Z"
                            },
                            {
                                "value": 1,
                                "valueTime": "2021-05-04T21:29:00Z"
                            },
                            {
                                "value": 52,
                                "valueTime": "2021-05-04T21:59:00Z"
                            },
                            {
                                "value": 7283,
                                "valueTime": "2021-05-04T22:29:00Z"
                            },
                            {
                                "value": 19752,
                                "valueTime": "2021-05-04T22:59:00Z"
                            },
                            {
                                "value": 46031,
                                "valueTime": "2021-05-04T23:29:00Z"
                            },
                            {
                                "value": 76026,
                                "valueTime": "2021-05-04T23:59:00Z"
                            },
                            {
                                "value": 100298,
                                "valueTime": "2021-05-05T00:29:00Z"
                            },
                            {
                                "value": 114227,
                                "valueTime": "2021-05-05T00:59:00Z"
                            },
                            {
                                "value": 72890,
                                "valueTime": "2021-05-05T01:29:00Z"
                            },
                            {
                                "value": 58766,
                                "valueTime": "2021-05-05T01:59:00Z"
                            },
                            {
                                "value": 36709,
                                "valueTime": "2021-05-05T02:29:00Z"
                            },
                            {
                                "value": 28231,
                                "valueTime": "2021-05-05T02:59:00Z"
                            },
                            {
                                "value": 25621,
                                "valueTime": "2021-05-05T03:29:00Z"
                            },
                            {
                                "value": 28692,
                                "valueTime": "2021-05-05T03:59:00Z"
                            },
                            {
                                "value": 29320,
                                "valueTime": "2021-05-05T04:29:00Z"
                            },
                            {
                                "value": 35791,
                                "valueTime": "2021-05-05T04:59:00Z"
                            },
                            {
                                "value": 33021,
                                "valueTime": "2021-05-05T05:29:00Z"
                            },
                            {
                                "value": 33035,
                                "valueTime": "2021-05-05T05:59:00Z"
                            },
                            {
                                "value": 29559,
                                "valueTime": "2021-05-05T06:29:00Z"
                            },
                            {
                                "value": 32678,
                                "valueTime": "2021-05-05T06:59:00Z"
                            },
                            {
                                "value": 28774,
                                "valueTime": "2021-05-05T07:29:00Z"
                            },
                            {
                                "value": 33314,
                                "valueTime": "2021-05-05T07:59:00Z"
                            },
                            {
                                "value": 34671,
                                "valueTime": "2021-05-05T08:29:00Z"
                            },
                            {
                                "value": 47326,
                                "valueTime": "2021-05-05T08:59:00Z"
                            },
                            {
                                "value": 56869,
                                "valueTime": "2021-05-05T09:29:00Z"
                            },
                            {
                                "value": 76460,
                                "valueTime": "2021-05-05T09:59:00Z"
                            },
                            {
                                "value": 97968,
                                "valueTime": "2021-05-05T10:29:00Z"
                            },
                            {
                                "value": 110788,
                                "valueTime": "2021-05-05T10:59:00Z"
                            },
                            {
                                "value": 93427,
                                "valueTime": "2021-05-05T11:29:00Z"
                            },
                            {
                                "value": 66110,
                                "valueTime": "2021-05-05T11:59:00Z"
                            },
                            {
                                "value": 49632,
                                "valueTime": "2021-05-05T12:29:00Z"
                            },
                            {
                                "value": 43707,
                                "valueTime": "2021-05-05T12:59:00Z"
                            },
                            {
                                "value": 43237,
                                "valueTime": "2021-05-05T13:29:00Z"
                            },
                            {
                                "value": 46827,
                                "valueTime": "2021-05-05T13:59:00Z"
                            },
                            {
                                "value": 43738,
                                "valueTime": "2021-05-05T14:29:00Z"
                            },
                            {
                                "value": 30590,
                                "valueTime": "2021-05-05T14:59:00Z"
                            },
                            {
                                "value": 16166,
                                "valueTime": "2021-05-05T15:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-05T15:29:00Z"
                            },
                            {
                                "value": 6544,
                                "valueTime": "2021-05-05T16:29:00Z"
                            },
                            {
                                "value": 2860,
                                "valueTime": "2021-05-05T16:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-05T16:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-05T17:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-05T17:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-05T18:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-05T18:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-05T19:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-05T19:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-05T20:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-05T21:29:00Z"
                            },
                            {
                                "value": 40,
                                "valueTime": "2021-05-05T21:59:00Z"
                            },
                            {
                                "value": 7132,
                                "valueTime": "2021-05-05T22:29:00Z"
                            },
                            {
                                "value": 20910,
                                "valueTime": "2021-05-05T22:59:00Z"
                            },
                            {
                                "value": 52174,
                                "valueTime": "2021-05-05T23:29:00Z"
                            },
                            {
                                "value": 64763,
                                "valueTime": "2021-05-05T23:59:00Z"
                            },
                            {
                                "value": 89860,
                                "valueTime": "2021-05-06T00:29:00Z"
                            },
                            {
                                "value": 97238,
                                "valueTime": "2021-05-06T00:59:00Z"
                            },
                            {
                                "value": 57345,
                                "valueTime": "2021-05-06T01:29:00Z"
                            },
                            {
                                "value": 41036,
                                "valueTime": "2021-05-06T01:59:00Z"
                            },
                            {
                                "value": 31496,
                                "valueTime": "2021-05-06T02:29:00Z"
                            },
                            {
                                "value": 25493,
                                "valueTime": "2021-05-06T02:59:00Z"
                            },
                            {
                                "value": 23412,
                                "valueTime": "2021-05-06T03:29:00Z"
                            },
                            {
                                "value": 25387,
                                "valueTime": "2021-05-06T03:59:00Z"
                            },
                            {
                                "value": 25595,
                                "valueTime": "2021-05-06T04:29:00Z"
                            },
                            {
                                "value": 29835,
                                "valueTime": "2021-05-06T04:59:00Z"
                            },
                            {
                                "value": 30335,
                                "valueTime": "2021-05-06T05:29:00Z"
                            },
                            {
                                "value": 29456,
                                "valueTime": "2021-05-06T05:59:00Z"
                            },
                            {
                                "value": 26522,
                                "valueTime": "2021-05-06T06:29:00Z"
                            },
                            {
                                "value": 25794,
                                "valueTime": "2021-05-06T06:59:00Z"
                            },
                            {
                                "value": 26310,
                                "valueTime": "2021-05-06T07:29:00Z"
                            },
                            {
                                "value": 31071,
                                "valueTime": "2021-05-06T07:59:00Z"
                            },
                            {
                                "value": 32909,
                                "valueTime": "2021-05-06T08:29:00Z"
                            },
                            {
                                "value": 42140,
                                "valueTime": "2021-05-06T08:59:00Z"
                            },
                            {
                                "value": 62398,
                                "valueTime": "2021-05-06T09:29:00Z"
                            },
                            {
                                "value": 85017,
                                "valueTime": "2021-05-06T09:59:00Z"
                            },
                            {
                                "value": 105809,
                                "valueTime": "2021-05-06T10:29:00Z"
                            },
                            {
                                "value": 116253,
                                "valueTime": "2021-05-06T10:59:00Z"
                            },
                            {
                                "value": 91082,
                                "valueTime": "2021-05-06T11:29:00Z"
                            },
                            {
                                "value": 65516,
                                "valueTime": "2021-05-06T11:59:00Z"
                            },
                            {
                                "value": 49795,
                                "valueTime": "2021-05-06T12:29:00Z"
                            },
                            {
                                "value": 43860,
                                "valueTime": "2021-05-06T12:59:00Z"
                            },
                            {
                                "value": 42796,
                                "valueTime": "2021-05-06T13:29:00Z"
                            },
                            {
                                "value": 48054,
                                "valueTime": "2021-05-06T13:59:00Z"
                            },
                            {
                                "value": 43876,
                                "valueTime": "2021-05-06T14:29:00Z"
                            },
                            {
                                "value": 32452,
                                "valueTime": "2021-05-06T14:59:00Z"
                            },
                            {
                                "value": 17583,
                                "valueTime": "2021-05-06T15:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-06T15:29:00Z"
                            },
                            {
                                "value": 6989,
                                "valueTime": "2021-05-06T16:29:00Z"
                            },
                            {
                                "value": 2989,
                                "valueTime": "2021-05-06T16:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-06T16:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-06T17:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-06T17:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-06T18:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-06T18:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-06T19:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-06T19:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-06T20:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-06T21:29:00Z"
                            },
                            {
                                "value": 53,
                                "valueTime": "2021-05-06T21:59:00Z"
                            },
                            {
                                "value": 6892,
                                "valueTime": "2021-05-06T22:29:00Z"
                            },
                            {
                                "value": 20629,
                                "valueTime": "2021-05-06T22:59:00Z"
                            },
                            {
                                "value": 46894,
                                "valueTime": "2021-05-06T23:29:00Z"
                            },
                            {
                                "value": 79565,
                                "valueTime": "2021-05-06T23:59:00Z"
                            },
                            {
                                "value": 107417,
                                "valueTime": "2021-05-07T00:29:00Z"
                            },
                            {
                                "value": 119017,
                                "valueTime": "2021-05-07T00:59:00Z"
                            },
                            {
                                "value": 71633,
                                "valueTime": "2021-05-07T01:29:00Z"
                            },
                            {
                                "value": 53161,
                                "valueTime": "2021-05-07T01:59:00Z"
                            },
                            {
                                "value": 40892,
                                "valueTime": "2021-05-07T02:29:00Z"
                            },
                            {
                                "value": 34875,
                                "valueTime": "2021-05-07T02:59:00Z"
                            },
                            {
                                "value": 33010,
                                "valueTime": "2021-05-07T03:29:00Z"
                            },
                            {
                                "value": 41210,
                                "valueTime": "2021-05-07T03:59:00Z"
                            },
                            {
                                "value": 12933,
                                "valueTime": "2021-05-07T04:29:00Z"
                            },
                            {
                                "value": 43731,
                                "valueTime": "2021-05-07T04:59:00Z"
                            },
                            {
                                "value": 42749,
                                "valueTime": "2021-05-07T05:29:00Z"
                            },
                            {
                                "value": 42883,
                                "valueTime": "2021-05-07T05:59:00Z"
                            },
                            {
                                "value": 37916,
                                "valueTime": "2021-05-07T06:29:00Z"
                            },
                            {
                                "value": 39039,
                                "valueTime": "2021-05-07T06:59:00Z"
                            },
                            {
                                "value": 37258,
                                "valueTime": "2021-05-07T07:29:00Z"
                            },
                            {
                                "value": 42691,
                                "valueTime": "2021-05-07T07:59:00Z"
                            },
                            {
                                "value": 44525,
                                "valueTime": "2021-05-07T08:29:00Z"
                            },
                            {
                                "value": 62031,
                                "valueTime": "2021-05-07T08:59:00Z"
                            },
                            {
                                "value": 71033,
                                "valueTime": "2021-05-07T09:29:00Z"
                            },
                            {
                                "value": 91647,
                                "valueTime": "2021-05-07T09:59:00Z"
                            },
                            {
                                "value": 112487,
                                "valueTime": "2021-05-07T10:29:00Z"
                            },
                            {
                                "value": 124750,
                                "valueTime": "2021-05-07T10:59:00Z"
                            },
                            {
                                "value": 100165,
                                "valueTime": "2021-05-07T11:29:00Z"
                            },
                            {
                                "value": 71310,
                                "valueTime": "2021-05-07T11:59:00Z"
                            },
                            {
                                "value": 54851,
                                "valueTime": "2021-05-07T12:29:00Z"
                            },
                            {
                                "value": 48145,
                                "valueTime": "2021-05-07T12:59:00Z"
                            },
                            {
                                "value": 46978,
                                "valueTime": "2021-05-07T13:29:00Z"
                            },
                            {
                                "value": 52365,
                                "valueTime": "2021-05-07T13:59:00Z"
                            },
                            {
                                "value": 50726,
                                "valueTime": "2021-05-07T14:29:00Z"
                            },
                            {
                                "value": 42172,
                                "valueTime": "2021-05-07T14:59:00Z"
                            },
                            {
                                "value": 24279,
                                "valueTime": "2021-05-07T15:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-07T15:29:00Z"
                            },
                            {
                                "value": 10875,
                                "valueTime": "2021-05-07T16:29:00Z"
                            },
                            {
                                "value": 4990,
                                "valueTime": "2021-05-07T16:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-07T16:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-07T17:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-07T17:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-07T18:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-07T18:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-07T19:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-07T19:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-07T20:29:00Z"
                            },
                            {
                                "value": 1,
                                "valueTime": "2021-05-07T21:29:00Z"
                            },
                            {
                                "value": 39,
                                "valueTime": "2021-05-07T21:59:00Z"
                            },
                            {
                                "value": 5223,
                                "valueTime": "2021-05-07T22:29:00Z"
                            },
                            {
                                "value": 11665,
                                "valueTime": "2021-05-07T22:59:00Z"
                            },
                            {
                                "value": 14629,
                                "valueTime": "2021-05-07T23:29:00Z"
                            },
                            {
                                "value": 22556,
                                "valueTime": "2021-05-07T23:59:00Z"
                            },
                            {
                                "value": 25987,
                                "valueTime": "2021-05-08T00:29:00Z"
                            },
                            {
                                "value": 35240,
                                "valueTime": "2021-05-08T00:59:00Z"
                            },
                            {
                                "value": 33646,
                                "valueTime": "2021-05-08T01:29:00Z"
                            },
                            {
                                "value": 38688,
                                "valueTime": "2021-05-08T01:59:00Z"
                            },
                            {
                                "value": 38138,
                                "valueTime": "2021-05-08T02:29:00Z"
                            },
                            {
                                "value": 43399,
                                "valueTime": "2021-05-08T02:59:00Z"
                            },
                            {
                                "value": 34463,
                                "valueTime": "2021-05-08T03:29:00Z"
                            },
                            {
                                "value": 47858,
                                "valueTime": "2021-05-08T03:59:00Z"
                            },
                            {
                                "value": 45264,
                                "valueTime": "2021-05-08T04:29:00Z"
                            },
                            {
                                "value": 51505,
                                "valueTime": "2021-05-08T04:59:00Z"
                            },
                            {
                                "value": 52605,
                                "valueTime": "2021-05-08T05:29:00Z"
                            },
                            {
                                "value": 54180,
                                "valueTime": "2021-05-08T05:59:00Z"
                            },
                            {
                                "value": 49237,
                                "valueTime": "2021-05-08T06:29:00Z"
                            },
                            {
                                "value": 49772,
                                "valueTime": "2021-05-08T06:59:00Z"
                            },
                            {
                                "value": 47241,
                                "valueTime": "2021-05-08T07:29:00Z"
                            },
                            {
                                "value": 48901,
                                "valueTime": "2021-05-08T07:59:00Z"
                            },
                            {
                                "value": 49005,
                                "valueTime": "2021-05-08T08:29:00Z"
                            },
                            {
                                "value": 54198,
                                "valueTime": "2021-05-08T08:59:00Z"
                            },
                            {
                                "value": 59476,
                                "valueTime": "2021-05-08T09:29:00Z"
                            },
                            {
                                "value": 64720,
                                "valueTime": "2021-05-08T09:59:00Z"
                            },
                            {
                                "value": 58845,
                                "valueTime": "2021-05-08T10:29:00Z"
                            },
                            {
                                "value": 54384,
                                "valueTime": "2021-05-08T10:59:00Z"
                            },
                            {
                                "value": 45842,
                                "valueTime": "2021-05-08T11:29:00Z"
                            },
                            {
                                "value": 39218,
                                "valueTime": "2021-05-08T11:59:00Z"
                            },
                            {
                                "value": 35513,
                                "valueTime": "2021-05-08T12:29:00Z"
                            },
                            {
                                "value": 35508,
                                "valueTime": "2021-05-08T12:59:00Z"
                            },
                            {
                                "value": 36260,
                                "valueTime": "2021-05-08T13:29:00Z"
                            },
                            {
                                "value": 39484,
                                "valueTime": "2021-05-08T13:59:00Z"
                            },
                            {
                                "value": 36892,
                                "valueTime": "2021-05-08T14:29:00Z"
                            },
                            {
                                "value": 33994,
                                "valueTime": "2021-05-08T14:59:00Z"
                            },
                            {
                                "value": 21586,
                                "valueTime": "2021-05-08T15:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-08T15:29:00Z"
                            },
                            {
                                "value": 8960,
                                "valueTime": "2021-05-08T16:29:00Z"
                            },
                            {
                                "value": 4025,
                                "valueTime": "2021-05-08T16:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-08T16:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-08T17:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-08T17:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-08T18:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-08T18:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-08T19:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-08T19:59:00Z"
                            },
                            {
                                "value": 1,
                                "valueTime": "2021-05-08T20:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-08T21:29:00Z"
                            },
                            {
                                "value": 44,
                                "valueTime": "2021-05-08T21:59:00Z"
                            },
                            {
                                "value": 3952,
                                "valueTime": "2021-05-08T22:29:00Z"
                            },
                            {
                                "value": 8216,
                                "valueTime": "2021-05-08T22:59:00Z"
                            },
                            {
                                "value": 9262,
                                "valueTime": "2021-05-08T23:29:00Z"
                            },
                            {
                                "value": 14002,
                                "valueTime": "2021-05-08T23:59:00Z"
                            },
                            {
                                "value": 15712,
                                "valueTime": "2021-05-09T00:29:00Z"
                            },
                            {
                                "value": 22635,
                                "valueTime": "2021-05-09T00:59:00Z"
                            },
                            {
                                "value": 22836,
                                "valueTime": "2021-05-09T01:29:00Z"
                            },
                            {
                                "value": 27456,
                                "valueTime": "2021-05-09T01:59:00Z"
                            },
                            {
                                "value": 27336,
                                "valueTime": "2021-05-09T02:29:00Z"
                            },
                            {
                                "value": 30258,
                                "valueTime": "2021-05-09T02:59:00Z"
                            },
                            {
                                "value": 33237,
                                "valueTime": "2021-05-09T03:29:00Z"
                            },
                            {
                                "value": 37032,
                                "valueTime": "2021-05-09T03:59:00Z"
                            },
                            {
                                "value": 34634,
                                "valueTime": "2021-05-09T04:29:00Z"
                            },
                            {
                                "value": 38339,
                                "valueTime": "2021-05-09T04:59:00Z"
                            },
                            {
                                "value": 37716,
                                "valueTime": "2021-05-09T05:29:00Z"
                            },
                            {
                                "value": 40009,
                                "valueTime": "2021-05-09T05:59:00Z"
                            },
                            {
                                "value": 39184,
                                "valueTime": "2021-05-09T06:29:00Z"
                            },
                            {
                                "value": 40249,
                                "valueTime": "2021-05-09T06:59:00Z"
                            },
                            {
                                "value": 38493,
                                "valueTime": "2021-05-09T07:29:00Z"
                            },
                            {
                                "value": 45988,
                                "valueTime": "2021-05-09T07:59:00Z"
                            },
                            {
                                "value": 20512,
                                "valueTime": "2021-05-09T08:29:00Z"
                            },
                            {
                                "value": 44391,
                                "valueTime": "2021-05-09T08:59:00Z"
                            },
                            {
                                "value": 47436,
                                "valueTime": "2021-05-09T09:29:00Z"
                            },
                            {
                                "value": 48876,
                                "valueTime": "2021-05-09T09:59:00Z"
                            },
                            {
                                "value": 43833,
                                "valueTime": "2021-05-09T10:29:00Z"
                            },
                            {
                                "value": 40712,
                                "valueTime": "2021-05-09T10:59:00Z"
                            },
                            {
                                "value": 36690,
                                "valueTime": "2021-05-09T11:29:00Z"
                            },
                            {
                                "value": 34796,
                                "valueTime": "2021-05-09T11:59:00Z"
                            },
                            {
                                "value": 33056,
                                "valueTime": "2021-05-09T12:29:00Z"
                            },
                            {
                                "value": 31128,
                                "valueTime": "2021-05-09T12:59:00Z"
                            },
                            {
                                "value": 30857,
                                "valueTime": "2021-05-09T13:29:00Z"
                            },
                            {
                                "value": 30862,
                                "valueTime": "2021-05-09T13:59:00Z"
                            },
                            {
                                "value": 27672,
                                "valueTime": "2021-05-09T14:29:00Z"
                            },
                            {
                                "value": 20774,
                                "valueTime": "2021-05-09T14:59:00Z"
                            },
                            {
                                "value": 14552,
                                "valueTime": "2021-05-09T15:29:00Z"
                            },
                            {
                                "value": 1,
                                "valueTime": "2021-05-09T15:59:00Z"
                            },
                            {
                                "value": 5986,
                                "valueTime": "2021-05-09T16:29:00Z"
                            },
                            {
                                "value": 2477,
                                "valueTime": "2021-05-09T16:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-09T16:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-09T17:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-09T17:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-09T18:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-09T18:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-09T19:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-09T19:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-09T20:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-09T21:29:00Z"
                            },
                            {
                                "value": 40,
                                "valueTime": "2021-05-09T21:59:00Z"
                            },
                            {
                                "value": 7129,
                                "valueTime": "2021-05-09T22:29:00Z"
                            },
                            {
                                "value": 20359,
                                "valueTime": "2021-05-09T22:59:00Z"
                            },
                            {
                                "value": 46166,
                                "valueTime": "2021-05-09T23:29:00Z"
                            },
                            {
                                "value": 77744,
                                "valueTime": "2021-05-09T23:59:00Z"
                            },
                            {
                                "value": 105606,
                                "valueTime": "2021-05-10T00:29:00Z"
                            },
                            {
                                "value": 123168,
                                "valueTime": "2021-05-10T00:59:00Z"
                            },
                            {
                                "value": 72136,
                                "valueTime": "2021-05-10T01:29:00Z"
                            },
                            {
                                "value": 53078,
                                "valueTime": "2021-05-10T01:59:00Z"
                            },
                            {
                                "value": 39882,
                                "valueTime": "2021-05-10T02:29:00Z"
                            },
                            {
                                "value": 32711,
                                "valueTime": "2021-05-10T02:59:00Z"
                            },
                            {
                                "value": 30187,
                                "valueTime": "2021-05-10T03:29:00Z"
                            },
                            {
                                "value": 32497,
                                "valueTime": "2021-05-10T03:59:00Z"
                            },
                            {
                                "value": 32301,
                                "valueTime": "2021-05-10T04:29:00Z"
                            },
                            {
                                "value": 37050,
                                "valueTime": "2021-05-10T04:59:00Z"
                            },
                            {
                                "value": 35873,
                                "valueTime": "2021-05-10T05:29:00Z"
                            },
                            {
                                "value": 35208,
                                "valueTime": "2021-05-10T05:59:00Z"
                            },
                            {
                                "value": 31495,
                                "valueTime": "2021-05-10T06:29:00Z"
                            },
                            {
                                "value": 32592,
                                "valueTime": "2021-05-10T06:59:00Z"
                            },
                            {
                                "value": 31394,
                                "valueTime": "2021-05-10T07:29:00Z"
                            },
                            {
                                "value": 35663,
                                "valueTime": "2021-05-10T07:59:00Z"
                            },
                            {
                                "value": 38122,
                                "valueTime": "2021-05-10T08:29:00Z"
                            },
                            {
                                "value": 52798,
                                "valueTime": "2021-05-10T08:59:00Z"
                            },
                            {
                                "value": 60605,
                                "valueTime": "2021-05-10T09:29:00Z"
                            },
                            {
                                "value": 82080,
                                "valueTime": "2021-05-10T09:59:00Z"
                            },
                            {
                                "value": 103844,
                                "valueTime": "2021-05-10T10:29:00Z"
                            },
                            {
                                "value": 115099,
                                "valueTime": "2021-05-10T10:59:00Z"
                            },
                            {
                                "value": 90154,
                                "valueTime": "2021-05-10T11:29:00Z"
                            },
                            {
                                "value": 65181,
                                "valueTime": "2021-05-10T11:59:00Z"
                            },
                            {
                                "value": 48411,
                                "valueTime": "2021-05-10T12:29:00Z"
                            },
                            {
                                "value": 42382,
                                "valueTime": "2021-05-10T12:59:00Z"
                            },
                            {
                                "value": 38423,
                                "valueTime": "2021-05-10T13:29:00Z"
                            },
                            {
                                "value": 42720,
                                "valueTime": "2021-05-10T13:59:00Z"
                            },
                            {
                                "value": 39594,
                                "valueTime": "2021-05-10T14:29:00Z"
                            },
                            {
                                "value": 27387,
                                "valueTime": "2021-05-10T14:59:00Z"
                            },
                            {
                                "value": 14940,
                                "valueTime": "2021-05-10T15:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-10T15:29:00Z"
                            },
                            {
                                "value": 6202,
                                "valueTime": "2021-05-10T16:29:00Z"
                            },
                            {
                                "value": 2500,
                                "valueTime": "2021-05-10T16:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-10T16:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-10T17:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-10T17:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-10T18:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-10T18:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-10T19:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-10T19:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-10T20:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-10T21:29:00Z"
                            },
                            {
                                "value": 29,
                                "valueTime": "2021-05-10T21:59:00Z"
                            },
                            {
                                "value": 7879,
                                "valueTime": "2021-05-10T22:29:00Z"
                            },
                            {
                                "value": 21135,
                                "valueTime": "2021-05-10T22:59:00Z"
                            },
                            {
                                "value": 47226,
                                "valueTime": "2021-05-10T23:29:00Z"
                            },
                            {
                                "value": 74575,
                                "valueTime": "2021-05-10T23:59:00Z"
                            },
                            {
                                "value": 60531,
                                "valueTime": "2021-05-11T00:29:00Z"
                            },
                            {
                                "value": 108943,
                                "valueTime": "2021-05-11T00:59:00Z"
                            },
                            {
                                "value": 66917,
                                "valueTime": "2021-05-11T01:29:00Z"
                            },
                            {
                                "value": 49989,
                                "valueTime": "2021-05-11T01:59:00Z"
                            },
                            {
                                "value": 37042,
                                "valueTime": "2021-05-11T02:29:00Z"
                            },
                            {
                                "value": 30704,
                                "valueTime": "2021-05-11T02:59:00Z"
                            },
                            {
                                "value": 28703,
                                "valueTime": "2021-05-11T03:29:00Z"
                            },
                            {
                                "value": 31660,
                                "valueTime": "2021-05-11T03:59:00Z"
                            },
                            {
                                "value": 32620,
                                "valueTime": "2021-05-11T04:29:00Z"
                            },
                            {
                                "value": 36633,
                                "valueTime": "2021-05-11T04:59:00Z"
                            },
                            {
                                "value": 35709,
                                "valueTime": "2021-05-11T05:29:00Z"
                            },
                            {
                                "value": 35601,
                                "valueTime": "2021-05-11T05:59:00Z"
                            },
                            {
                                "value": 31429,
                                "valueTime": "2021-05-11T06:29:00Z"
                            },
                            {
                                "value": 31693,
                                "valueTime": "2021-05-11T06:59:00Z"
                            },
                            {
                                "value": 30245,
                                "valueTime": "2021-05-11T07:29:00Z"
                            },
                            {
                                "value": 35289,
                                "valueTime": "2021-05-11T07:59:00Z"
                            },
                            {
                                "value": 37505,
                                "valueTime": "2021-05-11T08:29:00Z"
                            },
                            {
                                "value": 53173,
                                "valueTime": "2021-05-11T08:59:00Z"
                            },
                            {
                                "value": 60410,
                                "valueTime": "2021-05-11T09:29:00Z"
                            },
                            {
                                "value": 77839,
                                "valueTime": "2021-05-11T09:59:00Z"
                            },
                            {
                                "value": 97446,
                                "valueTime": "2021-05-11T10:29:00Z"
                            },
                            {
                                "value": 110814,
                                "valueTime": "2021-05-11T10:59:00Z"
                            },
                            {
                                "value": 86083,
                                "valueTime": "2021-05-11T11:29:00Z"
                            },
                            {
                                "value": 61086,
                                "valueTime": "2021-05-11T11:59:00Z"
                            },
                            {
                                "value": 45604,
                                "valueTime": "2021-05-11T12:29:00Z"
                            },
                            {
                                "value": 40230,
                                "valueTime": "2021-05-11T12:59:00Z"
                            },
                            {
                                "value": 38424,
                                "valueTime": "2021-05-11T13:29:00Z"
                            },
                            {
                                "value": 40664,
                                "valueTime": "2021-05-11T13:59:00Z"
                            },
                            {
                                "value": 36026,
                                "valueTime": "2021-05-11T14:29:00Z"
                            },
                            {
                                "value": 26023,
                                "valueTime": "2021-05-11T14:59:00Z"
                            },
                            {
                                "value": 13879,
                                "valueTime": "2021-05-11T15:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-11T15:59:00Z"
                            },
                            {
                                "value": 6036,
                                "valueTime": "2021-05-11T16:29:00Z"
                            },
                            {
                                "value": 2520,
                                "valueTime": "2021-05-11T16:59:00Z"
                            },
                            {
                                "value": 256,
                                "valueTime": "2021-05-11T17:29:00Z"
                            },
                            {
                                "value": 1,
                                "valueTime": "2021-05-11T17:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-11T17:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-11T18:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-11T18:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-11T19:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-11T19:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-11T20:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-11T21:29:00Z"
                            },
                            {
                                "value": 36,
                                "valueTime": "2021-05-11T21:59:00Z"
                            },
                            {
                                "value": 6991,
                                "valueTime": "2021-05-11T22:29:00Z"
                            },
                            {
                                "value": 19265,
                                "valueTime": "2021-05-11T22:59:00Z"
                            },
                            {
                                "value": 44189,
                                "valueTime": "2021-05-11T23:29:00Z"
                            },
                            {
                                "value": 72736,
                                "valueTime": "2021-05-11T23:59:00Z"
                            },
                            {
                                "value": 98287,
                                "valueTime": "2021-05-12T00:29:00Z"
                            },
                            {
                                "value": 114634,
                                "valueTime": "2021-05-12T00:59:00Z"
                            },
                            {
                                "value": 60475,
                                "valueTime": "2021-05-12T01:29:00Z"
                            },
                            {
                                "value": 44505,
                                "valueTime": "2021-05-12T01:59:00Z"
                            },
                            {
                                "value": 35231,
                                "valueTime": "2021-05-12T02:29:00Z"
                            },
                            {
                                "value": 29353,
                                "valueTime": "2021-05-12T02:59:00Z"
                            },
                            {
                                "value": 25869,
                                "valueTime": "2021-05-12T03:29:00Z"
                            },
                            {
                                "value": 28716,
                                "valueTime": "2021-05-12T03:59:00Z"
                            },
                            {
                                "value": 28219,
                                "valueTime": "2021-05-12T04:29:00Z"
                            },
                            {
                                "value": 33982,
                                "valueTime": "2021-05-12T04:59:00Z"
                            },
                            {
                                "value": 30770,
                                "valueTime": "2021-05-12T05:29:00Z"
                            },
                            {
                                "value": 30419,
                                "valueTime": "2021-05-12T05:59:00Z"
                            },
                            {
                                "value": 25922,
                                "valueTime": "2021-05-12T06:29:00Z"
                            },
                            {
                                "value": 30893,
                                "valueTime": "2021-05-12T06:59:00Z"
                            },
                            {
                                "value": 28036,
                                "valueTime": "2021-05-12T07:29:00Z"
                            },
                            {
                                "value": 31199,
                                "valueTime": "2021-05-12T07:59:00Z"
                            },
                            {
                                "value": 31416,
                                "valueTime": "2021-05-12T08:29:00Z"
                            },
                            {
                                "value": 45818,
                                "valueTime": "2021-05-12T08:59:00Z"
                            },
                            {
                                "value": 54817,
                                "valueTime": "2021-05-12T09:29:00Z"
                            },
                            {
                                "value": 67589,
                                "valueTime": "2021-05-12T09:59:00Z"
                            },
                            {
                                "value": 89910,
                                "valueTime": "2021-05-12T10:29:00Z"
                            },
                            {
                                "value": 102499,
                                "valueTime": "2021-05-12T10:59:00Z"
                            },
                            {
                                "value": 79283,
                                "valueTime": "2021-05-12T11:29:00Z"
                            },
                            {
                                "value": 57153,
                                "valueTime": "2021-05-12T11:59:00Z"
                            },
                            {
                                "value": 41623,
                                "valueTime": "2021-05-12T12:29:00Z"
                            },
                            {
                                "value": 35385,
                                "valueTime": "2021-05-12T12:59:00Z"
                            },
                            {
                                "value": 32947,
                                "valueTime": "2021-05-12T13:29:00Z"
                            },
                            {
                                "value": 34631,
                                "valueTime": "2021-05-12T13:59:00Z"
                            },
                            {
                                "value": 32249,
                                "valueTime": "2021-05-12T14:29:00Z"
                            },
                            {
                                "value": 22922,
                                "valueTime": "2021-05-12T14:59:00Z"
                            },
                            {
                                "value": 12326,
                                "valueTime": "2021-05-12T15:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-12T15:29:00Z"
                            },
                            {
                                "value": 5111,
                                "valueTime": "2021-05-12T16:29:00Z"
                            },
                            {
                                "value": 2184,
                                "valueTime": "2021-05-12T16:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-12T16:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-12T17:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-12T17:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-12T18:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-12T18:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-12T19:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-12T19:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-12T20:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-12T21:29:00Z"
                            },
                            {
                                "value": 48,
                                "valueTime": "2021-05-12T21:59:00Z"
                            },
                            {
                                "value": 6671,
                                "valueTime": "2021-05-12T22:29:00Z"
                            },
                            {
                                "value": 19586,
                                "valueTime": "2021-05-12T22:59:00Z"
                            },
                            {
                                "value": 46078,
                                "valueTime": "2021-05-12T23:29:00Z"
                            },
                            {
                                "value": 75432,
                                "valueTime": "2021-05-12T23:59:00Z"
                            },
                            {
                                "value": 104023,
                                "valueTime": "2021-05-13T00:29:00Z"
                            },
                            {
                                "value": 113906,
                                "valueTime": "2021-05-13T00:59:00Z"
                            },
                            {
                                "value": 65074,
                                "valueTime": "2021-05-13T01:29:00Z"
                            },
                            {
                                "value": 49032,
                                "valueTime": "2021-05-13T01:59:00Z"
                            },
                            {
                                "value": 35353,
                                "valueTime": "2021-05-13T02:29:00Z"
                            },
                            {
                                "value": 28398,
                                "valueTime": "2021-05-13T02:59:00Z"
                            },
                            {
                                "value": 24144,
                                "valueTime": "2021-05-13T03:29:00Z"
                            },
                            {
                                "value": 26091,
                                "valueTime": "2021-05-13T03:59:00Z"
                            },
                            {
                                "value": 25849,
                                "valueTime": "2021-05-13T04:29:00Z"
                            },
                            {
                                "value": 30907,
                                "valueTime": "2021-05-13T04:59:00Z"
                            },
                            {
                                "value": 29114,
                                "valueTime": "2021-05-13T05:29:00Z"
                            },
                            {
                                "value": 29053,
                                "valueTime": "2021-05-13T05:59:00Z"
                            },
                            {
                                "value": 25384,
                                "valueTime": "2021-05-13T06:29:00Z"
                            },
                            {
                                "value": 26461,
                                "valueTime": "2021-05-13T06:59:00Z"
                            },
                            {
                                "value": 25144,
                                "valueTime": "2021-05-13T07:29:00Z"
                            },
                            {
                                "value": 29423,
                                "valueTime": "2021-05-13T07:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-13T07:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-13T08:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-13T08:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-13T09:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-13T09:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-13T10:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-13T10:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-13T11:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-13T11:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-13T12:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-13T12:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-13T13:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-13T13:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-13T14:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-13T14:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-13T15:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-13T15:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-13T16:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-13T16:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-13T17:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-13T17:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-13T18:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-13T18:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-13T19:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-13T19:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-13T20:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-13T20:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-13T21:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-13T21:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-13T22:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-13T22:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-13T23:29:00Z"
                            },
                            {
                                "value": 114260,
                                "valueTime": "2021-05-14T00:29:00Z"
                            },
                            {
                                "value": 117830,
                                "valueTime": "2021-05-14T00:59:00Z"
                            },
                            {
                                "value": 64950,
                                "valueTime": "2021-05-14T01:29:00Z"
                            },
                            {
                                "value": 44510,
                                "valueTime": "2021-05-14T01:59:00Z"
                            },
                            {
                                "value": 27390,
                                "valueTime": "2021-05-14T02:29:00Z"
                            },
                            {
                                "value": 23860,
                                "valueTime": "2021-05-14T02:59:00Z"
                            },
                            {
                                "value": 21008,
                                "valueTime": "2021-05-14T03:29:00Z"
                            },
                            {
                                "value": 25928,
                                "valueTime": "2021-05-14T03:59:00Z"
                            },
                            {
                                "value": 27376,
                                "valueTime": "2021-05-14T04:29:00Z"
                            },
                            {
                                "value": 38872,
                                "valueTime": "2021-05-14T04:59:00Z"
                            },
                            {
                                "value": 35393,
                                "valueTime": "2021-05-14T05:29:00Z"
                            },
                            {
                                "value": 31908,
                                "valueTime": "2021-05-14T05:59:00Z"
                            },
                            {
                                "value": 27084,
                                "valueTime": "2021-05-14T06:29:00Z"
                            },
                            {
                                "value": 27678,
                                "valueTime": "2021-05-14T06:59:00Z"
                            },
                            {
                                "value": 26866,
                                "valueTime": "2021-05-14T07:29:00Z"
                            },
                            {
                                "value": 29955,
                                "valueTime": "2021-05-14T07:59:00Z"
                            },
                            {
                                "value": 33238,
                                "valueTime": "2021-05-14T08:29:00Z"
                            },
                            {
                                "value": 40303,
                                "valueTime": "2021-05-14T08:59:00Z"
                            },
                            {
                                "value": 45773,
                                "valueTime": "2021-05-14T09:29:00Z"
                            },
                            {
                                "value": 61901,
                                "valueTime": "2021-05-14T09:59:00Z"
                            },
                            {
                                "value": 76732,
                                "valueTime": "2021-05-14T10:29:00Z"
                            },
                            {
                                "value": 88402,
                                "valueTime": "2021-05-14T10:59:00Z"
                            },
                            {
                                "value": 64834,
                                "valueTime": "2021-05-14T11:29:00Z"
                            },
                            {
                                "value": 51353,
                                "valueTime": "2021-05-14T11:59:00Z"
                            },
                            {
                                "value": 35747,
                                "valueTime": "2021-05-14T12:29:00Z"
                            },
                            {
                                "value": 31437,
                                "valueTime": "2021-05-14T12:59:00Z"
                            },
                            {
                                "value": 25763,
                                "valueTime": "2021-05-14T13:29:00Z"
                            },
                            {
                                "value": 27132,
                                "valueTime": "2021-05-14T13:59:00Z"
                            },
                            {
                                "value": 24616,
                                "valueTime": "2021-05-14T14:29:00Z"
                            },
                            {
                                "value": 22074,
                                "valueTime": "2021-05-14T14:59:00Z"
                            },
                            {
                                "value": 12942,
                                "valueTime": "2021-05-14T15:29:00Z"
                            },
                            {
                                "value": 3,
                                "valueTime": "2021-05-14T15:59:00Z"
                            },
                            {
                                "value": 5789,
                                "valueTime": "2021-05-14T16:29:00Z"
                            },
                            {
                                "value": 2447,
                                "valueTime": "2021-05-14T16:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-14T16:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-14T17:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-14T17:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-14T18:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-14T19:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-14T19:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-14T19:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-14T20:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-14T21:29:00Z"
                            },
                            {
                                "value": 42,
                                "valueTime": "2021-05-14T21:59:00Z"
                            },
                            {
                                "value": 4045,
                                "valueTime": "2021-05-14T22:29:00Z"
                            },
                            {
                                "value": 8656,
                                "valueTime": "2021-05-14T22:59:00Z"
                            },
                            {
                                "value": 10644,
                                "valueTime": "2021-05-14T23:29:00Z"
                            },
                            {
                                "value": 14074,
                                "valueTime": "2021-05-14T23:59:00Z"
                            },
                            {
                                "value": 15307,
                                "valueTime": "2021-05-15T00:29:00Z"
                            },
                            {
                                "value": 19861,
                                "valueTime": "2021-05-15T00:59:00Z"
                            },
                            {
                                "value": 17801,
                                "valueTime": "2021-05-15T01:29:00Z"
                            },
                            {
                                "value": 22105,
                                "valueTime": "2021-05-15T01:59:00Z"
                            },
                            {
                                "value": 20593,
                                "valueTime": "2021-05-15T02:29:00Z"
                            },
                            {
                                "value": 20452,
                                "valueTime": "2021-05-15T02:59:00Z"
                            },
                            {
                                "value": 18545,
                                "valueTime": "2021-05-15T03:29:00Z"
                            },
                            {
                                "value": 20936,
                                "valueTime": "2021-05-15T03:59:00Z"
                            },
                            {
                                "value": 16504,
                                "valueTime": "2021-05-15T04:29:00Z"
                            },
                            {
                                "value": 22117,
                                "valueTime": "2021-05-15T04:59:00Z"
                            },
                            {
                                "value": 19415,
                                "valueTime": "2021-05-15T05:29:00Z"
                            },
                            {
                                "value": 18645,
                                "valueTime": "2021-05-15T05:59:00Z"
                            },
                            {
                                "value": 18581,
                                "valueTime": "2021-05-15T06:29:00Z"
                            },
                            {
                                "value": 15867,
                                "valueTime": "2021-05-15T06:59:00Z"
                            },
                            {
                                "value": 14649,
                                "valueTime": "2021-05-15T07:29:00Z"
                            },
                            {
                                "value": 14988,
                                "valueTime": "2021-05-15T07:59:00Z"
                            },
                            {
                                "value": 14029,
                                "valueTime": "2021-05-15T08:29:00Z"
                            },
                            {
                                "value": 15185,
                                "valueTime": "2021-05-15T08:59:00Z"
                            },
                            {
                                "value": 17284,
                                "valueTime": "2021-05-15T09:29:00Z"
                            },
                            {
                                "value": 18012,
                                "valueTime": "2021-05-15T09:59:00Z"
                            },
                            {
                                "value": 16061,
                                "valueTime": "2021-05-15T10:29:00Z"
                            },
                            {
                                "value": 14710,
                                "valueTime": "2021-05-15T10:59:00Z"
                            },
                            {
                                "value": 12478,
                                "valueTime": "2021-05-15T11:29:00Z"
                            },
                            {
                                "value": 10959,
                                "valueTime": "2021-05-15T11:59:00Z"
                            },
                            {
                                "value": 9911,
                                "valueTime": "2021-05-15T12:29:00Z"
                            },
                            {
                                "value": 9565,
                                "valueTime": "2021-05-15T12:59:00Z"
                            },
                            {
                                "value": 8827,
                                "valueTime": "2021-05-15T13:29:00Z"
                            },
                            {
                                "value": 9512,
                                "valueTime": "2021-05-15T13:59:00Z"
                            },
                            {
                                "value": 8799,
                                "valueTime": "2021-05-15T14:29:00Z"
                            },
                            {
                                "value": 10128,
                                "valueTime": "2021-05-15T14:59:00Z"
                            },
                            {
                                "value": 5529,
                                "valueTime": "2021-05-15T15:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-15T15:29:00Z"
                            },
                            {
                                "value": 2269,
                                "valueTime": "2021-05-15T16:29:00Z"
                            },
                            {
                                "value": 967,
                                "valueTime": "2021-05-15T16:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-15T16:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-15T17:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-15T17:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-15T18:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-15T18:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-15T19:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-15T19:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-15T20:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-15T21:29:00Z"
                            },
                            {
                                "value": 20,
                                "valueTime": "2021-05-15T21:59:00Z"
                            },
                            {
                                "value": 2743,
                                "valueTime": "2021-05-15T22:29:00Z"
                            },
                            {
                                "value": 5501,
                                "valueTime": "2021-05-15T22:59:00Z"
                            },
                            {
                                "value": 6574,
                                "valueTime": "2021-05-15T23:29:00Z"
                            },
                            {
                                "value": 7496,
                                "valueTime": "2021-05-15T23:59:00Z"
                            },
                            {
                                "value": 5996,
                                "valueTime": "2021-05-16T00:29:00Z"
                            },
                            {
                                "value": 7896,
                                "valueTime": "2021-05-16T00:59:00Z"
                            },
                            {
                                "value": 7349,
                                "valueTime": "2021-05-16T01:29:00Z"
                            },
                            {
                                "value": 9532,
                                "valueTime": "2021-05-16T01:59:00Z"
                            },
                            {
                                "value": 9814,
                                "valueTime": "2021-05-16T02:29:00Z"
                            },
                            {
                                "value": 8411,
                                "valueTime": "2021-05-16T02:59:00Z"
                            },
                            {
                                "value": 7421,
                                "valueTime": "2021-05-16T03:29:00Z"
                            },
                            {
                                "value": 8100,
                                "valueTime": "2021-05-16T03:59:00Z"
                            },
                            {
                                "value": 7920,
                                "valueTime": "2021-05-16T04:29:00Z"
                            },
                            {
                                "value": 9632,
                                "valueTime": "2021-05-16T04:59:00Z"
                            },
                            {
                                "value": 9871,
                                "valueTime": "2021-05-16T05:29:00Z"
                            },
                            {
                                "value": 9223,
                                "valueTime": "2021-05-16T05:59:00Z"
                            },
                            {
                                "value": 8106,
                                "valueTime": "2021-05-16T06:29:00Z"
                            },
                            {
                                "value": 8599,
                                "valueTime": "2021-05-16T06:59:00Z"
                            },
                            {
                                "value": 7984,
                                "valueTime": "2021-05-16T07:29:00Z"
                            },
                            {
                                "value": 8301,
                                "valueTime": "2021-05-16T07:59:00Z"
                            },
                            {
                                "value": 8227,
                                "valueTime": "2021-05-16T08:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-16T08:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-16T08:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-16T09:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-16T09:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-16T10:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-16T10:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-16T11:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-16T11:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-16T12:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-16T12:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-16T13:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-16T13:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-16T14:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-16T14:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-16T15:29:00Z"
                            },
                            {
                                "value": 1702,
                                "valueTime": "2021-05-16T16:29:00Z"
                            },
                            {
                                "value": 721,
                                "valueTime": "2021-05-16T16:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-16T16:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-16T17:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-16T17:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-16T18:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-16T18:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-16T19:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-16T19:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-16T20:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-16T20:59:00Z"
                            },
                            {
                                "value": 42,
                                "valueTime": "2021-05-16T21:59:00Z"
                            },
                            {
                                "value": 5313,
                                "valueTime": "2021-05-16T22:29:00Z"
                            },
                            {
                                "value": 15228,
                                "valueTime": "2021-05-16T22:59:00Z"
                            },
                            {
                                "value": 32814,
                                "valueTime": "2021-05-16T23:29:00Z"
                            },
                            {
                                "value": 50361,
                                "valueTime": "2021-05-16T23:59:00Z"
                            },
                            {
                                "value": 63354,
                                "valueTime": "2021-05-17T00:29:00Z"
                            },
                            {
                                "value": 56392,
                                "valueTime": "2021-05-17T00:59:00Z"
                            },
                            {
                                "value": 30107,
                                "valueTime": "2021-05-17T01:29:00Z"
                            },
                            {
                                "value": 23678,
                                "valueTime": "2021-05-17T01:59:00Z"
                            },
                            {
                                "value": 17500,
                                "valueTime": "2021-05-17T02:29:00Z"
                            },
                            {
                                "value": 14320,
                                "valueTime": "2021-05-17T02:59:00Z"
                            },
                            {
                                "value": 12416,
                                "valueTime": "2021-05-17T03:29:00Z"
                            },
                            {
                                "value": 13698,
                                "valueTime": "2021-05-17T03:59:00Z"
                            },
                            {
                                "value": 11396,
                                "valueTime": "2021-05-17T04:29:00Z"
                            },
                            {
                                "value": 13235,
                                "valueTime": "2021-05-17T04:59:00Z"
                            },
                            {
                                "value": 13254,
                                "valueTime": "2021-05-17T05:29:00Z"
                            },
                            {
                                "value": 13060,
                                "valueTime": "2021-05-17T05:59:00Z"
                            },
                            {
                                "value": 11005,
                                "valueTime": "2021-05-17T06:29:00Z"
                            },
                            {
                                "value": 11547,
                                "valueTime": "2021-05-17T06:59:00Z"
                            },
                            {
                                "value": 11099,
                                "valueTime": "2021-05-17T07:29:00Z"
                            },
                            {
                                "value": 12486,
                                "valueTime": "2021-05-17T07:59:00Z"
                            },
                            {
                                "value": 13590,
                                "valueTime": "2021-05-17T08:29:00Z"
                            },
                            {
                                "value": 21088,
                                "valueTime": "2021-05-17T08:59:00Z"
                            },
                            {
                                "value": 24897,
                                "valueTime": "2021-05-17T09:29:00Z"
                            },
                            {
                                "value": 33749,
                                "valueTime": "2021-05-17T09:59:00Z"
                            },
                            {
                                "value": 43790,
                                "valueTime": "2021-05-17T10:29:00Z"
                            },
                            {
                                "value": 47386,
                                "valueTime": "2021-05-17T10:59:00Z"
                            },
                            {
                                "value": 35671,
                                "valueTime": "2021-05-17T11:29:00Z"
                            },
                            {
                                "value": 25518,
                                "valueTime": "2021-05-17T11:59:00Z"
                            },
                            {
                                "value": 17780,
                                "valueTime": "2021-05-17T12:29:00Z"
                            },
                            {
                                "value": 15089,
                                "valueTime": "2021-05-17T12:59:00Z"
                            },
                            {
                                "value": 12812,
                                "valueTime": "2021-05-17T13:29:00Z"
                            },
                            {
                                "value": 10062,
                                "valueTime": "2021-05-17T13:59:00Z"
                            },
                            {
                                "value": 7342,
                                "valueTime": "2021-05-17T14:29:00Z"
                            },
                            {
                                "value": 5512,
                                "valueTime": "2021-05-17T14:59:00Z"
                            },
                            {
                                "value": 3168,
                                "valueTime": "2021-05-17T15:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-17T15:29:00Z"
                            },
                            {
                                "value": 1482,
                                "valueTime": "2021-05-17T16:29:00Z"
                            },
                            {
                                "value": 647,
                                "valueTime": "2021-05-17T16:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-17T16:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-17T17:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-17T17:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-17T18:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-17T18:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-17T19:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-17T19:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-17T20:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-17T20:59:00Z"
                            },
                            {
                                "value": 25,
                                "valueTime": "2021-05-17T21:59:00Z"
                            },
                            {
                                "value": 3990,
                                "valueTime": "2021-05-17T22:29:00Z"
                            },
                            {
                                "value": 9776,
                                "valueTime": "2021-05-17T22:59:00Z"
                            },
                            {
                                "value": 18594,
                                "valueTime": "2021-05-17T23:29:00Z"
                            },
                            {
                                "value": 43415,
                                "valueTime": "2021-05-17T23:59:00Z"
                            },
                            {
                                "value": 54364,
                                "valueTime": "2021-05-18T00:29:00Z"
                            },
                            {
                                "value": 47344,
                                "valueTime": "2021-05-18T00:59:00Z"
                            },
                            {
                                "value": 22796,
                                "valueTime": "2021-05-18T01:29:00Z"
                            },
                            {
                                "value": 16948,
                                "valueTime": "2021-05-18T01:59:00Z"
                            },
                            {
                                "value": 11579,
                                "valueTime": "2021-05-18T02:29:00Z"
                            },
                            {
                                "value": 11981,
                                "valueTime": "2021-05-18T02:59:00Z"
                            },
                            {
                                "value": 10419,
                                "valueTime": "2021-05-18T03:29:00Z"
                            },
                            {
                                "value": 8846,
                                "valueTime": "2021-05-18T03:59:00Z"
                            },
                            {
                                "value": 7932,
                                "valueTime": "2021-05-18T04:29:00Z"
                            },
                            {
                                "value": 9029,
                                "valueTime": "2021-05-18T04:59:00Z"
                            },
                            {
                                "value": 8373,
                                "valueTime": "2021-05-18T05:29:00Z"
                            },
                            {
                                "value": 8750,
                                "valueTime": "2021-05-18T05:59:00Z"
                            },
                            {
                                "value": 7916,
                                "valueTime": "2021-05-18T06:29:00Z"
                            },
                            {
                                "value": 8701,
                                "valueTime": "2021-05-18T06:59:00Z"
                            },
                            {
                                "value": 8170,
                                "valueTime": "2021-05-18T07:29:00Z"
                            },
                            {
                                "value": 8595,
                                "valueTime": "2021-05-18T07:59:00Z"
                            },
                            {
                                "value": 8514,
                                "valueTime": "2021-05-18T08:29:00Z"
                            },
                            {
                                "value": 11495,
                                "valueTime": "2021-05-18T08:59:00Z"
                            },
                            {
                                "value": 17412,
                                "valueTime": "2021-05-18T09:29:00Z"
                            },
                            {
                                "value": 28593,
                                "valueTime": "2021-05-18T09:59:00Z"
                            },
                            {
                                "value": 36856,
                                "valueTime": "2021-05-18T10:29:00Z"
                            },
                            {
                                "value": 39754,
                                "valueTime": "2021-05-18T10:59:00Z"
                            },
                            {
                                "value": 29310,
                                "valueTime": "2021-05-18T11:29:00Z"
                            },
                            {
                                "value": 20315,
                                "valueTime": "2021-05-18T11:59:00Z"
                            },
                            {
                                "value": 14528,
                                "valueTime": "2021-05-18T12:29:00Z"
                            },
                            {
                                "value": 12949,
                                "valueTime": "2021-05-18T12:59:00Z"
                            },
                            {
                                "value": 10452,
                                "valueTime": "2021-05-18T13:29:00Z"
                            },
                            {
                                "value": 8041,
                                "valueTime": "2021-05-18T13:59:00Z"
                            },
                            {
                                "value": 5796,
                                "valueTime": "2021-05-18T14:29:00Z"
                            },
                            {
                                "value": 4672,
                                "valueTime": "2021-05-18T14:59:00Z"
                            },
                            {
                                "value": 3012,
                                "valueTime": "2021-05-18T15:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-18T15:29:00Z"
                            },
                            {
                                "value": 1400,
                                "valueTime": "2021-05-18T16:29:00Z"
                            },
                            {
                                "value": 694,
                                "valueTime": "2021-05-18T16:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-18T16:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-18T17:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-18T17:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-18T18:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-18T19:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-18T19:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-18T19:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-18T20:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-18T21:29:00Z"
                            },
                            {
                                "value": 20,
                                "valueTime": "2021-05-18T21:59:00Z"
                            },
                            {
                                "value": 3977,
                                "valueTime": "2021-05-18T22:29:00Z"
                            },
                            {
                                "value": 9616,
                                "valueTime": "2021-05-18T22:59:00Z"
                            },
                            {
                                "value": 18233,
                                "valueTime": "2021-05-18T23:29:00Z"
                            },
                            {
                                "value": 35454,
                                "valueTime": "2021-05-18T23:59:00Z"
                            },
                            {
                                "value": 45972,
                                "valueTime": "2021-05-19T00:29:00Z"
                            },
                            {
                                "value": 41671,
                                "valueTime": "2021-05-19T00:59:00Z"
                            },
                            {
                                "value": 22002,
                                "valueTime": "2021-05-19T01:29:00Z"
                            },
                            {
                                "value": 15153,
                                "valueTime": "2021-05-19T01:59:00Z"
                            },
                            {
                                "value": 10600,
                                "valueTime": "2021-05-19T02:29:00Z"
                            },
                            {
                                "value": 11054,
                                "valueTime": "2021-05-19T02:59:00Z"
                            },
                            {
                                "value": 9464,
                                "valueTime": "2021-05-19T03:29:00Z"
                            },
                            {
                                "value": 8290,
                                "valueTime": "2021-05-19T03:59:00Z"
                            },
                            {
                                "value": 7345,
                                "valueTime": "2021-05-19T04:29:00Z"
                            },
                            {
                                "value": 8405,
                                "valueTime": "2021-05-19T04:59:00Z"
                            },
                            {
                                "value": 7834,
                                "valueTime": "2021-05-19T05:29:00Z"
                            },
                            {
                                "value": 8299,
                                "valueTime": "2021-05-19T05:59:00Z"
                            },
                            {
                                "value": 7066,
                                "valueTime": "2021-05-19T06:29:00Z"
                            },
                            {
                                "value": 7713,
                                "valueTime": "2021-05-19T06:59:00Z"
                            },
                            {
                                "value": 7178,
                                "valueTime": "2021-05-19T07:29:00Z"
                            },
                            {
                                "value": 8035,
                                "valueTime": "2021-05-19T07:59:00Z"
                            },
                            {
                                "value": 8305,
                                "valueTime": "2021-05-19T08:29:00Z"
                            },
                            {
                                "value": 11017,
                                "valueTime": "2021-05-19T08:59:00Z"
                            },
                            {
                                "value": 16578,
                                "valueTime": "2021-05-19T09:29:00Z"
                            },
                            {
                                "value": 31011,
                                "valueTime": "2021-05-19T09:59:00Z"
                            },
                            {
                                "value": 35074,
                                "valueTime": "2021-05-19T10:29:00Z"
                            },
                            {
                                "value": 36591,
                                "valueTime": "2021-05-19T10:59:00Z"
                            },
                            {
                                "value": 27102,
                                "valueTime": "2021-05-19T11:29:00Z"
                            },
                            {
                                "value": 18997,
                                "valueTime": "2021-05-19T11:59:00Z"
                            },
                            {
                                "value": 13677,
                                "valueTime": "2021-05-19T12:29:00Z"
                            },
                            {
                                "value": 12601,
                                "valueTime": "2021-05-19T12:59:00Z"
                            },
                            {
                                "value": 9538,
                                "valueTime": "2021-05-19T13:29:00Z"
                            },
                            {
                                "value": 7582,
                                "valueTime": "2021-05-19T13:59:00Z"
                            },
                            {
                                "value": 5582,
                                "valueTime": "2021-05-19T14:29:00Z"
                            },
                            {
                                "value": 4434,
                                "valueTime": "2021-05-19T14:59:00Z"
                            },
                            {
                                "value": 2859,
                                "valueTime": "2021-05-19T15:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-19T15:29:00Z"
                            },
                            {
                                "value": 1363,
                                "valueTime": "2021-05-19T16:29:00Z"
                            },
                            {
                                "value": 608,
                                "valueTime": "2021-05-19T16:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-19T16:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-19T17:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-19T17:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-19T18:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-19T18:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-19T19:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-19T19:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-19T20:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-19T20:59:00Z"
                            },
                            {
                                "value": 15,
                                "valueTime": "2021-05-19T21:59:00Z"
                            },
                            {
                                "value": 3970,
                                "valueTime": "2021-05-19T22:29:00Z"
                            },
                            {
                                "value": 9229,
                                "valueTime": "2021-05-19T22:59:00Z"
                            },
                            {
                                "value": 17138,
                                "valueTime": "2021-05-19T23:29:00Z"
                            },
                            {
                                "value": 35347,
                                "valueTime": "2021-05-19T23:59:00Z"
                            },
                            {
                                "value": 37882,
                                "valueTime": "2021-05-20T00:29:00Z"
                            },
                            {
                                "value": 39967,
                                "valueTime": "2021-05-20T00:59:00Z"
                            },
                            {
                                "value": 20704,
                                "valueTime": "2021-05-20T01:29:00Z"
                            },
                            {
                                "value": 15424,
                                "valueTime": "2021-05-20T01:59:00Z"
                            },
                            {
                                "value": 9685,
                                "valueTime": "2021-05-20T02:29:00Z"
                            },
                            {
                                "value": 10427,
                                "valueTime": "2021-05-20T02:59:00Z"
                            },
                            {
                                "value": 9209,
                                "valueTime": "2021-05-20T03:29:00Z"
                            },
                            {
                                "value": 7798,
                                "valueTime": "2021-05-20T03:59:00Z"
                            },
                            {
                                "value": 7036,
                                "valueTime": "2021-05-20T04:29:00Z"
                            },
                            {
                                "value": 7891,
                                "valueTime": "2021-05-20T04:59:00Z"
                            },
                            {
                                "value": 7524,
                                "valueTime": "2021-05-20T05:29:00Z"
                            },
                            {
                                "value": 7747,
                                "valueTime": "2021-05-20T05:59:00Z"
                            },
                            {
                                "value": 7127,
                                "valueTime": "2021-05-20T06:29:00Z"
                            },
                            {
                                "value": 7644,
                                "valueTime": "2021-05-20T06:59:00Z"
                            },
                            {
                                "value": 7248,
                                "valueTime": "2021-05-20T07:29:00Z"
                            },
                            {
                                "value": 7705,
                                "valueTime": "2021-05-20T07:59:00Z"
                            },
                            {
                                "value": 7759,
                                "valueTime": "2021-05-20T08:29:00Z"
                            },
                            {
                                "value": 10664,
                                "valueTime": "2021-05-20T08:59:00Z"
                            },
                            {
                                "value": 16263,
                                "valueTime": "2021-05-20T09:29:00Z"
                            },
                            {
                                "value": 26517,
                                "valueTime": "2021-05-20T09:59:00Z"
                            },
                            {
                                "value": 33491,
                                "valueTime": "2021-05-20T10:29:00Z"
                            },
                            {
                                "value": 34860,
                                "valueTime": "2021-05-20T10:59:00Z"
                            },
                            {
                                "value": 25492,
                                "valueTime": "2021-05-20T11:29:00Z"
                            },
                            {
                                "value": 18137,
                                "valueTime": "2021-05-20T11:59:00Z"
                            },
                            {
                                "value": 12914,
                                "valueTime": "2021-05-20T12:29:00Z"
                            },
                            {
                                "value": 12129,
                                "valueTime": "2021-05-20T12:59:00Z"
                            },
                            {
                                "value": 9364,
                                "valueTime": "2021-05-20T13:29:00Z"
                            },
                            {
                                "value": 7278,
                                "valueTime": "2021-05-20T13:59:00Z"
                            },
                            {
                                "value": 5332,
                                "valueTime": "2021-05-20T14:29:00Z"
                            },
                            {
                                "value": 4246,
                                "valueTime": "2021-05-20T14:59:00Z"
                            },
                            {
                                "value": 2690,
                                "valueTime": "2021-05-20T15:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-20T15:29:00Z"
                            },
                            {
                                "value": 1324,
                                "valueTime": "2021-05-20T16:29:00Z"
                            },
                            {
                                "value": 662,
                                "valueTime": "2021-05-20T16:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-20T16:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-20T17:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-20T17:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-20T18:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-20T18:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-20T19:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-20T20:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-20T20:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-20T20:59:00Z"
                            },
                            {
                                "value": 26,
                                "valueTime": "2021-05-20T21:59:00Z"
                            },
                            {
                                "value": 3753,
                                "valueTime": "2021-05-20T22:29:00Z"
                            },
                            {
                                "value": 8603,
                                "valueTime": "2021-05-20T22:59:00Z"
                            },
                            {
                                "value": 15665,
                                "valueTime": "2021-05-20T23:29:00Z"
                            },
                            {
                                "value": 31104,
                                "valueTime": "2021-05-20T23:59:00Z"
                            },
                            {
                                "value": 40175,
                                "valueTime": "2021-05-21T00:29:00Z"
                            },
                            {
                                "value": 36726,
                                "valueTime": "2021-05-21T00:59:00Z"
                            },
                            {
                                "value": 18833,
                                "valueTime": "2021-05-21T01:29:00Z"
                            },
                            {
                                "value": 14134,
                                "valueTime": "2021-05-21T01:59:00Z"
                            },
                            {
                                "value": 9490,
                                "valueTime": "2021-05-21T02:29:00Z"
                            },
                            {
                                "value": 10119,
                                "valueTime": "2021-05-21T02:59:00Z"
                            },
                            {
                                "value": 8660,
                                "valueTime": "2021-05-21T03:29:00Z"
                            },
                            {
                                "value": 7570,
                                "valueTime": "2021-05-21T03:59:00Z"
                            },
                            {
                                "value": 6670,
                                "valueTime": "2021-05-21T04:29:00Z"
                            },
                            {
                                "value": 8111,
                                "valueTime": "2021-05-21T04:59:00Z"
                            },
                            {
                                "value": 6814,
                                "valueTime": "2021-05-21T05:29:00Z"
                            },
                            {
                                "value": 7633,
                                "valueTime": "2021-05-21T05:59:00Z"
                            },
                            {
                                "value": 6576,
                                "valueTime": "2021-05-21T06:29:00Z"
                            },
                            {
                                "value": 7438,
                                "valueTime": "2021-05-21T06:59:00Z"
                            },
                            {
                                "value": 7049,
                                "valueTime": "2021-05-21T07:29:00Z"
                            },
                            {
                                "value": 7771,
                                "valueTime": "2021-05-21T07:59:00Z"
                            },
                            {
                                "value": 7950,
                                "valueTime": "2021-05-21T08:29:00Z"
                            },
                            {
                                "value": 10532,
                                "valueTime": "2021-05-21T08:59:00Z"
                            },
                            {
                                "value": 15182,
                                "valueTime": "2021-05-21T09:29:00Z"
                            },
                            {
                                "value": 24614,
                                "valueTime": "2021-05-21T09:59:00Z"
                            },
                            {
                                "value": 31555,
                                "valueTime": "2021-05-21T10:29:00Z"
                            },
                            {
                                "value": 33515,
                                "valueTime": "2021-05-21T10:59:00Z"
                            },
                            {
                                "value": 24750,
                                "valueTime": "2021-05-21T11:29:00Z"
                            },
                            {
                                "value": 17437,
                                "valueTime": "2021-05-21T11:59:00Z"
                            },
                            {
                                "value": 12778,
                                "valueTime": "2021-05-21T12:29:00Z"
                            },
                            {
                                "value": 11870,
                                "valueTime": "2021-05-21T12:59:00Z"
                            },
                            {
                                "value": 9157,
                                "valueTime": "2021-05-21T13:29:00Z"
                            },
                            {
                                "value": 7183,
                                "valueTime": "2021-05-21T13:59:00Z"
                            },
                            {
                                "value": 5460,
                                "valueTime": "2021-05-21T14:29:00Z"
                            },
                            {
                                "value": 4277,
                                "valueTime": "2021-05-21T14:59:00Z"
                            },
                            {
                                "value": 2838,
                                "valueTime": "2021-05-21T15:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-21T15:29:00Z"
                            },
                            {
                                "value": 1438,
                                "valueTime": "2021-05-21T16:29:00Z"
                            },
                            {
                                "value": 652,
                                "valueTime": "2021-05-21T16:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-21T16:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-21T17:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-21T17:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-21T18:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-21T18:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-21T19:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-21T19:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-21T20:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-21T21:29:00Z"
                            },
                            {
                                "value": 18,
                                "valueTime": "2021-05-21T21:59:00Z"
                            },
                            {
                                "value": 2204,
                                "valueTime": "2021-05-21T22:29:00Z"
                            },
                            {
                                "value": 4087,
                                "valueTime": "2021-05-21T22:59:00Z"
                            },
                            {
                                "value": 4284,
                                "valueTime": "2021-05-21T23:29:00Z"
                            },
                            {
                                "value": 6071,
                                "valueTime": "2021-05-21T23:59:00Z"
                            },
                            {
                                "value": 5039,
                                "valueTime": "2021-05-22T00:29:00Z"
                            },
                            {
                                "value": 6302,
                                "valueTime": "2021-05-22T00:59:00Z"
                            },
                            {
                                "value": 5254,
                                "valueTime": "2021-05-22T01:29:00Z"
                            },
                            {
                                "value": 6144,
                                "valueTime": "2021-05-22T01:59:00Z"
                            },
                            {
                                "value": 5920,
                                "valueTime": "2021-05-22T02:29:00Z"
                            },
                            {
                                "value": 7532,
                                "valueTime": "2021-05-22T02:59:00Z"
                            },
                            {
                                "value": 6997,
                                "valueTime": "2021-05-22T03:29:00Z"
                            },
                            {
                                "value": 6603,
                                "valueTime": "2021-05-22T03:59:00Z"
                            },
                            {
                                "value": 1490,
                                "valueTime": "2021-05-22T04:29:00Z"
                            },
                            {
                                "value": 5187,
                                "valueTime": "2021-05-22T04:59:00Z"
                            },
                            {
                                "value": 4655,
                                "valueTime": "2021-05-22T05:29:00Z"
                            },
                            {
                                "value": 5018,
                                "valueTime": "2021-05-22T05:59:00Z"
                            },
                            {
                                "value": 4368,
                                "valueTime": "2021-05-22T06:29:00Z"
                            },
                            {
                                "value": 4637,
                                "valueTime": "2021-05-22T06:59:00Z"
                            },
                            {
                                "value": 4252,
                                "valueTime": "2021-05-22T07:29:00Z"
                            },
                            {
                                "value": 4987,
                                "valueTime": "2021-05-22T07:59:00Z"
                            },
                            {
                                "value": 4519,
                                "valueTime": "2021-05-22T08:29:00Z"
                            },
                            {
                                "value": 4824,
                                "valueTime": "2021-05-22T08:59:00Z"
                            },
                            {
                                "value": 5611,
                                "valueTime": "2021-05-22T09:29:00Z"
                            },
                            {
                                "value": 6354,
                                "valueTime": "2021-05-22T09:59:00Z"
                            },
                            {
                                "value": 6018,
                                "valueTime": "2021-05-22T10:29:00Z"
                            },
                            {
                                "value": 6086,
                                "valueTime": "2021-05-22T10:59:00Z"
                            },
                            {
                                "value": 5155,
                                "valueTime": "2021-05-22T11:29:00Z"
                            },
                            {
                                "value": 4787,
                                "valueTime": "2021-05-22T11:59:00Z"
                            },
                            {
                                "value": 4314,
                                "valueTime": "2021-05-22T12:29:00Z"
                            },
                            {
                                "value": 6183,
                                "valueTime": "2021-05-22T12:59:00Z"
                            },
                            {
                                "value": 5059,
                                "valueTime": "2021-05-22T13:29:00Z"
                            },
                            {
                                "value": 4217,
                                "valueTime": "2021-05-22T13:59:00Z"
                            },
                            {
                                "value": 3111,
                                "valueTime": "2021-05-22T14:29:00Z"
                            },
                            {
                                "value": 2832,
                                "valueTime": "2021-05-22T14:59:00Z"
                            },
                            {
                                "value": 1883,
                                "valueTime": "2021-05-22T15:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-22T15:29:00Z"
                            },
                            {
                                "value": 1048,
                                "valueTime": "2021-05-22T16:29:00Z"
                            },
                            {
                                "value": 519,
                                "valueTime": "2021-05-22T16:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-22T16:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-22T17:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-22T17:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-22T18:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-22T18:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-22T19:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-22T19:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-22T20:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-22T21:29:00Z"
                            },
                            {
                                "value": 15,
                                "valueTime": "2021-05-22T21:59:00Z"
                            },
                            {
                                "value": 1808,
                                "valueTime": "2021-05-22T22:29:00Z"
                            },
                            {
                                "value": 3164,
                                "valueTime": "2021-05-22T22:59:00Z"
                            },
                            {
                                "value": 3109,
                                "valueTime": "2021-05-22T23:29:00Z"
                            },
                            {
                                "value": 3980,
                                "valueTime": "2021-05-22T23:59:00Z"
                            },
                            {
                                "value": 3181,
                                "valueTime": "2021-05-23T00:29:00Z"
                            },
                            {
                                "value": 3806,
                                "valueTime": "2021-05-23T00:59:00Z"
                            },
                            {
                                "value": 3257,
                                "valueTime": "2021-05-23T01:29:00Z"
                            },
                            {
                                "value": 4073,
                                "valueTime": "2021-05-23T01:59:00Z"
                            },
                            {
                                "value": 4046,
                                "valueTime": "2021-05-23T02:29:00Z"
                            },
                            {
                                "value": 5602,
                                "valueTime": "2021-05-23T02:59:00Z"
                            },
                            {
                                "value": 4981,
                                "valueTime": "2021-05-23T03:29:00Z"
                            },
                            {
                                "value": 3914,
                                "valueTime": "2021-05-23T03:59:00Z"
                            },
                            {
                                "value": 3134,
                                "valueTime": "2021-05-23T04:29:00Z"
                            },
                            {
                                "value": 3250,
                                "valueTime": "2021-05-23T04:59:00Z"
                            },
                            {
                                "value": 2994,
                                "valueTime": "2021-05-23T05:29:00Z"
                            },
                            {
                                "value": 3357,
                                "valueTime": "2021-05-23T05:59:00Z"
                            },
                            {
                                "value": 3261,
                                "valueTime": "2021-05-23T06:29:00Z"
                            },
                            {
                                "value": 3543,
                                "valueTime": "2021-05-23T06:59:00Z"
                            },
                            {
                                "value": 3463,
                                "valueTime": "2021-05-23T07:29:00Z"
                            },
                            {
                                "value": 3850,
                                "valueTime": "2021-05-23T07:59:00Z"
                            },
                            {
                                "value": 3658,
                                "valueTime": "2021-05-23T08:29:00Z"
                            },
                            {
                                "value": 4694,
                                "valueTime": "2021-05-23T08:59:00Z"
                            },
                            {
                                "value": 1325,
                                "valueTime": "2021-05-23T09:29:00Z"
                            },
                            {
                                "value": 5482,
                                "valueTime": "2021-05-23T09:59:00Z"
                            },
                            {
                                "value": 4692,
                                "valueTime": "2021-05-23T10:29:00Z"
                            },
                            {
                                "value": 4926,
                                "valueTime": "2021-05-23T10:59:00Z"
                            },
                            {
                                "value": 4206,
                                "valueTime": "2021-05-23T11:29:00Z"
                            },
                            {
                                "value": 4269,
                                "valueTime": "2021-05-23T11:59:00Z"
                            },
                            {
                                "value": 3953,
                                "valueTime": "2021-05-23T12:29:00Z"
                            },
                            {
                                "value": 5931,
                                "valueTime": "2021-05-23T12:59:00Z"
                            },
                            {
                                "value": 5252,
                                "valueTime": "2021-05-23T13:29:00Z"
                            },
                            {
                                "value": 4029,
                                "valueTime": "2021-05-23T13:59:00Z"
                            },
                            {
                                "value": 2891,
                                "valueTime": "2021-05-23T14:29:00Z"
                            },
                            {
                                "value": 2733,
                                "valueTime": "2021-05-23T14:59:00Z"
                            },
                            {
                                "value": 1870,
                                "valueTime": "2021-05-23T15:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-23T15:29:00Z"
                            },
                            {
                                "value": 991,
                                "valueTime": "2021-05-23T16:29:00Z"
                            },
                            {
                                "value": 463,
                                "valueTime": "2021-05-23T16:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-23T16:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-23T17:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-23T17:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-23T18:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-23T18:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-23T19:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-23T19:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-23T20:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-23T20:59:00Z"
                            },
                            {
                                "value": 22,
                                "valueTime": "2021-05-23T21:59:00Z"
                            },
                            {
                                "value": 3979,
                                "valueTime": "2021-05-23T22:29:00Z"
                            },
                            {
                                "value": 8631,
                                "valueTime": "2021-05-23T22:59:00Z"
                            },
                            {
                                "value": 15843,
                                "valueTime": "2021-05-23T23:29:00Z"
                            },
                            {
                                "value": 30909,
                                "valueTime": "2021-05-23T23:59:00Z"
                            },
                            {
                                "value": 39191,
                                "valueTime": "2021-05-24T00:29:00Z"
                            },
                            {
                                "value": 35333,
                                "valueTime": "2021-05-24T00:59:00Z"
                            },
                            {
                                "value": 19726,
                                "valueTime": "2021-05-24T01:29:00Z"
                            },
                            {
                                "value": 13578,
                                "valueTime": "2021-05-24T01:59:00Z"
                            },
                            {
                                "value": 8792,
                                "valueTime": "2021-05-24T02:29:00Z"
                            },
                            {
                                "value": 9100,
                                "valueTime": "2021-05-24T02:59:00Z"
                            },
                            {
                                "value": 8143,
                                "valueTime": "2021-05-24T03:29:00Z"
                            },
                            {
                                "value": 6973,
                                "valueTime": "2021-05-24T03:59:00Z"
                            },
                            {
                                "value": 6022,
                                "valueTime": "2021-05-24T04:29:00Z"
                            },
                            {
                                "value": 6778,
                                "valueTime": "2021-05-24T04:59:00Z"
                            },
                            {
                                "value": 6456,
                                "valueTime": "2021-05-24T05:29:00Z"
                            },
                            {
                                "value": 6819,
                                "valueTime": "2021-05-24T05:59:00Z"
                            },
                            {
                                "value": 6167,
                                "valueTime": "2021-05-24T06:29:00Z"
                            },
                            {
                                "value": 6558,
                                "valueTime": "2021-05-24T06:59:00Z"
                            },
                            {
                                "value": 5848,
                                "valueTime": "2021-05-24T07:29:00Z"
                            },
                            {
                                "value": 6326,
                                "valueTime": "2021-05-24T07:59:00Z"
                            },
                            {
                                "value": 6895,
                                "valueTime": "2021-05-24T08:29:00Z"
                            },
                            {
                                "value": 9362,
                                "valueTime": "2021-05-24T08:59:00Z"
                            },
                            {
                                "value": 14475,
                                "valueTime": "2021-05-24T09:29:00Z"
                            },
                            {
                                "value": 23814,
                                "valueTime": "2021-05-24T09:59:00Z"
                            },
                            {
                                "value": 30297,
                                "valueTime": "2021-05-24T10:29:00Z"
                            },
                            {
                                "value": 31461,
                                "valueTime": "2021-05-24T10:59:00Z"
                            },
                            {
                                "value": 23143,
                                "valueTime": "2021-05-24T11:29:00Z"
                            },
                            {
                                "value": 16100,
                                "valueTime": "2021-05-24T11:59:00Z"
                            },
                            {
                                "value": 11192,
                                "valueTime": "2021-05-24T12:29:00Z"
                            },
                            {
                                "value": 10704,
                                "valueTime": "2021-05-24T12:59:00Z"
                            },
                            {
                                "value": 7723,
                                "valueTime": "2021-05-24T13:29:00Z"
                            },
                            {
                                "value": 6838,
                                "valueTime": "2021-05-24T13:59:00Z"
                            },
                            {
                                "value": 1603,
                                "valueTime": "2021-05-24T14:29:00Z"
                            },
                            {
                                "value": 3635,
                                "valueTime": "2021-05-24T14:59:00Z"
                            },
                            {
                                "value": 2324,
                                "valueTime": "2021-05-24T15:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-24T15:29:00Z"
                            },
                            {
                                "value": 1150,
                                "valueTime": "2021-05-24T16:29:00Z"
                            },
                            {
                                "value": 540,
                                "valueTime": "2021-05-24T16:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-24T16:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-24T17:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-24T17:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-24T18:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-24T18:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-24T19:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-24T19:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-24T20:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-24T20:59:00Z"
                            },
                            {
                                "value": 19,
                                "valueTime": "2021-05-24T21:59:00Z"
                            },
                            {
                                "value": 3562,
                                "valueTime": "2021-05-24T22:29:00Z"
                            },
                            {
                                "value": 8320,
                                "valueTime": "2021-05-24T22:59:00Z"
                            },
                            {
                                "value": 14991,
                                "valueTime": "2021-05-24T23:29:00Z"
                            },
                            {
                                "value": 29135,
                                "valueTime": "2021-05-24T23:59:00Z"
                            },
                            {
                                "value": 37072,
                                "valueTime": "2021-05-25T00:29:00Z"
                            },
                            {
                                "value": 33623,
                                "valueTime": "2021-05-25T00:59:00Z"
                            },
                            {
                                "value": 17374,
                                "valueTime": "2021-05-25T01:29:00Z"
                            },
                            {
                                "value": 13122,
                                "valueTime": "2021-05-25T01:59:00Z"
                            },
                            {
                                "value": 8716,
                                "valueTime": "2021-05-25T02:29:00Z"
                            },
                            {
                                "value": 8998,
                                "valueTime": "2021-05-25T02:59:00Z"
                            },
                            {
                                "value": 8061,
                                "valueTime": "2021-05-25T03:29:00Z"
                            },
                            {
                                "value": 6819,
                                "valueTime": "2021-05-25T03:59:00Z"
                            },
                            {
                                "value": 5929,
                                "valueTime": "2021-05-25T04:29:00Z"
                            },
                            {
                                "value": 6632,
                                "valueTime": "2021-05-25T04:59:00Z"
                            },
                            {
                                "value": 6333,
                                "valueTime": "2021-05-25T05:29:00Z"
                            },
                            {
                                "value": 6458,
                                "valueTime": "2021-05-25T05:59:00Z"
                            },
                            {
                                "value": 5857,
                                "valueTime": "2021-05-25T06:29:00Z"
                            },
                            {
                                "value": 6359,
                                "valueTime": "2021-05-25T06:59:00Z"
                            },
                            {
                                "value": 6185,
                                "valueTime": "2021-05-25T07:29:00Z"
                            },
                            {
                                "value": 6613,
                                "valueTime": "2021-05-25T07:59:00Z"
                            },
                            {
                                "value": 6550,
                                "valueTime": "2021-05-25T08:29:00Z"
                            },
                            {
                                "value": 8983,
                                "valueTime": "2021-05-25T08:59:00Z"
                            },
                            {
                                "value": 13884,
                                "valueTime": "2021-05-25T09:29:00Z"
                            },
                            {
                                "value": 22555,
                                "valueTime": "2021-05-25T09:59:00Z"
                            },
                            {
                                "value": 28575,
                                "valueTime": "2021-05-25T10:29:00Z"
                            },
                            {
                                "value": 30578,
                                "valueTime": "2021-05-25T10:59:00Z"
                            },
                            {
                                "value": 22167,
                                "valueTime": "2021-05-25T11:29:00Z"
                            },
                            {
                                "value": 15446,
                                "valueTime": "2021-05-25T11:59:00Z"
                            },
                            {
                                "value": 11342,
                                "valueTime": "2021-05-25T12:29:00Z"
                            },
                            {
                                "value": 10637,
                                "valueTime": "2021-05-25T12:59:00Z"
                            },
                            {
                                "value": 8046,
                                "valueTime": "2021-05-25T13:29:00Z"
                            },
                            {
                                "value": 6187,
                                "valueTime": "2021-05-25T13:59:00Z"
                            },
                            {
                                "value": 4619,
                                "valueTime": "2021-05-25T14:29:00Z"
                            },
                            {
                                "value": 3748,
                                "valueTime": "2021-05-25T14:59:00Z"
                            },
                            {
                                "value": 2309,
                                "valueTime": "2021-05-25T15:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-25T15:29:00Z"
                            },
                            {
                                "value": 1135,
                                "valueTime": "2021-05-25T16:29:00Z"
                            },
                            {
                                "value": 579,
                                "valueTime": "2021-05-25T16:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-25T16:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-25T17:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-25T17:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-25T18:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-25T19:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-25T19:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-25T19:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-25T20:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-25T21:29:00Z"
                            },
                            {
                                "value": 25,
                                "valueTime": "2021-05-25T21:59:00Z"
                            },
                            {
                                "value": 3567,
                                "valueTime": "2021-05-25T22:29:00Z"
                            },
                            {
                                "value": 8167,
                                "valueTime": "2021-05-25T22:59:00Z"
                            },
                            {
                                "value": 14436,
                                "valueTime": "2021-05-25T23:29:00Z"
                            },
                            {
                                "value": 28315,
                                "valueTime": "2021-05-25T23:59:00Z"
                            },
                            {
                                "value": 35967,
                                "valueTime": "2021-05-26T00:29:00Z"
                            },
                            {
                                "value": 32881,
                                "valueTime": "2021-05-26T00:59:00Z"
                            },
                            {
                                "value": 17206,
                                "valueTime": "2021-05-26T01:29:00Z"
                            },
                            {
                                "value": 12856,
                                "valueTime": "2021-05-26T01:59:00Z"
                            },
                            {
                                "value": 8500,
                                "valueTime": "2021-05-26T02:29:00Z"
                            },
                            {
                                "value": 9016,
                                "valueTime": "2021-05-26T02:59:00Z"
                            },
                            {
                                "value": 8254,
                                "valueTime": "2021-05-26T03:29:00Z"
                            },
                            {
                                "value": 6725,
                                "valueTime": "2021-05-26T03:59:00Z"
                            },
                            {
                                "value": 5862,
                                "valueTime": "2021-05-26T04:29:00Z"
                            },
                            {
                                "value": 6780,
                                "valueTime": "2021-05-26T04:59:00Z"
                            },
                            {
                                "value": 6393,
                                "valueTime": "2021-05-26T05:29:00Z"
                            },
                            {
                                "value": 6697,
                                "valueTime": "2021-05-26T05:59:00Z"
                            },
                            {
                                "value": 5884,
                                "valueTime": "2021-05-26T06:29:00Z"
                            },
                            {
                                "value": 6448,
                                "valueTime": "2021-05-26T06:59:00Z"
                            },
                            {
                                "value": 6153,
                                "valueTime": "2021-05-26T07:29:00Z"
                            },
                            {
                                "value": 6789,
                                "valueTime": "2021-05-26T07:59:00Z"
                            },
                            {
                                "value": 6815,
                                "valueTime": "2021-05-26T08:29:00Z"
                            },
                            {
                                "value": 9068,
                                "valueTime": "2021-05-26T08:59:00Z"
                            },
                            {
                                "value": 14049,
                                "valueTime": "2021-05-26T09:29:00Z"
                            },
                            {
                                "value": 22873,
                                "valueTime": "2021-05-26T09:59:00Z"
                            },
                            {
                                "value": 28572,
                                "valueTime": "2021-05-26T10:29:00Z"
                            },
                            {
                                "value": 29713,
                                "valueTime": "2021-05-26T10:59:00Z"
                            },
                            {
                                "value": 21915,
                                "valueTime": "2021-05-26T11:29:00Z"
                            },
                            {
                                "value": 15968,
                                "valueTime": "2021-05-26T11:59:00Z"
                            },
                            {
                                "value": 11009,
                                "valueTime": "2021-05-26T12:29:00Z"
                            },
                            {
                                "value": 10169,
                                "valueTime": "2021-05-26T12:59:00Z"
                            },
                            {
                                "value": 8149,
                                "valueTime": "2021-05-26T13:29:00Z"
                            },
                            {
                                "value": 6218,
                                "valueTime": "2021-05-26T13:59:00Z"
                            },
                            {
                                "value": 4528,
                                "valueTime": "2021-05-26T14:29:00Z"
                            },
                            {
                                "value": 3677,
                                "valueTime": "2021-05-26T14:59:00Z"
                            },
                            {
                                "value": 2337,
                                "valueTime": "2021-05-26T15:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-26T15:29:00Z"
                            },
                            {
                                "value": 1121,
                                "valueTime": "2021-05-26T16:29:00Z"
                            },
                            {
                                "value": 541,
                                "valueTime": "2021-05-26T16:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-26T16:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-26T17:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-26T17:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-26T18:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-26T18:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-26T19:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-26T19:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-26T20:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-26T20:59:00Z"
                            },
                            {
                                "value": 28,
                                "valueTime": "2021-05-26T21:59:00Z"
                            },
                            {
                                "value": 3601,
                                "valueTime": "2021-05-26T22:29:00Z"
                            },
                            {
                                "value": 8081,
                                "valueTime": "2021-05-26T22:59:00Z"
                            },
                            {
                                "value": 14436,
                                "valueTime": "2021-05-26T23:29:00Z"
                            },
                            {
                                "value": 27903,
                                "valueTime": "2021-05-26T23:59:00Z"
                            },
                            {
                                "value": 35023,
                                "valueTime": "2021-05-27T00:29:00Z"
                            },
                            {
                                "value": 31764,
                                "valueTime": "2021-05-27T00:59:00Z"
                            },
                            {
                                "value": 16428,
                                "valueTime": "2021-05-27T01:29:00Z"
                            },
                            {
                                "value": 12590,
                                "valueTime": "2021-05-27T01:59:00Z"
                            },
                            {
                                "value": 8392,
                                "valueTime": "2021-05-27T02:29:00Z"
                            },
                            {
                                "value": 9116,
                                "valueTime": "2021-05-27T02:59:00Z"
                            },
                            {
                                "value": 7821,
                                "valueTime": "2021-05-27T03:29:00Z"
                            },
                            {
                                "value": 6524,
                                "valueTime": "2021-05-27T03:59:00Z"
                            },
                            {
                                "value": 5608,
                                "valueTime": "2021-05-27T04:29:00Z"
                            },
                            {
                                "value": 6416,
                                "valueTime": "2021-05-27T04:59:00Z"
                            },
                            {
                                "value": 6071,
                                "valueTime": "2021-05-27T05:29:00Z"
                            },
                            {
                                "value": 6260,
                                "valueTime": "2021-05-27T05:59:00Z"
                            },
                            {
                                "value": 5680,
                                "valueTime": "2021-05-27T06:29:00Z"
                            },
                            {
                                "value": 6259,
                                "valueTime": "2021-05-27T06:59:00Z"
                            },
                            {
                                "value": 5967,
                                "valueTime": "2021-05-27T07:29:00Z"
                            },
                            {
                                "value": 6503,
                                "valueTime": "2021-05-27T07:59:00Z"
                            },
                            {
                                "value": 6770,
                                "valueTime": "2021-05-27T08:29:00Z"
                            },
                            {
                                "value": 8755,
                                "valueTime": "2021-05-27T08:59:00Z"
                            },
                            {
                                "value": 13676,
                                "valueTime": "2021-05-27T09:29:00Z"
                            },
                            {
                                "value": 22313,
                                "valueTime": "2021-05-27T09:59:00Z"
                            },
                            {
                                "value": 28603,
                                "valueTime": "2021-05-27T10:29:00Z"
                            },
                            {
                                "value": 29280,
                                "valueTime": "2021-05-27T10:59:00Z"
                            },
                            {
                                "value": 21344,
                                "valueTime": "2021-05-27T11:29:00Z"
                            },
                            {
                                "value": 14973,
                                "valueTime": "2021-05-27T11:59:00Z"
                            },
                            {
                                "value": 10715,
                                "valueTime": "2021-05-27T12:29:00Z"
                            },
                            {
                                "value": 10167,
                                "valueTime": "2021-05-27T12:59:00Z"
                            },
                            {
                                "value": 7811,
                                "valueTime": "2021-05-27T13:29:00Z"
                            },
                            {
                                "value": 5956,
                                "valueTime": "2021-05-27T13:59:00Z"
                            },
                            {
                                "value": 4456,
                                "valueTime": "2021-05-27T14:29:00Z"
                            },
                            {
                                "value": 3760,
                                "valueTime": "2021-05-27T14:59:00Z"
                            },
                            {
                                "value": 2256,
                                "valueTime": "2021-05-27T15:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-27T15:29:00Z"
                            },
                            {
                                "value": 1172,
                                "valueTime": "2021-05-27T16:29:00Z"
                            },
                            {
                                "value": 582,
                                "valueTime": "2021-05-27T16:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-27T16:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-27T17:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-27T17:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-27T18:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-27T18:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-27T19:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-27T19:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-27T20:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-27T20:59:00Z"
                            },
                            {
                                "value": 20,
                                "valueTime": "2021-05-27T21:59:00Z"
                            },
                            {
                                "value": 3616,
                                "valueTime": "2021-05-27T22:29:00Z"
                            },
                            {
                                "value": 8126,
                                "valueTime": "2021-05-27T22:59:00Z"
                            },
                            {
                                "value": 14386,
                                "valueTime": "2021-05-27T23:29:00Z"
                            },
                            {
                                "value": 27446,
                                "valueTime": "2021-05-27T23:59:00Z"
                            },
                            {
                                "value": 34654,
                                "valueTime": "2021-05-28T00:29:00Z"
                            },
                            {
                                "value": 32242,
                                "valueTime": "2021-05-28T00:59:00Z"
                            },
                            {
                                "value": 16705,
                                "valueTime": "2021-05-28T01:29:00Z"
                            },
                            {
                                "value": 12787,
                                "valueTime": "2021-05-28T01:59:00Z"
                            },
                            {
                                "value": 8746,
                                "valueTime": "2021-05-28T02:29:00Z"
                            },
                            {
                                "value": 9355,
                                "valueTime": "2021-05-28T02:59:00Z"
                            },
                            {
                                "value": 8154,
                                "valueTime": "2021-05-28T03:29:00Z"
                            },
                            {
                                "value": 6972,
                                "valueTime": "2021-05-28T03:59:00Z"
                            },
                            {
                                "value": 6233,
                                "valueTime": "2021-05-28T04:29:00Z"
                            },
                            {
                                "value": 6889,
                                "valueTime": "2021-05-28T04:59:00Z"
                            },
                            {
                                "value": 2225,
                                "valueTime": "2021-05-28T05:29:00Z"
                            },
                            {
                                "value": 7019,
                                "valueTime": "2021-05-28T05:59:00Z"
                            },
                            {
                                "value": 6407,
                                "valueTime": "2021-05-28T06:29:00Z"
                            },
                            {
                                "value": 7133,
                                "valueTime": "2021-05-28T06:59:00Z"
                            },
                            {
                                "value": 6816,
                                "valueTime": "2021-05-28T07:29:00Z"
                            },
                            {
                                "value": 7433,
                                "valueTime": "2021-05-28T07:59:00Z"
                            },
                            {
                                "value": 7777,
                                "valueTime": "2021-05-28T08:29:00Z"
                            },
                            {
                                "value": 10135,
                                "valueTime": "2021-05-28T08:59:00Z"
                            },
                            {
                                "value": 14279,
                                "valueTime": "2021-05-28T09:29:00Z"
                            },
                            {
                                "value": 22433,
                                "valueTime": "2021-05-28T09:59:00Z"
                            },
                            {
                                "value": 27703,
                                "valueTime": "2021-05-28T10:29:00Z"
                            },
                            {
                                "value": 28501,
                                "valueTime": "2021-05-28T10:59:00Z"
                            },
                            {
                                "value": 21393,
                                "valueTime": "2021-05-28T11:29:00Z"
                            },
                            {
                                "value": 15815,
                                "valueTime": "2021-05-28T11:59:00Z"
                            },
                            {
                                "value": 10983,
                                "valueTime": "2021-05-28T12:29:00Z"
                            },
                            {
                                "value": 10384,
                                "valueTime": "2021-05-28T12:59:00Z"
                            },
                            {
                                "value": 8126,
                                "valueTime": "2021-05-28T13:29:00Z"
                            },
                            {
                                "value": 6384,
                                "valueTime": "2021-05-28T13:59:00Z"
                            },
                            {
                                "value": 4698,
                                "valueTime": "2021-05-28T14:29:00Z"
                            },
                            {
                                "value": 4026,
                                "valueTime": "2021-05-28T14:59:00Z"
                            },
                            {
                                "value": 2580,
                                "valueTime": "2021-05-28T15:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-28T15:29:00Z"
                            },
                            {
                                "value": 1222,
                                "valueTime": "2021-05-28T16:29:00Z"
                            },
                            {
                                "value": 615,
                                "valueTime": "2021-05-28T16:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-28T16:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-28T17:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-28T17:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-28T18:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-28T18:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-28T19:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-28T19:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-28T20:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-28T20:59:00Z"
                            },
                            {
                                "value": 12,
                                "valueTime": "2021-05-28T21:59:00Z"
                            },
                            {
                                "value": 2240,
                                "valueTime": "2021-05-28T22:29:00Z"
                            },
                            {
                                "value": 3981,
                                "valueTime": "2021-05-28T22:59:00Z"
                            },
                            {
                                "value": 4339,
                                "valueTime": "2021-05-28T23:29:00Z"
                            },
                            {
                                "value": 5982,
                                "valueTime": "2021-05-28T23:59:00Z"
                            },
                            {
                                "value": 5067,
                                "valueTime": "2021-05-29T00:29:00Z"
                            },
                            {
                                "value": 6222,
                                "valueTime": "2021-05-29T00:59:00Z"
                            },
                            {
                                "value": 5246,
                                "valueTime": "2021-05-29T01:29:00Z"
                            },
                            {
                                "value": 6355,
                                "valueTime": "2021-05-29T01:59:00Z"
                            },
                            {
                                "value": 6339,
                                "valueTime": "2021-05-29T02:29:00Z"
                            },
                            {
                                "value": 7903,
                                "valueTime": "2021-05-29T02:59:00Z"
                            },
                            {
                                "value": 7240,
                                "valueTime": "2021-05-29T03:29:00Z"
                            },
                            {
                                "value": 5892,
                                "valueTime": "2021-05-29T03:59:00Z"
                            },
                            {
                                "value": 4765,
                                "valueTime": "2021-05-29T04:29:00Z"
                            },
                            {
                                "value": 5351,
                                "valueTime": "2021-05-29T04:59:00Z"
                            },
                            {
                                "value": 4862,
                                "valueTime": "2021-05-29T05:29:00Z"
                            },
                            {
                                "value": 5256,
                                "valueTime": "2021-05-29T05:59:00Z"
                            },
                            {
                                "value": 5702,
                                "valueTime": "2021-05-29T06:29:00Z"
                            },
                            {
                                "value": 985,
                                "valueTime": "2021-05-29T06:59:00Z"
                            },
                            {
                                "value": 4868,
                                "valueTime": "2021-05-29T07:29:00Z"
                            },
                            {
                                "value": 5238,
                                "valueTime": "2021-05-29T07:59:00Z"
                            },
                            {
                                "value": 5052,
                                "valueTime": "2021-05-29T08:29:00Z"
                            },
                            {
                                "value": 5508,
                                "valueTime": "2021-05-29T08:59:00Z"
                            },
                            {
                                "value": 5867,
                                "valueTime": "2021-05-29T09:29:00Z"
                            },
                            {
                                "value": 7014,
                                "valueTime": "2021-05-29T09:59:00Z"
                            },
                            {
                                "value": 6496,
                                "valueTime": "2021-05-29T10:29:00Z"
                            },
                            {
                                "value": 6485,
                                "valueTime": "2021-05-29T10:59:00Z"
                            },
                            {
                                "value": 5303,
                                "valueTime": "2021-05-29T11:29:00Z"
                            },
                            {
                                "value": 5107,
                                "valueTime": "2021-05-29T11:59:00Z"
                            },
                            {
                                "value": 4646,
                                "valueTime": "2021-05-29T12:29:00Z"
                            },
                            {
                                "value": 6452,
                                "valueTime": "2021-05-29T12:59:00Z"
                            },
                            {
                                "value": 5356,
                                "valueTime": "2021-05-29T13:29:00Z"
                            },
                            {
                                "value": 3940,
                                "valueTime": "2021-05-29T13:59:00Z"
                            },
                            {
                                "value": 2930,
                                "valueTime": "2021-05-29T14:29:00Z"
                            },
                            {
                                "value": 2750,
                                "valueTime": "2021-05-29T14:59:00Z"
                            },
                            {
                                "value": 1855,
                                "valueTime": "2021-05-29T15:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-29T15:29:00Z"
                            },
                            {
                                "value": 997,
                                "valueTime": "2021-05-29T16:29:00Z"
                            },
                            {
                                "value": 491,
                                "valueTime": "2021-05-29T16:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-29T16:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-29T17:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-29T17:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-29T18:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-29T18:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-29T19:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-29T19:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-29T20:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-29T21:29:00Z"
                            },
                            {
                                "value": 11,
                                "valueTime": "2021-05-29T21:59:00Z"
                            },
                            {
                                "value": 1827,
                                "valueTime": "2021-05-29T22:29:00Z"
                            },
                            {
                                "value": 3095,
                                "valueTime": "2021-05-29T22:59:00Z"
                            },
                            {
                                "value": 3025,
                                "valueTime": "2021-05-29T23:29:00Z"
                            },
                            {
                                "value": 3666,
                                "valueTime": "2021-05-29T23:59:00Z"
                            },
                            {
                                "value": 2936,
                                "valueTime": "2021-05-30T00:29:00Z"
                            },
                            {
                                "value": 3623,
                                "valueTime": "2021-05-30T00:59:00Z"
                            },
                            {
                                "value": 3184,
                                "valueTime": "2021-05-30T01:29:00Z"
                            },
                            {
                                "value": 4027,
                                "valueTime": "2021-05-30T01:59:00Z"
                            },
                            {
                                "value": 4005,
                                "valueTime": "2021-05-30T02:29:00Z"
                            },
                            {
                                "value": 5529,
                                "valueTime": "2021-05-30T02:59:00Z"
                            },
                            {
                                "value": 5758,
                                "valueTime": "2021-05-30T03:29:00Z"
                            },
                            {
                                "value": 4019,
                                "valueTime": "2021-05-30T03:59:00Z"
                            },
                            {
                                "value": 3248,
                                "valueTime": "2021-05-30T04:29:00Z"
                            },
                            {
                                "value": 3477,
                                "valueTime": "2021-05-30T04:59:00Z"
                            },
                            {
                                "value": 3305,
                                "valueTime": "2021-05-30T05:29:00Z"
                            },
                            {
                                "value": 3426,
                                "valueTime": "2021-05-30T05:59:00Z"
                            },
                            {
                                "value": 3027,
                                "valueTime": "2021-05-30T06:29:00Z"
                            },
                            {
                                "value": 3273,
                                "valueTime": "2021-05-30T06:59:00Z"
                            },
                            {
                                "value": 3160,
                                "valueTime": "2021-05-30T07:29:00Z"
                            },
                            {
                                "value": 3580,
                                "valueTime": "2021-05-30T07:59:00Z"
                            },
                            {
                                "value": 3463,
                                "valueTime": "2021-05-30T08:29:00Z"
                            },
                            {
                                "value": 3968,
                                "valueTime": "2021-05-30T08:59:00Z"
                            },
                            {
                                "value": 4375,
                                "valueTime": "2021-05-30T09:29:00Z"
                            },
                            {
                                "value": 4771,
                                "valueTime": "2021-05-30T09:59:00Z"
                            },
                            {
                                "value": 4422,
                                "valueTime": "2021-05-30T10:29:00Z"
                            },
                            {
                                "value": 4607,
                                "valueTime": "2021-05-30T10:59:00Z"
                            },
                            {
                                "value": 4463,
                                "valueTime": "2021-05-30T11:29:00Z"
                            },
                            {
                                "value": 984,
                                "valueTime": "2021-05-30T11:59:00Z"
                            },
                            {
                                "value": 3960,
                                "valueTime": "2021-05-30T12:29:00Z"
                            },
                            {
                                "value": 5943,
                                "valueTime": "2021-05-30T12:59:00Z"
                            },
                            {
                                "value": 5148,
                                "valueTime": "2021-05-30T13:29:00Z"
                            },
                            {
                                "value": 3635,
                                "valueTime": "2021-05-30T13:59:00Z"
                            },
                            {
                                "value": 2765,
                                "valueTime": "2021-05-30T14:29:00Z"
                            },
                            {
                                "value": 2422,
                                "valueTime": "2021-05-30T14:59:00Z"
                            },
                            {
                                "value": 1709,
                                "valueTime": "2021-05-30T15:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-30T15:29:00Z"
                            },
                            {
                                "value": 868,
                                "valueTime": "2021-05-30T16:29:00Z"
                            },
                            {
                                "value": 431,
                                "valueTime": "2021-05-30T16:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-30T16:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-30T17:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-30T17:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-30T18:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-30T18:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-30T19:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-30T19:59:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-30T20:29:00Z"
                            },
                            {
                                "value": 0,
                                "valueTime": "2021-05-30T21:29:00Z"
                            },
                            {
                                "value": 20,
                                "valueTime": "2021-05-30T21:59:00Z"
                            },
                            {
                                "value": 3746,
                                "valueTime": "2021-05-30T22:29:00Z"
                            },
                            {
                                "value": 8460,
                                "valueTime": "2021-05-30T22:59:00Z"
                            },
                            {
                                "value": 33989,
                                "valueTime": "2021-05-30T23:29:00Z"
                            },
                            {
                                "value": 64243,
                                "valueTime": "2021-05-30T23:59:00Z"
                            },
                            {
                                "value": 81266,
                                "valueTime": "2021-05-31T00:29:00Z"
                            },
                            {
                                "value": 71994,
                                "valueTime": "2021-05-31T00:59:00Z"
                            },
                            {
                                "value": 35772,
                                "valueTime": "2021-05-31T01:29:00Z"
                            },
                            {
                                "value": 13924,
                                "valueTime": "2021-05-31T01:59:00Z"
                            },
                            {
                                "value": 9279,
                                "valueTime": "2021-05-31T02:29:00Z"
                            },
                            {
                                "value": 9717,
                                "valueTime": "2021-05-31T02:59:00Z"
                            },
                            {
                                "value": 8840,
                                "valueTime": "2021-05-31T03:29:00Z"
                            },
                            {
                                "value": 7269,
                                "valueTime": "2021-05-31T03:59:00Z"
                            },
                            {
                                "value": 6478,
                                "valueTime": "2021-05-31T04:29:00Z"
                            },
                            {
                                "value": 7536,
                                "valueTime": "2021-05-31T04:59:00Z"
                            },
                            {
                                "value": 7221,
                                "valueTime": "2021-05-31T05:29:00Z"
                            },
                            {
                                "value": 7362,
                                "valueTime": "2021-05-31T05:59:00Z"
                            },
                            {
                                "value": 6391,
                                "valueTime": "2021-05-31T06:29:00Z"
                            },
                            {
                                "value": 7033,
                                "valueTime": "2021-05-31T06:59:00Z"
                            },
                            {
                                "value": 6788,
                                "valueTime": "2021-05-31T07:29:00Z"
                            },
                            {
                                "value": 7248,
                                "valueTime": "2021-05-31T07:59:00Z"
                            },
                            {
                                "value": 7468,
                                "valueTime": "2021-05-31T08:29:00Z"
                            },
                            {
                                "value": 9796,
                                "valueTime": "2021-05-31T08:59:00Z"
                            },
                            {
                                "value": 15001,
                                "valueTime": "2021-05-31T09:29:00Z"
                            },
                            {
                                "value": 23610,
                                "valueTime": "2021-05-31T09:59:00Z"
                            },
                            {
                                "value": 28806,
                                "valueTime": "2021-05-31T10:29:00Z"
                            },
                            {
                                "value": 30830,
                                "valueTime": "2021-05-31T10:59:00Z"
                            },
                            {
                                "value": 22679,
                                "valueTime": "2021-05-31T11:29:00Z"
                            },
                            {
                                "value": 16940,
                                "valueTime": "2021-05-31T11:59:00Z"
                            },
                            {
                                "value": 11641,
                                "valueTime": "2021-05-31T12:29:00Z"
                            },
                            {
                                "value": 10833,
                                "valueTime": "2021-05-31T12:59:00Z"
                            },
                            {
                                "value": 8304,
                                "valueTime": "2021-05-31T13:29:00Z"
                            },
                            {
                                "value": 6454,
                                "valueTime": "2021-05-31T13:59:00Z"
                            },
                            {
                                "value": 4880,
                                "valueTime": "2021-05-31T14:29:00Z"
                            },
                            {
                                "value": 3965,
                                "valueTime": "2021-05-31T14:59:00Z"
                            },
                            {
                                "value": 2461,
                                "valueTime": "2021-05-31T15:29:00Z"
                            }
                        ]
                    }
                ]
            }
        ]
    },
    Construction: {
        building_renew: [
            {"updateTime":"2021-09-15T08:52:03.599529973Z","data":[{"key":"公劃地區內事業","value":[{"value":711}]},{"key":"公告自劃單元","value":[{"value":584}]},{"key":"核准自劃單元","value":[{"value":334}]},{"key":"公劃更新地區","value":[{"value":149}]},{"key":"都市計畫劃定更新地區","value":[{"value":60}]}]}
        ],
        social_house: [
            {"updateTime":"2021-09-15T07:27:25.761900269Z","data":[{"key":"施工中及待開工","value":[{"value":29}]},{"key":"已完工","value":[{"value":23}]},{"key":"規劃中","value":[{"value":11}]},{"key":"招標中及待上網","value":[{"value":2}]}]}
        ],
        building_age: [
            {"updateTime":"2021-09-15T07:26:39.363743141Z","data":[{"key":"\u003c10","value":[{"value":5282}]},{"key":"11-20","value":[{"value":14767}]},{"key":"21-30","value":[{"value":22108}]},{"key":"31-40","value":[{"value":50110}]},{"key":"41-50","value":[{"value":82404}]},{"key":"\u003e50","value":[{"value":83898}]},{"key":"average","value":[{"value":44.23180325666486}]}]},
            {"updateTime":"2021-09-15T07:26:39.405699592Z","data":[{"key":"信義區","value":[{"key":"\u003e50","value":4819},{"key":"\u003c10","value":213},{"key":"11-20","value":814},{"key":"21-30","value":1953},{"key":"31-40","value":4749},{"key":"41-50","value":7834}]},{"key":"南港區","value":[{"key":"\u003e50","value":1805},{"key":"\u003c10","value":312},{"key":"11-20","value":1051},{"key":"21-30","value":817},{"key":"31-40","value":2040},{"key":"41-50","value":4605}]},{"key":"松山區","value":[{"key":"\u003c10","value":125},{"key":"11-20","value":565},{"key":"21-30","value":1149},{"key":"31-40","value":3045},{"key":"41-50","value":6245},{"key":"\u003e50","value":4610}]},{"key":"中山區","value":[{"key":"\u003e50","value":8931},{"key":"\u003c10","value":506},{"key":"11-20","value":1490},{"key":"21-30","value":1849},{"key":"31-40","value":4194},{"key":"41-50","value":6223}]},{"key":"內湖區","value":[{"key":"\u003c10","value":811},{"key":"11-20","value":2617},{"key":"21-30","value":4016},{"key":"31-40","value":8350},{"key":"41-50","value":4560},{"key":"\u003e50","value":1500}]},{"key":"北投區","value":[{"key":"\u003c10","value":585},{"key":"11-20","value":1426},{"key":"21-30","value":2167},{"key":"31-40","value":4145},{"key":"41-50","value":9939},{"key":"\u003e50","value":5803}]},{"key":"士林區","value":[{"key":"\u003c10","value":622},{"key":"11-20","value":1804},{"key":"21-30","value":2263},{"key":"31-40","value":5542},{"key":"41-50","value":10450},{"key":"\u003e50","value":10003}]},{"key":"大同區","value":[{"key":"21-30","value":762},{"key":"31-40","value":1738},{"key":"41-50","value":3987},{"key":"\u003e50","value":8997},{"key":"\u003c10","value":357},{"key":"11-20","value":693}]},{"key":"大安區","value":[{"key":"21-30","value":1524},{"key":"31-40","value":5641},{"key":"41-50","value":8921},{"key":"\u003e50","value":11322},{"key":"\u003c10","value":404},{"key":"11-20","value":1103}]},{"key":"文山區","value":[{"key":"11-20","value":1522},{"key":"21-30","value":3495},{"key":"31-40","value":4719},{"key":"41-50","value":7922},{"key":"\u003e50","value":4788},{"key":"\u003c10","value":590}]},{"key":"萬華區","value":[{"key":"21-30","value":795},{"key":"31-40","value":2936},{"key":"41-50","value":6626},{"key":"\u003e50","value":11021},{"key":"\u003c10","value":238},{"key":"11-20","value":492}]},{"key":"中正區","value":[{"key":"\u003c10","value":282},{"key":"11-20","value":922},{"key":"21-30","value":958},{"key":"31-40","value":2216},{"key":"41-50","value":4064},{"key":"\u003e50","value":7499}]}]}
        ]
    }
}
