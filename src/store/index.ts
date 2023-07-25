import { createStore, combineReducers, Store } from "redux";
import authReducer from "./reducers/authReducer";
import { AuthState } from "../interfaces/auth";

export interface RootState {
  auth: AuthState;
}

const rootReducer = combineReducers<RootState>({
  auth: authReducer,
});

const store: Store<RootState> = createStore(rootReducer);

export default store;