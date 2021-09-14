import { HorizontalBar } from 'vue-chartjs'
import { hexAToRGB } from '../js/commom.js'
import { GradientColors } from '@/assets/datas/appConfig.js'

export default {
    extends: HorizontalBar,
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
            default: () => GradientColors
        },
        sort: {
            type: Boolean,
            default: false
        },
        // labelShow: { 
        //     type: Boolean,
        //     default: true
        // }
    },
    data: () => ({
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                yAxes: [{
                    stacked: true,
                    gridLines: {
                        zeroLineColor: '#b3b3b3',
                    }
                }],
                xAxes: [{
                    stacked: true,
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
                const newDatasets = []
                this.chartDatasets.map((item, i) => {
                    newDatasets.push({
                        ...item,
                        // fill: false,
                        lineTension: 0,
                        // backgroundColor: this.colorArray[i],
                        barThickness: 6,
                        backgroundColor: this.colorArray[i],
                        borderColor: this.colorArray[i],
                    })
                })
                // this.options.legend.display = this.labelShow
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