import { connect } from 'react-redux';

import { AppState } from 'src/store';
import { PeriodType } from 'src/modules/stats/types';
import { selectPeriodStats } from 'src/modules/stats/selectors';
import StackedBar from 'src/components/StackedBar';

type OwnProps = {
    period: PeriodType;
};

const colors = ['#FFCC00', '#5856D5', '#2196F3', '#A0B0B9'];

const mapStateToProps = (state: AppState, ownProps: OwnProps) => {
    const periodStats = selectPeriodStats(state, ownProps);
    const errorLevels = periodStats ? periodStats.errorLevels : [];
    const segments = errorLevels.map(({ code, count }, index) => ({
        title: code != null ? `Error ${code}` : 'Other',
        value: count,
        color: colors[index % colors.length],
    }));
    return { segments, withLegend: true };
};

export default connect(mapStateToProps)(StackedBar);
