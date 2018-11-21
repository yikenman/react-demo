import React, { useState, useEffect } from "react";
import { useProvider, withProviders } from "./react-diNg";
import { TimerService } from "./index.service";
import "./App.css";

interface IChildProps {
  title: string;
  color?: string;
}
const Child: React.FC<IChildProps> = props => {
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
      <div>{props.children}</div>
    </div>
  );
};

const ChildCopy = withProviders<IChildProps>([TimerService])(Child);

const Wapper: React.FC<{}> = props => {
  return <div>{props.children}</div>;
};

export const App = withProviders([TimerService])(() => {
  const [title, updateTitle] = useState(`2`);

  const onClick = () => {
    updateTitle(`2`)
  }

  return (
    <div>
      <Child title="1" />
      <ChildCopy title={title} >
        <div>aaa</div>
      </ChildCopy>
      <button onClick={onClick}>button</button>
    </div>
  );
});