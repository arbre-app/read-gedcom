import { ErrorTokenization } from './error';

const ccAlpha = 'A-Za-z';
const ccDigit = '0-9', ccNonZeroDigit = '1-9';
const ccAlphanum = `${ccAlpha}${ccDigit}`;
const cSpace = ' ';
const cDelim = `${cSpace}`;
const gEscapeText = `[${ccAlphanum}][${ccAlphanum}${cSpace}]*`;
const gEscape = `@#(?:${gEscapeText})@`;
const gIdentifierString = `[${ccAlphanum}-]+`; // x: Allow '-'
const gLevel = `[${ccNonZeroDigit}][${ccDigit}]+|[${ccDigit}]`;
const ccDisallowed = '\\x00-\\x08\\x0A-\\x1F'; // x: include \xFF
const cCR = '\\r', cLF = '\\n';
const gLineChar = `[^${ccDisallowed}${cCR}${cLF}@]|@`; // x: Allow single at
const gLineText = `(?:${gLineChar})*`; // x: Allow empty strings
const gLineItem = `${gEscape}|${gLineText}|${gEscape}[${cDelim}]${gLineText}`;
const gXRefId = `@${gIdentifierString}@`;
const gPointer = `${gXRefId}`;
const gLineValue = `${gPointer}|(?:${gLineItem})`;
const gTag = `[${ccAlphanum}]+|_[${ccAlphanum}_]+`; // TODO
const gTerminator = `${cCR}?${cLF}`;
const gGedcomLine = `(${gLevel})(?:${cDelim}(${gXRefId}))?${cDelim}(${gTag})(?:${cDelim}(${gLineValue}))?(?:${gTerminator})`;

/**
 * The tokenizer implementation.
 * Processes a file stored as a string, line by line, according to the `gGedcomLine` regular expression.
 * A parameter in the constructor decides whether to raise an error when a line cannot be parsed or to fail silently.
 * Code was not extracted further as a performance tradeoff.
 */
class GedcomTokenizer implements IterableIterator<RegExpExecArray> {
    private rGedcomLines = new RegExp(`^${gGedcomLine}`, 'gym'); // Must be newly created
    private linesRead = 0;
    private charactersRead = 0;

    constructor(private readonly input: string, private readonly strict: boolean) {} // eslint-disable-line no-useless-constructor

    [Symbol.iterator](): IterableIterator<RegExpExecArray> {
        return this;
    }

    next(): IteratorResult<RegExpExecArray, null> {
        const result = this.rGedcomLines.exec(this.input);
        if (result === null) {
            const success = this.charactersRead === this.input.length;
            if (this.strict && !success) {
                const printCharactersMax = 256; // Avoid printing a super long line
                const errorLine = this.input.substring(this.charactersRead, Math.min(this.charactersRead + printCharactersMax, this.input.length)).split(/[\r\n]+/, 1)[0];
                throw new ErrorTokenization(`Invalid format for line ${this.linesRead + 1}: "${errorLine}"`, this.linesRead + 1, errorLine);
            }

            return { done: true, value: null }; // Return
        } else {
            this.charactersRead += result[0].length; // Includes terminator
            this.linesRead++;
            return { done: false, value: result }; // Yield
        }
    }
}

/**
 * Processes the input string and return a tokenized, line by line, high-level representation.
 * @param input The input file, represented as a single string
 * @param strict When set to <code>false</code> any parsing exception will not be reported
 */
export const tokenize = (input: string, strict = true): Iterable<RegExpExecArray> => new GedcomTokenizer(input, strict);
