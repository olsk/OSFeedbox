const kDefaultPath = 'file://' + __dirname + '/ui-test-view.html';

Object.entries({
	OLSKLatest: '.OLSKLatest',

	OLSKLatestHeading: '.OLSKLatestHeading',

	OLSKLatestButton: '.OLSKLatestButton',

	OLSKLatestList: '.OLSKLatestList',
	OLSKLatestListItem: '.OLSKLatestListItem',
	OLSKLatestListItemBlurb: '.OLSKLatestListItemBlurb',
}).map(function (e) {
	return global[e.shift()] = e.pop();
});

describe('OLSKLatest_Access', function () {
	
	const items = Array.from(Array(uRandomInt(10))).map(function () {
		return uItem({
			description: null,
		});
	});

	before(function() {
		return OSVisit(kDefaultPath, {
			items: JSON.stringify(items),
		});
	});

	it('shows OLSKLatest', function () {
		return browser.assert.elements(OLSKLatest, 1);
	});

	it('shows OLSKLatestHeading', function () {
		return browser.assert.elements(OLSKLatestHeading, 1);
	});

	it('shows OLSKLatestButton', function () {
		return browser.assert.elements(OLSKLatestButton, 1);
	});

	it('shows OLSKLatestList', function () {
		return browser.assert.elements(OLSKLatestList, 1);
	});

	it('shows OLSKLatestListItem', function () {
		return browser.assert.elements(OLSKLatestListItem, items.length);
	});

	it('hides OLSKLatestListItemBlurb', function () {
		return browser.assert.elements(OLSKLatestListItemBlurb, 0);
	});

	context('hasBlurb', function () {
		
		const items = Array.from(Array(uRandomInt(10))).map(uItem);

		before(function() {
			return OSVisit(kDefaultPath, {
				items: JSON.stringify(items),
			});
		});

		it('shows OLSKLatestListItemBlurb', function () {
			return browser.assert.elements(OLSKLatestListItemBlurb, items.length);
		});
	
	});

	context('hideBlurb', function () {
		
		const items = Array.from(Array(uRandomInt(10))).map(uItem);

		before(function() {
			return OSVisit(kDefaultPath, {
				items: JSON.stringify(items),
				hideBlurb: true,
			});
		});

		it('hides OLSKLatestListItemBlurb', function () {
			return browser.assert.elements(OLSKLatestListItemBlurb, 0);
		});
	
	});

});
