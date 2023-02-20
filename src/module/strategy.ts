/* eslint-disable @typescript-eslint/ban-types */
import { BuildContextMatcher } from './build-context-matchers';
import { MatcherKeys } from './matchers';
import { ProvidableStrategy } from './providable-strategy';

/**
 * Builds a strategy injector for a given token and strategies
 *
 * @export
 * @class InjectStrategies
 * @template T - the abstract class to be configured as token
 * @template S - the strategies to be injected
 */
export class InjectStrategies<T extends Function = any, S extends T = any> {
  /**
   * Creates an instance of InjectStrategies.
   * @param {T} token
   * @param {S[]} strategies
   * @memberof InjectStrategies
   */
  constructor(private readonly token: T, private readonly strategies: S[]) {}

  /**
   * Builds a strategy injector for a given token and strategies and a map function to build StrategyContextAnalyzer
   *
   * @template K - the matcher keys
   * @param {BuildContextMatcher<T, K>} map - the map function to build StrategyContextAnalyzer
   * @return {*}  {ProvidableStrategy<T, K, S>}
   * @memberof InjectStrategies
   */
  mapContext<K extends MatcherKeys>(
    map: BuildContextMatcher<T, K>,
  ): ProvidableStrategy<T, K, S> {
    return new ProvidableStrategy(this.token, this.strategies, map);
  }
}
