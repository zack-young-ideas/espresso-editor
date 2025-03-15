<script setup lang="ts">
  import { ref } from 'vue';
  import { useTextSelection } from '@vueuse/core';

  const exampleDocument = ref(
    '<h1>Hello, World!</h1>\n'
    + '<p>This is some text. It is a paragraph, to be exact.</p>\n'
    + '<h2>Sub Heading</h2>'
    + '<p>This another paragraph. Hope you like it.</p>'
  );
  const selection = useTextSelection();

  const update = (event) => {
    exampleDocument.value = event.target.innerHTML;
  }

  const displaySelection = () => {
    console.log(selection.text.value);
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
      @mouseup="displaySelection"
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
