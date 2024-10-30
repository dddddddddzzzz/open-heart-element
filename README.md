# &lt;open-heart&gt;

A button for the [`Open Heart Protocol`](https://github.com/mochokidae/OpenHeart).

🚧 Highly experimental. Tag a version to avoid unexpected changes.

## Usage

```html
<!-- Include `OpenHeartElement` -->
<script src="https://unpkg.com/open-heart-element" type="module"></script>

<!-- Render `<open-heart>` -->
<open-heart 
  href="https://api.oh.dddddddddzzzz.org/github.com/dddddddddzzzz/open-heart-element" 
  emoji="❤️">
  ♥
</open-heart>
```

This sends a POST to the `href` with `❤️` in the body, and sets a key in `localStorage` to remember that a heart has been sent for this `href`.

### OpenHeart endpoint

Check out [`Open Heart Protocol - Server code`](https://github.com/dddddddddzzzz/OpenHeart?tab=readme-ov-file#server-code).

### Styling

This element does not come with any styling. Feel free to take whatever that's on the demo page.

If you wrote some cool CSS for this, feel free to send a pull request with a demo page and I can list it here for others to reference:

- [Demo](https://element.openheart.fyi), [CSS](/demo.css) by [@muan](https://github.com/muan)

### Attributes

#### Functional

- `href`: Required. Specify a URL where a POST request would be sent to.
- `emoji`: Required. Specify an emoji.

#### States
- `[disabled]`: Present when a heart has been sent.
- `[aria-pressed="true"]`: Present when a heart has been sent.
- `[aria-busy="true"]`: Present when a heart is being sent.

### API

- `openHeart.getCount()`: Sends a GET request to `href`, expects a JSON response like `{'${this.emoji}': count}` and sets `<open-heart count="${count}">` if successful.

### Event

- `open-heart`: Bubbles. This is dispatched after a reaction is sent.
