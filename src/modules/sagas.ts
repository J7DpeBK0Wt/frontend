/**
 * Combine all sagas in this file and export the combined saga.
 * We `fork()` these tasks so they execute in the background.
 */

import { all, fork } from 'redux-saga/effects';

import statsSaga from './stats/sagas';

export default function* rootSaga() {
    yield all([
        fork(statsSaga),
    ]);
}
