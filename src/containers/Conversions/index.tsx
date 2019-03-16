import React from 'react';
import { connect } from 'react-redux';

import { AppState } from 'src/store';
import { PeriodType, Conversion } from 'src/modules/stats/types';
import { selectPeriodStats } from 'src/modules/stats/selectors';
import ConversionInfo from 'src/containers/ConversionInfo';

type OwnProps = {
    period: PeriodType;
};

type Props = OwnProps & {
    conversions: Conversion[];
};

const Conversions = ({ period, conversions }: Props) => {
    if (conversions.length === 0) {
        return null;
    }

    return (
        <div>
            {conversions.map(({ type }, index) => (
                <ConversionInfo
                    key={type}
                    period={period}
                    conversionId={index}
                />
            ))}
        </div>
    );
};

const mapStateToProps = (state: AppState, ownProps: OwnProps) => {
    const periodStats = selectPeriodStats(state, ownProps);
    const conversions = periodStats ? periodStats.conversions : [];
    return { conversions };
};

export default connect(mapStateToProps)(Conversions);
