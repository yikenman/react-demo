import {
  Provider,
  ReflectiveInjector
  // ResolvedReflectiveProvider
} from "injection-js";
import React, {
  createContext,
  useContext,
  FC,
  useMemo,
} from "react";

type Constructor<T = any> = new (...args: any[]) => T;

const initProviders = ReflectiveInjector.resolve([]);
const initInjector = ReflectiveInjector.fromResolvedProviders(initProviders);
const Context = createContext(initInjector);
// TODO: save resolved providers for performance-sensitive cases
// const resolvedProviderStore: { [x: string]: ResolvedReflectiveProvider } = {};

// There is no idea for 'Providers' component now because:
// 1. It may cause heavy re-render.
// 2. This usage is weird which you have to let parent component decides
// what providers child component needs but not child itself.
// 3. Maintaining providers is both difficult in parent and child component.
export function withProviders<P>(providers: Provider[] = []) {
  return (Component: FC<P>): FC<P> => {
    if (!providers || !providers.length) {
      return Component;
    }
    return (props: P) => {
      const parentInjector = useContext(Context);
      const injector = useMemo(
        () => parentInjector.resolveAndCreateChild(providers),
        [providers]
      );
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
