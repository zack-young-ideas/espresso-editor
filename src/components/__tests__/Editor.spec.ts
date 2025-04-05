import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Editor from '../Editor.vue'

describe('Editor', () => {
  it('renders default document text', async () => {
    const wrapper = mount(Editor);

    const paragraph = await wrapper.find('p');

    expect(paragraph.text()).toMatch(
      'On July 1, 1867, Canada officially became a self-governing'
    );
  });
});
