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
    {value:'MapDisplay',name: '?????????????????????'},
    {value:'Chart',name: '??????????????????'}
]

export const chartList = [
    {
        label: '????????????',
        options: [
            {value:'Keyword',name: '?????????'},
            {value:'AlarmBar',name: '???????????????'},
            {value:'StackedBar',name: '?????????'},
            {value:'VerticalBar',name: '?????????'},
            {value:'StatisticLine',name: '?????????', disabled: true},
            {value:'CountPie',name: '?????????'},
            {value:'Gauge',name: '??????'},
            {value:'TreeMap',name: '???????????????'}
        ]
    },{
        label: '????????????/??????',
        options: [
            {value:'CountChart',name: '?????????????????????'},
            {value:'KeyFigures',name: '?????????', disabled: true},
            {value:'ComplexMsg',name: '????????????', disabled: true}
        ]
    },{
        label: '????????????',
        options: [
            {value:'Proportion',name: '??????????????????'},
            {value:'MapDisplay',name: '????????????', disabled: true}
        ]
    }
]

export default chartTypes