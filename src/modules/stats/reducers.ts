import { Reducer } from 'redux';

import {
    STATS_FETCH,
    STATS_FETCH_SUCCESS,
    STATS_FETCH_FAILURE,
    StatsState,
    StatsAction,
    PeriodState,
    PeriodType,
} from './types';
import { periods } from './contants';

const initialPeriodState: PeriodState = {
    data: null,
    loading: false,
    loadedAt: null,
    error: null,
};

const updateState = (state: StatsState, period: PeriodType, modifier: Partial<PeriodState>): StatsState => ({
    ...state,
    [period]: {
        ...(state[period] || initialPeriodState),
        ...modifier,
    },
});

const reducer: Reducer<StatsState, StatsAction> = (state = {}, action) => {
    switch (action.type) {
        case STATS_FETCH:
            return updateState(state, action.meta.period, { loading: true });

        case STATS_FETCH_SUCCESS:
            return updateState(state, action.meta.period, {
                data: action.payload,
                loading: false,
                loadedAt: Date.now(),
                error: null,
            });

        case STATS_FETCH_FAILURE:
            return updateState(state, action.meta.period, {
                loading: false,
                error: action.payload,
            });

        default:
            return state;
    }
};

export default reducer;
