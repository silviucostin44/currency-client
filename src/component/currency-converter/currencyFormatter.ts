import i18next from "i18next";

export default function formatCurrency(data: number | undefined, currency: string): string {
    if (!data) {
        return '';
    }
    return i18next.t('format_currency', {
        value: data,
        formatParams: {value: {currency: currency, locale: 'en-US', maximumFractionDigits: 6}}
    });
}