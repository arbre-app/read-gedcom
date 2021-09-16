# read-gedcom

![](https://github.com/arbre-app/read-gedcom/actions/workflows/build.yml/badge.svg)
![](https://img.shields.io/npm/v/read-gedcom?color=brightgreen)
![](https://img.shields.io/librariesio/dependents/npm/read-gedcom)
![](https://img.shields.io/npm/l/read-gedcom?color=brightgreen)

***A Gedcom file reader written in Typescript.*** See the **[documentation](https://docs.arbre.app/read-gedcom/)**.

### Features

* Tolerant parsing
  * Character encoding detection (ASCII, CP1252, UTF-8, UTF-16, CP850, and more)
  * Good effort of parsing and interpreting non-standard data
* Near full specification coverage
  * Mostly Gedcom 5.5.5 compliant while being as much backward compatible as possible
  * Parser for dates in any standard calendars
* Unopinionated API
  * We provide the API, but the user has full control over the interpretation of the data
  * It's also possible to not use the API, in which case it can be shaken off the tree
* Strongly typed
* Zero dependencies; compatible on browser and Node.js
* ...and more:
  * Conversion of dates
  * Serialization-friendly
  * Progress tracking for larger files

### Installation and Usage

```
npm install read-gedcom
```


```javascript
import { readGedcom } from 'read-gedcom';

const promise = fetch('https://mon.arbre.app/gedcoms/royal92.ged')
  .then(r => r.arrayBuffer())
  .then(readGedcom);

promise.then(gedcom => {
  console.log(gedcom.getHeader().toString());
});
```

### Documentation

* **[Quick Start](https://docs.arbre.app/read-gedcom/pages/Getting%20Started/quickstart)**
* **[Basic Examples](https://docs.arbre.app/read-gedcom/pages/Getting%20Started/basic-examples)**
* **[Advanced Examples](https://docs.arbre.app/read-gedcom/pages/Getting%20Started/advanced-examples)**
* **[API](https://docs.arbre.app/read-gedcom/modules)**

### Bug report

A Gedcom file isn't parsed correctly? Please [open a ticket](https://github.com/arbre-app/read-gedcom/issues)!

Also make sure to attach a zipped version of the bogus Gedcom file.
If you don't want to publicly share the file, you may send it to [this email address](https://github.com/arbre-app); we will create a minimal reproducible example based on what you sent us, which can be safely shared.
