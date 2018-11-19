import React, { useState, useEffect } from "react";
import { useProvider, withProviders } from "./react-diNg";
import { TimerService } from "./index.service";
import "./App.css";

interface IChildProps {
  title: string;
  color?: string;
}
const Child: React.FunctionComponent<IChildProps> = props => {
    const [counts, updateCounts] = useState(0);
    const timeService = useProvider(TimerService);
    useEffect(() => {
      const subscription = timeService.timer$.subscribe(val => updateCounts(val));
      return () => {
        subscription.unsubscribe();
      };
    }, []);
  return (
    <div className="child-border" style={{ borderColor: props.color || 'black' }}>
      <div>{props.title || ""}</div>
      <div>{counts}</div>
    </div>
  );
};

const Wapper: React.FunctionComponent<{}> = props => {
  return <div>{props.children}</div>;
};

export const App = withProviders([TimerService])(() => {
  return (
    <div>
      <Child title="1" />
    </div>
  );
});