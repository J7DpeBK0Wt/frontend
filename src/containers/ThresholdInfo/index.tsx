import React from 'react';
import { connect } from 'react-redux';

import { AppState } from 'src/store';
import { PeriodType, Threshold } from 'src/modules/stats/types';
import { selectPeriodStats } from 'src/modules/stats/selectors';
import ThresholdInfo from 'src/components/ThresholdInfo';

type OwnProps = {
    period: PeriodType;
    thresholdId: number;
};

type Props = OwnProps & {
    threshold?: Threshold;
};

const ThresholdInfoContainer = ({ threshold }: Props) => {
    if (threshold == null) {
        return null;
    }

    return <ThresholdInfo threshold={threshold} />;
};

const mapStateToProps = (state: AppState, ownProps: OwnProps) => {
    const periodStats = selectPeriodStats(state, ownProps);
    const threshold = periodStats ? periodStats.thresholds[ownProps.thresholdId] : undefined;
    return { threshold };
};

export default connect(mapStateToProps)(ThresholdInfoContainer);
