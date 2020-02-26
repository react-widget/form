const _ = require("lodash");

module.exports = function({ method, program, ...defaults }) {
    const opts = {
        tsCheck: true,
    };

    return _.defaultsDeep(opts, defaults);
};
