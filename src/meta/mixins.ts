/**
 * A type representing an arbitrary function.
 */
export type AnyFunction<A = any> = (...input: any[]) => A; // eslint-disable-line

/**
 * A type representing an arbitrary constructor.
 */
export type AnyConstructor<T = {}> = new (...args: any[]) => T; // eslint-disable-line

/**
 * A type representing a mixin function.
 */
export type Mixin<T extends AnyFunction> = InstanceType<ReturnType<T>>;
