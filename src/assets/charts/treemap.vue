<template>
    <div class="treeMapChart">
        <canvas ref="treemapDom" width="100%" height="100%"></canvas>
    </div>
</template>

<script>
import '@/assets/js/chartjsNext/chart.js@next.js'
import '@/assets/js/chartjsNext/chartjs-chart-treemap@next.js'
import { BuildingPublandColors } from '@/assets/datas/appConfig.js'

export default {
    props: {
        chartDatasets: { 
            type: Array,
            default: () => []
        },
        colorArray: {
            type: Array,
            default: () => BuildingPublandColors
        },
        valueText: {
            type: String
        }
    },
    data () {
        return {
            treemapChart: null,
            options: {
                maintainAspectRatio: false,
                legend: {
                    display: false
                },
                plugins: {
                    datalabels: false
                }
            }
        }
    },
    watch: {
        chartDatasets: {
            deep: true,
            immediate: false,
            handler: function(newObj){
                this.fetchChart()
            }
        },
        colorArray: {
            deep: true,
            immediate: false,
            handler: function(newObj){
                this.fetchChart()
            }
        },
        valueText: {
            deep: true,
            immediate: false,
            handler: function(newObj){
                this.fetchChart()
            }
        }
    },
    mounted() {
        this.fetchChart()
    },
    methods: {
        fetchChart(){
            if(this.treemapChart){
                this.treemapChart.destroy()
            }
            this.renderTreeChart()
        },
        renderTreeChart() {
            if(this.chartDatasets.length > 0){
                const newDatasets = [
                    {
                        tree: this.chartDatasets,
                        key: (this.valueText)? this.valueText: '面積',
                        groups: ["key"],
                        // fill: false,
                        color: '#FFF',
                        font: {
                            style: 'bold',
                            size: 10
                        },
                        backgroundColor: this.colorArray,
                        // borderColor: '#fff',
                        borderWidth: 0,
                        fontColor: "#ddd"
                    }
                ]
                this.treemapChart = new window.Chart2(this.$refs.treemapDom.getContext("2d"), {
                    type: "treemap",
                    data: {
                        datasets: newDatasets
                    },
                    options: this.options
                })
            }
        }
    }
}
</script>

<style lang="scss">
    .treeMapChart {
        height: 14em;
    }
</style>