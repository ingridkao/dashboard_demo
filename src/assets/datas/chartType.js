const chartTypes = {
    Keyword: null,
    StackedBar: {
        select_array: [],
        sort_order: true
    },
    VerticalBar:{
        select_array: [],
        label_name: '',
        averageTitle: ''
    },
    Gauge:{
        display: [],
        label_name: []
    },
    CountChart: {
        display: '',
        show_top: false 
    },
    CountPie:{
        select_array:[],
        total_title: '',
        center_title: '',
        center_formula: ['except'],
        unit:"",
        show_top: false
    },
    ComplexMsg: {},
    Proportion:{
        select_array: [],
        select_name: [],
        select_title: [],
        bar_name: []
    },
    AlarmBar:{
        total_title: '',
    },
    TreeMap:{
        label_name: '',
        unit: '',
        select_array: [],
        figures_array: []
    },
    MapDisplay: {
        map_array:[
            {
                select_index: '',
                symbol: ['line', 'cross1', 'triangle1', 'triangle2', 'dasharray', 'circle', 'circleBig', 'circle_stroke', 'Area'],
                unit: ''
            }
        ],
        calculation_target:'',
        calculation_unit:'',
        statistic: false
    },
    StatisticLine:{
        line_array: [
            {
                select_index: "",
                select_name: "",
                x_axes: "",
                y_axes: "",
                unit: "",
                interval: ["day"]
            }
        ],
        figures_main: [
            {
                "select_index": "",
                "select_name": ""
            }
        ],
        figures_sub: [
            {
                "select_index": "",
                "select_name": "",
                "formula": "",
                "unit": ""
            }
        ]
    },
    KeyFigures:{
        figures_main: [
            {
                "select_index": "",
                "select_name": "",
                "formula":"",
                "unit": ""
            }
        ],
        figures_sub: [
            {
                "select_index": "",
                "select_name": "",
                "formula": "",
                "unit": ""
            }
        ],
        line_array: [
            {
                select_index: "",
                select_name: "",
                x_axes: "",
                y_axes: ""
            }
        ],
        pie_array: [
            {
                select_index: "",
                select_name: "",
                x_axes: "",
                y_axes: "",
                unit: "",
                center_title: "",
                center_formula: ""
            }
        ]
    }
}
export const predefineColors = [
    '#ff4500',
    '#ff8c00',
    '#ffd700',
    '#90ee90',
    '#00ced1',
    '#1e90ff',
    '#c71585'
]

export const displayList = [
    {value:'MapDisplay',name: '僅地圖圖示資訊'},
    {value:'Chart',name: '其他數據圖表'}
]

export const chartList = [
    {
        label: '單一圖表',
        options: [
            {value:'Keyword',name: '關鍵字'},
            {value:'AlarmBar',name: '警示條形圖'},
            {value:'StackedBar',name: '條形圖'},
            {value:'VerticalBar',name: '柱狀圖'},
            {value:'StatisticLine',name: '折線圖', disabled: true},
            {value:'CountPie',name: '環狀圖'},
            {value:'Gauge',name: '儀表'},
            {value:'TreeMap',name: '矩形樹狀圖'}
        ]
    },{
        label: '多種圖表/客製',
        options: [
            {value:'CountChart',name: '條形圖與環形圖'},
            {value:'KeyFigures',name: '折線圖', disabled: true},
            {value:'ComplexMsg',name: '告示列表', disabled: true}
        ]
    },{
        label: '地理資訊',
        options: [
            {value:'Proportion',name: '座標色彩示意'},
            {value:'MapDisplay',name: '圖示示意', disabled: true}
        ]
    }
]

export default chartTypes