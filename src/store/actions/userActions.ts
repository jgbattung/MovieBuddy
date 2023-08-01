import { UserActionTypes } from "../../components/common/constants";
import { IUserData } from "../../interfaces/userData";

export interface SetUserDataAction {
  type: UserActionTypes.SET_USER_DATA;
  payload: IUserData;
}

export const setUserData = (userData: IUserData): SetUserDataAction => {
  return {
    type: UserActionTypes.SET_USER_DATA,
    payload: userData,
  };
};