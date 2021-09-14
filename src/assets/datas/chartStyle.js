export const ComponentOptions = {
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
    tooltips: {
        position: 'nearest',
        mode: 'index',
        intersect: false
        // callbacks: {
        //     footer: function(tooltipItems, data) {},
        // },
        // footerFontStyle: 'normal'
    }
}

export const LineOptions = {
    scales: {
        yAxes: [{
            ticks: {
                maxTicksLimit: 3
            }
            // gridLines: {
                // zeroLineColor: '#b3b3b3',
            // }
        }],
        xAxes: [{
            gridLines: {
                display: false,
                drawBorder: false
            }
        }],
    },
    legend: {
        // position: 'left',
        align: 'end',
        labels:{
            // boxWidth: 10,
            fontColor: '#b3b3b3',
            usePointStyle : true,
            generateLabels: (chart) => {
                const items = Chart.defaults.global.legend.labels.generateLabels(chart)
                return items.map( (item, i)=> ({
                    ...item,
                    lineWidth: 1,
                    pointStyle: (i === 0)? 'line': 'dash'
                }))
            }
        }
    }
}