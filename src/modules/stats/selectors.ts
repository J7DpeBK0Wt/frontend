import { AppState } from 'src/store';

import { PeriodType } from './types';

export const selectStats  = (state: AppState) => state.stats;

export const selectPeriodState = (state: AppState, props: { period: PeriodType }) =>
    selectStats(state)[props.period];

export const selectPeriodStats = (state: AppState, props: { period: PeriodType }) => {
    const periodState = selectPeriodState(state, props);
    return periodState != null ? periodState.data : null;
};
