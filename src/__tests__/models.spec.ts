/*
Defines tests run against the class used to represent the
document.
*/

import { beforeEach, describe, it, expect, vi } from 'vitest'

import { EditorModel } from '../models.ts'
import { documentObject, html } from './testData.ts'

let model;

beforeEach(() => {
  // Reset controller before each test.
  model = new EditorModel(documentObject);
});

describe('EditorModel', () => {
  it('can render HTML', () => {
    expect(model.html()).toBe(html);
  });

  describe('html method', () => {
    it('calls html method of each node', () => {
      const nodes = [
        { html: vi.fn(), },
        { html: vi.fn(), },
        { html: vi.fn(), },
      ];
      model.nodes = nodes;

      for(let i=0; i < 3; i++) {
        expect(nodes[i].html).not.toHaveBeenCalled();
      }

      model.html();

      for(let i=0; i < 3; i++) {
        expect(nodes[i].html).toHaveBeenCalledTimes(1);
        expect(nodes[i].html).toHaveBeenCalledWith();
      }
    });
  });

  describe('applyCommand method', () => {
    it('adds text given a text Command object', () => {
      const command = {
        type: 'text',
        value: 'insert text',
        anchor: { path: [2, 2], offset: 14 },
      };

      expect(model.nodes[2].children[2].text).toContain(
        ', Canada officially became a self-governing '
      );

      model.applyCommand(command);

      expect(model.nodes[2].children[2].text).toContain(
        ', Canada officinsert textially became a self-governing '
      );
    });

    it('deletes text given a text Command object with backspaces', () => {
      const command = {
        type: 'text',
        value: '\u232b\u232b\u232b\u232b',
        anchor: { path: [2, 2], offset: 14 },
      };

      expect(model.nodes[2].children[2].text).toContain(
        ', Canada officially became a self-governing '
      );

      model.applyCommand(command);

      expect(model.nodes[2].children[2].text).toContain(
        ', Canada oially became a self-governing '
      );
    });

    it.skip('deletes node given a text Command with lots of backspaces', () => {
      const command = {
        type: 'text',
        value: '\u232b\u232b\u232b\u232b\u232b\u232b',
        anchor: { path: [2, 2], offset: 3 },
      };

      expect(model.nodes[2].children[2].text).toContain(
        ', Canada officially became a self-governing '
      );

      model.applyCommand(command);

      expect(model.nodes[2].children[1].text).toContain(
        'July 1, 1anada oially became a self-governing '
      );
      expect(model.nodes[2].children[2].text).toContain('Confederation');
    });
  });
});
