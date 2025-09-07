const kDefaultPath = 'file://' + __dirname + '/ui-test-view.html';

describe('feedbox_Localize', function () {

	before(function() {
		return OSVisit(kDefaultPath, {
			items: JSON.stringify([uItem()]),
		});
	});

	it('localizes feedboxHeading', function () {
		return browser.assert.text(feedboxHeading, 'Latest updates');
	});

	it('localizes feedboxButton', function() {
		return browser.assert.attribute(feedboxButton, 'title', 'Feed');
	});

});