import {createAction, props} from "@ngrx/store";
import {LoginError, LoginUserData, RegisterError, RegisterUserData, User} from "../models/user.model";

export const registerUserRequest = createAction(
  "[Users] Register request",
  props<{userData: RegisterUserData}>()
);
export const registerUserSuccess = createAction(
  "[Users] Register success",
  props<{user: User}>()
);
export const registerUserFail = createAction(
  "[Users] Register fail",
  props<{error: RegisterError | null}>()
);
export const loginUserRequest = createAction(
  "[Users] Login request",
  props<{userData: LoginUserData}>()
);
export const loginUserSuccess = createAction(
  "[Users] Login success",
  props<{user: User}>()
);
export const loginUserFail = createAction(
  "[Users] Login fail",
  props<{error: LoginError | null}>()
);

export const logoutUser = createAction('[Users] Logout');
export const logoutUserRequest = createAction('[Users] Server Logout Request');
