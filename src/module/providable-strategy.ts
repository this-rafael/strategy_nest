/* eslint-disable @typescript-eslint/ban-types */
import {
  InjectionToken,
  OptionalFactoryDependency,
  Provider,
} from '@nestjs/common';
import { BuildContextMatcher } from './build-context-matchers';
import { MatcherKeys } from './matchers';

/**
 * ProvidableStrategy is a class that generate a list of providers for a given token and strategies
 *
 * @export
 * @class ProvidableStrategy
 * @template T - the abstract class to be configured as token
 * @template K - the contexts matcher keys
 * @template S - the strategies to be injected
 */
export class ProvidableStrategy<
  T extends object = any,
  K extends MatcherKeys = any,
  S extends T = any,
> {
  /**
   * Creates an instance of ProvidableStrategy.
   * @param {T} token
   * @param {S[]} strategies
   * @param {BuildContextMatcher<T, K>} map
   * @memberof ProvidableStrategy
   */
  constructor(
    private readonly token: T,
    private readonly strategies: S[],
    private readonly map: BuildContextMatcher<T, K>,
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
