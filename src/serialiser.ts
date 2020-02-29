import type { CurrencyDataMap } from "@cashmoney/iso-currency-contracts";

export default interface Serialiser {
    serialise(data: CurrencyDataMap): string;
}
