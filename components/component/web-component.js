export default class WebComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.afterConstructedCallback && this.afterConstructedCallback();
    }
}
