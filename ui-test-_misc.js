const kDefaultPath = 'file://' + __dirname + '/ui-test-view.html';

describe('OSFeedbox_Misc', function () {

	const feed = Math.random().toString();
	const item = uItem();

	before(function() {
		return OSVisit(kDefaultPath, {
			feed,
			items: JSON.stringify([item]),
		});
	});

	describe('OSFeedbox', function test_OSFeedbox () {

		it('classes OLSKDecorModule', function () {
			return browser.assert.hasClass(OSFeedbox, 'OLSKDecorModule');
		});
		
	});

	describe('OSFeedboxButton', function test_OSFeedboxButton () {

		it('sets href', function () {
			return browser.assert.attribute(OSFeedboxButton, 'href', feed);
		});

	});

	describe('OSFeedboxListItem', function test_OSFeedboxListItem () {

		it('sets text', function () {
			return browser.assert.text(OSFeedboxListItem, item.title);
		});

		it('sets href', function () {
			return browser.assert.attribute(OSFeedboxListItem, 'href', item.link);
		});
		
	});

});
