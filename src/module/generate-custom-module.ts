import { ModuleMetadata, Provider } from "@nestjs/common";
import { ProvidableStrategy } from "./providable-strategy";

export interface CustomModuleMetadata extends ModuleMetadata {
  /**
   * Services to be used in the module as injectable dependencies. (Sugar notation equivalent to providers) Just for organizational sense of dependencies, this variable represents the service classes that will be injected
   */
  services?: Provider<any>[];

  /**
   * Features to be used in the module as injectable dependencies. (Sugar notation equivalent to providers) Just for organizational sense of dependencies, this variable represents the feature classes that will be injected
   */
  features?: Provider<any>[];

  /**
   * Protocols to be used in the module as injectable dependencies. (Sugar notation equivalent to providers) Just for organizational sense of dependencies, this variable represents the protocol classes that will be injected
   */
  protocols?: Provider<any>[];

  strategies: ProvidableStrategy[];
}

export function GenerateModule(data: CustomModuleMetadata): ModuleMetadata {
  const providers = data.providers ?? [];
  const exports = data.exports ?? [];

  if (data.protocols) {
    providers.push(...data.protocols);
  }
  if (data.features) {
    providers.push(...data.features);
  }
  if (data.services) {
    providers.push(...data.services);
  }
  if (data.providers) {
    providers.push(...data.providers);
  }

  if (data.strategies) {
    const strategy = data.strategies.flatMap((stgy) => stgy.provide());
    providers.push(...strategy);
  }

  if (providers) {
    exports.push(...providers);
  }

  return {
    imports: data.imports,
    controllers: data.controllers,
    providers,
    exports,
  };
}
