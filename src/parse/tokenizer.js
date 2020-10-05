const ccAlpha = 'A-Za-z';
const ccDigit = '0-9', ccNonZeroDigit = '1-9';
const ccAlphanum = `${ccAlpha}${ccDigit}`;
const cSpace = ' ';
const cDelim = `${cSpace}`;
const gEscapeText = `[${ccAlphanum}][${ccAlphanum}${cSpace}]*`;
const gEscape = `@#(?:${gEscapeText})@`;
const gIdentifierString = `[${ccAlphanum}]+`;
const gLevel = `[${ccNonZeroDigit}][${ccDigit}]+|[${ccDigit}]`;
const ccDisallowed = '\\x00-\\x08\\x0A-\\x1F'; // x: include \xFF
const cCR = '\\r', cLF = '\\n';
const gLineChar = `[^${ccDisallowed}${cCR}${cLF}@]|@`; // x: Allow single at
const gLineText = `(?:${gLineChar})*`; // x: Allow empty strings
const gLineItem = `${gEscape}|${gLineText}|${gEscape}[${cDelim}]${gLineText}`;
const gXRefId = `@${gIdentifierString}@`;
const gPointer = `${gXRefId}`;
const gLineValue = `${gPointer}|(?:${gLineItem})`;
const gTag = `[${ccAlphanum}]+|_[${ccAlphanum}]+`; // TODO
const gTerminator = `${cCR}?${cLF}`;
const gGedcomLine = `(${gLevel})(?:${cDelim}(${gXRefId}))?${cDelim}(${gTag})(?:${cDelim}(${gLineValue}))?(?:${gTerminator})`

export function tokenize(input, strict = true) {
    return {
        [Symbol.iterator]() { // Refactor?
            const rGedcomLines = new RegExp(`^${gGedcomLine}`, 'gym'); // Must be newly created

            let result, linesRead = 0, charactersRead = 0;
            let done = false;

            return {
                next: () => {
                    if (done) {
                        return {done: true};
                    } else {
                        result = rGedcomLines.exec(input);
                        if (result === null) {
                            done = true;

                            const success = charactersRead === input.length;
                            if (strict && !success) {
                                const printCharactersMax = 256; // Avoid printing a super long line
                                const errorLine = input.substring(charactersRead, Math.min(charactersRead + printCharactersMax, input.length)).split(/[\r\n]+/, 1)[0];
                                throw new Error(`Invalid format for line ${linesRead + 1}: "${errorLine}"`);
                            }

                            return {done: true};
                        } else {
                            charactersRead += result[0].length; // Includes terminator
                            linesRead++;
                            return {value: result, done: false};
                        }
                    }
                }
            };
        }
    }
}
