
export class Value {
    constructor(values) {
        if (!Array.isArray(values)) {
            throw 'Values should be an array';
        }
        this.values = values;
    }

    one() {
        if (!this.isOne()) {
            throw 'Values count is not 1';
        }
        return this.values[0];
    }

    isOne() {
        return this.values.length;
    }

    isEmpty() {
        return this.values.length === 0;
    }

    option(otherwise) {
        const value = this.values[0];
        if (otherwise !== undefined) {
            return value !== null ? value : otherwise;
        } else {
            return value;
        }
    }

    filterEmpty() {
        // Removes undefined and null
        return new Value(this.values.filter(v => v != null));
    }

    all() {
        return [...this.values];
    }

    length() {
        return this.values.length;
    }

    map(f) {
        return new Value(this.values.map(f));
    }
}
