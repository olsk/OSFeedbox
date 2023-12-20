const kDefaultPath = 'file://' + __dirname + '/ui-test-view.html';

describe('OSFeedbox_Localize', function () {

	before(function() {
		return OSVisit(kDefaultPath, {
			items: JSON.stringify([uItem()]),
		});
	});

	it('localizes OSFeedboxHeading', function () {
		return browser.assert.text(OSFeedboxHeading, 'Latest updates');
	});

	it('localizes OSFeedboxButton', function() {
		return browser.assert.attribute(OSFeedboxButton, 'title', 'Feed');
	});

});