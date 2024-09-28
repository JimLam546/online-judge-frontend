<template>
  <div id="userLoginView">
    <a-layout style="min-height: 100vh">
      <a-layout-header class="header">
        <a-row class="grid-demo" style="margin-bottom: 16px">
          <a-col flex="100px">
            <div></div>
          </a-col>
          <a-col flex="auto">
            <div style="text-align: center">
              <h1>在线判题系统</h1>
            </div>
          </a-col>
          <a-col flex="100px">
            <div></div>
          </a-col>
        </a-row>
      </a-layout-header>
      <a-layout-content class="content">
        <a-card
          id="formBackground"
          style="width: 650px; margin: 100px auto; border-radius: 20px"
        >
          <div style="text-align: center">
            <h2>用户登录</h2>
          </div>
          <div id="submit_form">
            <a-form
              :model="form"
              :style="{ width: '600px' }"
              label-align="left"
              style="margin: auto"
              @submit="handleSubmit()"
            >
              <a-form-item
                field="userAccount"
                label="账号"
                tooltip="请输入账号"
              >
                <a-input v-model="form.userAccount" placeholder="请输入账号" />
              </a-form-item>
              <a-form-item
                field="post"
                label="密码"
                tooltip="密码长度不小于8位"
              >
                <a-input-password
                  v-model="form.userPassword"
                  placeholder="请输入密码"
                />
              </a-form-item>
              <a-form-item>
                <a-button html-type="submit" long type="primary">登录</a-button>
              </a-form-item>
              <a-form-item>
                <a-button long @click="toRegister()"
                  >没有账号？前往注册
                </a-button>
              </a-form-item>
            </a-form>
          </div>
        </a-card>
      </a-layout-content>
      <!--<a-layout-footer class="footer">Footer</a-layout-footer>-->
    </a-layout>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from "vue";
import store from "@/store";
import { resType } from "@/models/resultType";
import message from "@arco-design/web-vue/es/message";
import { userLoginPost } from "@/service/axiosService";
import { useRouter } from "vue-router";

const form = reactive({
  userAccount: "",
  userPassword: "",
});

const router = useRouter();
const handleSubmit = async () => {
  const res: resType = await userLoginPost(JSON.stringify(form));
  console.log(res);
  if (res.code === 0) {
    await store.dispatch("user/getLoginUser");
    // 登录成功后跳转到主页
    await router.push({
      path: "/",
      replace: true,
    });
  } else {
    message.error("登录失败，" + res.message);
  }
};
const toRegister = () => {
  router.push("/user/register");
};
</script>

<style>
#userLoginView {
  height: 100vh;
  background-image: url("../../assets/images/background.png");
  background-repeat: no-repeat;
  background-size: cover;
}

#formBackground {
  justify-content: center;
  align-items: center;
}
</style>
