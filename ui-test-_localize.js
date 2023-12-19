const kDefaultPath = 'file://' + __dirname + '/ui-test-view.html';

describe('OLSKLatest_Localize', function () {

	before(function() {
		return OSVisit(kDefaultPath, {
			items: JSON.stringify([uItem()]),
		});
	});

	it('localizes OLSKLatestHeading', function () {
		return browser.assert.text(OLSKLatestHeading, 'Latest updates');
	});

	it('localizes OLSKLatestButton', function() {
		return browser.assert.attribute(OLSKLatestButton, 'title', 'Feed');
	});

});