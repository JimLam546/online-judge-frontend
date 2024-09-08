<template>
  <div id="code-editor" ref="codeEditorRef" style="min-height: 400px" />
</template>

<script lang="ts" setup>
import { onMounted, ref, toRaw, defineProps, withDefaults } from "vue";
import * as monaco from "monaco-editor";

interface Props {
  value: string;
  handleChange: (v: string) => void;
}

const codeEditorRef = ref();
const codeEditor = ref();
const value = ref("hello word");

const props = withDefaults(defineProps<Props>(), {
  value: "",
  handleChange: (v: string) => {
    console.log(v);
    console.log(v);
  },
});
const fillValue = () => {
  if (!codeEditor.value) {
    return;
  }
  // 改变值
  toRaw(codeEditor.value).set("新的值");
};
onMounted(() => {
  if (!codeEditorRef.value) {
    return;
  }
  codeEditor.value = monaco.editor.create(codeEditorRef.value, {
    value: value.value,
    language: "java",
    minimap: {
      enabled: true,
    },
    readOnly: false,
    theme: "vs-dark",
  });
  // 编辑 监听内容变化
  codeEditor.value.onDidChangeModelContent(() => {
    props.handleChange(toRaw(codeEditor.value).getValue());
  });
});
</script>

<style scoped></style>
