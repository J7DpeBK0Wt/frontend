import cn from 'classnames';
import React from 'react';

import styles from './styles.module.scss';

type Props = {
    theme: 'success' | 'danger';
};

const StatusIcon = ({ theme }: Props) => (
    <div className={cn(styles.root, styles[`root_theme_${theme}`])} />
);

export default StatusIcon;
