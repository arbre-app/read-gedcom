export namespace GedcomError {
    export abstract class BaseError extends Error {
        constructor(message?: string) {
            super(message);

            // See https://github.com/Microsoft/TypeScript-wiki/blob/master/Breaking-Changes.md#extending-built-ins-like-error-array-and-map-may-no-longer-work
            const proto = new.target.prototype;
            if (Object.setPrototypeOf) {
                Object.setPrototypeOf(this, proto);
            } else {
                (this as any).__proto__ = proto; // eslint-disable-line no-proto
            }
        }
    }

    export class ParseError extends BaseError {}

    export class DecodingError extends ParseError {}

    export class UnsupportedCharsetError extends ParseError {}

    export class TokenizationError extends ParseError {}

    export class TreeSyntaxError extends ParseError {}
    export class InvalidNestingError extends TreeSyntaxError {}
    export class InvalidConcatenationError extends TreeSyntaxError {}
    export class InvalidRecordDefinitionError extends TreeSyntaxError {}

    export class TreeStructureError extends ParseError {}
    export class EmptyTreeError extends TreeStructureError {}

    export class IndexingError extends ParseError {}
    export class DuplicatePointerError extends IndexingError {}
}
