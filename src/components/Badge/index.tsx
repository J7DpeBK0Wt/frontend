import cn from 'classnames';
import React, { ReactNode } from 'react';

import styles from './styles.module.scss';

type Props = {
    children: ReactNode;
    theme: 'success' | 'danger';
};

const Badge = ({ children, theme }: Props) => (
    <div className={cn(styles.root, styles[`root_theme_${theme}`])}>
        {children}
    </div>
);

export default Badge;
