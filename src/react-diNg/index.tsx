import { Provider, ReflectiveInjector } from "injection-js";
import React, { createContext, FunctionComponent, useContext } from "react";

const initProviders = ReflectiveInjector.resolve([]);
const initInjector = ReflectiveInjector.fromResolvedProviders(initProviders);
const Context = createContext(initInjector);

export function withProiders<P>(providers: Provider[]) {
  return (Component: FunctionComponent<P>) => {
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

export function useProvider<T>(provider: Provider) {
  const injector = useContext(Context);
  return injector.get(provider) as T;
}
