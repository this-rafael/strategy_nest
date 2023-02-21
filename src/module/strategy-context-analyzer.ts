/* eslint-disable @typescript-eslint/ban-types */
import { Injectable } from '@nestjs/common';
import { AnalyzableContext } from './analyzable-context';
import { MatcherKeys, Matchers } from './matchers';
import { AcceptableContext } from './types';

/**
 * StrategyContextAnalyzer is a class that analyze a context and return the strategy
 *
 * @export
 * @class StrategyContextAnalyzer
 * @implements {AnalyzableContext}
 * @template K - the context matcher keys
 */
@Injectable()
export class StrategyContextAnalyzer<K extends MatcherKeys>
  implements AnalyzableContext
{
  /**
   * Creates an instance of StrategyContextAnalyzer from a Matchers object
   * @param {Matchers<K>} matchers
   * @memberof StrategyContextAnalyzer
   */
  constructor(private readonly matchers: Matchers<K>) {}

  /**
   * Analyze a context and return the strategy
   *
   * @template T - the returned type strategy
   * @param {AcceptableContext} context - is a string or a function that returns a string to represent the context
   * @return {*}  {T}
   * @memberof StrategyContextAnalyzer
   */
  analyze<T extends object>(context: AcceptableContext): T {
    context = typeof context === 'function' ? context() : context;

    const strategie: T = this.matchers[context];

    this.validateContexts<T>(strategie, context);

    return strategie;
  }

  private validateContexts<T extends object>(strategie: T, context: string) {
    if (!strategie) {
      throw new Error(
        `No strategy found for context ${context} in ${this.matchers}`,
      );
    }
  }
}
