
// vue.config.js
const webpack = require('webpack')
module.exports = {
	"transpileDependencies": [
    "vuetify"
  ],
    configureWebpack: {
        plugins: [
            new webpack.ProvidePlugin({
                $: 'jquery',
                jQuery: 'jquery',
                'windows.jQuery': 'jquery'
            })
        ]
    }
}