/*
Defines tests run against the class used to edit documents.

Write tests to ensure that class instances can be constructed
from HTML and from an array of objects representing document nodes.

Also, ensure class instances can produce the proper HTML based
on the given nodes and content.

Write methods that will perform different actions the user may
wish to perform, such as remove a selection of text, insert a
new selection, etc.
*/

import { describe, it, expect } from 'vitest'

import { DocumentClass } from '../DocumentClass.ts'
import { html, documentObject } from './testData.ts'

describe('DocumentClass', () => {
  it('can produce proper HTML from document nodes', () => {
    const docObject = new DocumentClass(null, documentObject);

    expect(docObject.html()).toBe(html);
  });
  it('can produce document nodes given HTML', () => {
    const docObject = new DocumentClass(html, null);

    expect(docObject.nodes()).toBe(documentObject);
  });
});
