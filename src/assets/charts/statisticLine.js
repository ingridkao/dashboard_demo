import { Line } from 'vue-chartjs'
import { hexAToRGB } from '../js/commom.js'
import { ChartDarkColors } from '../datas/appConfig.js'
import { ComponentOptions, LineOptions } from '../datas/chartStyle.js'

export default {
    extends: Line,
    props: {
        chartDatasets: { 
            type: Array,
            default: () => []
        },
        labelsData: { 
            type: Array,
            default: () => []
        },
        colorArray: {
            type: Array,
            default: () => ChartDarkColors
        },
        // labelShow: { 
        //     type: Boolean,
        //     default: true
        // },
        scalesShow: { 
            type: Boolean,
            default: true
        },
        dataUnit: {
            type: String,
            default: ''
        },
        diffStyle: { 
            type: Boolean,
            default: false
        },
    },
    data: () => ({
        options: {
            ...ComponentOptions,
            ...LineOptions
        },
        htmlLegend: null,
        gradientHeight: 180
    }),
    watch: {
        chartDatasets() {
            if(this.$data._chart){
                this.$data._chart.destroy()
            }
            this.renderLineChart()
        },
        deep: true
    },
    mounted() {
        this.renderLineChart()
    },
    methods: {
        renderLineChart() {
            if(this.labelsData.length > 0 && this.chartDatasets.length > 0){
                let newDatasets = []
                const canvasRef = this.$refs.canvas
                const plugin = (chart) => {
                    if(chart.height>0){
                        this.gradientHeight = chart.height
                    }
                }
                this.addPlugin({
                    id: 'my-line-plugin',
                    beforeDraw: plugin
                })
                this.chartDatasets.map((item, i) => {
                    let datasets = {
                        ...item,
                        lineTension: 0,
                        borderColor: this.colorArray[i],
                        pointRadius: 0,
                        pointHoverRadius: 3
                    }
                    if(this.diffStyle && i === 1){
                        datasets.backgroundColor = this.colorArray[i]
                        datasets.borderDash = [3,3]
                        datasets.fill = false
                        datasets.borderWidth = 2
                    }else{
                        const gradient = canvasRef.getContext('2d').createLinearGradient(0, 0, 0, this.gradientHeight)
                        const rgb = hexAToRGB(this.colorArray[i])
                        gradient.addColorStop(0, `rgba(${rgb},0.8)`)
                        gradient.addColorStop(1, `rgba(28,28,28,0.3)`)
                        datasets.backgroundColor = gradient
                        datasets.borderWidth = 1
                    }
                    newDatasets.push(datasets)
                })
                // this.options.legend.display = this.labelShow
                this.options.scales.xAxes[0]['display'] = this.scalesShow
                this.options.scales.xAxes[0]['ticks'] = {
                    autoSkip: true,
                    autoSkipPadding: 8,
                    maxRotation: 0,
                    minRotation: 0,
                    maxTicksLimit: 6
                }

                this.options.scales.yAxes[0]['display'] = this.scalesShow
                // this.options.scales.yAxes[0]['gridLines'] = {zeroLineColor: '#b3b3b3'}
                this.options.scales.yAxes[0]['ticks'] = {
                    maxTicksLimit: 3,
                    callback: (value) => {
                      return `${value} ${this.dataUnit}`
                    }
                }
                this.options.tooltips['callbacks'] = {
                    label: ((tooltipItems) => {
                        // console.log(tooltipItems)
                        return `${tooltipItems.value}${this.dataUnit}`
                    })
                }
                this.renderChart(
                    {
                        labels: this.labelsData,
                        datasets: newDatasets
                    }, this.options
                )
                this.htmlLegend = this.generateLegend()
            }
        }
    }
}