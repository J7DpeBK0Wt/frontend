import React, { ReactNode } from 'react';

import styles from './styles.module.scss';

type Props = {
    children: ReactNode;
    header?: ReactNode;
};

const Widget = ({ header, children }: Props) => (
    <section className={styles.root}>
        {header && <header className={styles.header}>{header}</header>}
        {children}
    </section>
);

export default Widget;
