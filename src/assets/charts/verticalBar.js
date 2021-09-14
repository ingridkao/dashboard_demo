import { Bar } from 'vue-chartjs'
import { hexAToRGB } from '../js/commom.js'

export default {
    extends: Bar,
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
            default: () => ['#777','#999']
        },
        labelShow: { 
            type: Boolean,
            default: true
        }
    },
    data: () => ({
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                yAxes: [{
                    ticks: {
                        maxTicksLimit: 3,
                    },
                    gridLines: {
                        zeroLineColor: '#b3b3b3',
                    }
                    
                }],
                xAxes: [{
                    gridLines: {
                        display: false,
                        drawBorder: false,
                        // color: '#b3b3b3',
                    }
                }],
            },
            legend: {
                // position: 'left',
                align: 'end',
                labels:{
                    boxWidth: 10,
                    fontColor: '#b3b3b3',
                }
            },
            tooltips: {
                position: 'average',
                mode: 'index',
                intersect: false
                // callbacks: {
                //     footer: function(tooltipItems, data) {},
                // },
                // footerFontStyle: 'normal'
            },
        }
    }),
    watch: {
        chartDatasets() {
            if(this.$data._chart){
                this.$data._chart.destroy()
            }
            this.renderBarChart()
        },
        deep: true
    },
    mounted() {
        this.renderBarChart()
    },
    methods: {
        renderBarChart() {
            if(this.labelsData.length > 0 && this.chartDatasets.length > 0){
                let newDatasets = []
                this.chartDatasets.map((item, i) => {
                    // const gradient = this.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 200)
                    // const rgb = hexAToRGB(this.colorArray[i])
                    // gradient.addColorStop(0, `rgba(${rgb},0.7)`)
                    // gradient.addColorStop(1, `rgba(${rgb},0.1)`)
                    newDatasets.push({
                        ...item,
                        // fill: false,
                        barThickness: 6,
                        backgroundColor: this.colorArray,
                        borderColor: this.colorArray,
                    })
                })
                this.options.legend.display = this.labelShow
                this.renderChart(
                    {
                        labels: this.labelsData,
                        datasets: newDatasets
                    }, this.options
                )
            }
        }
    }
}