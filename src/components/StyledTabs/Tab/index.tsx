import React, { ReactNode } from 'react';
import { Tab } from 'react-tabs';

import styles from './styles.module.scss';

type Props = {
    children: ReactNode;
    selected?: boolean;
};

const StyledTab = ({ children, selected }: Props) => (
    <Tab
        className={styles.root}
        selectedClassName={styles.root_selected}
        selected={selected}
    >
        {children}
    </Tab>
);

StyledTab.tabsRole = 'Tab';

export default StyledTab;
