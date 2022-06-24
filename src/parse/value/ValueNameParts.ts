export type ValueNameParts =
    (string | undefined)[]
    & [string | undefined, string | undefined, string | undefined]
    & ([string, string, string] | [undefined, string, string] | [string, string, undefined] | [undefined, string, undefined] | [string, undefined, undefined]);
