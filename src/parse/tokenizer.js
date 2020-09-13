const ccAlpha = 'A-Za-z';
const ccDigit = '0-9', ccNonZeroDigit = '1-9';
const ccAlphanum = `${ccAlpha}${ccDigit}`;
const cSpace = ' ';
const cDelim = `${cSpace}`;
const gEscapeText = `[${ccAlphanum}][${ccAlphanum}${cSpace}]*`;
const gEscape = `@#(?:${gEscapeText})@`;
const gIdentifierString = `[${ccAlphanum}]+`;
const gLevel = `[${ccNonZeroDigit}][${ccDigit}]+|[${ccDigit}]`;
const ccDisallowed = '\\u0000-\\u0008\\u000A-\\u001F\\u00FF';
const cCR = '\\r', cLF = '\\n';
const gLineChar = `[^${ccDisallowed}${cCR}${cLF}@]|@`; // x: Allow single at
const gLineText = `(?:${gLineChar})*`; // x: Allow empty strings
const gLineItem = `${gEscape}|${gLineText}|${gEscape}[${cDelim}]${gLineText}`;
const gXRefId = `@${gIdentifierString}@`;
const gPointer = `${gXRefId}`;
const gLineValue = `${gPointer}|(?:${gLineItem})`;
const gTag = `[${ccAlphanum}]+|_[${ccAlphanum}]+`; // TODO
const gTerminator = `${cCR}|${cLF}|${cCR}${cLF}`;
const gGedcomLine = `(${gLevel})(?:${cDelim}(${gXRefId}))?${cDelim}(${gTag})(?:${cDelim}(${gLineValue}))?(?:${gTerminator})`

const rGedcomLines = new RegExp(`^${gGedcomLine}`, 'gym');

export function* tokenize(input) {
    let result, linesRead = 0, charactersRead = 0;
    while((result = rGedcomLines.exec(input)) !== null) {
        charactersRead += result[0].length;
        linesRead++;
        yield result;
    }

    const success = charactersRead === input.length;
    if(!success) {
        const printCharactersMax = 256; // Avoid printing a super long line
        const errorLine = input.substring(charactersRead, Math.min(charactersRead + printCharactersMax, input.length)).split(/[\r\n]/, 1)[0];
        throw new Error(`Invalid format for line ${linesRead + 1}: "${errorLine}"`);
    }
}
