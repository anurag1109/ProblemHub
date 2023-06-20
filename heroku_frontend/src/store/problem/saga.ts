import { call, takeLatest, put, select } from "redux-saga/effects";

import { Method, ApiResponse, callApi } from "../../services/api/Api";
import { history } from "../../services/history";
import RouteService from "../../services/route.services";
import {
  addNotification,
  GET_AUTO_SEARCH,
  hideLoading,
  setAutoSearchUsers,
  showError,
  showLoading,
} from "../layout/action";
import { searchInputSelector, sortBySelector } from "../layout/selector";
import {
  ADD_PROBLEM,
  CreateCategoryTypeAction,
  CREATE_CATEGORY_TYPES,
  getCategoryItemComplete,
  getProblem,
  getProblemById,
  getProblemByIdComplete,
  getProblemTypeComplete,
  getProbleTypeRun,
  GET_CATEGORY_ITEMS_RUN,
  GET_MY_PROBLEM,
  GET_PROBLEM,
  GET_PROBLEM_ID,
  GET_PROBLEM_TYPE,
  SEARCH_PROBLEM,
  setMyProblems,
  setProblems,
  UpdateProblemAction,
  UPDATE_PROBLEM_RUN,
} from "./action";

export function* callGetProblem(action:{type:string;payload:string}):any {
  try {
    const sortBy=yield select(sortBySelector);
    const search=yield select(searchInputSelector)
    const _id=action.payload||(search && search.autoSearchData?._id);
    yield put(showLoading());
    const response: ApiResponse<ReadonlyArray<Problem>> = yield call(callApi, {
      method: Method.GET,
      url: "/problems/all",
      params:{...sortBy,_id}
    });
    const { data } = response;
    yield put(setProblems(data));
    yield put(hideLoading());
  } catch (err) {
    yield put(hideLoading());
    yield put(showError({ title: "Error", error: err }));
  }
}
export function* watchGetProblem() {
  yield takeLatest(GET_PROBLEM, callGetProblem);
}

export function* callGetProblemById(action: {
  readonly type: string;
  readonly payload: string;
}) {
  try {
    yield put(showLoading());
    const response: ApiResponse<Problem> = yield call(callApi, {
      method: Method.GET,
      url: `/problem/${action.payload}`,
    });
    const { data } = response;
    yield put(getProblemByIdComplete(data));
    yield put(hideLoading());
  } catch (err) {
    yield put(hideLoading());
    yield put(showError({ title: "Error", error: err }));
  }
}
export function* watchGetProblemById() {
  yield takeLatest(GET_PROBLEM_ID, callGetProblemById);
}

export function* callCreateProblem(action: {
  readonly type: string;
  readonly payload: Problem;
}) {
 
  try {
    yield put(showLoading());
    const response: ApiResponse<{ readonly title: string }> = yield call(
      callApi,
      {
        data: action.payload,
        method: Method.POST,
        url: "/problem",
      }
    );
    const { data } = response;
    yield put(addNotification(`${data.title} successfully created.`));
    yield put(getProblem());
    yield put(hideLoading());
    history.push(RouteService.myProblem.getPath());
  } catch (err) {
    yield put(hideLoading());
    yield put(showError({ title: "Error", error: err }));
  }
}
export function* watchCreateProblem() {
  yield takeLatest(ADD_PROBLEM, callCreateProblem);
}

export function* callUpdateProblem(action: UpdateProblemAction) {
  try {
    yield put(showLoading());
    const response: ApiResponse<{ readonly message: string }> = yield call(
      callApi,
      {
        data: action.payload.data,
        method: Method.PUT,
        url: "/problem",
      }
    );
    const { data } = response;
    yield put(addNotification(data.message));
    yield put(getProblemById(action.payload.data._id || ""));
    if (action.meta.onComplete) {
      action.meta.onComplete();
    }
    yield put(hideLoading());
  } catch (err) {
    yield put(hideLoading());
    yield put(showError({ title: "Error", error: err }));
  }
}
export function* watchUpdateProblem() {
  yield takeLatest(UPDATE_PROBLEM_RUN, callUpdateProblem);
}

