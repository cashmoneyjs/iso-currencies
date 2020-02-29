import { promises as fs } from "fs";

import axios from "axios";
import xml2js from "xml2js";

import type { CurrencyData, CurrencyDataMap } from "@cashmoney/iso-currency-contracts";
import type Serialiser from "./serialiser";

export default class Fetcher {
    private currentCurrencies: CurrencyDataMap | null = null;
    private historicCurrencies: CurrencyDataMap | null = null;

    public constructor(
        private readonly currentCurrenciesUrl: string,
        private readonly historicCurrenciesUrl: string,
    ) {}

    public async saveCurrentCurrenciesTo(filename: string, serialiser: Serialiser) {
        await this.fetchEverything();

        await fs.writeFile(
            filename,
            serialiser.serialise(this.currentCurrencies as CurrencyDataMap)
        );
    }

    public async saveHistoricCurrenciesTo(filename: string, serialiser: Serialiser) {
        await this.fetchEverything();

        await fs.writeFile(
            filename,
            serialiser.serialise(this.historicCurrencies as CurrencyDataMap)
        );
    }

    public async saveAllCurrenciesTo(filename: string, serialiser: Serialiser) {
        await this.fetchEverything();

        await fs.writeFile(
            filename,
            serialiser.serialise(
                Object.assign(
                    {},
                    this.historicCurrencies as CurrencyDataMap,
                    this.currentCurrencies as CurrencyDataMap,
                ),
            ),
        );
    }

    private async fetchEverything() {
        await this.fetchCurrentCurrencies();
        await this.fetchHistoricCurrencies();
    }

    private async fetchCurrentCurrencies() {
        if (Array.isArray(this.currentCurrencies) === true) {
            return;
        }

        const response = await axios.get(this.currentCurrenciesUrl);
        const data = await xml2js.parseStringPromise(response.data, {
            ignoreAttrs: true,
            explicitArray: false,
        });

        this.currentCurrencies = {};
        for (const currency of this.formatCurrencies(data.ISO_4217.CcyTbl.CcyNtry)) {
            this.currentCurrencies[currency.alphabeticCode] = currency;
        }
    }

    private async fetchHistoricCurrencies() {
        if (Array.isArray(this.historicCurrencies) === true) {
            return;
        }

        const response = await axios.get(this.historicCurrenciesUrl);
        const data = await xml2js.parseStringPromise(response.data, {
            ignoreAttrs: true,
            explicitArray: false,
        });

        this.historicCurrencies = {};
        for (const currency of this.formatCurrencies(data.ISO_4217.HstrcCcyTbl.HstrcCcyNtry)) {
            this.historicCurrencies[currency.alphabeticCode] = currency;
        }
    }

    private *formatCurrencies(data: any[]): Generator<CurrencyData> {
        for (const datum of data) {
            if (typeof datum.Ccy !== "string" || datum.Ccy.length === 0) {
                continue;
            }

            const minorUnit = parseInt(datum.CcyMnrUnts);
            const numericCode = parseInt(datum.CcyNbr);

            yield {
                alphabeticCode: datum.Ccy,
                currency: String(datum.CcyNm).trim(),
                minorUnit: isNaN(minorUnit) ? 0 : minorUnit,
                numericCode: isNaN(numericCode) ? 0 : numericCode,
            };
        }
    }
}
