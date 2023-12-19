const mod = {

	uItem (inputData = {}) {
		return Object.assign({
			title: Math.random().toString(),
			link: Math.random().toString(),
			pubDate: new Date(),
			description: Math.random().toString(),
		}, inputData);
	},

};

Object.entries(mod).map(function (e) {
	return global[e.shift()] = e.pop();
});

Object.assign(exports, mod);
