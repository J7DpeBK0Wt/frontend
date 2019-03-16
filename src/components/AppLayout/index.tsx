import React, { ReactNode } from 'react';

import SideNav from './SideNav';
import styles from './styles.module.scss';

type Props = {
    children: ReactNode;
};

const AppLayout = ({ children }: Props) => {
    return (
        <div className={styles.root}>
            <div className={styles.sideNav}>
                <SideNav />
            </div>

            <div className={styles.content}>
                {children}
            </div>
        </div>
    );
};

export default AppLayout;
