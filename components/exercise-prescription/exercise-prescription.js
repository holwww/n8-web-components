import Factory from "../../utils/factory.js"

const template = Factory.template(`
    <h1> 
      <slot name="title" /> 
    </h1>
    <p>
      <slot name="text" />
    </p>
`);

class Prescription extends HTMLElement {

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    console.log(`Connected prescription`)
  }
}


customElements.define("nite-prescription", Prescription);
