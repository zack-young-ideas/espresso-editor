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

  pressKey(key) {
    // Insert key in current caret position.
  }
}
