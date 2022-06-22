
const webpack = require('webpack')

module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
    ? '/dashboard_demo/'
    : '/',
    configureWebpack: {
        plugins: [
            new webpack.ProvidePlugin({
                mapboxgl: 'mapbox-gl',
            }),
        ],
    },
    devServer: {
        port: 1234
    }
}