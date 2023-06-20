import { Action } from "redux";

export const SET_ERROR = "layout/SET_ERROR";
export const showError = (data: ERROR) => ({
  type: SET_ERROR,
  payload: data,
});
export const HIDE_ERROR = "layout/HIDE_ERROR";
export const hideError = () => ({
  type: HIDE_ERROR,
});
export interface ErrorAction extends Action<typeof SET_ERROR> {
  payload: ERROR;
}
export interface HideErrorAction extends Action<typeof HIDE_ERROR> {}

export const SHOW_LOADER = "layout/IS_LOADER";
export const showLoading = () => ({
  type: SHOW_LOADER,
});
export const HIDE_LOADER = "layout/HIDE_LOADER";
export const hideLoading = () => ({
  type: HIDE_LOADER,
});

export const ADD_NOTIFICATION = "layout/ADD_NOTIFICATION";
export const addNotification = (data: string | undefined) => ({
  type: ADD_NOTIFICATION,
  payload: data,
});
export const NAVBAR_TOGGLE = "layout/NAVBAR_TOGGLE";
export const navbarTogle = () => ({
  type: NAVBAR_TOGGLE,
});
export const SORT_BY = "layout/SORT_BY";
export const sortByAction = (data: SortBY) => ({
  type: SORT_BY,
  payload: data,
});
export const SEARCH_INPUT = "layout/SEARCH_INPUT";
export const searchInput = (data: Search) => ({
  type: SEARCH_INPUT,
  payload: data,
});
export const GET_AUTO_SEARCH = "layout/GET_AUTO_SEARCH";
export const getAutoSearch = (data?: string) => ({
  type: GET_AUTO_SEARCH,
  payload: data,
});
export const SET_AUTO_SEARCH_USERS = "layout/SET_AUTO_SEARCH_USERS";
export const setAutoSearchUsers = (data: ReadonlyArray<AutoSearchUser>) => ({
  type: SET_AUTO_SEARCH_USERS,
  payload: data,
});

export interface AddNotificationAction extends Action<typeof ADD_NOTIFICATION> {
  readonly payload: string | undefined;
}
export interface ShowLoaderAction extends Action<typeof SHOW_LOADER> {}
export interface HideLoaderAction extends Action<typeof HIDE_LOADER> {}
export interface NavbarAction extends Action<typeof NAVBAR_TOGGLE> {}
export interface SortBYAction extends Action<typeof SORT_BY> {
  readonly payload: SortBY;
}
export interface SearchInputAction extends Action<typeof SEARCH_INPUT> {
  readonly payload: Search;
}
export interface AutoSearch extends Action<typeof SET_AUTO_SEARCH_USERS> {
  readonly payload: ReadonlyArray<AutoSearchUser>;
}

export type LayoutActions =
  | ErrorAction
  | HideErrorAction
  | ShowLoaderAction
  | HideLoaderAction
  | AddNotificationAction
  | NavbarAction
  | SortBYAction
  | SearchInputAction
  | AutoSearch
