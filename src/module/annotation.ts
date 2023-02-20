/* eslint-disable @typescript-eslint/ban-types */

import { Inject, InjectionToken } from '@nestjs/common';

/**
 * StrategyOf decorator
 *
 * @export
 * @template T injected token
 * @param {T} name injected token
 * @return {*}  {*}
 */
export function StrategyOf<T>(name: T): any {
  return Inject(name as InjectionToken);
}
