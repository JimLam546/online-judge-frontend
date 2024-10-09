import { StoreOptions } from "vuex";
import AccessEnum from "@/access/accessEnum";
import { getLoginUser } from "@/service/axiosService";
import { resType } from "@/models/resultType";
import { UserControllerService } from "../../generated";

export default {
  namespaced: true,
  state: () => ({
    loginUser: {
      username: "没有登录",
    },
  }),
  getters: {
    getLoginUserByLocal: (state) => state.loginUser,
  },
  actions: {
    async getLoginUser({ commit, state }, payload) {
      const res: resType = await getLoginUser();
      if (res.code === 0) {
        console.log("res=", res);
        commit("updateUser", res.data);
      } else {
        commit("updateUser", {
          ...state.loginUser,
          userRole: AccessEnum.NOT_LOGIN,
        });
      }
    },
    async logout({ commit, state }, payload) {
      const res: resType = await UserControllerService.userLogoutUsingPost();
      if (res.code === 0) {
        commit("updateUser", {
          username: "没有登录",
          userRole: AccessEnum.NOT_LOGIN,
        });
      }
    },
  },
  mutations: {
    updateUser: (state, payload) => {
      state.loginUser = payload;
    },
  },
} as StoreOptions<any>;
