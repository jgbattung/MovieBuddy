import { UserActionTypes } from "../../components/common/constants";
import { IUserData } from "../../interfaces/userData";

export interface SetUserDataAction {
  type: UserActionTypes.SET_USER_DATA;
  payload: IUserData;
}

export interface AddFavoriteMovieAction {
  type: UserActionTypes.ADD_FAVORITE_MOVIE,
  payload: string;
}

export const setUserData = (userData: IUserData): SetUserDataAction => {
  return {
    type: UserActionTypes.SET_USER_DATA,
    payload: userData,
  };
};

export const addFavoriteMovie = (movieId: string): AddFavoriteMovieAction => ({
  type: UserActionTypes.ADD_FAVORITE_MOVIE,
  payload: movieId,
})