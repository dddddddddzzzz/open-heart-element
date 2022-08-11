# &lt;open-heart&gt;

A button to POST an emoji to an endpoint.

See it in action at [at the bottom of this page](https://muan.co/posts/presence#like-prompt) shown as plain text prompt "Like this post?".

🚧 Highly experimental. Tag a version to avoid unexpected changes.

It's fairly straightforward to set up an endpoint, here are some examples:

- [Using Cloudflare Workers & Cloudflare KV](https://developers.cloudflare.com/workers/platform/pricing/) with [less than 30 lines of code](https://gist.github.com/muan/388430d0ed03c55662e72bb98ff28f03).
- [A Node server w/ a flat file database (hosted on Glitch).](https://glitch.com/edit/#!/open-heart-server-demo)

## Usage

```html
<!-- Include `OpenHeartElement` -->
<script src="https://unpkg.com/open-heart-element" type="module" defer></script>

<!-- Render `<open-heart>` -->
<open-heart href="https://httpbin.org/post?id=x" emoji="❤️">♥</open-heart>
```

This sends a POST to the `href` with `emoji=❤️` and sets a key in `localStorage` to remember that a heart has been sent for this `href`.

### Styling

This element does not come with any styling. Feel free to take whatever that's on the demo page.

If you wrote some cool CSS for this, feel free to send a pull request with a demo page and I can list it here for others to reference:

- [Demo](https://muan.github.io/open-heart-element/), [CSS](/demo.css) by [@muan](https://github.com/muan)

### Attributes

#### Functional

- `href`: Required. Specify a URL where a POST request would be sent to.
- `emoji`: Required. Specify an emoji.

#### States
- `[errored]`: Present when POST response comes back with a not ok response.
- `[disabled]`: Present when a heart has been sent.
- `[aria-pressed="true"]`: Present when a heart has been sent.
- `[aria-busy="true"]`: Present when a heart is being sent.

### API

- `openHeart.getCount()`: Sends a GET request to `href` with `emoji=${this.emoji}` and sets `<open-heart count="${count}">` if successful.
