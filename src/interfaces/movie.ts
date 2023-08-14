import { MovieActionTypes } from "../components/common/constants";

export interface Movie {
  i: {
    height: number,
    imageUrl: string,
    width: number,
  };
  id: string,
  l: string,
  q?: string,
  qid?: string,
  rank: number,
  s: string,
  y?: number,
}

export interface FetchMoviesRequestAction {
  type: typeof MovieActionTypes.FETCH_MOVIES_REQUEST;
}

export interface FetchMoviesSuccessAction {
  type: typeof MovieActionTypes.FETCH_MOVIES_SUCCESS;
  payload: Movie[];
}

export interface FetchMoviesFailureAction {
  type: typeof MovieActionTypes.FETCH_MOVIES_FAILURE;
  payload: string;
}

export interface IMovieState {
  searchResult: Movie[];
  loading: boolean;
  error: string | null;
}

export type MovieAction = FetchMoviesRequestAction | FetchMoviesSuccessAction | FetchMoviesFailureAction;