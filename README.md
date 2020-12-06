# read-gedcom

A Gedcom file parser and reader written in javascript.
Currently under development.

## Installation

If you are using the bundled package, the library will be provided to you through the global variable `gedcom`:

```html
<script src="https://cdn.jsdelivr.net/npm/read-gedcom/dist/cjs/gedcom.js"></script>
<script>
    gedcom.readGedcom(...);
</script>
```

If you are using the library as a dependency then you can install and import it:

```bash
npm install read-gedcom
```

```javascript
import * as gedcom from 'read-gedcom'; // ESM
const gedcom = require('read-gedcom'); // CJS
// OR
import { readGedcom } from 'read-gedcom';
const { readGedcom } = require('read-gedcom');
```

## Usage

### Loading data

Perhaps the most common use case is to ask a file from the user and load it.
This can be achieved with the following boilerplate:

```html
<input type="file" id="file-input" accept=".ged">

<script>
    var fileInput = document.getElementById('file-input');
    fileInput.addEventListener('change', function (e) {
        var file = e.target.files[0];
        if (file) {
            var reader = new FileReader();
            reader.addEventListener('load', function (e) {
                var buffer = e.target.result;
                var root = gedcom.readGedcom(buffer); // Read gedcom file

                console.log(root.getSourceSystem()
                                .getVersion()
                                .value().option()); // Print the version
            });
            reader.readAsArrayBuffer(file);
        }
    });
</script>
```

Alternatively you may want to download the file from a URL:

```javascript
var url = 'http://...'; // The location of the file on the web
var request = new XMLHttpRequest();
request.open('GET', url, true);
request.responseType = 'arraybuffer';
request.onreadystatechange = function () {
    if (request.readyState === 4) {
         if (request.status === 200 || request.status === 0) {
              var buffer = request.response;
              var root = gedcom.readGedcom(buffer); // Read gedcom file
              
              console.log(root.getSourceSystem()
                              .getVersion()
                              .value().option()); // Print the version
         }
    }
};
request.send();
```

Or directly load it from a string (usually not recommended):

```javascript
var gedcomRaw = '...';
var buffer = Buffer.from(gedcomRaw, 'utf8');
var root = gedcom.readGedcom(buffer); // Read gedcom file
// ...
```

### Traversing the tree

Once you have acquired a reference to the `root` node from the above methods, you can start extracting the data you want.
Here are some examples of what you can do:

```javascript
const individuals = root.getIndividualRecord(); // Get all individual records
const individual = root.getIndividualRecord('@I0000@'); // Get an individual record by its id
const firstIndividual = root.getIndividualRecord(null, 1); // Get the first record
const someIndividuals = root.getIndividualRecord(['@I0000@', '@I0001@']); // Get several records

const individualsCount = individuals.count(); // Count all the records
const isMale = individual.getSex().value().option() === Sex.MALE; // Get the gender
```

### Concepts

#### Introduction

Gedcom files are essentially tree structured data models, and what the library does is to merely provide a high-level API to access the tree.
That said, the API is built in such a way that it can be used without prior knowledge of the Gedcom specification.
This is achieved by providing the right methods at the right time.
For instance, while `root.getHeader()` is valid, `root.getHeader().getHeader()` isn't and will raise a runtime exception (even if for some reason the tree was structured that way).

The API still allows for some flexibility: for instance the above dummy example could be rewritten as `root.getHeader().get(Tag.HEADER)`.

#### Nodes and values

The tree is made of two different object types:
- `Node`: branches in the tree; extract other nodes using `get...()` methods. The `root` is itself a node.
- `Value`: leaves in the tree; can be produced from a node using one of `value()` (or `valueAs...()`), `tag()` or `pointer()`. It represents an array of concrete values.

In both cases the data you collect will be _flat_.
That means the result can be represented by a simple array.

#### Nodes

A `Node` is a set of **distinct** elements, possibly empty.
It is safe to assume that the elements contained in a node exactly match their corresponding tag counterpart in the original file (`0 HEAD`, `1 GEDC`, ...).
Each element in a node has an associated context which enables the user to locate back its parents in the tree.
In addition a node offers the possibility to query its children.
Because a node can contain any number of elements any operation will be applied to every element.
Duplicate elements, if any, will automatically get removed.

**Note**: although discouraged it is possible to build up nodes that contain elements from different hierarchies.

#### Values

While a `Node` describes the structure of the data, a `Value` holds concrete values.
The concrete data can be extracted with `value()`.
This method will return the raw string as it appears in the original file.
When the data is expected to be structured (enumerations, dates, ...), alternative adapters are provided through methods of the form `valueAs...()`.
