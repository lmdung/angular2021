import { User } from "../user.model";
import * as AuthActions from "./auth.actions";

export interface State {
  user: User,
  authError: string,
  loading: boolean,
}

const initialState: State = {
  user: null,
  authError: null,
  loading: false,
}
export function authReducer(state = initialState, action: AuthActions.AuthActions) {
  switch (action.type) {
    case AuthActions.AUTHENTICATE_SUCCESS:
      console.log('hello aem')
      const user = new User(
        action.payload.email,
        action.payload.userId,
        action.payload.token,
        action.payload.expirationDate
      )
      return {
        ...state,
        user: user,
        authError: null,
        loading: false,
      }
    case AuthActions.LOGIN_START:
    case AuthActions.SIGNUP_START:
      return {
        ...state,
        authError: null,
        loading: true
      }
    case AuthActions.LOGOUT:
      return {
        ...state,
        user: null,
        authError: null,
      }
    case AuthActions.AUTHENTICATE_FAIL:
      return {
        ...state,
        user: null,
        loading: false,
        authError: action.payload
      }
    case AuthActions.CLEAR_ERROR:
      return {
        ...state,
        authError: null,
      }
    default:
      return state;
  }
}