import { PeriodType } from './types';

export const periods: PeriodType[] = ['last_hour', 'yesterday', 'last_3days'];

export const periodTitleMap: { [T in PeriodType]: string } = {
    last_hour: 'Last hour',
    yesterday: 'Yesterday',
    last_3days: 'Last 3 days',
};
