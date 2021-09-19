/**
 * This annotation controls the enumerability of a property.
 * @param value
 */
export const enumerable = (value: boolean) =>
    // eslint-disable-next-line
    (target: any, prop: string, descriptor?: PropertyDescriptor) => {
        if (descriptor) {
            descriptor.enumerable = value;
        } else {
            const propSymbol = Symbol(prop);
            Object.defineProperty(target, prop, {
                configurable: true,
                enumerable: value,
                get() { return this[propSymbol]; },
                set(value) { this[propSymbol] = value; },
            });
        }
    };
