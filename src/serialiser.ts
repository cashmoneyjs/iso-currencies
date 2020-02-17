import { CurrencyDataMap } from "./currencydata";

export default interface Serialiser {
    serialise(data: CurrencyDataMap): string;
}