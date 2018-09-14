import * as React from "react";
import * as Handlebars from "handlebars";
import PreviewFrame from "./PreviewFrame";
import AceEditor from "react-ace";
import { template as email } from "./template";

import "brace/mode/handlebars";
import "brace/theme/monokai";
import "brace/ext/searchbox";
import "brace/ext/language_tools";

interface state {
  value: string;
}

interface props {}

export default class HandleBarPreview extends React.Component<props, state> {
  constructor(props: props) {
    super(props);
    this.state = {
      value: email
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(value: string) {
    this.setState({ value: value });
  }

  render() {
    const template = Handlebars.compile(this.state.value);
    let html = "";
    try {
      html = template({
        name: "Tobias",
        surname: "Piskula",
        action_url: "jg.or.at/xxx"
      });
    } catch (e) {
      html = this.state.value;
    }
    return (
      <div>
        <AceEditor
          mode="handlebars"
          theme="monokai"
          name="blah2"
          style={{ width: "99vw", height: "48vh" }}
          //onLoad={this.onLoad}
          onChange={this.handleChange}
          fontSize={14}
          showPrintMargin={false}
          showGutter={true}
          highlightActiveLine={true}
          value={this.state.value}
          setOptions={{
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            enableSnippets: false,
            showLineNumbers: true,
            tabSize: 2
          }}
        />
        <br />
        <PreviewFrame
          frameStyle={{ width: "99vw", height: "48vh" }}
          content={html}
        />
      </div>
    );
  }
}
