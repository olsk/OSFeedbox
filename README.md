# OLSKLatest

RSS Feed preview used on homepages for [Zero Data App](https://0data.app), [Hyperdraft](https://hyperdraft.rosano.ca) and others.

## Setup

```html
<!-- 1. include dependencies -->
<script src="https://olsk.rosano.ca/OLSKLatest/master/main.js"></script>

<!-- 2. label a parent/container element -->
<div class="alfa-bravo-charlie"></div>

<!-- 3. call `load` -->
<script type="text/javascript">
OLSKLatest.load({
	parent: document.querySelector('.alfa-bravo-charlie'),
	feed: 'https://rosano.ca/feed',
	limit: 10, // default: Infinity
});
</script>
```

## Questions

Feel free to reach out on [Mastodon](https://mastodon.online/@rosano) or [Twitter](https://twitter.com/rosano).
