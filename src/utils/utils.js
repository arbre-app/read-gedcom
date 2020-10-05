export function _get(object, key, def) {
    const value = object[key];
    return value ? value : def;
}

export function _first(array) {
    return array.length > 0 ? array[0] : null;
}
