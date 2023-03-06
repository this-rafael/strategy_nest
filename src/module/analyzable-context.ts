import { AcceptableContext } from "./types";

/**
 * AnalyzableContext interface is used to analyze a context and return a strategy
 *
 * @export
 * @interface AnalyzableContext
 */
export interface AnalyzableContext<T extends object = any> {
  /**
   * Analyze a context and return a strategie
   *
   * @template T - The type of the strategy
   * @param {AcceptableContext} context - The context to be analyzed it's a string or a function that returns a string
   * @return {*}  {T} - The strategie that matches the context
   * @memberof AnalyzableContext
   */
  analyze(context: AcceptableContext): T;
}
