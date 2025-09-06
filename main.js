(function(global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
		typeof define === 'function' && define.amd ? define(['exports'], factory) :
			(factory((global.OSFeedbox = global.OSFeedbox || {})));
}(this, (function(exports) { 'use strict';

	const mod = {

		// COMMAND

		async goLoad (input, _debug) {
			const _window = _debug || window;

			class OSFeedboxInstance {

				constructor (params) {
					Object.assign(this, {
						limit: 5,
					}, params, mod);
				}

			}

			const instance = new OSFeedboxInstance(input);

			(_window).document.addEventListener('DOMContentLoaded', function (e) {
				instance.DOMContentLoaded();
			});
		},

		goLoadROCO () {
			return Array.from(document.querySelectorAll('script[data-OSFeedbox]')).forEach(e => mod.goLoad({
				parent: e.insertAdjacentElement('afterend', document.createElement('div')) ,
				prefixCORS: 'https://cors.rosano.ca/',
			}));
		},

		async _fetch (input, _debug) {
			const _window = _debug || window;

			return await (await _window.fetch((this.prefixCORS || '') + input)).text();
		},

		_items (input) {
			const output = [];

			const parser = new DOMParser();
			const xmlDoc = parser.parseFromString(input, 'text/xml');
			const xPathResult = xmlDoc.evaluate('/rss/channel/item', xmlDoc, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
			
			let node = xPathResult.iterateNext();
			for (let i = 0; (i < this.limit) && node; i++) {
				output.push({
					title: node.getElementsByTagName('title')[0].textContent,
					link: node.getElementsByTagName('link')[0].textContent,
					description: node.getElementsByTagName('description')[0].textContent,
					pubDate: new Date(node.getElementsByTagName('pubDate')[0].textContent),
				});

				node = xPathResult.iterateNext();
			}
			
			return output;
		},

		_populate (input) {
			this.parent.innerHTML = `<div class="OSFeedbox OLSKDecorModule">
			<h2>
				<span class="OSFeedboxHeading">Latest updates</span>
				<sup><a class="OSFeedboxButton" href="${ this.feed }" title="Feed">(feed)</a></sup>
			</h2>
			<div class="OSFeedboxList">
				${ input.map( (e, i) => `
					<a class="OSFeedboxListItem" href="${ e.link }" target="_blank">${ e.title }</a>`
					 + (!e.description || this.hideBlurb ? '' : `<p class="OSFeedboxListItemBlurb">${ e.description }</p>`)
					 + (i === input.length - 1 ? '' : `<hr/>`)
				 ).join('') }
			</div></div>`;
		},

		// MESSAGE

		async DOMContentLoaded () {
			return this._populate(this.items || this._items(await this._fetch(this.feed)))
		},

	};

	if (typeof window === 'object') {
		mod.goLoadROCO();
	}

	Object.assign(exports, mod, {
		load: mod.goLoad,
	});

	Object.defineProperty(exports, '__esModule', {
		value: true
	});

})));
