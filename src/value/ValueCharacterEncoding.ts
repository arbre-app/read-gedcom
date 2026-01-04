export const ValueCharacterEncoding = {
    Utf8: 'UTF-8',
    Unicode: 'UNICODE', // While technically not the name of a charset, it is used by some software (and also part of the Gedcom specification)
    Ansel: 'ANSEL',
    Ascii: 'ASCII',
    Ansi: 'ANSI',
} as const;

export type ValueCharacterEncodingType = typeof ValueCharacterEncoding[keyof typeof ValueCharacterEncoding];
