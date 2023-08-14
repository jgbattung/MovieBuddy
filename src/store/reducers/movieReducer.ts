import { MovieActionTypes } from "../../components/common/constants";
import { IMovieState, MovieAction } from "../../interfaces/movie";

const initialState: IMovieState = {
  searchResult: [],
  loading: false,
  error: null,
}

const movieReducer = (state = initialState, action: MovieAction): IMovieState => {
  switch(action.type) {
    case MovieActionTypes.FETCH_MOVIES_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case MovieActionTypes.FETCH_MOVIES_SUCCESS:
      return {
        ...state,
        loading: false,
        searchResult: action.payload,
      };
    case MovieActionTypes.FETCH_MOVIES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};

export default movieReducer;