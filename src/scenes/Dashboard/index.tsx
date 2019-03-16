import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Tabs, TabPanel } from 'react-tabs';

import { StatsAction, PeriodType } from 'src/modules/stats/types';
import { periodTitleMap, periods } from 'src/modules/stats/contants';
import * as statsActions from 'src/modules/stats/actions';
import Widget from 'src/components/Widget';
import TabList from 'src/components/StyledTabs/TabList';
import Tab from 'src/components/StyledTabs/Tab';

import Panel from './Panel';
import styles from './styles.module.scss';

const DEFAULT_TAB_INDEX = 0;

type DispatchProps = {
    fetch: (period: PeriodType) => void;
};

type Props = DispatchProps;

class Dashboard extends React.Component<Props> {
    componentDidMount() {
        this.props.fetch(periods[DEFAULT_TAB_INDEX]);
    }

    onTabSelect = (index: number) => this.props.fetch(periods[index]);

    render() {
        return (
            <Widget header="Main metrics">
                <Tabs defaultIndex={DEFAULT_TAB_INDEX} onSelect={this.onTabSelect}>
                    <div className={styles.tabsList}>
                        <TabList>
                            {periods.map(period => (
                                <Tab key={period}>{periodTitleMap[period]}</Tab>
                            ))}
                        </TabList>
                    </div>

                    {periods.map(period => (
                        <TabPanel key={period}>
                            <Panel period={period} />
                        </TabPanel>
                    ))}
                </Tabs>
            </Widget>
        );
    }
}

const mapDispatchToProps = (dispatch: Dispatch<StatsAction>) => ({
    fetch: (period: PeriodType) => dispatch(statsActions.fetch(period)),
});

export default connect(null, mapDispatchToProps)(Dashboard);
