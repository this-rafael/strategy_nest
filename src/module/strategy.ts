/* eslint-disable @typescript-eslint/ban-types */
import { BuildContextMatcher } from "./build-context-matchers";
import { MatcherKeys } from "./matchers";
import { ProvidableStrategy } from "./providable-strategy";

/**
 * Builds a strategy injector for a given token and strategies
 *
 * @export
 * @class InjectStrategies
 */
export class InjectStrategies<T extends Function = any, S extends T = any> {
  /**
   * Creates an instance of InjectStrategies.
   * @param {T} token
   * @memberof InjectStrategies
   */
  constructor(private readonly token: T, private readonly strategies: S[]) {}

  /**
   * Builds a strategy injector for a given token and strategies and a map function to build StrategyContextAnalyzer
   *
   * @template K - the matcher keys
   * @param {BuildContextMatcher<K>} map - the map function to build StrategyContextAnalyzer
   * @return {*}  {ProvidableStrategy<K>}
   * @memberof InjectStrategies
   */
  mapContext<K extends MatcherKeys>(
    map: BuildContextMatcher<K>
  ): ProvidableStrategy<K> {
    return new ProvidableStrategy(this.token, this.strategies, map);
  }
}
