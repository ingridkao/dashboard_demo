import { Doughnut } from 'vue-chartjs'

export default {
    extends: Doughnut,
    props: {
        chartData: { 
            type: Object,
            default: () => {}
        },
        chartMark: { 
            type: String,
            default: ''
        },
        titleLebel: { 
            type: String,
            default: ''
        },
        lastValueTotal: { 
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
            let chartData = this.chartData
            if(chartData && Object.keys(chartData).length > 0){
            }else{
                chartData = {
                    labels: ['無資料'],
                    datasets: [{
                        data: [1],
                        borderWidth: 0,
                        backgroundColor: ['#333']
                    }]
                }
            }
            const plugin = (chart) => {
                const ctx = chart.chart.ctx
                const width = chart.chart.width
                const height = chart.chart.height
                const middleHeight = height/2
                ctx.restore()

                let fontsoze1 = null
                let fontsoze2 = null
                let fontsoze3 = null

                let textY1 = 0
                let textX1 = 0
                const titleLebel = (this.titleLebel === '')? 'Total': this.titleLebel
                if(titleLebel.length<6){
                    fontsoze1 = width/10
                }else{
                    fontsoze1 = (width/2)/titleLebel.length
                }
                ctx.font = fontsoze1.toFixed() + "px sans-serif"
                ctx.textBaseline = "middle"
                ctx.fillStyle = "#ddd"
                textX1 = Math.round((width - ctx.measureText(titleLebel).width) / 2)
                textY1 = middleHeight - fontsoze1*1.75
                if(this.lastValueTotal !== ''){
                    textY1 = middleHeight - fontsoze1*2
                }
                ctx.fillText(titleLebel, textX1, textY1.toFixed(2))

                if(this.chartMark.length<=5){
                    fontsoze2 = width/6
                }else{
                    fontsoze2 = (width/this.chartMark.length)*1.1
                }
                ctx.font =  fontsoze2.toFixed() + "px sans-serif"
                ctx.textBaseline = "middle"
                ctx.fillStyle = "#fff"

                const textX2 = Math.round((width - ctx.measureText(this.chartMark).width) / 2)
                let height2 = middleHeight - fontsoze2/4
                if(fontsoze1){
                    height2 = middleHeight + fontsoze1*0.5
                }
                if(this.lastValueTotal !== ''){
                    height2 = middleHeight
                }
                ctx.fillText(this.chartMark, textX2, height2.toFixed(2))

                if(this.lastValueTotal !== ''){
                    if(this.lastValueTotal.length<6){
                        fontsoze3 = (width/10).toFixed()
                    }else{
                        fontsoze3 = ((width/this.lastValueTotal.length)*0.7).toFixed()
                    }
                    ctx.font =  fontsoze3 + "px sans-serif"
                    ctx.textBaseline = "middle"
                    ctx.fillStyle = "#ddd"
                    const textX3 = Math.round((width - ctx.measureText(this.lastValueTotal).width) / 2)
                    const textY13 = middleHeight + fontsoze3*2.25
                    ctx.fillText(this.lastValueTotal, textX3, textY13.toFixed(2))
                }
                ctx.save()
            }
            this.addPlugin({
                id: 'my-plugin',
                beforeDraw: plugin
            })

            this.renderChart(chartData, this.options)
        }
    }
}