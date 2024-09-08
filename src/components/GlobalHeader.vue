<template>
  <a-row
    :wrap="false"
    align="center"
    class="flex-header"
    style="margin-bottom: 10px"
  >
    <a-col flex="auto">
      <div class="menu-demo">
        <a-menu
          :selected-keys="selectedKey"
          mode="horizontal"
          @menu-item-click="selectMenuItem"
        >
          <a-menu-item
            key="0"
            :style="{ padding: 0, marginRight: '38px' }"
            disabled
          >
            <div
              :style="{
                width: '80px',
                height: '30px',
                borderRadius: '2px',
                background: 'var(--color-fill-3)',
                cursor: 'text',
              }"
            />
          </a-menu-item>
          <a-menu-item v-for="item in visibleRoutes" :key="item.path">
            {{ item.name }}
          </a-menu-item>
        </a-menu>
      </div>
    </a-col>
    <a-col flex="100px">
      <div>{{ store.state.user?.loginUser?.userName ?? "没有昵称" }}</div>
    </a-col>
  </a-row>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { routes } from "@/router/routes";
import { checkAccess } from "@/access/checkAccess";

const selectedKey = ref(["/"]);
const store = useStore();
const router = useRouter();
// 注意：这里使用计算属性(computed)，为了当登录用户信息发生变更时，
//      触发菜单栏的重新渲染，展示新增的权限菜单项
const visibleRoutes = computed(() => {
  return routes.filter((value) => {
    // 有参数就过滤掉
    if (value.meta?.hideInMenu) {
      return false;
    }
    // 根据登录用户的权限再判断一次
    if (
      !checkAccess(store.state.user.loginUser, value.meta?.access as string)
    ) {
      return false;
    }
    return true;
  });
});
router.afterEach((to) => {
  selectedKey.value = [to.path];
});
const selectMenuItem = (key: string) => {
  router.push({
    path: key,
  });
};
setTimeout(() => {
  store.dispatch("user/getLoginUser", {
    username: "JimLam",
    userRole: "admin",
  });
}, 3000);
</script>

<style scoped>
.menu-demo {
  box-shadow: #eee 0 2px 5px;
}
</style>
