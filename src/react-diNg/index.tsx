import {
  Provider,
  ReflectiveInjector
  // ResolvedReflectiveProvider
} from "injection-js";
import React, { createContext, useContext, FC, ProviderProps } from "react";

type Constructor<T = any> = new (...args: any[]) => T;

const initProviders = ReflectiveInjector.resolve([]);
const initInjector = ReflectiveInjector.fromResolvedProviders(initProviders);
const Context = createContext(initInjector);
// TODO: save resolved providers for performance-sensitive cases
// const resolvedProviderStore: { [x: string]: ResolvedReflectiveProvider } = {};

export function withProviders<P>(providers: Provider[] = []) {
  return (Component: FC<P>): FC<P> => {
    if (!providers || !providers.length) {
      return Component;
    }
    return (props: P) => {
      const parentInjector = useContext(Context);
      // use useMemo/useCallback to reduce re-render
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
