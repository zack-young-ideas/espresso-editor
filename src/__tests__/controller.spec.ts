/*
Defines tests run against the class used to control changes to
the document.

Write methods that will execute different actions the user may
wish to perform, such as removing a selection of text, inserting
new block elements, etc.
*/

import { beforeEach, describe, it, expect, vi } from 'vitest'

import { EditorController } from '../controller.ts'
import { documentObject, html } from './testData.ts'

// Used as a mock object in several tests.
const window = { document: null };
let controller;

beforeEach(() => {
  // Reset controller before each test.
  controller = new EditorController(documentObject, window);
});

describe('EditorController', () => {

  it('can render HTML', () => {
    expect(controller.html()).toBe(html);
  });

  it('can update anchor and focus', () => {
    expect(controller.anchor).toStrictEqual({ path: [0, 0], offset: 0});
    expect(controller.focus).toStrictEqual({ path: [0, 0], offset: 0});
  });

  describe('pressKey method', () => {
    it('adds new command to pendingCommand given character key', () => {
      // Mock getSelection method of controller object.
      controller.getSelection = vi.fn();

      expect(controller.pendingCommand.length).toBe(0);

      controller.pressKey({ key: 'd' });

      expect(controller.pendingCommand.length).toBe(1);
      expect(controller.pendingCommand[0].value).toBe('d');
      expect(controller.pendingCommand[0].type).toBe('text');
    });

    it('adds new character to existing pending command', () => {
      // Mock getSelection method of controller object.
      controller.getSelection = vi.fn();

      controller.pressKey({ key: 'd' });
      controller.pressKey({ key: ' ' });

      expect(controller.pendingCommand.length).toBe(1);
      expect(controller.pendingCommand[0].value).toBe('d ');

      controller.pressKey({ key: 'a' });

      expect(controller.pendingCommand.length).toBe(1);
      expect(controller.pendingCommand[0].value).toBe('d a');
    });

    it('deletes text from command on backspace', () => {
      // Mock getSelection method of controller object.
      controller.getSelection = vi.fn();

      controller.pressKey({ key: 't' });
      controller.pressKey({ key: 'h' });
      controller.pressKey({ key: 'i' });
      controller.pressKey({ key: 's' });
      controller.pressKey({ key: ' ' });
      controller.pressKey({ key: 'a' });
      controller.pressKey({ key: 'b' });
      controller.pressKey({ key: 'Backspace' });
      controller.pressKey({ key: 'Backspace' });
      controller.pressKey({ key: '1' });
      controller.pressKey({ key: '2' });

      expect(controller.pendingCommand.length).toBe(1);
      expect(controller.pendingCommand[0].value).toBe(
        'this ab\u232b\u232b12'
      );
    });

    it('creates new backspace command if no pending command', () => {
      // Mock getSelection method of controller object.
      controller.getSelection = vi.fn();

      expect(controller.pendingCommand.length).toBe(0);

      controller.pressKey({ key: 'Backspace' });

      expect(controller.pendingCommand.length).toBe(1);
      expect(controller.pendingCommand[0].value).toBe('\u232b');
      expect(controller.pendingCommand[0].type).toBe('text');
    });

    it('does not change output HTML', () => {
      // Mock getSelection method of controller object.
      controller.getSelection = vi.fn();

      controller.pressKey({ key: 'd' });

      expect(controller.pendingCommand.length).toBe(1);
      expect(controller.pendingCommand[0].value).toBe('d');
      expect(controller.html()).toBe(html);
    });
  });

  describe('flush method', () => {
    it('moves pendingCommand to commandHistory', () => {
      controller.pendingCommand.push({
        type: 'text',
        value: 'stuff',
      });

      expect(controller.commandHistory.length).toBe(0);
      expect(controller.pendingCommand.length).toBe(1);
      expect(controller.pendingCommand[0].value).toBe('stuff');
      expect(controller.pendingCommand[0].type).toBe('text');

      controller.flush();

      expect(controller.pendingCommand.length).toBe(0);
      expect(controller.commandHistory.length).toBe(1);
      expect(controller.commandHistory[0].value).toBe('stuff');
      expect(controller.commandHistory[0].type).toBe('text');
    });

    it('applies new command to document object', () => {
      controller.pendingCommand.push({
        type: 'text',
        value: 'stuff',
      });
      controller.flush();


    });
  });
});
