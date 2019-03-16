import React from 'react';
import { connect } from 'react-redux';

import { AppState } from 'src/store';
import { PeriodType, Conversion } from 'src/modules/stats/types';
import { selectPeriodStats } from 'src/modules/stats/selectors';
import ConversionInfo from 'src/components/ConversionInfo';

type OwnProps = {
    period: PeriodType;
    conversionId: number;
};

type Props = OwnProps & {
    conversion?: Conversion;
};

const ConversionInfoContainer = ({ period, conversion }: Props) => {
    if (conversion == null) {
        return null;
    }

    return <ConversionInfo period={period} conversion={conversion} />;
};

const mapStateToProps = (state: AppState, ownProps: OwnProps) => {
    const periodStats = selectPeriodStats(state, ownProps);
    const conversion = periodStats ? periodStats.conversions[ownProps.conversionId] : undefined;
    return { conversion };
};

export default connect(mapStateToProps)(ConversionInfoContainer);
