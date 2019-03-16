import {
    PeriodType,
    PeriodStats,
    STATS_FETCH,
    STATS_FETCH_SUCCESS,
    STATS_FETCH_FAILURE,
    StatsFetchAction,
    StatsFetchSuccessAction,
    StatsFetchFailureAction,
} from './types';

export const fetch = (period: PeriodType): StatsFetchAction => ({
    type: STATS_FETCH,
    payload: { period },
    meta: { period },
});

export const fetchSuccess = (period: PeriodType, periodStats: PeriodStats): StatsFetchSuccessAction => ({
    type: STATS_FETCH_SUCCESS,
    payload: periodStats,
    meta: { period },
});

export const fetchFailure = (period: PeriodType, error: Error): StatsFetchFailureAction => ({
    type: STATS_FETCH_FAILURE,
    error: true,
    payload: error,
    meta: { period },
});
