import * as React from "react";

export interface Props {
  content: string;
  frameStyle: React.CSSProperties;
  stylesheets?: Array<string>;
}

export default class PreviewFrame extends React.Component<Props, {}> {
  private frame = React.createRef<HTMLIFrameElement>();
  constructor(props: Props) {
    super(props);
  }
  /**
   * Called after mounting the component. Triggers initial update of
   * the iframe
   */
  componentDidMount() {
    this._updateIframe();
  }

  /**
   * Called each time the props changes. Triggers an update of the iframe to
   * pass the new content
   */
  componentDidUpdate() {
    this._updateIframe();
  }

  /**
   * Updates the iframes content and inserts stylesheets.
   * TODO: Currently stylesheets are just added for proof of concept. Implement
   * and algorithm which updates the stylesheets properly.
   */
  _updateIframe() {
    const iframe = this.frame.current;
    if (iframe && iframe.contentDocument) {
      const document = iframe.contentDocument;
      const head = document.getElementsByTagName("head")[0];
      document.body.innerHTML = this.props.content;
      const base = document.createElement("base");
      base.target = "_blank";
      head.appendChild(base);
      if (this.props.stylesheets) {
        this.props.stylesheets.forEach(url => {
          const ref = document.createElement("link");
          ref.rel = "stylesheet";
          ref.type = "text/css";
          ref.href = url;
          head.appendChild(ref);
        });
      }
    }
  }

  /**
   * This component renders just and iframe
   */
  render() {
    return <iframe style={this.props.frameStyle} ref={this.frame} />;
  }
}
