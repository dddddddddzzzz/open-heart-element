class OpenHeartElement extends HTMLElement {
  KEY = '_open_heart'
  _send: (event: MouseEvent | KeyboardEvent) => void

  constructor() {
    super()
    this._send = this.send.bind(this)
  }

  connectedCallback() {
    this.tabIndex = 0
    this.setAttribute('role', 'button')
    this.setAttribute('aria-busy', 'false')

    if (!this.emoji || !this.href) {
      console.error(this, 'missing required attributes')
      this.toggleAttribute('disabled', true)
      return
    }

    if (!this.validateEmoji()) {
      console.error(this, 'emoji attribute incorrect')
      return
    }

    if (this.hasReacted()) {
      this.setReacted()
    } else {
      this.addEventListener('click', this._send)
      this.addEventListener('keydown', this._send)
    }
  }

  validateEmoji(): boolean {
    const segments = Array.from(new Intl.Segmenter(navigator.language || 'en', { granularity: 'grapheme' }).segment(this.emoji))
    const emoji = segments.length > 0 ? segments[0].segment : null
    if (this.emoji != emoji) return false

    return /\p{Emoji}/u.test(emoji)
  }

  get href(): string {
    return this.getAttribute('href')!
  }

  get emoji(): string {
    return this.getAttribute('emoji')!
  }

  get key(): string {
    return `${this.emoji}@${encodeURIComponent(this.href)}`
  }

  get disabled(): boolean {
    return this.hasAttribute('disabled')
  }

  hasReacted(): boolean {
    const hearts = (localStorage.getItem(this.KEY) || '').split(',')
    return hearts.includes(this.key)
  }

  setReacted() {
    this.setAttribute('aria-pressed', 'true')
    this.toggleAttribute('disabled', true)
    this.removeEventListener('click', this._send)
  }

  saveReaction() {
    const hearts = (localStorage.getItem(this.KEY) || '').split(',').filter(s => s)
    hearts.push(this.key)
    localStorage.setItem(this.KEY, hearts.join(','))
  }

  async getCount() {
    const response = await fetch(this.href, {headers: {'Accept': 'application/json'}})
    if (!response.ok) return

    let json: {[key: string]: number} = {}
    try {
      json = await response.json()
    } catch { /* do nothing */ }

    this.setAttribute('count', Number(json[this.emoji] || 0).toString())
  }

  async send(event: MouseEvent | KeyboardEvent) {
    if (event instanceof KeyboardEvent && !['Enter', ' '].includes(event.key)) return

    if (this.disabled) return
    if (this.getAttribute('aria-busy') === 'true') return
    if (this.hasReacted()) return this.setReacted()

    this.setAttribute('aria-busy', 'false')
    await fetch(this.href, { method: 'post', body: this.emoji, mode: 'no-cors' })
    this.setAttribute('aria-busy', 'false')
    this.saveReaction()
    this.setReacted()
  }
}

if (!window.customElements.get('open-heart')) {
  window.OpenHeartElement = OpenHeartElement
  window.customElements.define('open-heart', OpenHeartElement)
}

export default OpenHeartElement

declare global {
  interface Window {
    OpenHeartElement: typeof OpenHeartElement
  }
  interface HTMLElementTagNameMap {
    'open-heart': OpenHeartElement
  }
}
