import fs from "fs";
import { promisify } from "util";

import axios from "axios";
import xml2js from "xml2js";

import { CurrencyData, CurrencyDataMap } from "./currencydata";
import Serialiser from "./serialiser";

const writeFile = promisify(fs.writeFile);

export default class Fetcher {
    private currentCurrencies: CurrencyDataMap | null = null;
    private historicCurrencies: CurrencyDataMap | null = null;

    public constructor(
        private readonly currentCurrenciesUrl: string,
        private readonly historicCurrenciesUrl: string,
    ) {}

    public async saveCurrentCurrenciesTo(filename: string, serialiser: Serialiser) {
        await this.fetchEverything();

        await writeFile(
            filename,
            serialiser.serialise(this.currentCurrencies as CurrencyDataMap)
        );
    }

    public async saveHistoricCurrenciesTo(filename: string, serialiser: Serialiser) {
        await this.fetchEverything();

        await writeFile(
            filename,
            serialiser.serialise(this.historicCurrencies as CurrencyDataMap)
        );
    }

    public async saveAllCurrenciesTo(filename: string, serialiser: Serialiser) {
        await this.fetchEverything();

        await writeFile(
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
        for await (const currency of this.formatCurrencies(data.ISO_4217.CcyTbl.CcyNtry)) {
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
        for await (const currency of this.formatCurrencies(data.ISO_4217.HstrcCcyTbl.HstrcCcyNtry)) {
            this.historicCurrencies[currency.alphabeticCode] = currency;
        }
    }

    private async *formatCurrencies(data: any[]): AsyncGenerator<CurrencyData> {
        for (const datum of data) {
            yield {
                alphabeticCode: datum.Ccy,
                currency: datum.CcyNm,
                minorUnit: parseInt(datum.CcyMnrUnts),
                numericCode: parseInt(datum.CcyNbr),
            };
        }
    }
}
