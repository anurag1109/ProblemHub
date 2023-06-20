import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addProblem,
  getCategoryItemRun,
  getMyProblem,
  getProblem,
  getProblemById,
  getProbleTypeRun,
  searchProblem,
  selectProblemType,
  updateProblemRun,
} from "./action";
import {
  getCategoryItemSelector,
  getMyProblemSelector,
  getMyProblemTypesSelector,
  getProblemByIdSelector,
  getProblemSelector,
  getSelectedProblemTypeSelector,
} from "./selector";

export function useProblem(): [
  ReadonlyArray<Problem>,
  (data?:string) => void,
  (data: Problem) => void,
  (data: Problem, onComplete?: () => void) => void
] {
  const dispatch = useDispatch();
  const problems = useSelector(getProblemSelector);
  const getProblems = React.useCallback(
    (data?:string) => dispatch(getProblem(data)),
    [dispatch]
  );
  const createProblems = React.useCallback(
    (data: Problem) => dispatch(addProblem(data)),
    [dispatch]
  );
  const updateProblem = React.useCallback(
    (data: Problem, onComplete?: () => void) =>
      dispatch(updateProblemRun(data, onComplete)),
    [dispatch]
  );
  return [problems, getProblems, createProblems, updateProblem];
}

export function useProblemById(): [
  Problem | undefined,
  (data: string) => void
] {
  const dispatch = useDispatch();
  const problem = useSelector(getProblemByIdSelector);
  const getProblems = React.useCallback(
    (data: string) => dispatch(getProblemById(data)),
    [dispatch]
  );

  return [problem, getProblems];
}

export function useMyProblem(): [ReadonlyArray<Problem>, () => void] {
  const dispatch = useDispatch();
  const problems = useSelector(getMyProblemSelector);
  const getProblems = React.useCallback(
    () => dispatch(getMyProblem()),
    [dispatch]
  );
  return [problems, getProblems];
}

export function useProblemTypes(): [ReadonlyArray<ProblemType>, () => void] {
  const dispatch = useDispatch();
  const problemTypes = useSelector(getMyProblemTypesSelector);
  const getProblemTypes = React.useCallback(
    () => dispatch(getProbleTypeRun()),
    [dispatch]
  );
  return [problemTypes, getProblemTypes];
}

export function useSelectProblemType(): [
  ProblemType | undefined,
  (data: ProblemType) => void
] {
  const dispatch = useDispatch();
  const problemType = useSelector(getSelectedProblemTypeSelector);
  const selectedProblemType = React.useCallback(
    (data: ProblemType) => dispatch(selectProblemType(data)),
    [dispatch]
  );
  return [problemType, selectedProblemType];
}

export function useCategoryItem(): [
  ReadonlyArray<Problem>,
  (data: string) => void
] {
  const dispatch = useDispatch();
  const problems = useSelector(getCategoryItemSelector);
  const getProblemsItem = React.useCallback(
    (data: string) => dispatch(getCategoryItemRun(data)),
    [dispatch]
  );
  return [problems, getProblemsItem];
}

export function useSearch(): [(data: Search) => void] {
  const dispatch = useDispatch();
  const search = React.useCallback(
    (data: Search) => dispatch(searchProblem(data)),
    [dispatch]
  );
  return [search];
}
