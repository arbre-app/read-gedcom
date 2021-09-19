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

export class ErrorParse extends ErrorGedcomBase {
    constructor(public readonly message: string) {
        super(message);
        patchPrototype(this, new.target);
    }
}

export class ErrorInvalidFileType extends ErrorParse {}

export class ErrorGedcomDecoding extends ErrorParse {
    constructor(message: string, public readonly illegalCode: number) {
        super(message);
        patchPrototype(this, new.target);
    }
}

export class ErrorUnsupportedCharset extends ErrorParse {
    constructor(message: string, public readonly charset: string) {
        super(message);
        patchPrototype(this, new.target);
    }
}

export class ErrorTokenization extends ErrorParse {
    constructor(message: string, public readonly lineNumber: number, public readonly line: string) {
        super(message);
        patchPrototype(this, new.target);
    }
}

export class ErrorTreeSyntax extends ErrorParse {
    constructor(message: string, public readonly lineNumber: number) {
        super(message);
        patchPrototype(this, new.target);
    }
}
export class ErrorInvalidNesting extends ErrorTreeSyntax {
    constructor(message: string, public readonly lineNumber: number, public readonly currentLevel: number, public readonly level: number) {
        super(message, lineNumber);
        patchPrototype(this, new.target);
    }
}
export class ErrorInvalidConcatenation extends ErrorTreeSyntax {
    constructor(message: string, public readonly lineNumber: number, public readonly kind: string) {
        super(message, lineNumber);
        patchPrototype(this, new.target);
    }
}
export class ErrorInvalidRecordDefinition extends ErrorTreeSyntax {
    constructor(message: string, lineNumber: number) {
        super(message, lineNumber);
        patchPrototype(this, new.target);
    }
}

export class ErrorTreeStructure extends ErrorParse {
    constructor(message: string) {
        super(message);
        patchPrototype(this, new.target);
    }
}
export class ErrorEmptyTree extends ErrorTreeStructure {
    constructor(message: string) {
        super(message);
        patchPrototype(this, new.target);
    }
}

export class ErrorIndexing extends ErrorParse {
    constructor(message: string) {
        super(message);
        patchPrototype(this, new.target);
    }
}
export class ErrorDuplicatePointer extends ErrorIndexing {
    constructor(message: string, public readonly lineNumber: number, public readonly lineNumberOriginalDefinition: number, public readonly pointer: string) {
        super(message);
        patchPrototype(this, new.target);
    }
}
