import { cloneDeep } from 'lodash'
import { Line } from 'vue-chartjs'
import { hexAToRGB } from '../js/commom.js'
import { LineOptions } from '../datas/chartStyle.js'

Chart.Tooltip.positioners.bottom = function(elements, eventPosition) {
    const pos = Chart.Tooltip.positioners.average(elements)
    if (pos === false) {
        return false;
    }
    const chart = this._chart;
    return {
        x: pos.x,
        y: chart.chartArea.bottom,
    }
}

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
            default:() => []
        },
        darkMode: { 
            type: String,
            default: 'dark'
        }
    },
    data: () => ({
        options: {
            ...LineOptions,
            responsive: true,
            maintainAspectRatio: false,
            layout: {
                padding: {
                    left: 10,
                    right: 10,
                    top: 0,
                    bottom: 10
                }
            },
            // hover: {
            //     mode: 'index',
            //     intersect: false
            // }
        },
        clickEvent: null
    }),
    watch: {
        chartDatasets() {
            if(this.$data._chart){
                this.$data._chart.destroy()
            }
            this.renderLineChart()
        },
        darkMode() {
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
                this.chartDatasets.map((item, i) => {
                    const gradient = this.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 120)
                    const rgb = hexAToRGB(this.colorArray[i])
                    gradient.addColorStop(0, `rgba(${rgb},0.8)`)
                    gradient.addColorStop(1, (this.darkMode === 'dark')? "rgba(28,28,28,0.3)": 'rgba(252,252,252,0.3)')
                    newDatasets.push({
                        ...item,
                        lineTension: 0,
                        borderWidth: 1,
                        backgroundColor: gradient,
                        borderColor: this.colorArray[i],
                        pointRadius: 1,
                        pointHoverRadius: 3
                    })
                })

                this.options.scales.xAxes[0]['ticks'] = {
                    autoSkip: true,
                    autoSkipPadding: 8,
                    maxRotation: 0,
                    minRotation: 0,
                    // maxTicksLimit: 6
                }
                this.options.tooltips = {
                    // position: 'nearest',
                    position: 'bottom',
                    mode: 'index',
                    intersect: false,
                    callbacks: {
                        footer: (tooltipItems) => {
                            this.clickEvent = cloneDeep(tooltipItems)
                        }
                    }
                }
                this.options.animation = {
                    duration: 1000,
                    onComplete: (context) => {
                        this.$emit('on-complete')
                    }
                }
                this.options.onClick = () => {
                    this.$emit('on-receive', this.clickEvent[0])
                }

                this.renderChart(
                    {
                        labels: this.labelsData,
                        datasets: newDatasets
                    }, 
                    this.options
                )
            }
        }
    }
}