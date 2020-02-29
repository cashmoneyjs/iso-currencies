import type Serialiser from "../serialiser";
import type { CurrencyDataMap } from "@cashmoney/iso-currency-contracts";

export default class JsonSerialiser implements Serialiser {
    public serialise(data: CurrencyDataMap): string {
        const currencyCodes = Object.keys(data);
        currencyCodes.sort();

        const sortedData: CurrencyDataMap = {};
        for (const currencyCode of currencyCodes) {
            sortedData[currencyCode] = data[currencyCode];
        }

        const formattedData = JSON.stringify(sortedData);
        return formattedData;
    }
}
