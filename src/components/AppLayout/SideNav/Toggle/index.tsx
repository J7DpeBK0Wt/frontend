import cn from 'classnames';
import React from 'react';

import { ReactComponent as ArrowRightIcon } from 'src/components/Icons/ArrowRight.svg';

import styles from './styles.module.scss';

type Props = {
    expanded?: boolean;
    onClick?: () => void;
};

const Toggle = ({ expanded = false, onClick }: Props) => (
    <button
        type="button"
        className={cn(styles.root, { [styles.root_expanded]: expanded })}
        onClick={onClick}
    >
        <div className={styles.icon}>
            <ArrowRightIcon className={styles.icon__glyph} />
        </div>
    </button>
);

export default Toggle;
