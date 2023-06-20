import _ from 'lodash';
import { createSelector } from 'reselect';
import { ApplicationState } from '../../models/ApplicationState';
const stateKey = 'Theme';

const getThemeState = (state:ApplicationState) => _.get(state, stateKey);

export const themeSelector=createSelector(getThemeState,(state):'light'|'dark'=>_.get(state,"theme"));
export const themeColorSelector=createSelector(getThemeState,(state):ThemeColor=>_.get(state,"themeColor"));
