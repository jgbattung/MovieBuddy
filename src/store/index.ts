import { createStore, combineReducers, Store } from "redux";
import authReducer from "./reducers/authReducer";
import { AuthState } from "../interfaces/auth";
import { IUserData } from "../interfaces/userData";
import userReducer from "./reducers/userReducer";

export interface RootState {
  auth: AuthState;
  userData: IUserData;
}

const rootReducer = combineReducers<RootState>({
  auth: authReducer,
  userData: userReducer,
});

const store: Store<RootState> = createStore(rootReducer);

export default store;