export function* callGetMyProblem():any {
  try {
    const sortBy=yield select(sortBySelector);
    yield put(showLoading());
    const response: ApiResponse<ReadonlyArray<Problem>> = yield call(callApi, {
      method: Method.GET,
      url: "/problem",
      params:sortBy
    });
    const { data } = response;
    yield put(setMyProblems(data));
    yield put(hideLoading());
  } catch (err) {
    yield put(hideLoading());
    yield put(showError({ title: "Error", error: err }));
  }
}
export function* watchGetMyProblem() {
  yield takeLatest(GET_MY_PROBLEM, callGetMyProblem);
}

export function* callGetProblemTypes() {
  try {
    yield put(showLoading());
    const response: ApiResponse<ReadonlyArray<ProblemType>> = yield call(
      callApi,
      {
        method: Method.GET,
        url: "/problem-types",
      }
    );
    const { data } = response;
    yield put(getProblemTypeComplete(data));
    yield put(hideLoading());
  } catch (err) {
    yield put(hideLoading());
    yield put(showError({ title: "Error", error: err }));
  }
}
export function* watchGetProblemTypes() {
  yield takeLatest(GET_PROBLEM_TYPE, callGetProblemTypes);
}
export function* callGetCategoryItemId(action: {
  readonly type: string;
  readonly payload: string;
}):any {
  try {
    const sortBy=yield select(sortBySelector);
    const search:Search=yield select(searchInputSelector);
    yield put(showLoading());
    const response: ApiResponse<ReadonlyArray<Problem>> = yield call(callApi, {
      method: Method.GET,
      url: `/problem-types/${action.payload}`,
      params:{...sortBy,...search}
    });
    const { data } = response;
    yield put(getCategoryItemComplete(data));
    yield put(hideLoading());
  } catch (err) {
    yield put(hideLoading());
    yield put(showError({ title: "Error", error: err }));
  }
}
export function* watchGetCategoryItemId() {
  yield takeLatest(GET_CATEGORY_ITEMS_RUN, callGetCategoryItemId);
}

export function* callCreateCategory(action: CreateCategoryTypeAction) {
  try {
    yield put(showLoading());
    const response: ApiResponse<{ readonly title: string }> = yield call(
      callApi,
      {
        data: action.payload.data,
        method: Method.POST,
        url: "/problem-type",
      }
    );
    const { data } = response;
    yield put(addNotification(data.title));
    yield put(getProbleTypeRun());
    if (action.meta.onComplete) {
      action.meta.onComplete();
    }
    yield put(hideLoading());
  } catch (err) {
    yield put(hideLoading());
    yield put(showError({ title: "Error", error: err }));
  }
}
export function* watchCreateCategory() {
  yield takeLatest(CREATE_CATEGORY_TYPES, callCreateCategory);
}

export function* callSearchProblem(action:{type:string,payload:Search}):any {
  try {
    const sortBy=yield select(sortBySelector);
    yield put(showLoading());
    const response: ApiResponse<ReadonlyArray<Problem>> = yield call(callApi, {
      method: Method.GET,
      url: "/problems/search",
      params:{...sortBy,...action.payload}
    });
    const { data } = response;
    if(!!action.payload.id){
      yield put(setMyProblems(data));
    }else{
      yield put(setProblems(data));
    }
    yield put(hideLoading());
  } catch (err) {
    yield put(hideLoading());
    yield put(showError({ title: "Error", error: err }));
  }
}
export function* watchSearchProblem() {
  yield takeLatest(SEARCH_PROBLEM, callSearchProblem);
}

export function* callAutoSearch(action:{type:string,payload:string}):any {
  try {
    const response: ApiResponse<ReadonlyArray<AutoSearchUser>> = yield call(callApi, {
      method: Method.GET,
      url: "/user/search",
      params:{search:action.payload}
    });
    const { data } = response;
    yield put(setAutoSearchUsers(data))
  } catch (err) {
    yield put(showError({ title: "Error", error: err }));
  }
}
export function* watchAutoSearch() {
  yield takeLatest(GET_AUTO_SEARCH, callAutoSearch);
}



export default [
  watchGetProblem,
  watchCreateProblem,
  watchGetProblemById,
  watchUpdateProblem,
  watchGetMyProblem,
  watchGetProblemTypes,
  watchGetCategoryItemId,
  watchCreateCategory,
  watchSearchProblem,
  watchAutoSearch
];
