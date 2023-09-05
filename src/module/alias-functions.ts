import { InjectionToken, Provider, Type } from '@nestjs/common';

export class Injects {
  static of<K extends object = any>(
    superClass: InjectionToken,
    subclass: Type<K>,
  ): Provider<K> {
    return {
      provide: superClass,
      useClass: subclass,
    } as unknown as Provider<K>;
  }

  static ofMany<K extends object>(
    superClasses: InjectionToken[],
    subClass: Type<K>,
  ): Provider[] {
    // map each superClass to a Provider with injection token is superClass and useClass is subClass
    const providers = superClasses.map((superClass) => {
      return {
        provide: superClass,
        useFactory: (subclass: K) => {
          return subclass;
        },
        inject: [subClass],
      };
    }) as unknown as Provider[];

    const response: Provider[] = [subClass];
    response.push(...providers);
    return response;
  }
}
