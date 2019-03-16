import cn from 'classnames';
import React from 'react';

import { ThresholdType, Threshold } from 'src/modules/stats/types';
import StatusIcon from 'src/components/StatusIcon';
import FormattedNumber from 'src/components/FormattedNumber';

import styles from './styles.module.scss';

const titleMap: { [T in ThresholdType]: string } = {
    errors: 'Errors',
    zeroes: 'Zeroes',
    timeouts: 'Timeouts',
};

type Props = {
    threshold: Threshold;
};

const ThresholdInfo = ({ threshold }: Props) => {
    const {
        type,
        value,
        averageValue,
        dangerValue,
    } = threshold;

    if (value == null) {
        return null;
    }

    const title = titleMap[type];
    const theme = value >= dangerValue ? 'danger' : 'success';

    return (
        <div className={styles.root}>
            <div className={styles.icon}>
                <StatusIcon theme={theme} />
            </div>

            <div className={styles.values}>
                <div className={cn(styles.value, styles[`value_theme_${theme}`])}>
                    {title}: <FormattedNumber value={value} format="percent" />
                </div>

                {averageValue != null && (
                    <div className={styles.averageValue}>
                        Average: <FormattedNumber value={averageValue} format="percent" />
                    </div>
                )}
            </div>
        </div>
    );
};

export default ThresholdInfo;
