import { all } from "@redux-saga/core/effects";
import UserSagas from './user/saga';
import ProblemsSagas from './problem/saga';
export default function* rootSaga(){
    yield all([
      ...UserSagas.map((saga)=>saga()),
      ...ProblemsSagas.map((saga)=>saga())
    ]);
}