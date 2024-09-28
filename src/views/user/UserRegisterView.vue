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
            <h2>用户注册</h2>
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
                tooltip="账号长度不能小于四位"
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
              <a-form-item
                field="password2"
                label="确认密码"
                validate-trigger="blur"
              >
                <a-input-password
                  v-model="form.checkPassword"
                  placeholder="请再次输入密码"
                />
              </a-form-item>
              <a-form-item>
                <a-button html-type="submit" long type="primary">注册</a-button>
              </a-form-item>
              <a-form-item>
                <a-button long @click="toRegister()"
                  >已有账号？前往登录
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
import { useRouter } from "vue-router";
import { UserControllerService } from "../../../generated";

const form = reactive({
  userAccount: "",
  userPassword: "",
  checkPassword: "",
});

const router = useRouter();
const handleSubmit = async () => {
  const res: resType = await UserControllerService.userRegisterUsingPost(form);
  console.log(res);
  if (res.code === 0) {
    await store.dispatch("user/getLoginUser");
    // 登录成功后跳转到主页
    await router.push({
      path: "/user/login",
      replace: true,
    });
  } else {
    message.error("登录失败，" + res.message);
  }
};
const toRegister = () => {
  router.push("/user/login");
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
