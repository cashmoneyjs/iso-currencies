export interface CurrencyData {
    readonly alphabeticCode: string;
    readonly currency: string;
    readonly minorUnit: number;
    readonly numericCode: number;
}

export interface CurrencyDataMap {
    [currencyCode: string]: CurrencyData;
}
