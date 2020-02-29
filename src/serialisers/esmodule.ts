import { inspect } from "util";

import type Serialiser from "../serialiser";
import type { CurrencyData, CurrencyDataMap } from "@cashmoney/iso-currency-contracts";

export default class EsModuleSerialiser implements Serialiser {
    public serialise(data: CurrencyDataMap): string {
        let formattedData = "Object.defineProperty(exports, '__esModule', { value: true });\n";

        const currencyCodes = Object.keys(data);
        currencyCodes.sort();
        for (const currencyCode of currencyCodes) {
            formattedData += this.prepareCurrency(data[currencyCode]);
        }

        return formattedData;
    }

    private prepareCurrency(currency: CurrencyData): string {
        return `module.exports.${currency.alphabeticCode} = ${inspect(currency)};` + "\n";
    }
}
