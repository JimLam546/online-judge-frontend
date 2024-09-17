import router from "@/router";
import store from "@/store";
import ACCESS_ENUM from "@/access/accessEnum";
import accessEnum from "@/access/accessEnum";
import { checkAccess } from "@/access/checkAccess";

router.beforeEach(async (to, from, next) => {
  let loginUser = store.state.user.loginUser;
  // 如果之前没有登录过，自动登录
  if (!loginUser || !loginUser.userRole) {
    // 加 await 是为了等用户登录成功之后，再执行后续的代码
    await store.dispatch("user/getLoginUser"); // 如果用户没有登录，无法在后端获取，getLoginUser 会将 userRole 设置为 NOT_LOGIN
    loginUser = store.state.user.loginUser;
  }
  // 路由里没有 access 的,就是不需要登录就能访问
  const needAccess = (to.meta?.access as string) ?? ACCESS_ENUM.NOT_LOGIN;
  // 要跳转的页面必须要登陆
  if (needAccess !== accessEnum.NOT_LOGIN) {
    // 如果没登陆，跳转到登录页面
    if (
      !loginUser ||
      !loginUser.userRole ||
      loginUser.userRole === accessEnum.NOT_LOGIN
    ) {
      next("/user/login");
      return;
    }
    // 如果已经登陆了，但是权限不足，那么跳转到无权限页面
    if (!checkAccess(loginUser, needAccess)) {
      next("/noAuth");
      return;
    }
  }
  // 不需要登录则直接放行
  next();
});
