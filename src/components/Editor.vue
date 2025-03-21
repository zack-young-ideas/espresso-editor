<script setup lang="ts">
import { ref, nextTick } from 'vue';

const exampleDocument = ref<string>(
  '<h1>Hello, World!</h1>\n'
  + '<p>This is some text. It is a paragraph, to be exact.</p>\n'
  + '<h2>Sub Heading</h2>'
  + '<p>This another paragraph. Hope you like it.</p>'
);

const update = async (event: Event) => {
  let selection = window.getSelection();
  let node = selection.anchorNode.parentElement;
  const editorBlocks = document.getElementById('editor').children;
  let blockNumber: number = 0;
  while (editorBlocks[blockNumber] !== node) {
    blockNumber++;
  }
  const offset: number = selection.anchorOffset;
  exampleDocument.value = (event.target as HTMLInputElement).innerHTML;

  await nextTick();

  node = document.getElementById('editor').children[blockNumber];
  if (selection.rangeCount > 0) {
    selection.removeAllRanges();
  }
  const range = document.createRange();
  range.setStart(node.childNodes[0], offset);
  range.setEnd(node.childNodes[0], offset);
  selection.addRange(range);
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
