# CashMoney ISO Currencies

This library provides an up-to-date list of ISO 4217 currencies as provided by the official ISO
maintenance agency. It uses the [resources on the website of the maintenance agency](https://www.currency-iso.org/en/home/tables.html)
to update this package.

There are three sets of data you can use from this library, consumable as both JSON and an
ES Module. The latter should assist with tree-shaking, if that is important to you.

This package does not include any actual source code out of the box. The code that is in the
repository exists solely for preparing updates to the provided data.

## Install

With yarn:

```bash
$ yarn add @cashmoney/iso-currencies
```

Or with npm:

```bash
$ npm add @cashmoney/iso-currencies
```

## Usage

Most of the time, you'll want to use the *current* list of currencies:

```typescript
import { AUD, EUR, JPY, USD } from "@cashmoney/iso-currencies/resources/current";

console.log(AUD.minorUnit); // 2
console.log(EUR.currency) // 'Euro'
console.log(JPY.minorUnit); // 0
console.log(USD.alphabeticCode) // 'USD'
```

You can also access this list as a JSON file:

```typescript
import fs from "fs";

const jsonData = fs.readFileSync("node_modules/@cashmoney/iso-currencies/resources/current.json", "utf8");
const data = JSON.parse(jsonData);

console.log(data.AUD.currency); // 'Australian Dollar'
console.log(data.EUR.alphabeticCode) // 'EUR'
console.log(data.JPY.numericCode); // 392
console.log(data.USD.minorUnit) // 2
```

The following is the full list of datasets available in this package:

```
all.js
all.json
current.js
current.json
historic.js
historic.json
```

## Development notes

To prepare a new update, run `yarn run fetch-update` in the root of the repository.

## Acknowledgements

The setup of this repository is inspired by the matching package in the MoneyPHP
organisation:

https://github.com/moneyphp/iso-currencies
