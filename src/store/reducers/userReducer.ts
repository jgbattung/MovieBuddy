import { IUserData } from "../../interfaces/userData";
import { UserActionTypes } from "../../components/common/constants";
import { SetUserDataAction } from "../actions/userActions";

const initialState: IUserData = {
  firstName: '',
  lastName: '',
  email: '',
}

const userReducer = (state = initialState, action: SetUserDataAction): IUserData => {
  switch (action.type) {
    case UserActionTypes.SET_USER_DATA:
      return action.payload;
    default:
      return state;
  }
}

export default userReducer;