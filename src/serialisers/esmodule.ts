import { inspect } from "util";

import type Serialiser from "../serialiser";
import type { CurrencyData, CurrencyDataMap } from "@cashmoney/iso-currency-contracts";

export default class EsModuleSerialiser implements Serialiser {
    public serialise(data: CurrencyDataMap): string {
        let formattedData = "";

        const currencyCodes = Object.keys(data);
        currencyCodes.sort();
        for (const currencyCode of currencyCodes) {
            formattedData += this.prepareCurrency(data[currencyCode]);
        }

        return formattedData;
    }

    private prepareCurrency(currency: CurrencyData): string {
        return `export const ${currency.alphabeticCode} = ${inspect(currency)};` + "\n";
    }
}
