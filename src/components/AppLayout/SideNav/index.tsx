import cn from 'classnames';
import React from 'react';

import { ReactComponent as DashboardIcon } from 'src/components/Icons/Dashboard.svg';
import { ReactComponent as FlagIcon } from 'src/components/Icons/Flag.svg';
import { ReactComponent as DevicesIcon } from 'src/components/Icons/Devices.svg';
import { ReactComponent as TouchIcon } from 'src/components/Icons/Touch.svg';
import { ReactComponent as PlaneIcon } from 'src/components/Icons/Plane.svg';
import { ReactComponent as DollarIcon } from 'src/components/Icons/Dollar.svg';
import { ReactComponent as DirectionIcon } from 'src/components/Icons/Direction.svg';
import { ReactComponent as ExclamationIcon } from 'src/components/Icons/Exclamation.svg';
import { ReactComponent as BookIcon } from 'src/components/Icons/Book.svg';
import { ReactComponent as FeedbackIcon } from 'src/components/Icons/Feedback.svg';
import { ReactComponent as BugIcon } from 'src/components/Icons/Bug.svg';
import { ReactComponent as DownloadIcon } from 'src/components/Icons/Download.svg';
import { ReactComponent as EmailIcon } from 'src/components/Icons/Email.svg';

import Item from './Item';
import Toggle from './Toggle';
import styles from './styles.module.scss';

type State = {
    expanded: boolean;
};

const initialState: State = {
    expanded: false,
};

class SideNav extends React.Component<{}, State> {
    readonly state = initialState;

    onToggleClick = () => {
        this.setState(({ expanded }) => ({ expanded: !expanded }));
    }

    render() {
        const { expanded } = this.state;

        return (
            <div className={cn(styles.root, { [styles.root_expanded]: expanded })}>
                <div className={styles.inner}>
                    <div className={styles.section}>
                        <Item Icon={DashboardIcon} title="DASHBOARD" selected={true} />
                    </div>

                    <div className={styles.separator} />

                    <div className={styles.section}>
                        <Item Icon={FlagIcon} title="CONVERTION" />
                        <Item Icon={DevicesIcon} title="HOSTS" />
                        <Item Icon={TouchIcon} title="CLICKS" />
                        <Item Icon={PlaneIcon} title="AIRLINES" />
                        <Item Icon={DollarIcon} title="BOOKINGS" />
                        <Item Icon={DirectionIcon} title="DIRECTIONS" />
                        <Item Icon={ExclamationIcon} title="ERRORS" />
                    </div>

                    <div className={styles.separator} />

                    <div className={styles.section}>
                        <Item Icon={BookIcon} title="WIKI" />
                        <Item Icon={FeedbackIcon} title="FEEDBACKS" />
                        <Item Icon={BugIcon} title="DEBUG" />
                        <Item Icon={DownloadIcon} title="DOWNLOADS" />
                        <Item Icon={EmailIcon} />
                    </div>

                    <Toggle expanded={expanded} onClick={this.onToggleClick} />
                </div>
            </div>
        );
    }
}

export default SideNav;
