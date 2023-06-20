import _ from 'lodash';
import { createSelector } from 'reselect';
import { ApplicationState } from '../../models/ApplicationState';
const stateKey = 'Problem';

const getProblemState = (state:ApplicationState) => _.get(state, stateKey);
export const getProblemSelector=createSelector(getProblemState,(state):ReadonlyArray<Problem>=>_.get(state,"problems"));
export const getProblemByIdSelector=createSelector(getProblemState,(state)=>_.get(state,"problem"));
export const getMyProblemSelector=createSelector(getProblemState,(state):ReadonlyArray<Problem>=>_.get(state,"myProblems"));
export const getMyProblemTypesSelector=createSelector(getProblemState,(state):ReadonlyArray<ProblemType>=>_.get(state,"problemTypes"));
export const getSelectedProblemTypeSelector=createSelector(getProblemState,(state):ProblemType|undefined=>_.get(state,"selectedProblemType"));
export const getCategoryItemSelector=createSelector(getProblemState,(state):ReadonlyArray<Problem>=>_.get(state,"categoryItems"));
