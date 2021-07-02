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

    export class ParseError extends BaseError {
        constructor(public readonly message: string) {
            super(message);
        }
    }

    export class DecodingError extends ParseError {
        constructor(message: string, public readonly illegalCode: number) {
            super(message);
        }
    }

    export class UnsupportedCharsetError extends ParseError {
        constructor(message: string, public readonly charset: string) {
            super(message);
        }
    }

    export class TokenizationError extends ParseError {
        constructor(message: string, public readonly lineNumber: number, public readonly line: string) {
            super(message);
        }
    }

    export class TreeSyntaxError extends ParseError {
        constructor(message: string, public readonly lineNumber: number) {
            super(message);
        }
    }
    export class InvalidNestingError extends TreeSyntaxError {
        constructor(message: string, public readonly lineNumber: number, public readonly currentLevel: number, public readonly level: number) {
            super(message, lineNumber);
        }
    }
    export class InvalidConcatenationError extends TreeSyntaxError {
        constructor(message: string, public readonly lineNumber: number, public readonly kind: string) {
            super(message, lineNumber);
        }
    }
    export class InvalidRecordDefinitionError extends TreeSyntaxError {}

    export class TreeStructureError extends ParseError {}
    export class EmptyTreeError extends TreeStructureError {}

    export class IndexingError extends ParseError {}
    export class DuplicatePointerError extends IndexingError {
        constructor(message: string, public readonly lineNumber: number, public readonly lineNumberOriginalDefinition: number, public readonly pointer: string) {
            super(message);
        }
    }
}
