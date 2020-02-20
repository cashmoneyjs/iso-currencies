import Serialiser from "../serialiser";
import { CurrencyDataMap } from "../currencydata";

const interfaceCode = `interface CurrencyData {
    alphabeticCode: string;
    currency: string;
    minorUnit: number;
    numericCode: number;
}`;

export default class TsDeclarationSerialiser implements Serialiser {
    public serialise(data: CurrencyDataMap): string {
        let formattedData = interfaceCode + "\n\n";

        for (const currencyCode of Object.keys(data)) {
            formattedData += `export declare var ${currencyCode}: CurrencyData;` + "\n";
        }

        return formattedData;
    }
}
