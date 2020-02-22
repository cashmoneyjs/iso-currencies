import type Serialiser from "../serialiser";
import type { CurrencyDataMap } from "../currencydata";

const interfaceCode = `interface CurrencyData {
    alphabeticCode: string;
    currency: string;
    minorUnit: number;
    numericCode: number;
}`;

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
