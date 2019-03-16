import React from 'react';

import formatNumber from 'src/utils/formatNumber';
import Legend from 'src/components/Legend';

import styles from './styles.module.scss';

interface ISegment {
    title: string;
    color: string;
    value: number;
}

type Props = {
    segments: ISegment[];
    withLegend?: boolean;
};

class StackedBar extends React.Component<Props> {
    static defaultProps = {
        withLegend: false,
    };

    renderBar() {
        const { segments } = this.props;

        return (
            <div className={styles.bar}>
                {segments.map(({ title, color, value }) => {
                    if (value === 0) {
                        return null;
                    }

                    const style = {
                        flexGrow: value,
                        backgroundColor: color,
                    };

                    return (
                        <div
                            key={`${title}: ${value}`}
                            title={title}
                            className={styles.segment}
                            style={style}
                        />
                    );
                })}
            </div>
        );
    }

    renderLegend() {
        const { segments } = this.props;

        const items = segments.map(({ title, value, color }) => ({
            color,
            title: `${title}: ${formatNumber(value, 'decimal')}`,
        }));

        return (
            <div className={styles.legend}>
                <Legend
                    items={items}
                    direction="horizontal"
                />
            </div>
        );
    }

    render() {
        const { segments, withLegend } = this.props;

        const totalValue = segments.reduce((memo, segment) => memo + segment.value, 0);

        if (totalValue === 0) {
            return null;
        }

        return (
            <div className={styles.root}>
                {this.renderBar()}
                {withLegend && this.renderLegend()}
            </div>
        );
    }
}

export default StackedBar;
