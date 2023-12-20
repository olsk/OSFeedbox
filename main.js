(function(global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
		typeof define === 'function' && define.amd ? define(['exports'], factory) :
			(factory((global.OLSKLatest = global.OLSKLatest || {})));
}(this, (function(exports) { 'use strict';

	const mod = {

		async load (input, debug) {
			const _window = debug || window;

			class OLSKLatestInstance {
				limit = Infinity;

			  constructor (params) {
			    Object.assign(this, params, mod);
			  }
			}

			const instance = new OLSKLatestInstance(input);
			return instance.populate(input.items || instance._items(await mod._fetch(input.feed)));
		},

		async _fetch (input, debug) {
			const _window = debug || window;

			return await (await _window.fetch(mod._corsProxy() + input)).text();
		},

		_corsProxy () {
			return 'https://cors-proxy.fringe.zone/';
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

		populate (input) {
			this.parent.innerHTML = `<div class="OLSKLatest OLSKDecorModule">
			<h2>
				<span class="OLSKLatestHeading">Latest updates</span>
				<sup><a class="OLSKLatestButton" href="${ this.feed }" title="Feed">(feed)</a></sup>
			</h2>
			<div class="OLSKLatestList">
				${ input.map( (e, i) => `
					<a class="OLSKLatestListItem" href="${ e.link }" target="_blank">${ e.title }</a>`
					 + (!e.description || this.hideBlurb ? '' : `<p class="OLSKLatestListItemBlurb">${ e.description }</p>`)
					 + (i === input.length - 1 ? '' : `<hr/>`)
				 ).join('') }
			</div></div>`;
		},

		// MESSAGE

		async DOMContentLoaded () {
			const _mod = (typeof process !== 'undefined' && process.env.npm_lifecycle_script === 'olsk-spec') ? this : mod;

			if (typeof window === 'object' && window.origin === null) {
				return;
			}

			// _mod.populate();
		},

		// LIFECYCLE

		lifeDidLoad (debug) {
			(debug || window).document.addEventListener('DOMContentLoaded', mod.DOMContentLoaded);
		},

	};

	Object.assign(exports, mod);

	if (typeof window === 'object') {
		mod.lifeDidLoad();
	}

	Object.defineProperty(exports, '__esModule', {
		value: true
	});

})));
