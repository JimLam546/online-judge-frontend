import { resType } from "@/models/resultType";
import { UserControllerService } from "../../generated";

const userLoginPost = async (form: any) => {
  return (await UserControllerService.userLoginUsingPost(form)) as resType;
};
const getLoginUser = async () => {
  return (await UserControllerService.getLoginUserUsingGet()) as resType;
};

export { userLoginPost, getLoginUser };
