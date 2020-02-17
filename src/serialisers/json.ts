import Serialiser from "../serialiser";
import { CurrencyDataMap } from "../currencydata";

export default class JsonSerialiser implements Serialiser {
    public serialise(data: CurrencyDataMap): string {
        const formattedData = JSON.stringify(data);
        return formattedData;
    }
}
