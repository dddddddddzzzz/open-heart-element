# &lt;open-heart&gt;

A button to POST an emoji to an endpoint.

It's fairly straightforward to set up an endpoint with [Cloudflare Workers & Cloudflare KV](https://developers.cloudflare.com/workers/platform/pricing/). Here's [less than 30 lines of code](https://gist.github.com/muan/388430d0ed03c55662e72bb98ff28f03).

## Usage

```html
<open-heart href="https://httpbin.org/post" for="object-id" emoji="❤️">♥</open-heart>
```

This sends a POST request with a form data payload:

```
id: object-id
emoji: ❤️
```

and sets a key in `localStorage` to remember that a heart has been sent for this object ID.

### Attributes

#### Functional

- `href`: Required. Specify a URL where a POST request would be sent to.
- `for`: Required. Specify an object ID.
- `emoji`: Required. Specify an emoji.

#### States
- `[errored]`: Present when POST response comes back with a not ok response.
- `[disabled]`: Present when a heart has been sent.
- `[aria-pressed="true"]`: Present when a heart has been sent.
- `[aria-busy="true"]`: Present when a heart is being sent.
