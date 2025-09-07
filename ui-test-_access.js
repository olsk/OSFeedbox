const kDefaultPath = 'file://' + __dirname + '/ui-test-view.html';

Object.entries({
	feedbox: '.feedbox',

	feedboxHeading: '.feedboxHeading',

	feedboxButton: '.feedboxButton',

	feedboxList: '.feedboxList',
	feedboxListItem: '.feedboxListItem',
	feedboxListItemBlurb: '.feedboxListItemBlurb',
}).map(function (e) {
	return global[e.shift()] = e.pop();
});

describe('feedbox_Access', function () {
	
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

	it('shows feedbox', function () {
		return browser.assert.elements(feedbox, 1);
	});

	it('shows feedboxHeading', function () {
		return browser.assert.elements(feedboxHeading, 1);
	});

	it('shows feedboxButton', function () {
		return browser.assert.elements(feedboxButton, 1);
	});

	it('shows feedboxList', function () {
		return browser.assert.elements(feedboxList, 1);
	});

	it('shows feedboxListItem', function () {
		return browser.assert.elements(feedboxListItem, items.length);
	});

	it('hides feedboxListItemBlurb', function () {
		return browser.assert.elements(feedboxListItemBlurb, 0);
	});

	context('hasBlurb', function () {
		
		const items = Array.from(Array(uRandomInt(10))).map(uItem);

		before(function() {
			return OSVisit(kDefaultPath, {
				items: JSON.stringify(items),
			});
		});

		it('shows feedboxListItemBlurb', function () {
			return browser.assert.elements(feedboxListItemBlurb, items.length);
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

		it('hides feedboxListItemBlurb', function () {
			return browser.assert.elements(feedboxListItemBlurb, 0);
		});
	
	});

});
