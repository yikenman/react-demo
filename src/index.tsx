import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { withProiders, useProvider } from "./react-diNg";
import { TimerService } from "./index.service";

const App = withProiders([TimerService])(() => {
  return <div>aaaa</div>;
});

ReactDOM.render(<App />, document.getElementById("root"));
