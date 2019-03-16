import React from 'react';
import { connect } from 'react-redux';

import { AppState } from 'src/store';
import { PeriodType, Threshold } from 'src/modules/stats/types';
import { selectPeriodStats } from 'src/modules/stats/selectors';
import ThresholdInfo from 'src/containers/ThresholdInfo';

import styles from './styles.module.scss';

type OwnProps = {
    period: PeriodType;
};

type Props = OwnProps & {
    thresholds: Threshold[];
};

const Thresholds = ({ period, thresholds }: Props) => {
    if (thresholds.length === 0) {
        return null;
    }

    return (
        <div className={styles.root}>
            {thresholds.map(({ type }, index) => (
                <ThresholdInfo
                    key={type}
                    period={period}
                    thresholdId={index}
                />
            ))}
        </div>
    );
};

const mapStateToProps = (state: AppState, ownProps: OwnProps) => {
    const periodStats = selectPeriodStats(state, ownProps);
    const thresholds = periodStats ? periodStats.thresholds : [];
    return { thresholds };
};

export default connect(mapStateToProps)(Thresholds);
