interface CurrencyFormatOptions {
	currency?: string;
	locale?: string;
}

export function createCurrencyFormat({ currency = 'EUR', locale = 'de-DE' }: CurrencyFormatOptions = {}) {
	const formatter = new Intl.NumberFormat(locale, {
		currency,
		currencySign: 'accounting',
		maximumFractionDigits: 2,
		minimumFractionDigits: 2,
		style: 'currency'
	});

	function format(value: number): string {
		return formatter.format(value);
	}

	function parse(display: string): number | undefined {
		const cleaned = display.replace(/[^0-9,.-]/g, '');
		if (!cleaned) return undefined;

		const lastComma = cleaned.lastIndexOf(',');
		const lastDot = cleaned.lastIndexOf('.');
		const normalized =
			lastComma > lastDot
				? cleaned.replace(/\./g, '').replace(',', '.')
				: cleaned.replace(/,/g, '');

		const value = Number.parseFloat(normalized);
		return Number.isNaN(value) ? undefined : value;
	}

	return { format, parse };
}
