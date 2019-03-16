import cn from 'classnames';
import React from 'react';

import styles from './styles.module.scss';

interface ILegendItem {
    title: string;
    color: string;
}

type Props = {
    items: ILegendItem[];
    direction?: 'horizontal' | 'vertical';
};

const Legend = ({ items, direction = 'horizontal' }: Props) => (
    <div className={cn(styles.root, styles[`root_direction_${direction}`])}>
        {items.map(({ title, color }) => (
            <div key={title} className={styles.item}>
                <div className={styles.item__icon} style={{ backgroundColor: color }} />
                <div className={styles.item__title}>{title}</div>
            </div>
        ))}
    </div>
);

export default Legend;
