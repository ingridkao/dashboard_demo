const requestAfter = {
    symbol: '',
    property: [],
}
const mapOption = {
    title: '',
    color: '',
    paint: {},
    heatmap: {},
}

const mapSource = [
    {
        type: 'raster',
        title: 'Geoserver',
        request: {
            index: ''
        },
        config: {
            ...requestAfter,
            ...mapOption
        }
    },
    {
        type: 'geoJson',
        title: 'API',
        request: {
            index: '',
            url: '',
            interval: 15,
        },
        config: {
            ...requestAfter,
            ...mapOption
        }
    },
    {
        type: 'mapBox',
        title: 'Mapbox Layer'
    }
]

export const symbolList = [
    {
        label: '點',
        options: [
            {value:'circle',name: '圓點'},
            {value:'circleBig',name: '圓點(大)'},
            {value:'heatmap',name: '熱力圖＆圓點'}
        ]
    },{
        label: '線',
        options: [
            {value:'line',name: '實線'},
            {value:'lineThin',name: '實線(細)'},
            {value:'lineWide',name: '實線(粗)'},
            {value:'dasharray',name: '虛線'}
        ]
    },{
        label: '面',
        options: [
            {value:'fill',name: '平面'},
            {value:'fill-extrusion',name: '立體'}
        ]
    },{
        label: 'Icon',
        options: [
            {value:'cross1',name: '交叉'},
            {value:'triangle1',name: '三角形'},
            {value:'triangle2',name: '三角形(大)'},
            {value:'bus',name: '公車'},
            {value:'metro',name: '捷運'},
            {value:'bike',name: '腳踏車'}
        ]
    }
]

export default mapSource