# read-gedcom

![](https://github.com/arbre-app/read-gedcom/actions/workflows/build.yml/badge.svg)
![](https://img.shields.io/npm/v/read-gedcom)
![](https://img.shields.io/librariesio/dependents/npm/read-gedcom)
![](https://img.shields.io/npm/l/read-gedcom)

***A Gedcom file reader written in Typescript.*** See the **[documentation](https://docs.arbre.app/read-gedcom/)**.

:construction: Currently under development!

### Features

* Support for the full Gedcom specification
* Versatile API
* Good-effort charset detection
* No dependencies

### Usage

```
npm install read-gedcom
```

You can then use [`readGedcom`](https://docs.arbre.app/read-gedcom/modules.html#readgedcom) to read a file:

```javascript
import { readGedcom } from 'read-gedcom';

const response = await fetch('https://mon.arbre.app/gedcoms/royal92.ged');
const buffer = await response.arrayBuffer();

const gedcom = readGedcom(buffer);

console.log(gedcom.getHeader().getSourceSystem().value()[0]);
```

The `buffer` variable should be an `ArrayBuffer`.

### Concepts

* Tree nodes (`GedcomTree.Node`): represent a line in the file through attributes like `tag`, `pointer` and `pointer`, but also provide a reference to the children nodes (`children`)
* Nodes selections (`GedcomSelection.Any`): collections of nodes, for which the interpretation can change depending on the context

While the first representation already contains all the information, it is difficult to use in practice because the user must be aware of the specification.
Moreover, the manipulation of nodes tends to be very verbose and error prone.
This justifies the introduction of a wrapper that acts as an interpretation layer; the selection API.
The selection wrapper restricts the interactions with the raw data and provides an interface that corresponds to the Gedcom specification.
The API is very flexible and the interpretation context can be changed at will.

Note that the library can very well be used without the selection API (it is implemented independently).
The entry point in this case is `parseGedcom`.

### Bug report

A Gedcom file isn't parsed correctly? Please [open a ticket](https://github.com/arbre-app/read-gedcom/issues)!
