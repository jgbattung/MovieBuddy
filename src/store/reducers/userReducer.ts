import { IUserData } from "../../interfaces/userData";
import { UserActionTypes } from "../../components/common/constants";
import { SetUserDataAction, AddFavoriteMovieAction } from "../actions/userActions";

const initialState: IUserData = {
  firstName: '',
  lastName: '',
  email: '',
  favorites: [],
}

const userReducer = (state = initialState, action: SetUserDataAction | AddFavoriteMovieAction): IUserData => {
  switch (action.type) {
    case UserActionTypes.SET_USER_DATA:
      return action.payload;
    case UserActionTypes.ADD_FAVORITE_MOVIE:
      return {
        ...state,
        favorites: [...state.favorites, action.payload]
      }
    default:
      return state;
  }
}

export default userReducer;