import React from 'react';

import formatNumber from 'src/utils/formatNumber';

type Props = {
    value: number;
    format: 'decimal' | 'percent';
    fractionDigits?: number;
    forceSign?: boolean;
};

const FormattedNumber = ({
    value,
    format,
    fractionDigits = 2,
    forceSign = false,
}: Props) => (
    <React.Fragment>
        {formatNumber(value, format, { fractionDigits, forceSign })}
    </React.Fragment>
);

export default FormattedNumber;
