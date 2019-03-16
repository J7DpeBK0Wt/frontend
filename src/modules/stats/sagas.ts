import { all, call, fork, put, takeEvery } from 'redux-saga/effects';

import * as StatsApi from 'src/api/stats';

import { STATS_FETCH, StatsFetchAction, PeriodStats } from './types';
import { fetchSuccess, fetchFailure } from './actions';

function* handleFetch(action: StatsFetchAction) {
    const { payload } = action;

    try {
        const periodStats: PeriodStats = yield call(StatsApi.get, payload.period);

        yield put(fetchSuccess(payload.period, periodStats));
    } catch (err) {
        yield put(fetchFailure(payload.period, err instanceof Error ? err : new Error('An unknown error occured.')));
    }
}

function* watchFetch() {
    yield takeEvery(STATS_FETCH, handleFetch);
}

export default function* statsSaga() {
    yield all([
        fork(watchFetch),
    ]);
}
