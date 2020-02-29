import type Serialiser from "../serialiser";
import type { CurrencyDataMap } from "@cashmoney/iso-currency-contracts";

const interfaceCode = `import type { CurrencyData } from "@cashmoney/iso-currency-contracts";`;

export default class TsDeclarationSerialiser implements Serialiser {
    public serialise(data: CurrencyDataMap): string {
        let formattedData = interfaceCode + "\n\n";

        const currencyCodes = Object.keys(data);
        currencyCodes.sort();
        for (const currencyCode of currencyCodes) {
            formattedData += `export declare var ${currencyCode}: CurrencyData;` + "\n";
        }

        return formattedData;
    }
}
