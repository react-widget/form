const _ = require("lodash");

module.exports = function({ method, program, ...defaults }) {
	const opts = {
		tsCheck: false,
	};

	return _.defaultsDeep(opts, defaults);
};
