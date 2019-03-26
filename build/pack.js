const packez = require('packez');

packez.start('./examples/index.js', 'docs', {
    clear: true,
    watch: true,
    publicPath: './',
    modules: {
        "babel": true,
        "css": true,
        "less": false,
        "sass": true,
        "eslint": false,
        "json5": false,
        "jsx": true,
        "vue": false,
    },
    assest: {
        css: {
            name: "[name].[contenthash:8].css",
            output: "",
        },
        js: {
            name: "[name].[chunkhash:8].js",
            chunkName: "[name].[chunkhash:8].chunk.js",
            output: ""
        },
        media: {
            name: "[name].[hash:8].[ext]",
            regexp: /\.(?:png|jpe?g|gif|bmp)$/,
            output: '',
            limit: 8192,
        }
    },
});