import Factory from "../../utils/factory.js"
import WebComponent from "../component/web-component.js";

const template = Factory.template(`
    <span class="typewriter">
      <span class="text"></span> 
      <span class="cursor">|</span>
    </span>
`);

const style = Factory.style(`
 :host {
    display: flex;
  }
  
  .text {
    background: linear-gradient(to right, rgba(255, 255, 255, 1) 30%, rgba(255, 255, 255, .4) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .typewriter {
    display: flex;
    flex-wrap: wrap;
    position: relative;
  }

  .cursor {
    animation: blink-animation 1.2s steps(2, start) infinite;
    -webkit-animation: blink-animation 1.2s steps(2, start) infinite;
    opacity: 40%;
  }

  @keyframes blink-animation {
    to { opacity: 0%; }
  }

`)

class CircularTypingAnimation {

  constructor(texts, onTypingText) {
    this.texts = texts;
    this.onTypingText = onTypingText;
    this.step = 1;
    this.currentTextIndex = 0;
    this.currentText = texts[0];
    this.currentCharacterIndex = 0;
  }

  isCursorAtStart() {
    return this.currentCharacterIndex === 0;
  }

  isCursorAtEnd() {
    return this.currentCharacterIndex === this.currentText.length;
  }

  fetchNextText() {
    this.currentTextIndex = (this.currentTextIndex + 1) % this.texts.length;
    return this.texts[this.currentTextIndex];
  }

  isTypingBackwards() {
    return this.step === -1;
  }

  fetchNextSpeed() {

    if (this.isTypingBackwards()) {
      return 40;
    }

    if (this.isCursorAtEnd()) {
      return 2 * 1000; // 1.2s
    }

    return 100;
  }

  animate() {

    const animation = () => {

      setTimeout(() => {
        requestAnimationFrame(animation);
      }, (this.fetchNextSpeed()));

      if (this.isCursorAtEnd()) {
        this.step = -1;
      }

      if (this.isCursorAtStart() && this.isTypingBackwards()) {
        this.step = 1;
        this.currentText = this.fetchNextText();
      }

      const typingText = this.currentText.slice(0, this.currentCharacterIndex);
      this.currentCharacterIndex += this.step;
      this.onTypingText(typingText);

    }

    requestAnimationFrame(animation);
  }

}

class Typewriter extends WebComponent {

  static get observedAttributes() {
    return ["test"];
  }

  afterConstructedCallback() {
    this.shadowRoot.appendChild(style);
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    this.setupTypingAnimation();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log(name, oldValue, Boolean(newValue));
  }

  setupTypingAnimation() {

    const $text = this.shadowRoot.querySelector(".text");
    const $options = this.querySelectorAll("option");

    let texts = [this.textContent.trim()]
    if ($options.length > 0) {
      texts = [...$options].map(el => el.textContent.trim());
    }

    const onTypingText = (text) => {
      $text.textContent = text;
    }

    const typingAnimation = new CircularTypingAnimation(texts, onTypingText);
    typingAnimation.animate();
  }

}

customElements.define("n8-typewriter", Typewriter);
