
const webpack = require('webpack')

module.exports = {
    configureWebpack: {
        plugins: [
            new webpack.ProvidePlugin({
                mapboxgl: 'mapbox-gl',
            }),
        ],
    },
    devServer: {
        port: 1234,
        proxy: {
            '/geo_server': {
                target: 'http://172.25.201.102:8600/geoserver',
                changeOrigin: true,
                pathRewrite: {
                    '^/geo_server': ''
                }
            }
        }
    }
}