import { Action } from "redux";

export const ADD_PROBLEM='prolem/ADD_PROBLEM';
export const addProblem=(data:Problem)=>({
    type:ADD_PROBLEM,
    payload:data
})

export const SET_PROBLEMS='problem/SET_PROBLEMS';
export const setProblems=(data:ReadonlyArray<Problem>)=>({
    type:SET_PROBLEMS,
    payload:data
})
export const GET_PROBLEM='problem/GET_PROBLEM';
export const getProblem=(data?:string)=>({
    type:GET_PROBLEM,
    payload:data
})

export const SET_MY_PROBLEMS='problem/SET_MY_PROBLEMS';
export const setMyProblems=(data:ReadonlyArray<Problem>)=>({
    type:SET_MY_PROBLEMS,
    payload:data
})
export const GET_MY_PROBLEM='problem/GET_MY_PROBLEM';
export const getMyProblem=()=>({
    type:GET_MY_PROBLEM
})




export const GET_PROBLEM_ID='problem/GET_PROBLEM_ID';
export const getProblemById=(data:string)=>({
    type:GET_PROBLEM_ID,
    payload:data
})
export const GET_PROBLEM_ID_COMPLETE='problem/GET_PROBLEM_ID_COMPLETE';
export const getProblemByIdComplete=(data:Problem)=>({
    type:GET_PROBLEM_ID_COMPLETE,
    payload:data
})


export const UPDATE_PROBLEM_RUN='problem/UPDATE_PROBLEM_RUN';
export interface UpdateProblemAction extends Action<typeof UPDATE_PROBLEM_RUN>,
OnCompleteAction{
  readonly payload:{
    readonly data:Problem;
  }
}
export const updateProblemRun=(
  data:Problem,
  onComplete?:()=>void
):UpdateProblemAction=>({
  meta:{
    onComplete
  },
  payload:{
    data
  },
  type:UPDATE_PROBLEM_RUN
})

export const CREATE_CATEGORY_TYPES='problem/CREATE_CATEGORY_TYPES';
export interface CreateCategoryTypeAction extends Action<typeof CREATE_CATEGORY_TYPES>,
OnCompleteAction{
  readonly payload:{
    readonly data:CreateCategoryPyload;
  }
}
export const createCaegoryRun=(
  data:CreateCategoryPyload,
  onComplete?:()=>void
):CreateCategoryTypeAction=>({
  meta:{
    onComplete
  },
  payload:{
    data
  },
  type:CREATE_CATEGORY_TYPES
})

export const GET_PROBLEM_TYPE='problem/GET_PROBLEM_TYPE';
export const getProbleTypeRun=()=>({
  type:GET_PROBLEM_TYPE
})
export const GET_PROBLEM_TYPE_COMPLETE='problem/GET_PROBLEM_TYPE_COMPLETE';
export const getProblemTypeComplete=(data:ReadonlyArray<ProblemType>)=>({
  type:GET_PROBLEM_TYPE_COMPLETE,
  payload:data
})

export const SELECT_PROBLEM_TYPE='problem/SELECT_PROBLEM_TYPE';
export const selectProblemType=(data:ProblemType)=>({
  type:SELECT_PROBLEM_TYPE,
  payload:data
})
export const GET_CATEGORY_ITEMS_RUN='problem/GET_CATEGORY_ITEMS_RUN';
export const getCategoryItemRun=(data:string)=>({
    type:GET_CATEGORY_ITEMS_RUN,
    payload:data,
})

export const GET_CATEGORY_ITEMS_COMPLETE='problem/GET_CATEGORY_ITEMS';
export const getCategoryItemComplete=(data:ReadonlyArray<Problem>)=>({
    type:GET_CATEGORY_ITEMS_COMPLETE,
    payload:data,
})
export const SEARCH_PROBLEM="problem/SEARCH_PROBLEM";
export const searchProblem=(data:Search)=>({
  type:SEARCH_PROBLEM,
  payload:data
})

export interface GetProblemTypeCompleteAction extends Action<typeof GET_PROBLEM_TYPE_COMPLETE>{
  readonly payload:ReadonlyArray<ProblemType>
}

export interface SetProbleBYIdmAction extends Action<typeof GET_PROBLEM_ID_COMPLETE>{
    readonly payload:Problem
}

export interface SetProbblemAction extends Action<typeof SET_PROBLEMS>{
    readonly payload:ReadonlyArray<Problem>
}

export interface SetMyProblemAction extends Action<typeof SET_MY_PROBLEMS>{
  readonly payload:ReadonlyArray<Problem>
}
export interface SelectProblemTypeAction extends Action<typeof SELECT_PROBLEM_TYPE>{
  readonly payload:ProblemType
}

export interface GetCategoryItemCompleteAction extends Action<typeof GET_CATEGORY_ITEMS_COMPLETE>{
  readonly payload:ReadonlyArray<Problem>
}

export type ProblemActions=
| SetProbblemAction
| SetProbleBYIdmAction
| SetMyProblemAction
| GetProblemTypeCompleteAction
| SelectProblemTypeAction
| GetCategoryItemCompleteAction