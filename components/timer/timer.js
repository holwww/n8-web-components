import WebComponent from "../component/web-component.js";

class Timer extends WebComponent {

  static get observedAttributes() {
    return ["seconds"];
  }

  attributeChangedCallback(name, _, value) {
    console.log("changed", name, Number(value));
    this.seconds = Number(value);
  }

  formattedTime() {
    const remainingMinutes = Math.floor(this.seconds / 60);
    const remainingSeconds = this.seconds % 60;
    const remainingMinutesText = remainingMinutes < 10 ? `0${remainingMinutes}` : `${remainingMinutes}`;
    const remaingingSecondsText = remainingSeconds < 10 ? `0${remainingSeconds}` : `${remainingSeconds}`;
    return `${remainingMinutesText}:${remaingingSecondsText}`;
  }
  
  afterConstructedCallback() {
  }



}

customElements.define("n8-timer", Timer);