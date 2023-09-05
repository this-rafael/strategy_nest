import { InjectionToken, Provider, Type } from '@nestjs/common';

class AsInject<K extends object = any> {
  constructor(
    private subclass: Type<K>
  ) {}

  as(superClassToken: InjectionToken): Provider<K> {
    return {
      provide: superClassToken,
      useClass: this.subclass
    }
  }

  
}

export class Injects {
  static provide<K extends object = any>(
    superClass: InjectionToken,
    subclass: Type<K>,
  ): Provider<K> {
    return {
      provide: superClass,
      useClass: subclass,
    } as unknown as Provider<K>;
  }

  static provideMany<K extends object>(
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

  static of<K extends object = any>(subclass: Type<K>): AsInject<K> {
    return new AsInject<K>(subclass);
  }

}
