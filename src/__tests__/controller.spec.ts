/*
Defines tests run against the class used to control changes to
the document.

Write methods that will execute different actions the user may
wish to perform, such as removing a selection of text, inserting
new block elements, etc.
*/

import { describe, it, expect } from 'vitest'

import { EditorController } from '../controller.ts'
import { documentObject, html } from './testData.ts'

describe('EditorController', () => {
  it('can render HTML', () => {
    const window = { document: null };
    const controller = new EditorController(documentObject, window);

    expect(controller.html()).toBe(html);
  });
});
