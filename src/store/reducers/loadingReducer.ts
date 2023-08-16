import { LoadingActionTypes } from "../../components/common/constants";
import { ILoading, SetLoadingAction } from "../../interfaces/loading";

const initialState: ILoading = {
  isLoading: false
};

const loadingReducer = (state = initialState, action: SetLoadingAction) => {
  switch(action.type) {
    case LoadingActionTypes.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      return state;
  }
};

export default loadingReducer;