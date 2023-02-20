import { MatcherKeys } from './matchers';
import { StrategyContextAnalyzer } from './strategy-context-analyzer';

/**
 *  Builds a context matcher function
 */
export type BuildContextMatcher<T extends object, K extends MatcherKeys> = (
  ...strategies: T[]
) => StrategyContextAnalyzer<K, T>;
