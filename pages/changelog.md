## `0.3.0`

* Refactored the API: removal of namespaces (**major breaking changes**)
* Improved the organization of documentation
* Extracted values parsers to be usable independently from the selection API
* Refined the dates types
* Converted enums to const enums
* Added support for UTF-16 encoded files (big & little endian)
* Fixed the prototype of error subclasses
* The index now uses integers instead of references to make it JSON-serializable
* Conversions from Julian dates are now supported
* Transformed transparent classes into types, added mixins to factor some code
* Added migration and changelog pages

## `0.2.1`

* Created documentation sections (quickstart and various examples)
* Completed entities documentation; a lot remains to be documented though
* The file parser fails faster with non-Gedcom files
* Improve tooling (`toString` method on selections, `nodeToString` for single nodes)
* The index property can be hidden
* The charset detection can be disabled and a static value can be provided instead
* New selections methods (`concatenate`, `concatenateLeft`, `sorted`, `equals`)
* Fixed `undefined` appearing in values when concatenating empty lines
* Fixed various issues when parsing dates
* Dates in Gregorian and French Republican calendars can now be converted to JS dates thanks to `toJsDate`
* Added some missing adapters and value converters
* Added some missing value enumerations
* Fixed tree-shakability; bundles can now be greatly optimized in size, especially if the selection API is not used
* Added an ES6 build, in addition to the existing CommonJS build

## `0.2.0`

* Major API changes and code ported to Typescript

## Older versions

No changelog available; please review the VCS history.
