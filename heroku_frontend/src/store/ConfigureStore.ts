import * as localForage from "localforage";
import {Action, applyMiddleware,compose,createStore, Reducer} from "redux";
import {persistReducer,persistStore,PersistConfig} from 'redux-persist';
import createSagaMiddleware from "redux-saga";
import { createRootReducer } from "./reducer";
import rootSaga from "./sagas";
import { PersistPartial } from 'redux-persist/es/persistReducer';

import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2";
import { ApplicationState } from "../models/ApplicationState";
const persistConfig={
    key: 'root',
    storage:localForage,
    stateReconciler:autoMergeLevel2,
}

const sagaMiddleware =createSagaMiddleware();

export default function configureStore(
    initialState?: ApplicationState & PersistPartial,
    additionalPersistConfig: Partial<PersistConfig<ApplicationState>> = {}
){
    const reducer=createRootReducer();
    const rootReducer: Reducer<ApplicationState, Action>=(state,action):ApplicationState=>{
        return reducer(state,action)
    };
  const reduxMiddleware=[
      sagaMiddleware,
  ];
  const composeEnhancers=(window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const persistedReducer = persistReducer({ ...persistConfig, ...additionalPersistConfig }, rootReducer);

  const store =createStore(persistedReducer,initialState,composeEnhancers(applyMiddleware(...reduxMiddleware)));

  const persistor=persistStore(store);
  sagaMiddleware.run(rootSaga);
  return {persistor,store}

}
