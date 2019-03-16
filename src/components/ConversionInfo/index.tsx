import cn from 'classnames';
import React from 'react';

import { Conversion, ConversionType, ConversionIndicatorType, PeriodType } from 'src/modules/stats/types';
import { periodTitleMap } from 'src/modules/stats/contants';
import Badge from 'src/components/Badge';
import StatusIcon from 'src/components/StatusIcon';
import FormattedNumber from 'src/components/FormattedNumber';
import { ReactComponent as FilterIcon } from 'src/components/Icons/Filter.svg';
import { ReactComponent as TouchIcon } from 'src/components/Icons/Touch.svg';
import { ReactComponent as BasketIcon } from 'src/components/Icons/Basket.svg';

import styles from './styles.module.scss';
import formatNumber from 'src/utils/formatNumber';

const titleMap: { [T in ConversionType]: string } = {
    searches: 'Searches',
    clicks: 'Clicks',
    bookings: 'Bookings',
};

type DescriptionBuilder = (conversion: Conversion) => string;

const searchesDescriptionBuilder: DescriptionBuilder = conversion => {
    const { indicators } = conversion;

    const mobileIndicator = indicators.find(({ type }) => type === 'mobile_pessimizer');
    const webIndicator = indicators.find(({ type }) => type === 'web_pessimizer');

    const mobileValue = mobileIndicator ? mobileIndicator.value : null;
    const webValue = webIndicator ? webIndicator.value : null;

    if (mobileValue != null && webValue != null) {
        if (mobileValue === webValue) {
            return `You get ${formatNumber(mobileValue, 'percent')} traffic on mobile and desktop devices.`;
        }

        return (
            `You get ${formatNumber(mobileValue, 'percent')} traffic on mobile ` +
            `and ${formatNumber(webValue, 'percent')} traffic on desktop devices.`
        );
    }

    if (mobileValue != null) {
        return `You get ${formatNumber(mobileValue, 'percent')} traffic on mobile devices.`;
    }

    if (webValue != null) {
        return `You get ${formatNumber(webValue, 'percent')} traffic on desktop devices.`;
    }

    return 'You don\'t get traffic.';
};

const descriptionBuilderMap: { [T in ConversionType]: DescriptionBuilder } = {
    searches: searchesDescriptionBuilder,
    clicks: () => 'Conversion from searches to clicks on all devices.',
    bookings: () => 'Conversion from cliks to bookings on all devices.',
};

type HelpLink = { title: string, href: string };

const helpLinksMap: { [T in ConversionType]: HelpLink[] } = {
    searches: [
        { title: 'Searches', href: '#' },
        { title: 'Pessimisation', href: '#' },
    ],
    clicks: [
        { title: 'CTR', href: '#' },
        { title: 'Cliks', href: '#' },
    ],
    bookings: [
        { title: 'STR', href: '#' },
        { title: 'Bookings', href: '#' },
        { title: 'Avg. Check', href: '#' },
    ],
};

type IconMap = {
    [T in ConversionType]: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

const iconMap: IconMap = {
    searches: FilterIcon,
    clicks: TouchIcon,
    bookings: BasketIcon,
};

const indicatorTitleMap: { [T in ConversionIndicatorType]: string } = {
    mobile_pessimizer: 'Mobile traffic',
    web_pessimizer: 'Web traffic',
    ctr: 'CTR',
    str: 'STR',
    avg_price: 'Avg. Check',
};

const indicatorFormatMap: { [T in ConversionIndicatorType]: 'decimal' | 'percent' } = {
    mobile_pessimizer: 'percent',
    web_pessimizer: 'percent',
    ctr: 'percent',
    str: 'percent',
    avg_price: 'decimal',
};

type Props = {
    period: PeriodType,
    conversion: Conversion,
};

class ConversionInfo extends React.Component<Props> {
    getValueDelta() {
        const { conversion } = this.props;
        return conversion.value - conversion.prevValue;
    }

    getTheme() {
        return this.getValueDelta() >= 0 ? 'success' : 'danger';
    }

    renderIcon() {
        const { conversion } = this.props;
        const { type } = conversion;

        const Icon = iconMap[type];

        return (
            <div className={styles.icon}>
                <Icon className={styles.icon__glyph} />

                <div className={styles.icon__status}>
                    <StatusIcon theme={this.getTheme()} />
                </div>
            </div>
        );
    }
    renderHeading() {
        const { conversion } = this.props;
        const { type } = conversion;

        const theme = this.getTheme();
        const valueDelta = this.getValueDelta();
        const valueDeltaPercent = valueDelta / conversion.prevValue * 100;

        return (
            <div className={cn(styles.heading, styles[`heading_theme_${theme}`])}>
                {titleMap[type]}

                {valueDelta !== 0 && (
                    <div className={styles.badge}>
                        <Badge theme={theme}>
                            <FormattedNumber
                                value={valueDeltaPercent}
                                format="percent"
                                fractionDigits={Math.abs(valueDeltaPercent) >= 1 ? 0 : 2}
                                forceSign={true}
                            />
                        </Badge>
                    </div>
                )}
            </div>
        );
    }

    renderValue() {
        const { period, conversion } = this.props;
        const { value } = conversion;

        return (
            <div className={cn(styles.value, styles.value_current)}>
                <FormattedNumber value={value} format="decimal" />
                <div className={styles.value__title}>{periodTitleMap[period]}</div>
            </div>
        );
    }

    renderPrevValue() {
        const { conversion } = this.props;
        const { prevValue } = conversion;

        return (
            <div className={cn(styles.value, styles.value_previous)}>
                <FormattedNumber value={prevValue} format="decimal" />
                <div className={styles.value__title}>Week ago</div>
            </div>
        );
    }

    renderIndicators() {
        const { conversion } = this.props;
        const { indicators } = conversion;

        if (indicators.length === 0) {
            return null;
        }

        return (
            <div className={cn(styles.heading, styles[`heading_theme_${this.getTheme()}`])}>
                {indicators.map(({ type, value }) => (
                    <div key={type} className={styles.indicator}>
                        {indicatorTitleMap[type]}:
                        {' '}
                        <FormattedNumber value={value} format={indicatorFormatMap[type]} />
                    </div>
                ))}
            </div>
        );
    }

    renderHelpLinks() {
        const { conversion } = this.props;
        const { type } = conversion;

        const helpLinks = helpLinksMap[type];

        return (
            <div className={styles.helpLinks}>
                Help:
                {' '}
                {helpLinks.map(({ title, href }, index) => (
                    <React.Fragment key={title}>
                        {index > 0 && ', '}
                        <a key={href} href={href}>{title}</a>
                    </React.Fragment>
                ))}
            </div>
        );
    }

    render() {
        const { conversion } = this.props;
        const { type, final } = conversion;

        const description = descriptionBuilderMap[type](conversion);

        return (
            <div className={cn(styles.root, { [styles.root_final]: final })}>
                <div className={cn(styles.column, styles.column_icons)}>
                    {this.renderIcon()}
                    {!final && <div className={styles.nextArrow} />}
                </div>

                <div className={cn(styles.column, styles.column_values)}>
                    {this.renderHeading()}
                    {this.renderValue()}
                    {this.renderPrevValue()}
                </div>

                <div className={cn(styles.column, styles.column_indicators)}>
                    {this.renderIndicators()}
                    <div className={styles.description}>{description}</div>
                    {this.renderHelpLinks()}
                </div>
            </div>
        );
    }
}

export default ConversionInfo;
