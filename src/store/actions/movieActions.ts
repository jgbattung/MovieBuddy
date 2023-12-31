import axios from "axios";
import { Dispatch } from "react";
import { MovieActionTypes } from "../../components/common/constants";
import { Movie, MovieAction } from "../../interfaces/movie";
import { API_HOST, API_KEY } from "../../utils/utils";

export const fetchMoviesRequest = (): MovieAction => ({
  type: MovieActionTypes.FETCH_MOVIES_REQUEST,
});

export const fetchMoviesSuccess = (movies: Movie[]): MovieAction => ({
  type: MovieActionTypes.FETCH_MOVIES_SUCCESS,
  payload: movies,
});

export const fetchMovieFailure = (error: string): MovieAction => ({
  type: MovieActionTypes.FETCH_MOVIES_FAILURE,
  payload: error
});

export const fetchMovies = (searchQuery: string) => {
  return async (dispatch: Dispatch<MovieAction>) => {
    try {
      dispatch(fetchMoviesRequest());

      const response = await axios.get('https://imdb8.p.rapidapi.com/auto-complete', {
        params: { q: searchQuery },
        headers: {
          'X-RapidAPI-Key': API_KEY,
          'X-RapidAPI-Host': API_HOST,
        },
      });

      const movies = response.data?.d || []; 
      dispatch(fetchMoviesSuccess(movies));
    } catch (error: any) {
      dispatch(fetchMovieFailure(error.message))
    }
  };
}


