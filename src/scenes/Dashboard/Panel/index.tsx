import React from 'react';
import { connect } from 'react-redux';

import { AppState } from 'src/store';
import { PeriodType } from 'src/modules/stats/types';
import { selectPeriodState } from 'src/modules/stats/selectors';
import withLoading from 'src/hocs/withLoading';
import Thresholds from 'src/containers/Thresholds';
import ErrorLevels from 'src/containers/ErrorLevels';
import Conversions from 'src/containers/Conversions';

import styles from './styles.module.scss';

type OwnProps = {
    period: PeriodType;
};

type Props = OwnProps;

const Panel = ({ period }: Props) => (
    <div>
        <div className={styles.section}>
            <Thresholds period={period} />

            <div className={styles.errorLevels}>
                <ErrorLevels period={period} />
            </div>
        </div>

        <div className={styles.section}>
            <Conversions period={period} />
        </div>
    </div>
);

const mapStateToProps = (state: AppState, ownProps: OwnProps) => {
    const periodState = selectPeriodState(state, ownProps);
    if (periodState == null) {
        return {};
    }
    const { loading, loadedAt, error } = periodState;
    return { loading, loadedAt, error };
};

export default connect(mapStateToProps)(withLoading(Panel));
