import React, { ReactNode } from 'react';
import { TabList } from 'react-tabs';

import styles from './styles.module.scss';

type Props = {
    children: ReactNode;
};

const StyledTabList = ({ children }: Props) => (
    <TabList className={styles.root}>
        {children}
    </TabList>
);

StyledTabList.tabsRole = 'TabList';

export default StyledTabList;
