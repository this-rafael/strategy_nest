/* eslint-disable @typescript-eslint/ban-types */
import {
  InjectionToken,
  OptionalFactoryDependency,
  Provider,
} from "@nestjs/common";
import { BuildContextMatcher } from "./build-context-matchers";
import { MatcherKeys } from "./matchers";

/**
 * ProvidableStrategy is a class that generate a list of providers for a given token and strategies
 *
 * @export
 * @class ProvidableStrategy
 * @template K - the contexts matcher keys
 */
export class ProvidableStrategy<K extends MatcherKeys = any> {
  /**
   * Creates an instance of ProvidableStrategy.
   * @param {BuildContextMatcher<K>} map
   * @memberof ProvidableStrategy
   */
  constructor(
    private readonly token: object,
    private readonly strategies: object[],
    private readonly map: BuildContextMatcher<K>
  ) {}

  /**
   * Convert the ProvidableStrategy to a list of providers
   *
   * @return {*}  {Provider[]}
   * @memberof ProvidableStrategy
   */
  provide(): Provider[] {
    const { token, strategies, map } = this;
    const strategiesProviders = strategies as unknown as Provider[];
    const inject = strategies as unknown as (
      | InjectionToken
      | OptionalFactoryDependency
    )[];

    const provider: Provider = {
      provide: token as InjectionToken,
      inject,
      useFactory: map,
    };

    return [...strategiesProviders, provider];
  }
}
