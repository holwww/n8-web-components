export default class NiteButton extends HTMLElement {

  static tag = "nite-button"

  constructor() {
    super();
  }

  connectedCallback() {
    console.log("Button was created");
  }

}

