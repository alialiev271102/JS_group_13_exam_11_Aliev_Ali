import { Item } from '../models/item.model';
import { LoginError, RegisterError, User } from '../models/user.model';

export type ItemsState = {
  item: Item,
  items: Item[],
  fetchLoading: boolean,
  fetchError: null | string,
  createLoading: boolean,
  createError: null | string,
};

export type UsersState = {
  user: null | User,
  registerLoading: boolean,
  registerError: null | RegisterError,
  loginLoading: boolean,
  loginError: null | LoginError,
}

export type AppState = {
  items: ItemsState,
  users: UsersState,
}
