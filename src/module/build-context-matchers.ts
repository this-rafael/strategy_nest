import { MatcherKeys } from './matchers';
import { StrategyContextAnalyzer } from './strategy-context-analyzer';

/**
 *  Builds a context matcher function
 */
export type BuildContextMatcher<K extends MatcherKeys> = (
  ...strategies: object[]
) => StrategyContextAnalyzer<K>;
