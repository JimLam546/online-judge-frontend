<template>
  <div id="userLayout">
    <router-view />
  </div>
</template>

<script lang="ts" setup></script>

<style scoped>
#userLayout .footer {
  background-color: aquamarine;
  position: sticky;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
}
</style>
