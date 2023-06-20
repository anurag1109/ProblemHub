import _ from 'lodash';
import { createSelector } from 'reselect';
import { ApplicationState } from '../../models/ApplicationState';
const stateKey = 'User';

const getUserState = (state:ApplicationState) => _.get(state, stateKey);
export const getIsAuth=createSelector(getUserState,(state)=>_.get(state,"isAuthenticate"));
export const isVarificationYNSelector=createSelector(getUserState,(state):boolean=>_.get(state,"varification"));
export const emailSelector=createSelector(getUserState,(state):string|undefined=>_.get(state,"email"));
export const userContextSelector=createSelector(getUserState,(state)=>_.get(state,"userContext"));


