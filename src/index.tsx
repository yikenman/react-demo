import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import "./polyfills";
import "./index.css";
import { useProvider, withProiders } from "./react-diNg";
import { TimerService } from "./index.service";

const App = withProiders([TimerService])(() => {
  const timeService = useProvider<TimerService>(TimerService);
  useEffect(() => {
    console.log(timeService.aaa);
  });
  return <div>aaaa</div>;
});

ReactDOM.render(<App />, document.getElementById("root"));
