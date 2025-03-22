<script setup lang="ts">
import { ref, nextTick } from 'vue';
import { EditorController } from '../controller.ts';
import { documentObject } from '../__tests__/testData.ts';

const controller = new EditorController(documentObject, window);

const exampleDocument = ref<string>(controller.html());

const update = async (event) => {
  controller.pressKey(event);
  exampleDocument.value = controller.html();

  await nextTick();

  controller.setCaret();
}
</script>

<template>
  <div>
    <div>
      <ul>
        <li>
          <select name="blocks">
            <option value="heading-1">Heading 1</option>
            <option value="heading-2">Heading 2</option>
            <option value="heading-3">Heading 3</option>
            <option value="heading-4">Heading 4</option>
            <option value="heading-5">Heading 5</option>
            <option value="paragraph">Paragraph</option>
          </select>
        </li>
      </ul>
    </div>
    <div
      id="editor"
      contenteditable="true"
      @keyup="update"
      @mouseup="click"
      v-html="exampleDocument"
    >
    </div>
  </div>
</template>

<style scoped>
  #editor {
    border: 1px solid gray;
    padding: 1em;
    width: 50em;
    height: 30em;
  }
</style>
