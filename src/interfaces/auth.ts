export interface AuthState {
  isLoggedIn: boolean;
}

export interface LoginAction {
  type: 'LOGIN';
}

export interface LogoutAction {
  type: 'LOGOUT';
}

export type AuthAction = LoginAction | LogoutAction;