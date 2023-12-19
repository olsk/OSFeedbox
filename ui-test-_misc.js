const kDefaultPath = 'file://' + __dirname + '/ui-test-view.html';

describe('OLSKLatest_Misc', function () {

	const feed = Math.random().toString();
	const item = uItem();

	before(function() {
		return OSVisit(kDefaultPath, {
			feed,
			items: JSON.stringify([item]),
		});
	});

	describe('OLSKLatestButton', function test_OLSKLatestButton () {

		it('sets href', function () {
			return browser.assert.attribute(OLSKLatestButton, 'href', feed);
		});

	});

	describe('OLSKLatestListItem', function test_OLSKLatestListItem () {

		it('sets text', function () {
			return browser.assert.text(OLSKLatestListItem, item.title);
		});

		it('sets href', function () {
			return browser.assert.attribute(OLSKLatestListItem, 'href', item.link);
		});
		
	});

});