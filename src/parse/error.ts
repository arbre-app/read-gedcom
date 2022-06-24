// See https://github.com/Microsoft/TypeScript-wiki/blob/master/Breaking-Changes.md#extending-built-ins-like-error-array-and-map-may-no-longer-work
const patchPrototype = <T extends Error>(instance: T, target: any) => {
    const proto = target.prototype;
    if (Object.setPrototypeOf) {
        Object.setPrototypeOf(instance, proto);
    } else {
        (this as any).__proto__ = proto; // eslint-disable-line no-proto
    }
};

/**
 * The base type for all Gedcom related errors. All errors are currently also instances of {@link ErrorParse}.
 */
export abstract class ErrorGedcomBase extends Error {
    protected constructor(message?: string) {
        super(message);
        patchPrototype(this, new.target);
    }
}

/**
 * The base class of all parsing errors.
 */
export class ErrorParse extends ErrorGedcomBase {
    constructor(public readonly message: string) {
        super(message);
        patchPrototype(this, new.target);
    }
}

/**
 * Thrown if it is unlikely a Gedcom file, for instance if a completely unrelated file was passed.
 */
export class ErrorInvalidFileType extends ErrorParse {}

/**
 * Thrown on likely Gedcom files if there was an error during the decoding of the characters.
 * Such an error can be muted by passing <code>false</code> to the <code>strict</code> parameter of a decoding method (for example, {@link decodeAnsel}).
 */
export class ErrorGedcomDecoding extends ErrorParse {
    constructor(message: string, public readonly illegalCode: number) {
        super(message);
        patchPrototype(this, new.target);
    }
}

/**
 * Thrown on likely Gedcom file in rare occasions if the charset was detected but is not supported.
 * An example would be UTF-32.
 */
export class ErrorUnsupportedCharset extends ErrorParse {
    constructor(message: string, public readonly charset: string) {
        super(message);
        patchPrototype(this, new.target);
    }
}

/**
 * Thrown on likely Gedcom files if a line could not be tokenized properly.
 * This is perhaps the most common error in practice.
 */
export class ErrorTokenization extends ErrorParse {
    constructor(message: string, public readonly lineNumber: number, public readonly line: string) {
        super(message);
        patchPrototype(this, new.target);
    }
}

/**
 * The base class of all tree structuring errors.
 * Such errors can be thrown only after the tokenization phase has completed successfully.
 */
export class ErrorTreeSyntax extends ErrorParse {
    constructor(message: string, public readonly lineNumber: number) {
        super(message);
        patchPrototype(this, new.target);
    }
}
/**
 * Thrown if a line is incorrectly nested.
 */
export class ErrorInvalidNesting extends ErrorTreeSyntax {
    constructor(message: string, public readonly lineNumber: number, public readonly currentLevel: number, public readonly level: number) {
        super(message, lineNumber);
        patchPrototype(this, new.target);
    }
}
/**
 * Thrown if a concatenation or a continuation line is incorrectly used.
 */
export class ErrorInvalidConcatenation extends ErrorTreeSyntax {
    constructor(message: string, public readonly lineNumber: number, public readonly kind: string) {
        super(message, lineNumber);
        patchPrototype(this, new.target);
    }
}
/**
 * Thrown if a record appears at a position other than the top-most level.
 */
export class ErrorInvalidRecordDefinition extends ErrorTreeSyntax {
    constructor(message: string, lineNumber: number) {
        super(message, lineNumber);
        patchPrototype(this, new.target);
    }
}

/**
 * Thrown if the file does not start with a header or does not end with a trailer.
 */
export class ErrorTreeStructure extends ErrorParse {
    constructor(message: string) {
        super(message);
        patchPrototype(this, new.target);
    }
}
/**
 * @deprecated This error cannot occur, an empty tree would throw a {@link ErrorInvalidFileType} instead.
 */
export class ErrorEmptyTree extends ErrorTreeStructure {
    constructor(message: string) {
        super(message);
        patchPrototype(this, new.target);
    }
}

/**
 * The base class of all indexing errors.
 * Such errors can occur if an inconsistency is discovered while indexing the data.
 */
export class ErrorIndexing extends ErrorParse {
    constructor(message: string) {
        super(message);
        patchPrototype(this, new.target);
    }
}
/**
 * Thrown if a duplicate pointer is discovered.
 */
export class ErrorDuplicatePointer extends ErrorIndexing {
    constructor(message: string, public readonly lineNumber: number, public readonly lineNumberOriginalDefinition: number, public readonly pointer: string) {
        super(message);
        patchPrototype(this, new.target);
    }
}
