/* eslint-disable @typescript-eslint/ban-types */
import { BuildContextMatcher } from "./build-context-matchers";
import { MatcherKeys } from "./matchers";
import { InjectStrategies } from "./strategy";

/**
 *  Declares a strategy passing the 3 basic arguments for configuration:
 * @export
 * @interface DeclareStrategyWith
 
 * @template K - the matcher keys
 
 */
export interface DeclareStrategyWith<K extends MatcherKeys> {
  mapContext: BuildContextMatcher<K>;
  token: object;
  strategies: object[];
}

/**
 * This class is used to declare an strategy to be added in the module
 *
 * @export
 * @class DeclareStrategy
 * @template T
 */
export class DeclareStrategy {
  /**
   * Creates an instance of DeclareStrategy.
   * @param {T} token - the abstract class to be configured as token
   * @memberof DeclareStrategy
   */
  constructor(private readonly token: object) {}

  /**
   * Default method to declare a strategy of receive a token as argument and return a DeclareStrategy
   *
   * @static
   * @template T
   * @param {T} token - the abstract class to be configured as token
   * @return {*}  {DeclareStrategy}
   * @memberof DeclareStrategy
   */
  static of(token: object): DeclareStrategy {
    return new DeclareStrategy(token);
  }

  static with<K extends MatcherKeys>(withConfig: DeclareStrategyWith<K>): any {
    return DeclareStrategy.of(withConfig.token)
      .injectsStrategies(...withConfig.strategies)
      .mapContext<K>(withConfig.mapContext);
  }

  /**
   * Method to inject strategies in the strategy
   *
   * @param {...object[]} strategies - the strategies to be injected
   * @return {*}  {InjectStrategies}
   * @memberof DeclareStrategy
   */
  injectsStrategies(...strategies: object[]): InjectStrategies {
    return new InjectStrategies(
      this.token as Function,
      strategies as Function[]
    );
  }
}
