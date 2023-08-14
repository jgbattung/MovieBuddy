import axios from "axios";
import { Dispatch } from "react";
import { MovieActionTypes } from "../../components/common/constants";
import { Movie, MovieAction } from "../../interfaces/movie";

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
  return (dispatch: Dispatch<MovieAction>) => {
    dispatch(fetchMoviesRequest());
    axios
      .get('https://imdb8.p.rapidapi.com/auto-complete', {
        params: { q: searchQuery },
        headers: {
          'X-RapidAPI-Key': '846d571b90msh4582e19480a6db6p18d4e8jsna47bfdf60c0f',
          'X-RapidAPI-Host': 'imdb8.p.rapidapi.com',
        },
      })
      .then((response) => {
        const movies = response.data?.d || [];
        dispatch(fetchMoviesSuccess(movies));
      })
      .catch((error) => {
        dispatch(fetchMovieFailure(error.message))
      })
  }
}


