# read-gedcom

![](https://github.com/arbre-app/read-gedcom/actions/workflows/build.yml/badge.svg)
![](https://img.shields.io/npm/v/read-gedcom)
![](https://img.shields.io/librariesio/dependents/npm/read-gedcom)
![](https://img.shields.io/npm/l/read-gedcom)

***A Gedcom file reader written in Typescript.*** See the **[documentation](https://docs.arbre.app/read-gedcom/)**.

### Features

* Support for the full Gedcom specification
* Versatile API
* Good-effort charset detection
* No dependencies

### Installation and Usage

```
npm install read-gedcom
```


```javascript
import { readGedcom } from 'read-gedcom';

const response = await fetch('https://mon.arbre.app/gedcoms/royal92.ged');
const buffer = await response.arrayBuffer();

const gedcom = readGedcom(buffer);

console.log(gedcom.getHeader().getSourceSystem().value()[0]);
```

### Documentation

* **[Quick Start](https://docs.arbre.app/read-gedcom/pages/Getting%20Started/quickstart)**
* **[Basic Examples](https://docs.arbre.app/read-gedcom/pages/Getting%20Started/basic-examples)**
* **[Advanced Examples](https://docs.arbre.app/read-gedcom/pages/Getting%20Started/advanced-examples)**
* **[API](https://docs.arbre.app/read-gedcom/modules)**

### Bug report

A Gedcom file isn't parsed correctly? Please [open a ticket](https://github.com/arbre-app/read-gedcom/issues)!
