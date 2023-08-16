import { createStore, combineReducers, Store, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import authReducer from "./reducers/authReducer";
import { AuthState } from "../interfaces/auth";
import { IUserData } from "../interfaces/userData";
import userReducer from "./reducers/userReducer";
import movieReducer from "./reducers/movieReducer";
import { IMovieState } from "../interfaces/movie";
import { ILoading } from "../interfaces/loading";
import loadingReducer from "./reducers/loadingReducer";

export interface RootState {
  auth: AuthState;
  userData: IUserData;
  movies: IMovieState;
  loading: ILoading;
}

const rootReducer = combineReducers<RootState>({
  auth: authReducer,
  userData: userReducer,
  movies: movieReducer,
  loading: loadingReducer,
});

const store: Store<RootState> = createStore(rootReducer, applyMiddleware(thunk));

export default store;