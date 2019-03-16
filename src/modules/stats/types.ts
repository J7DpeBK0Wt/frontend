export const STATS_FETCH = '@stats/FETCH';
export const STATS_FETCH_SUCCESS = '@stats/FETCH_SUCCESS';
export const STATS_FETCH_FAILURE = '@stats/FETCH_FAILURE';

export type PeriodType =
    | 'last_3days'
    | 'yesterday'
    | 'last_hour';

export type ConversionType =
    | 'searches'
    | 'clicks'
    | 'bookings';

export type ConversionIndicatorType =
    | 'mobile_pessimizer'
    | 'web_pessimizer'
    | 'ctr'
    | 'str'
    | 'avg_price';

export type ThresholdType =
    | 'errors'
    | 'zeroes'
    | 'timeouts';

export interface Threshold {
    type: ThresholdType;
    value: number | null;
    averageValue: number | null;
    dangerValue: number;
}

export interface ErrorLevel {
    code: number | null;
    count: number;
}

export interface ConversionIndicator {
    type: ConversionIndicatorType;
    value: number;
}

export interface Conversion {
    type: ConversionType;
    final: boolean;
    value: number;
    prevValue: number;
    indicators: ConversionIndicator[];
}

export interface PeriodStats {
    thresholds: Threshold[];

    errorLevels: ErrorLevel[];

    conversions: Conversion[];
}

export interface StatsFetchActionPayload {
    period: PeriodType;
}

export interface StatsMeta {
    period: PeriodType;
}

export interface StatsBaseAction {
    meta: StatsMeta;
}

export interface StatsFetchAction extends StatsBaseAction {
    type: typeof STATS_FETCH;
    payload: StatsFetchActionPayload;
}

export interface StatsFetchSuccessAction extends StatsBaseAction {
    type: typeof STATS_FETCH_SUCCESS;
    payload: PeriodStats;
}

export interface StatsFetchFailureAction extends StatsBaseAction {
    type: typeof STATS_FETCH_FAILURE;
    error: true;
    payload: Error;
}

export type StatsAction =
    | StatsFetchAction
    | StatsFetchSuccessAction
    | StatsFetchFailureAction;

export interface PeriodState {
    data: PeriodStats | null;
    loading: boolean;
    loadedAt: number | null;
    error: Error | null;
}

export type StatsState = {
    [T in PeriodType]?: PeriodState;
};
