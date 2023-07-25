import { AuthAction } from "../../interfaces/auth";

export const loginAction = (): AuthAction => {
  return {
    type: 'LOGIN',
  };
};

export const logoutAction = (): AuthAction => {
  return {
    type: 'LOGOUT',
  };
};
