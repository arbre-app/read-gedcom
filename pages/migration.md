This is a small guide to help you upgrade the library to the next minor release:

- [Migrating from `0.2.X` to `0.3.0`](#migrating-from-02x-to-030)
- [Migrating from `0.1.X` or lower](#migrating-from-01x-or-lower)

## Migrating from `0.2.X` to `0.3.0`

Namespaces were removed because of to their negative effect on code minification.
Moreover, it was also decided to remove the `Gedcom` prefix to reduce the amount of noise.
For example:

* `GedcomTag.Head` becomes `Tag.Head`
* `GedcomSelection.IndividualRecord` becomes `SelectionIndividualRecord`
* `GedcomValue.Event` becomes `ValueEvent`
* `GedcomTree.Node` becomes `TreeNode`

The name `Error` was also made a prefix to align with the rest, for example:

* `GedcomError.TokenizationError` becomes `ErrorTokenization`

The dates types (formerly `GedcomDate`) were also revised; while you refactor the identifiers you are encouraged to review the types.

Other changes:

* The root index interface was renamed, it is now `TreeIndexRoot` (~~`TreeRootIndex`~~ is incorrect) 
* To avoid confusion, the note reference adapter can be found under the name `SelectionNoteReferenceMixed` (~~`SelectionNoteReferenceMixin`~~ is incorrect)
* `indexTree` had its argument order changed (there was a typo)

## Migrating from `0.1.X` or lower

Due to the low amount of users, we do not provide a migration guide for these versions.
If you are in this case and encounter technical difficulties, do not hesitate to [open a ticket](https://github.com/arbre-app/read-gedcom/issues).
