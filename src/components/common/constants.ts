export enum AuthError {
  INVALID_CREDENTIIALS = 'Invalid email or password.',
  EMAIL_EXISTS = 'Email is already in use.',
  TOO_MANY_REQUESTS = 'Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.',
  INVALID_EMAIL = 'Invalid email. Please input a valid email address.',
  WEAK_PASSWORD = 'Password too weak. Please create another password',
  MISSING_PASSWORD = 'Please enter a password.'
}

export enum UserActionTypes {
  SET_USER_DATA = 'SET_USER_DATA',
  ADD_FAVORITE_MOVIE = "ADD_FAVORITE_MOVIE",
}

export enum MovieActionTypes {
  FETCH_MOVIES_REQUEST = 'FETCH_MOVIES_REQUEST',
  FETCH_MOVIES_SUCCESS = 'FETCH_MOVIES_SUCCESS',
  FETCH_MOVIES_FAILURE = 'FETCH_MOVIES_FAILURE',
}

export enum LoadingActionTypes {
  SET_LOADING = "SET_LOADING"
}