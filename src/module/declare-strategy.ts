/* eslint-disable @typescript-eslint/ban-types */
import { BuildContextMatcher } from './build-context-matchers';
import { MatcherKeys } from './matchers';
import { InjectStrategies } from './strategy';

/**
 *  Declares a strategy passing the 3 basic arguments for configuration:
 * @export
 * @interface DeclareStrategyWith
 * @template T - the abstract class to be configured as token
 * @template K - the matcher keys
 * @template S - the strategies to be injected
 */
export interface DeclareStrategyWith<
  T extends object,
  K extends MatcherKeys,
  S extends T = any,
> {
  mapContext: BuildContextMatcher<T, K>;
  token: T;
  strategies: S[];
}

/**
 * This class is used to declare an strategy to be added in the module
 *
 * @export
 * @class DeclareStrategy
 * @template T
 */
export class DeclareStrategy<T extends object> {
  /**
   * Creates an instance of DeclareStrategy.
   * @param {T} token - the abstract class to be configured as token
   * @memberof DeclareStrategy
   */
  constructor(private readonly token: T) {}

  /**
   * Default method to declare a strategy of receive a token as argument and return a DeclareStrategy
   *
   * @static
   * @template T
   * @param {T} token - the abstract class to be configured as token
   * @return {*}  {DeclareStrategy<T>}
   * @memberof DeclareStrategy
   */
  static of<T extends object>(token: T): DeclareStrategy<T> {
    return new DeclareStrategy(token);
  }

  /**
   * Alternative method to declare a strategy of receive a token and strategies as argument and return a InjectStrategies
   *
   * @static
   * @template T
   * @template K
   * @template S
   * @param {DeclareStrategyWith<T, K, S>} withConfig
   * @return {*}  {*}
   * @memberof DeclareStrategy
   */
  static with<T extends object, K extends MatcherKeys, S extends T = any>(
    withConfig: DeclareStrategyWith<T, K, S>,
  ): any {
    return new DeclareStrategy<T>(withConfig.token)
      .injectsStrategies<S>(...withConfig.strategies)
      .mapContext<K>(withConfig.mapContext);
  }

  /**
   * Method to inject strategies in the strategy
   *
   * @template S - the strategies to be injected
   * @param {...S[]} strategies - the strategies to be injected
   * @return {*}  {InjectStrategies}
   * @memberof DeclareStrategy
   */
  injectsStrategies<S extends T>(...strategies: S[]): InjectStrategies {
    return new InjectStrategies(
      this.token as Function,
      strategies as Function[],
    );
  }
}
