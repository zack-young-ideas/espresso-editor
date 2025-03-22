/*
Defines the controller class that is used to edit documents.
*/

import { EditorModel } from './models.ts';

export class EditorController {
  constructor(initialDocument, window) {
    this.window = window;
    this.document = window.document;
    this.model = new EditorModel(initialDocument);
    this.anchor = { path: [0, 0], offset: 0 };
    this.focus = { path: [0, 0], offset: 0 };
  }

  html() {
    return this.model.html();
  }

  pressKey(event) {
    // Insert key in current caret position.
    this.getSelection();
    const character = String.fromCharCode(event.which);
    if (/[a-z\d]/i.test(character)) {
      const nodes = this.model.nodes[this.anchor.path[0]].children;
      const text = nodes[this.anchor.path[1]].text;
      const newText = [
        text.slice(0, this.anchor.offset - 1),
        event.key,
        text.slice(this.anchor.offset - 1),
      ].join('');
      nodes[this.anchor.path[1]].text = newText;
    }
  }

  getSelection() {
    // Gets the current anchor and focus positions.
    const selection = this.window.getSelection();
    this.updateAnchor(selection);
  }

  updateAnchor(selection) {
    /*
    Updates the anchor property with current anchor position.
    */
    this.anchor = {
      path: this.getAnchor(selection),
      offset: selection.anchorOffset,
    }
  }

  getAnchor(selection) {
    /*
    Retrieves info about current anchor position.
    */
    // First, make a nested list of all parent elements.
    const editor = this.document.getElementById('editor');
    const parentNodes = [selection.anchorNode];
    while (parentNodes[parentNodes.length - 1] !== editor) {
      parentNodes.push(parentNodes[parentNodes.length - 1].parentElement);
    }
    // Then, figure out which number each nested element is
    // in the list of child nodes of its parent element.
    const offsets = [];
    for (let i=1; i < parentNodes.length; i++) {
      const child = parentNodes[i - 1];
      const parent = parentNodes[i];
      let offset = 0;
      while(parent.childNodes[offset] !== child) {
        offset++;
      }
      offsets.push(offset);
    }
    offsets.reverse();
    return offsets;
  }

  getFocus(selection) {
    /*
    Retrieves info about the current focus position.
    */
  }

  setCaret() {
    // Sets the caret position to the current value of anchor.
    const editor = this.document.getElementById('editor');
    const selection = this.window.getSelection();
    const node = editor.children[this.anchor.path[0]];
    if (selection.rangeCount > 0) {
      selection.removeAllRanges();
    }
    const range = this.document.createRange();
    let childNode = node.childNodes[this.anchor.path[1]];
    let index = 2;
    while (childNode.childNodes.length > 0) {
      childNode = childNode.childNodes[this.anchor.path[index]];
      index++;
    }
    range.setStart(childNode, this.anchor.offset);
    range.setEnd(childNode, this.anchor.offset);
    selection.addRange(range);
  }
}
