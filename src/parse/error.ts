/**
 * The base type for all Gedcom related errors. All errors are currently also instances of {@link ErrorParse}.
 */
export abstract class ErrorGedcomBase extends Error {
    protected constructor(message?: string) {
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

export class ErrorParse extends ErrorGedcomBase {
    constructor(public readonly message: string) {
        super(message);
    }
}

export class ErrorInvalidFileType extends ErrorParse {}

export class GedcomErrorDecoding extends ErrorParse {
    constructor(message: string, public readonly illegalCode: number) {
        super(message);
    }
}

export class ErrorUnsupportedCharset extends ErrorParse {
    constructor(message: string, public readonly charset: string) {
        super(message);
    }
}

export class ErrorTokenization extends ErrorParse {
    constructor(message: string, public readonly lineNumber: number, public readonly line: string) {
        super(message);
    }
}

export class ErrorTreeSyntax extends ErrorParse {
    constructor(message: string, public readonly lineNumber: number) {
        super(message);
    }
}
export class ErrorInvalidNesting extends ErrorTreeSyntax {
    constructor(message: string, public readonly lineNumber: number, public readonly currentLevel: number, public readonly level: number) {
        super(message, lineNumber);
    }
}
export class ErrorInvalidConcatenation extends ErrorTreeSyntax {
    constructor(message: string, public readonly lineNumber: number, public readonly kind: string) {
        super(message, lineNumber);
    }
}
export class ErrorInvalidRecordDefinition extends ErrorTreeSyntax {}

export class ErrorTreeStructure extends ErrorParse {}
export class ErrorEmptyTree extends ErrorTreeStructure {}

export class ErrorIndexing extends ErrorParse {}
export class ErrorDuplicatePointer extends ErrorIndexing {
    constructor(message: string, public readonly lineNumber: number, public readonly lineNumberOriginalDefinition: number, public readonly pointer: string) {
        super(message);
    }
}
