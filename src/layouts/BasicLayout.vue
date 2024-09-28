<template>
  <div id="basicLayout">
    <a-layout style="min-height: 100vh">
      <a-layout-header class="header">
        <GlobalHeader />
      </a-layout-header>
      <a-layout-content class="content">
        <router-view />
      </a-layout-content>
      <a-layout-footer class="footer"
        ><a href="" style="text-decoration: none">Online Judge 2024 | JimLam</a>
      </a-layout-footer>
    </a-layout>
  </div>
</template>

<script>
import GlobalHeader from "@/components/GlobalHeader.vue";

export default {
  name: "BasicLayout",
  components: { GlobalHeader },
};
</script>

<style scoped>
#basicLayout .header {
  /*background-color: aqua;*/
}

#basicLayout .content {
  margin: 15px;
}

#basicLayout .footer {
  /*background-color: aquamarine;*/
  position: sticky;
  bottom: 3px;
  left: 0;
  right: 0;
  text-align: center;
}
</style>
