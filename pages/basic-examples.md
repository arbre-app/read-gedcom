We present some common use cases:

- [Debugging](#debugging)
- [General statistics](#general-statistics)
- [Retrieving individuals](#retrieving-individuals)
- [Retrieving relatives](#retrieving-relatives)
- [Retrieving events](#retrieving-events)
- [Interpreting dates](#interpreting-dates)

## Debugging

The method `toString` comes handy when working with Gedcom files: it can transform any selection to a readable string.

For instance:

```javascript
console.log(gedcom.getSubmitterRecord().toString());
```

will display, for the file `royal92.ged`:

```
HEAD
  SOUR PAF 2.2
  DEST PAF
  DATE 20 NOV 1992
  FILE ROYALS.GED
  CHAR ANSEL
```

And similarly:

```javascript
console.log(gedcom.toString());
```

will print the entire Gedcom tree.

It's also possible to export the selection into an array of trees:

```javascript
console.log(gedcom.getHeader().array());
```

yielding:

```
[
  {
    "tag": "HEAD",
    "pointer": null,
    "value": null,
    "indexSource": 0,
    "indexRelative": 0,
    "children": [ ... ],
    "_index": { ... },
  }
]
```

## General statistics

Compute general statistics of the data contained in this Gedcom file.

```javascript
const computeGeneralStatistics = gedcom => ({
  families: gedcom.getFamilyRecord().length,
  individuals: gedcom.getIndividualRecord().length,
  multimedia: gedcom.getMultimediaRecord().length,
  notes: gedcom.getNoteRecord().length,
  repositories: gedcom.getRepositoryRecord().length,
  sources: gedcom.getSourceRecord().length,
});
```

Observe how `get...()` without arguments captures all nodes, despite the functions names being singular.
The reason for that will become apparent in the next examples.

## Retrieving individuals

### All

A selection method without argument will capture all nodes, hence as in the previous example it's sufficient to do:

```javascript
gedcom.getIndividualRecord();
```

### First record

Find the first record in the file; this is useful e.g. to select an initial individual.

```javascript
gedcom.getIndividualRecord().arraySelect()[0];
```

Beware that some files may not have individual records at all.
Therefore, the result of that is either a selection of size exactly one, or `undefined`.

It's worth noting that in practice the first record usually happens to be the submitter's.

### Known id

If you know the id, then you can simply pass it as an argument.

```javascript
gedcom.getIndividualRecord('@I1@');
```

### Query by name

This more sophisticated example shows how one can implement a fuzzy search engine, by filtering the individuals based on their attributes.

```javascript
const queryIndividual = (gedcom, query) => {
  const tokenize = name => name.trim().toLowerCase().split(/ +/);
  const queryTokens = tokenize(query);
  return gedcom.getIndividualRecord().filterSelect(individual => {
    const names = individual.getName().valueAsParts()[0];
    if(names !== null) {
      const namesTokens = names.filter(v => v).flatMap(tokenize);
      return queryTokens.every(s => namesTokens.includes(s));
    }
    return false;
  });
};

queryIndividual(gedcom, 'frederick hanover');
```

## Retrieving relatives

In Gedcom files the filial and spouse relationship are stored as a separate record: **families**.
Assume as an illustration that `I01` and `I02` have a child `I03`.
These relations would be represented in a new record `F01`:

```
@I01@ <--H-- @F01@ --W--> @I02@
               |
               C
               |
               V
             @I03@
```

Where `H`, `W` and `C` mean husband, wife and child respectively.


```javascript
const family = gedcom.getFamilyRecord('@F01@');
family.getHusband().getIndividualRecord(); // Record @I01@
family.getWife().getIndividualRecord(); // Record @I02@
family.getChild().getIndividualRecord(); // Record @I03@
```

Take note of the call to `getIndividualRecord`; this is because the node looks like:

```
FAM @F01@
  HUSB @I01@
  WIFE @I02@
  CHIL @I03@
```

That call essentially **resolves** the id stored as a value into its corresponding record.

Also observe that the relations are not stored in the individual records themselves, which poses an issue if we want to retrieve relatives of an arbitrary individual.
Fortunately this data is by default already indexed and the backward edges can be traversed from the individuals directly:

```javascript
gedcom.getIndividualRecord('@I01@').getFamilyAsSpouse(); // Record @F01@
gedcom.getIndividualRecord('@I02@').getFamilyAsSpouse(); // Record @F01@
gedcom.getIndividualRecord('@I03@').getFamilyAsChild(); // Record @F01@
```

Other examples:

```javascript
// Get the children of @I01@
gedcom.getIndividualRecord('@I01@')
  .getFamilyAsSpouse()
  .getChild().getIndividualRecord(); // Record @I03@

// Get the parents of @I03@
const family = gedcom.getIndividualRecord('@I03@').getFamilyAsChild();
family.getHusband().concatenate(family.getWife())
  .getIndividualRecord(); // Records @I01@ and @I02@
```

## Retrieving events

```javascript
const individual = gedcom.getIndividualRecord('@I1@');
individual.getEventBirth(); // Birth
individual.getEventDeath(); // Death
individual.getFamilyAsSpouse().getEventMarriage(); // Marriage (family event)
```

It's also possible to retrieve several events at once:

```javascript
[individual.getEventDeath(), individual.getEventBurial(), individual.getEventCremation()]
    .reduce((acc, e) => acc.concatenate(e));

// Or directly with tags: (less recommended)

individual.get(
  [Tag.Death, Tag.Burial, Tag.Cremation],
  null,
  SelectionEvent
);
```

There is no concise way to retrieve _all_ event types, you must use either of the two suggested approaches and explicitly specify the tags that you are interested in.
You can find the complete list of available tags under {@link SelectionIndividualRecord} and {@link SelectionFamilyRecord}.

## Interpreting dates

Gedcom dates can take a lot of different forms.
The most common are what we call "punctual" dates; an event that happens at a specific known point in time and lasting at most a day.

```javascript
gedcom
  .getIndividualRecord('@I1@')
  .getEventBirth()
  .getDate() // 24 MAY 1819
  .valueAsDate(); // { day: 24, month: 5, year: 1819, calendar: { isGregorian: true, ... }, ... }
```

It's also possible to parse a date outside a selection:

```javascript
import { parseDate } from 'read-gedcom';

parseDate('24 MAY 1819'); // (ditto)
```

For more in-depth documentation, we recommend checking the signature of {@link parseDate}.

---

You may find more {@page Advanced Examples} on the next page.
