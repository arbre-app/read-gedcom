/**
 * @module Parsing
 */

export * from './value';
export { parseGedcom } from './reader';
/**
 * @category Gedcom parser
 */
export { GedcomReadingOptions } from './GedcomReadingOptions';
/**
 * @category Gedcom parser
 */
export { GedcomReadingPhase } from './GedcomReadingPhase';
/**
 * @category Errors
 */
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
export { indexTree } from './indexer';
