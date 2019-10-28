const _ = require("lodash");

module.exports = function({ method, program, ...defaults }) {
    const opts = {
        // 自定义配置
        loaders: {
            scss: true
        }
    };

    return _.defaultsDeep(opts, defaults);
};
