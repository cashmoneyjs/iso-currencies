import path from "path";

import Fetcher from "../src/fetcher";

import EsModuleSerialiser from "../src/serialisers/esmodule";
import TsDeclarationSerialiser from "../src/serialisers/tsdeclaration";
import JsonSerialiser from "../src/serialisers/json";

const res = path.join(__dirname, "..", "resources");

const fetcher = new Fetcher(
    "https://www.currency-iso.org/dam/downloads/lists/list_one.xml",
    "https://www.currency-iso.org/dam/downloads/lists/list_three.xml",
);

const esModuleSerialiser = new EsModuleSerialiser();
const tsDeclarationSerialiser = new TsDeclarationSerialiser();
const jsonSerialiser = new JsonSerialiser();

fetcher.saveCurrentCurrenciesTo(path.join(res, "current.js"), esModuleSerialiser);
fetcher.saveCurrentCurrenciesTo(path.join(res, "current.d.ts"), tsDeclarationSerialiser);
fetcher.saveCurrentCurrenciesTo(path.join(res, "current.json"), jsonSerialiser);

fetcher.saveHistoricCurrenciesTo(path.join(res, "historic.js"), esModuleSerialiser);
fetcher.saveHistoricCurrenciesTo(path.join(res, "historic.d.ts"), tsDeclarationSerialiser);
fetcher.saveHistoricCurrenciesTo(path.join(res, "historic.json"), jsonSerialiser);

fetcher.saveAllCurrenciesTo(path.join(res, "all.js"), esModuleSerialiser);
fetcher.saveAllCurrenciesTo(path.join(res, "all.d.ts"), tsDeclarationSerialiser);
fetcher.saveAllCurrenciesTo(path.join(res, "all.json"), jsonSerialiser);
