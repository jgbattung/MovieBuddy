import { LoadingActionTypes } from "../components/common/constants";

export interface ILoading {
  isLoading: boolean,
}

export interface SetLoadingAction {
  type: LoadingActionTypes.SET_LOADING,
  payload: boolean,
}