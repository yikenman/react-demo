import {
  Provider,
  ReflectiveInjector,
  ResolvedReflectiveProvider
} from "injection-js";
import React, { createContext, FunctionComponent, useContext } from "react";

type Constructor<T = any> = new (...args: any[]) => T;

const initProviders = ReflectiveInjector.resolve([]);
const initInjector = ReflectiveInjector.fromResolvedProviders(initProviders);
const Context = createContext(initInjector);
const resolveProviderStore: { [x: string]: ResolvedReflectiveProvider } = {};

export function withProviders<P>(providers: Provider[] = []) {
  return (Component: FunctionComponent<P>): FunctionComponent<P> => {
    if (!providers || !providers.length) {
      return Component;
    }
    return (props: P) => {
      const parentInjector = useContext(Context);
      const injector = parentInjector.resolveAndCreateChild(providers);
      return (
        <Context.Provider value={injector}>
          <Component {...props} />
        </Context.Provider>
      );
    };
  };
}

export function useProvider<T extends Constructor>(
  provider: T
): InstanceType<T> {
  const injector = useContext(Context);
  return injector.get(provider);
}
