<script setup lang="ts">
import { ref, nextTick } from 'vue';
import { EditorController } from '../controller.ts';
import { documentObject } from '../__tests__/testData.ts';

const controller = new EditorController(documentObject, window);

let exampleDocument = ref<string>(controller.html());
let timeout: Number;

const update = async (event) => {
  clearTimeout(timeout);
  controller.pressKey(event);
  timeout = setTimeout(async () => {
    controller.flush();
    exampleDocument.value = controller.html();
    await nextTick();
    controller.setCaret();
  }, 1000);
}
</script>

<template>
  <div>
    <div id="toolbar">
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
