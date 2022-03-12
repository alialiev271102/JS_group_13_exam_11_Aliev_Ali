import {createReducer, on} from "@ngrx/store";
import {
  createItemsFail,
  createItemsRequest,
  createItemsSuccess,
  fetchItemsFail,
  fetchItemsRequest,
  fetchItemsSuccess
} from "./item.actions";
import {Item} from "../models/item.model";

const initialState = {
  items: <Item[]>[],
  fetchLoading: false,
  fetchError: '',
  createLoading: false,
  createError: '',
}

export const itemReducer = createReducer(
  initialState,
  on(fetchItemsRequest, state => ({...state, fetchLoading: true})),
  on(fetchItemsSuccess, (state, {items}) => ({
    ...state,
    fetchLoading: false,
    items
  })),
  on(fetchItemsFail, (state, {error}) => ({
    ...state,
    fetchLoading: false,
    fetchError: error
  })),
  on(createItemsRequest, state => ({...state, createLoading: true})),
  on(createItemsSuccess, state => ({...state, createLoading: false})),
  on(createItemsFail, (state, {error}) => ({
    ...state,
    createLoading: false,
    createError: error,
  }))
);
