This page showcases advanced examples:

- [Detecting cycles](#detecting-cycles)
- [Topological sorting of individuals](#topological-sorting-of-individuals)

## Detecting cycles

A genealogical tree is essentially a (directed) graph: individuals can be represented as nodes and filial relationships ("X _is a child of_ Y") as edges.
While such a graph is not necessarily a tree, e.g. an individual can have parents who happen to share common ancestors, it must not contain any cycle.
That is because there is by essence an ordering on the individuals, based on their birthdate (even if the latter is not known).

The following function checks if the Gedcom file contain any cycle, and raises an exception if that is the case; indicating an invalid state.

```javascript
const checkNoCycles = gedcom => {
  const PERMANENT_MARK = true, TEMPORARY_MARK = false;

  const marks = {};
  const nonPermanentlyMarked = new Set();

  gedcom.getIndividualRecord().arraySelect().forEach(individual => nonPermanentlyMarked.add(individual.pointer()[0]));

  const visit = individual => {
    const id = individual.pointer()[0];
    const mark = marks[id];
    if(mark === PERMANENT_MARK) {
      return;
    } else if(mark === TEMPORARY_MARK) {
      throw new Error('The Gedcom file contains a cycle!');
    }
    nonPermanentlyMarked.add(id);
    marks[id] = TEMPORARY_MARK;
    individual.getFamilyAsSpouse().arraySelect()
      .filter(family => [family.getHusband(), family.getWife()].some(ref => marks[ref.value()[0]] === undefined))
      .forEach(family => family.getChild().getIndividualRecord().arraySelect().forEach(child => visit(child)));
    nonPermanentlyMarked.delete(id);
    marks[id] = PERMANENT_MARK;
  };

  while(nonPermanentlyMarked.size > 0) {
    const firstId = nonPermanentlyMarked.values().next().value;
    const individual = gedcom.getIndividualRecord(firstId);
    visit(individual);
  }
};
```

This implementation uses the recursive DFS marking algorithm. It's possible to make it non-recursive using stacks, or use BFS (this is left to the reader).

## Topological sorting of individuals

As described above, in an acyclic graph there exists at least one ordering of the nodes such that we can visit them in order.
This function is an adaptation of the above as it will detect if there is a cycle and otherwise compute a topological sort on the individuals.

```javascript
const topologicalIndividualSort = gedcom => {
  const PERMANENT_MARK = true, TEMPORARY_MARK = false;

  const sorted = []; // <-- A sorted array of individuals (children first, parents after)
  const marks = {};
  const nonPermanentlyMarked = new Set();

  gedcom.getIndividualRecord().arraySelect().forEach(individual => nonPermanentlyMarked.add(individual.pointer()[0]));

  const visit = individual => {
    const id = individual.pointer()[0];
    const mark = marks[id];
    if(mark === PERMANENT_MARK) {
      return;
    } else if(mark === TEMPORARY_MARK) {
      throw new Error('The Gedcom file contains a cycle!');
    }
    nonPermanentlyMarked.add(id);
    marks[id] = TEMPORARY_MARK;
    individual.getFamilyAsSpouse().arraySelect()
      .filter(family => [family.getHusband(), family.getWife()].some(ref => marks[ref.value()[0]] === undefined))
      .forEach(family => family.getChild().getIndividualRecord().arraySelect().forEach(child => visit(child)));
    nonPermanentlyMarked.delete(id);
    marks[id] = PERMANENT_MARK;
    sorted.push(id); // <-- Build the sorted array
  };

  while(nonPermanentlyMarked.size > 0) {
    const firstId = nonPermanentlyMarked.values().next().value;
    const individual = gedcom.getIndividualRecord(firstId);
    visit(individual);
  }

  return sorted; // <-- Return the ordering
};
```

Such an ordering is crucial for many computations, for instance estimating dates or computing relatedness coefficients.

## Extracting connected components

It is not necessary at all for all the individuals in a Gedcom file to be connected to each other in some way: there can be several disconnected "islands" of individuals.
This function identifies all the connected components with respect to filial and marital relationships.

```javascript
const connectedComponents = gedcom => {
  const notVisited = new Set();

  gedcom.getIndividualRecord().arraySelect().forEach(individual => notVisited.add(individual.pointer()[0]));

  const bfs = individual => {
    const id = individual.pointer()[0];
    let toVisit = new Set([id]);
    notVisited.delete(id);
    const visited = [];
    while(toVisit.size > 0) {
      const nextVisit = new Set();
      toVisit.forEach(id => {
        if(id) {
          const individual = gedcom.getIndividualRecord(id);
          individual.getFamilyAsSpouse().concatenate(individual.getFamilyAsChild())
            .arraySelect().forEach(family =>
            [family.getHusband(), family.getWife(), family.getChild()].flatMap(ref => ref.arraySelect())
              .map(ref => ref.value()[0]).filter(id => id).filter(id => notVisited.has(id)).filter(id => !toVisit.has(id))
              .forEach(id => nextVisit.add(id))
          );
          visited.push(id);
        }
      });

      nextVisit.forEach(id => notVisited.delete(id));
      toVisit = nextVisit;
    }
    return visited;
  };

  const components = [];
  while(notVisited.size > 0) {
    const firstId = notVisited.values().next().value;
    const individual = gedcom.getIndividualRecord(firstId);
    components.push(bfs(individual));
  }

  return components;
};
```

The Gedcom specification allows other relationships to exist such as witnesses, godparents, etc.; adapt this code to fit your needs.
