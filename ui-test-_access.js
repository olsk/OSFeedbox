const kDefaultPath = 'file://' + __dirname + '/ui-test-view.html';

Object.entries({
	OSFeedbox: '.OSFeedbox',

	OSFeedboxHeading: '.OSFeedboxHeading',

	OSFeedboxButton: '.OSFeedboxButton',

	OSFeedboxList: '.OSFeedboxList',
	OSFeedboxListItem: '.OSFeedboxListItem',
	OSFeedboxListItemBlurb: '.OSFeedboxListItemBlurb',
}).map(function (e) {
	return global[e.shift()] = e.pop();
});

describe('OSFeedbox_Access', function () {
	
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

	it('shows OSFeedbox', function () {
		return browser.assert.elements(OSFeedbox, 1);
	});

	it('shows OSFeedboxHeading', function () {
		return browser.assert.elements(OSFeedboxHeading, 1);
	});

	it('shows OSFeedboxButton', function () {
		return browser.assert.elements(OSFeedboxButton, 1);
	});

	it('shows OSFeedboxList', function () {
		return browser.assert.elements(OSFeedboxList, 1);
	});

	it('shows OSFeedboxListItem', function () {
		return browser.assert.elements(OSFeedboxListItem, items.length);
	});

	it('hides OSFeedboxListItemBlurb', function () {
		return browser.assert.elements(OSFeedboxListItemBlurb, 0);
	});

	context('hasBlurb', function () {
		
		const items = Array.from(Array(uRandomInt(10))).map(uItem);

		before(function() {
			return OSVisit(kDefaultPath, {
				items: JSON.stringify(items),
			});
		});

		it('shows OSFeedboxListItemBlurb', function () {
			return browser.assert.elements(OSFeedboxListItemBlurb, items.length);
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

		it('hides OSFeedboxListItemBlurb', function () {
			return browser.assert.elements(OSFeedboxListItemBlurb, 0);
		});
	
	});

});
