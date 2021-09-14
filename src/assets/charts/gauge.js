import { Doughnut } from 'vue-chartjs'

export default {
    extends: Doughnut,
    props: {
        chartData: { 
            type: Object,
            default: () => {}
        },
        chartUse: { 
            type: Number,
            default: 0
        },
        chartTotal: { 
            type: Number,
            default: 0
        },
        titleLebel: { 
            type: String,
            default: ''
        }
    },
    data: () => ({
        options: {
            legend: {
                display: false
            },
            responsive: true,
            maintainAspectRatio: false,
            animation: {
                animateScale: true,
                animateRotate: true
            },
            cutoutPercentage: 90
        }
    }),
    watch: {
        chartData() {
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
            if(this.chartData && Object.keys(this.chartData).length > 0){
                const plugin = (chart) => {
                    const ctx = chart.chart.ctx
                    const width = chart.chart.width
                    const height = chart.chart.height
                    const middleHeight = height/2
                    ctx.restore()

                    const titleLebel = this.titleLebel
                    const chartUse = this.chartUse

                    let fontsize1 = 0
                    if(titleLebel.length<6){
                        fontsize1 = width/10
                    }else{
                        fontsize1 = (width/2)/titleLebel.length
                    }
                    ctx.font = fontsize1.toFixed() + "px sans-serif"
                    ctx.fillStyle = "#ddd"

                    const textX1 = Math.round((width - ctx.measureText(titleLebel).width) / 2)
                    const textY1 = middleHeight - fontsize1*1.5
                    ctx.fillText(titleLebel, textX1.toFixed(2), textY1.toFixed(2))

                    const fontsoze2 = (width/6)
                    const fontsoze3 = (fontsoze2*0.75)
                    const textWidth = Math.round(width/2)
                    const textHeight = (titleLebel === '')? middleHeight*0.8: (middleHeight + fontsize1*1.5)
                    ctx.font = fontsoze2.toFixed() + "px sans-serif"
                    ctx.fillStyle = "#fff"
                    ctx.fillText(chartUse, Math.round(textWidth - ctx.measureText(chartUse).width), textHeight.toFixed(2))

                    ctx.font = fontsoze3.toFixed() + "px sans-serif"
                    ctx.fillStyle = "#ddd"
                    ctx.fillText(` / ${this.chartTotal}`, textWidth, textHeight.toFixed(2))

                    ctx.save()
                }
                this.addPlugin({
                    id: 'my-plugin',
                    beforeDraw: plugin
                })
                this.renderChart(this.chartData, this.options)
            }
        }
    }
}