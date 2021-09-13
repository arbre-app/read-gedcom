/**
 * @module Parsing
 */

export * from './value';
export { parseGedcom } from './reader';
export { GedcomReadingOptions } from './GedcomReadingOptions';
export { GedcomReadingPhase } from './GedcomReadingPhase';
export {
    ErrorGedcomBase,
    ErrorParse,
    ErrorInvalidFileType,
    ErrorUnsupportedCharset,
    ErrorTokenization,
    ErrorTreeSyntax,
    ErrorInvalidNesting,
    ErrorInvalidConcatenation,
    ErrorInvalidRecordDefinition,
    ErrorTreeStructure,
    ErrorEmptyTree,
    ErrorIndexing,
    ErrorDuplicatePointer,
} from './error';
