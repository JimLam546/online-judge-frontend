<template>
  <div id="homeView">
    home-view
    <code-editor :handle-change="onCodeChange" :value="codeValue" />
  </div>
</template>

<script lang="ts" setup>
import CodeEditor from "@/components/CodeEditor.vue";
import { ref } from "vue";

const codeValue = ref("");
const onCodeChange = (v: string) => {
  console.log(v);
  codeValue.value = v;
};
</script>
<style scoped></style>
