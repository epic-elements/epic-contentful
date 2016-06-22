'use strict';

class EpicContentful extends HTMLElement {

  createdCallback() {
    this.createShadowRoot().innerHTML = `<h1>This is a webcomponent</h1>`
  }

}

document.registerElement('epic-contentful', EpicContentful);
export default EpicContentful;
