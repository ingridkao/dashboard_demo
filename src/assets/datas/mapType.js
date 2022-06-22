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

export const Positions = {
    center: [121.536609, 25.044808],
    CityHall: [121.56384899783005,25.037454320016653],
    Dadaocheng: [121.51013649269608, 25.055775323336594],
    MainStation: [121.51701453118407,25.047950866969824],
    n: [121.53799903832744, 25.092301189452208],
    e:[ 121.5858901814368, 25.046019127628448],
    w:[121.48719722062226, 25.050157512489278],
    s:[121.52908519223917, 25.005905715593244]
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