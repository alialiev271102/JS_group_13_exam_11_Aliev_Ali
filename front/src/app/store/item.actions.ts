import {createAction, props} from "@ngrx/store";
import {Item, ItemData} from "../models/item.model";

export const fetchItemsRequest = createAction('[Item] Fetch Request');
export const fetchItemsSuccess = createAction(
  '[Item] Fetch Success',
  props<{items: Item[]}>()
);
export const fetchItemsFail = createAction(
  '[Item] Fetch Fail',
  props<{error: string}>()
);
export const createItemsRequest = createAction(
  '[Item] Create Request',
  props<{itemData: ItemData}>()
);
export const createItemsSuccess = createAction(
  '[Item] Create Success'
);
export const createItemsFail = createAction(
  '[Item] Create Fail',
  props<{error: string}>()
);
