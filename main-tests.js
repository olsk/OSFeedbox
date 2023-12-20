const { throws, deepEqual } = require('assert');

const mod = require('./main.js');

describe('_fetch', function test__fetch() {

	const __fetch = function (inputData = {}) {
		return mod._fetch(inputData.url || uLink(), Object.assign({
			fetch: (function () {
				if (inputData._fetch) {
					inputData._fetch(...arguments);
				}

				return {
					response: 200,
					text: (function () {
						return inputData.text || {};
					}),
				};
			}),
		}));
	};

	it('calls window.fetch', async function () {
		const url = uLink();
		deepEqual(await uCapture(function (_fetch) {
			return __fetch({
				url,
				_fetch,
			});
		}), [mod._corsProxy() + url]);
	});

	it('returns response.text', async function () {
		const text = Math.random().toString();
		deepEqual(await __fetch({
			text,
		}), text);
	});

});

describe('DOMContentLoaded', function test_DOMContentLoaded() {

	const _DOMContentLoaded = function (inputData = {}) {
		return Object.assign(Object.assign({}, mod), {
			populate: (function () {}),
		}, inputData).DOMContentLoaded();
	};

	it.skip('calls populate', async function () {
		const item = Math.random().toString();
		deepEqual(await uCapture(function (populate) {
			_DOMContentLoaded({
				async load () {
					return item;
				},
				populate,
			});
		}), [item]);
	});

});

describe('lifeDidLoad', function test_lifeDidLoad() {

	it.skip('listens for DOMContentLoaded', function () {
		deepEqual(uCapture(function (addEventListener) {
			mod.lifeDidLoad({
				document: {
					addEventListener,
				},
			});
		}), ['DOMContentLoaded', mod.DOMContentLoaded]);
	});

});
