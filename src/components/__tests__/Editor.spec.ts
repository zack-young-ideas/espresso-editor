import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import Editor from '../Editor.vue'

describe('Editor', () => {
  it('renders default document text', async () => {
    const wrapper = mount(Editor);

    const paragraph = await wrapper.findAll('p')[0]

    expect(paragraph.text()).toBe(
      'This is some text. It is a paragraph, to be exact.'
    );
  });
});
