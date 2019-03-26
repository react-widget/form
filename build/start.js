const transformEs = require("transform-es");

transformEs('./src', './lib', {
    cleanDest: true,
    watch: true,
    ignore: /[\/\\]_.+\.scss$/,
});