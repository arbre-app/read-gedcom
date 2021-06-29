/**
 * A type representing an arbitrary function.
 */
export type AnyFunction<A = any> = (...input: any[]) => A;

/**
 * A type representing an arbitrary constructor.
 */
export type AnyConstructor<T = {}> = new (...args: any[]) => T;

/**
 * A type representing a mixin function.
 */
export type Mixin<T extends AnyFunction> = InstanceType<ReturnType<T>>;
