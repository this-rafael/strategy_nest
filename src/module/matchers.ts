/* eslint-disable @typescript-eslint/ban-types */
/**
 * The acceptable context values
 */
export type MatcherKeys = string | number | symbol;

/**
 * Expose an object with the keys of K and the values of T
 * K enum like type with the acceptable context values
 * T the type of the strategies
 */
export type Matchers<K extends MatcherKeys> = {
  [key in K]: object;
};
