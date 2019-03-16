interface IFormatNumberOptions {
    fractionDigits?: number;
    forceSign?: boolean;
}

const formatNumber = (
    value: number,
    format: 'decimal' | 'percent',
    { fractionDigits = 2, forceSign = false }: IFormatNumberOptions = {}
): string => {
    const formatter = new Intl.NumberFormat('ru-RU', {
        style: format,
        maximumFractionDigits: fractionDigits,
    });

    let formattedValue = formatter.format(format === 'percent' ? value / 100 : value);

    if (forceSign && value > 0) {
        formattedValue = `+${formattedValue}`;
    }

    if (format === 'percent') {
        formattedValue = formattedValue.replace('\u00a0%', '%');
    }

    return formattedValue;
};

export default formatNumber;
