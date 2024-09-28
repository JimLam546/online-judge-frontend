<template>
  <a-row
    :wrap="false"
    align="center"
    class="flex-header"
    style="margin-bottom: 10px; box-shadow: #eee 0 2px 5px"
  >
    <a-col flex="auto">
      <!--<div class="menu-demo">-->
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
          <div class="title-bar">
            <img class="logo" src="../assets/logo.png" width="38px" />
            <div class="title">
              <span style="font-weight: bold">Jim-OJ在线判题平台</span>
            </div>
          </div>
        </a-menu-item>
        <a-menu-item v-for="item in visibleRoutes" :key="item.path">
          {{ item.name }}
        </a-menu-item>
      </a-menu>
      <!--</div>-->
    </a-col>
    <a-col flex="150px">
      <div v-if="store.state.user.loginUser.username">
        <a-button type="outline" @click="router.push('/user/login')"
          >登录/注册
        </a-button>
      </div>
      <div v-else>
        <a-space size="large">
          <a-dropdown @select="handleSelect">
            <a-avatar>
              <img
                alt="avatar"
                src="https://ts1.cn.mm.bing.net/th/id/R-C.cca1c5e89045e69f2e1afff85c918a76?rik=7ki43op50DhBJg&riu=http%3a%2f%2fimg.touxiangkong.com%2fuploads%2fallimg%2f2023021310%2fd1m42oq0uku.jpg&ehk=fLZnCF9ueCyt3R0xwSqYTq93ZKg%2fpyOl0R7WagtZCVM%3d&risl=&pid=ImgRaw&r=0"
              />
            </a-avatar>
            <template #content>
              <a-doption>个人中心</a-doption>
              <a-doption>退出登录</a-doption>
            </template>
          </a-dropdown>
          <div>{{ store.state.user?.loginUser?.userName ?? "没有昵称" }}</div>
        </a-space>
      </div>
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
console.log("store.user=", store.state.user.loginUser.username);
// setTimeout(() => {
//   store.dispatch("user/getLoginUser", {
//     username: "JimLam",
//     userRole: "admin",
//   });
// }, 3000);

const handleSelect = (v: any) => {
  if (v === "退出登录") {
    router.push("/user/login");
  }
};
</script>

<style scoped>
/*a-row {*/
/*  box-shadow: #eee 0 2px 5px;*/
/*}*/

.arco-space .arco-space-horizontal .arco-space-align-center .arco-space-item {
  margin-right: 12px;
}

.title-bar {
  display: flex;
  align-items: center;
}

.title {
  color: #444;
  margin-left: 16px;
}
</style>
