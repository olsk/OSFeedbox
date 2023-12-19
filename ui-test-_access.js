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

	const hasBlurb = uRandomElement(true, false);
	const items = Array.from(Array(uRandomInt(10))).map(function () {
		return uItem(!hasBlurb ? {
			description: null,
		} : {})
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

	if (hasBlurb) {

		it('shows OLSKLatestListItemBlurb', function () {
			return browser.assert.elements(OLSKLatestListItemBlurb, items.length);
		});

	}

	if (!hasBlurb) {

		it('hides OLSKLatestListItemBlurb', function () {
			return browser.assert.elements(OLSKLatestListItemBlurb, 0);
		});
		
	}

});
