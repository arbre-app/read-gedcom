## 1. Install

Install the package from npm:

`$ npm install read-gedcom`

## 2. Test code

### Standalone

You can then use the following piece of code to check that everything is working properly:

```javascript
import { readGedcom } from 'read-gedcom';

const promise = fetch('https://mon.arbre.app/gedcoms/royal92.ged')
  .then(r => r.arrayBuffer())
  .then(readGedcom);

promise.then(gedcom => {
  console.log(gedcom.getHeader().toString());
});
```

**Note**: If you attempt to load a different URL, make sure that the resource has CORS enabled!
The example URL is safe to use, feel free to test your code with it.
You can find other sample Gedcom files at [arbre-app/public-gedcoms](https://github.com/arbre-app/public-gedcoms).

### File input

Alternatively, if you want to load a local file you should use the following code:

```javascript
import { readGedcom } from 'read-gedcom';

document.getElementById('gedcomFile').addEventListener('change', e => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      const buffer = reader.result;
      const gedcom = readGedcom(buffer);
      document.getElementById('head').textContent =
          gedcom.getHeader().toString();
    });
    reader.readAsArrayBuffer(file);
  }
});
```

And the corresponding HTML snippet:

```html
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><title>read-gedcom test</title></head>
<body>
  <label for="gedcomFile">Choose a Gedcom file:</label>
  <input type="file" id="gedcomFile" name="gedcomFile" accept=".ged,.gedcom">
  <div id="head" style="white-space: pre-wrap; font-family: monospace;"></div>
</body>
</html>
```

### Node.js local file

Similar to the first example, but for loading a locally available file:

```javascript
import { readGedcom } from 'read-gedcom';
import fs from 'fs';

fs.readFile('your_file_here.ged', (error, buffer) => {
  if (error) throw error;
  const gedcom = readGedcom(buffer);
  console.log(gedcom.getHeader().toString());
});
```

## 3. What's next?

You can move to the {@page Examples} page to familiarize yourself with the API.
