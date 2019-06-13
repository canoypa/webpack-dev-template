console.log('Hello World');

class TestElm extends HTMLElement {
  constructor(name: string) {
    super();

    this.textContent = name;
  }
}
customElements.define('test-elm', TestElm);

const me = new TestElm('cano');

document.body.appendChild(me);
