export const topicList = [
    {
        index: 'Sentiment',
        name: '市民熱議',
        desc: '',
        thumbnail: 'opinion.jpeg'
    },
    {
        index: 'Patrol',
        name: '防災應變',
        desc: '',
        thumbnail: 'disaster.jpeg'
    },
    {
        index: 'Traffic',
        name: '城市交通',
        desc: '',
        thumbnail: 'mobility.jpeg'
    },
    {
        index: 'Construction',
        name: '發展建設',
        desc: '',
        thumbnail: 'development.jpeg'
    }
]

export const topicComponentList = [
    {
        index: "Sentiment",
        groups: ['民眾陳情'],
        components: [
            {
                index: 'circular',
                name: '單一陳情系統案件',
                group_index: 0,
                source_from: 'HelloTaipei',
                sample_data: '',
                calculation_config:{
                    table: "sentiment_hello_taipei_109",
                    time_field: "受理日期utc"
                },
                request_list: [
                    {
                        type: 'AlarmBar',
                        name: '累計件數',
                        color: ['#27d5d7'],
                        config:{
                            total: {
                                title: '累積件數(本週)',
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
                calculation_config:{
                    table: "sentiment_dispatching",
                    time_field: "成案時間utc"
                },
                request_list: [
                    {
                        type: 'CountChart',
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
                            property: ["案件編號", "案件類型", "案件狀態", "成案時間", "結案時間", "案件內容"],
                            paint: {
                                "circle-color":[
                                    "match",
                                    ["get", "案件類型"],
                                    "大型廢棄物清運聯繫","#fc9f0b","場所與設施噪音舉發","#dac117","污染舉發","#FDD79B","路燈故障或設施損壞","#FDD79B","#555"
                                ]
                            }
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
                            property: ['名稱', '道路門牌', '水災', '震災', '土石流', '海嘯', '是否設置無障礙設施', '室內', '室外', '服務里別','容納人數']
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
                                    ['get', 'description'],
                                    '壅塞',
                                    '#EC4037',
                                    '車多',
                                    '#ff8c1a',
                                    '順暢',
                                    '#4dd97a',
                                    '#ccc'
                                ]
                            },
                            property: ['description'],
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
                            property: ['app_name','cb_da','ce_da', 'co_ti', 'tc_na', 'npurp']
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
                calculation_config:{
                    table: "traffic_accident",
                    time_field: "發生時間"
                },
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
                            property: ['type','location','occur_time', 'epoch_time'],
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
                            }
                        }
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
                        type: 'KeyFigures',
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
                            index: 'traffic_metro_station',
                            title: '捷運站點',
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
            {"updateTime":"2021-09-16T04:09:52.658454096Z","data":[{"key":"壅塞路段","value":[{"value":4.926666666666667,"valueTime":"2021-09-15T12:11:00+08:00"},{"value":3.8116666666666665,"valueTime":"2021-09-15T12:41:00+08:00"},{"value":3.7583333333333333,"valueTime":"2021-09-15T13:11:00+08:00"},{"value":4.858333333333333,"valueTime":"2021-09-15T13:41:00+08:00"},{"value":6.423333333333333,"valueTime":"2021-09-15T14:11:00+08:00"},{"value":7.365,"valueTime":"2021-09-15T14:41:00+08:00"},{"value":6.725,"valueTime":"2021-09-15T15:11:00+08:00"},{"value":7.295,"valueTime":"2021-09-15T15:41:00+08:00"},{"value":7.878333333333333,"valueTime":"2021-09-15T16:11:00+08:00"},{"value":9.743333333333334,"valueTime":"2021-09-15T16:41:00+08:00"},{"value":12.578333333333333,"valueTime":"2021-09-15T17:11:00+08:00"},{"value":16.99,"valueTime":"2021-09-15T17:41:00+08:00"},{"value":19.563333333333333,"valueTime":"2021-09-15T18:11:00+08:00"},{"value":16.178333333333335,"valueTime":"2021-09-15T18:41:00+08:00"},{"value":11.286666666666667,"valueTime":"2021-09-15T19:11:00+08:00"},{"value":6.176666666666667,"valueTime":"2021-09-15T19:41:00+08:00"},{"value":3.5733333333333333,"valueTime":"2021-09-15T20:11:00+08:00"},{"value":2.12,"valueTime":"2021-09-15T20:41:00+08:00"},{"value":1.5,"valueTime":"2021-09-15T21:11:00+08:00"},{"value":1.3816666666666666,"valueTime":"2021-09-15T21:41:00+08:00"},{"value":1.065,"valueTime":"2021-09-15T22:11:00+08:00"},{"value":0.8833333333333333,"valueTime":"2021-09-15T22:41:00+08:00"},{"value":0.565,"valueTime":"2021-09-15T23:11:00+08:00"},{"value":0.6566666666666666,"valueTime":"2021-09-15T23:41:00+08:00"},{"value":0.3616666666666667,"valueTime":"2021-09-16T00:11:00+08:00"},{"value":0.25166666666666665,"valueTime":"2021-09-16T00:41:00+08:00"},{"value":0.205,"valueTime":"2021-09-16T01:11:00+08:00"},{"value":0.13833333333333334,"valueTime":"2021-09-16T01:41:00+08:00"},{"value":0.13666666666666666,"valueTime":"2021-09-16T02:11:00+08:00"},{"value":0.115,"valueTime":"2021-09-16T02:41:00+08:00"},{"value":0.09166666666666666,"valueTime":"2021-09-16T03:11:00+08:00"},{"value":0.023333333333333334,"valueTime":"2021-09-16T03:41:00+08:00"},{"value":0.04666666666666667,"valueTime":"2021-09-16T04:11:00+08:00"},{"value":0.13833333333333334,"valueTime":"2021-09-16T04:41:00+08:00"},{"value":0.27166666666666667,"valueTime":"2021-09-16T05:11:00+08:00"},{"value":0.22666666666666666,"valueTime":"2021-09-16T05:41:00+08:00"},{"value":0.49833333333333335,"valueTime":"2021-09-16T06:11:00+08:00"},{"value":1.0966666666666667,"valueTime":"2021-09-16T06:41:00+08:00"},{"value":5.69,"valueTime":"2021-09-16T07:11:00+08:00"},{"value":11.131666666666666,"valueTime":"2021-09-16T07:41:00+08:00"},{"value":11.963333333333333,"valueTime":"2021-09-16T08:11:00+08:00"},{"value":9.548333333333334,"valueTime":"2021-09-16T08:41:00+08:00"},{"value":6.3133333333333335,"valueTime":"2021-09-16T09:11:00+08:00"},{"value":5.546666666666667,"valueTime":"2021-09-16T09:41:00+08:00"},{"value":4.095,"valueTime":"2021-09-16T10:11:00+08:00"},{"value":4.036666666666667,"valueTime":"2021-09-16T10:41:00+08:00"},{"value":5.461666666666667,"valueTime":"2021-09-16T11:11:00+08:00"},{"value":6.673333333333333,"valueTime":"2021-09-16T11:41:00+08:00"},{"value":0,"valueTime":"2021-09-16T12:11:00+08:00"}]}]},
            {
                "updateTime": "2021-09-16T12:10:03+08:00",
                "data": [
                    {
                        "key": "嚴重壅塞",
                        "value": [
                            {
                                "value": 7.33,
                                "lastValue": 7.32
                            }
                        ]
                    },
                    {
                        "key": "輕微壅塞",
                        "value": [
                            {
                                "value": 39.83,
                                "lastValue": 40.75
                            }
                        ]
                    },
                    {
                        "key": "道路順暢",
                        "value": [
                            {
                                "value": 52.29,
                                "lastValue": 51.38
                            }
                        ]
                    }
                ]
            }
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
                                "value": 1628,
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
                                "value": 1709,
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
