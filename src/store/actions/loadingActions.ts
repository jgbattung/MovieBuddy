import { LoadingActionTypes } from "../../components/common/constants";
import { SetLoadingAction } from "../../interfaces/loading";

export const setLoading = (isLoading: boolean): SetLoadingAction => ({
  type: LoadingActionTypes.SET_LOADING,
  payload: isLoading,
});

