import request from './request';
import { PeriodType, PeriodStats } from 'src/modules/stats/types';

export interface GetResponse {
    period: PeriodType;
    stats: PeriodStats;
}

export const get = async (period: PeriodType) => {
    const response: GetResponse = await request({
        entrypoint: '/stats',
        method: 'GET',
        query: { period },
    });

    return response.stats;
};
