export function _get(object, key, def) {
    const value = object[key];
    return value ? value : def;
}
