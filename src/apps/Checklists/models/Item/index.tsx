import { createSelector } from "reselect";
import { ActionType, createStandardAction, getType } from "typesafe-actions";
import { DeepReadonly } from "utility-types";
import uuid from "uuid";
import { RootAction, RootState } from "../../../../containers";

/* ACTIONS */
export const createItem = createStandardAction("ITEM/CREATE")<CreateItem>();
export const updateItem = createStandardAction("ITEM/UPDATE")<UpdateItem>();
export const removeItem = createStandardAction("ITEM/REMOVE")<string>();
export const toggleActiveItem = createStandardAction("ITEM/TOGGLE_ACTIVE")<
  string
>();

/* INDEXES */
export const indexItemsByCreatedAt = (rows: Items): Items =>
  Object.values(rows).reduce((index: any, row) => {
    index[row.createdAt] = row.id;
    return index;
  }, {});
export const indexItemsByUserId = (rows: Items): Items =>
  Object.values(rows).reduce((index: any, row) => {
    index[row.userId] = row.userId ? [...index[row.userId], row.id] : [row.id];
    return index;
  }, {});

/* SELECTORS */
export const getItems = (state: RootState): Items => state.items;
export const getItemsFilterByActive = createSelector(
  [getItems],
  items => Object.values(items).filter(item => item.active)
);
export const getItemsByCreatedAt = createSelector(
  [getItems],
  items => Object.values(items).sort((a, b) => a.createdAt - b.createdAt)
);

/* INTERFACES */
export type Item = DeepReadonly<{
  id: string;
  name: string;
  description?: string;
  active: boolean;
  userId: string;
  sources?: string[];
  order?: number;
  createdAt: number;
  updatedAt: number;
}>;
export type Items = DeepReadonly<{ [key: string]: Item }>;
export type ItemsArray = DeepReadonly<Item[]>;
export type ItemActions = ActionType<
  | typeof createItem
  | typeof removeItem
  | typeof updateItem
  | typeof toggleActiveItem
>;
interface CreateItem {
  name: string;
  description?: string;
  active?: boolean;
}
type UpdateItem = CreateItem & { id: string };

/* REDUCER */
const initialState = {};
export const itemReducer = (
  state: Items = initialState,
  action: RootAction
): Items => {
  const id = uuid.v4();
  const timestamp = Date.now();
  switch (action.type) {
    case getType(createItem):
      return {
        ...state,
        [id]: {
          ...action.payload,
          active: true,
          createdAt: timestamp,
          id,
          order: timestamp,
          updatedAt: timestamp,
          userId: "1"
        }
      };
    case getType(updateItem):
      return {
        ...state,
        [action.payload.id]: {
          ...state[action.payload.id],
          ...action.payload,
          updatedAt: Date.now()
        }
      };
    case getType(removeItem):
      return {
        ...state,
        [action.payload]: {
          ...state[action.payload],
          active: false,
          updatedAt: Date.now()
        }
      };
    case getType(toggleActiveItem):
      return {
        ...state,
        [action.payload]: {
          ...state[action.payload],
          active: !state[action.payload].active,
          updatedAt: Date.now()
        }
      };
    default:
      return state;
  }
};
