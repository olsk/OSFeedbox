# OSFeedbox

RSS Feed preview used on homepages for [Zero Data App](https://0data.app), [Hyperdraft](https://hyperdraft.rosano.ca) and others.

## Setup

```html
<!-- 1. include dependencies -->
<script src="https://olsk.rosano.ca/OSFeedbox/master/main.js"></script>

<!-- 2. label a parent/container element -->
<div class="alfa-bravo-charlie"></div>

<!-- 3. call `load` -->
<script type="text/javascript">
OSFeedbox.load({
	parent: document.querySelector('.alfa-bravo-charlie'),
	feed: 'https://rosano.ca/feed',
	limit: 10, // default: 5
});
</script>

<!-- optional: include extra styles -->
<script src="https://olsk.rosano.ca/OLSKDecor/master/ui-style.css"></script>
```

### Options

| name | description |
| --- | --- |
| `limit` | maximum item count. default: `5` |
| `hideBlurb` | ignores and hides `description` even if set. default: `false` |

## Questions

Feel free to reach out on [Mastodon](https://rosano.ca/mastodon) or [Twitter](https://rosano.ca/twitter).
