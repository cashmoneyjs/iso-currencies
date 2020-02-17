import { inspect } from "util";

import Serialiser from "../serialiser";
import { CurrencyData, CurrencyDataMap } from "../currencydata";

export default class EsModuleSerialiser implements Serialiser {
    public serialise(data: CurrencyDataMap): string {
        let formattedData = "Object.defineProperty(exports, '__esModule', { value: true });\n";

        for (const currency of Object.values(data)) {
            formattedData += this.prepareCurrency(currency);
        }

        return formattedData;
    }

    private prepareCurrency(currency: CurrencyData): string {
        return `module.exports.${currency.alphabeticCode} = ${inspect(currency)};` + "\n";
    }
}
