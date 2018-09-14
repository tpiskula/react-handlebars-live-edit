import * as React from "react";
import { render } from "react-dom";
import HandleBarPreview from "./HandleBarPreview";

class App extends React.Component {
  render() {
    return <HandleBarPreview />;
  }
}

render(<App />, document.getElementById("root"));
