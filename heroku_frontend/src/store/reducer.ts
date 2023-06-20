import { combineReducers } from 'redux';
import User from './user/reducer';
import Layout from './layout/reducer';
import Problem from './problem/reducer';
import Theme from './theme/reducer'
export const createRootReducer=()=>
    combineReducers({
        User,
        Layout,
        Problem,
        Theme,
    });