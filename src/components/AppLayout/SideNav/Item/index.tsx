import cn from 'classnames';
import React from 'react';

import styles from './styles.module.scss';

type Props = {
    Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    title?: string;
    selected?: boolean;
};

const Item = ({ Icon, title, selected = false }: Props) => (
    <a
        href="#"
        className={cn(styles.root, { [styles.root_selected]: selected })}
    >
        <span className={styles.icon}>
            <Icon className={styles.icon__glyph} />
        </span>

        {title && <span className={styles.title}>{title}</span>}
    </a>
);

export default Item;
