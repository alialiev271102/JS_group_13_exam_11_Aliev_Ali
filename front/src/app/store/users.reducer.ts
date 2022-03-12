import {createReducer, on} from "@ngrx/store";
import {UsersState} from "./type";
import {
  loginUserFail,
  loginUserRequest,
  loginUserSuccess,
  logoutUser,
  registerUserFail,
  registerUserRequest,
  registerUserSuccess
} from "./users.actions";

const initialState: UsersState = {
  user: null,
  registerLoading: false,
  registerError: null,
  loginLoading: false,
  loginError: null,
};

export const UserReducer = createReducer(
  initialState,
  on(registerUserRequest, state => ({
    ...state,
    registerLoading: true,
    registerError: null
  })),
  on(registerUserSuccess, (state, {user}) => ({
    ...state,
    registerLoading: false,
    user
  })),
  on(registerUserFail, (state, {error}) => ({
    ...state,
    registerLoading: false,
    registerError: error
  })),
  on(loginUserRequest, state => ({
    ...state,
    loginLoading: true,
    loginError: null,
  })),
  on(loginUserSuccess, (state, {user}) => ({
    ...state,
    loginLoading: false,
    user
  })),
  on(loginUserFail, (state, {error}) => ({
    ...state,
    loginLoading: false,
    loginError: error
  })),
  on(logoutUser, state => ({
    ...state,
    user: null,
  }))
)

