import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";

class NewEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: "" };
    this.handleChange = this.handleChange.bind(this);
    this.quill = React.createRef();
  }

  componentDidMount() {
    if (this.props.value) {
      this.setContent(this.props.value);
    }
  }

  handleChange(value) {
    this.setState({ text: value });
    if (this.props.onChange) this.props.onChange(value);
  }

  setContent = content => {
    this.quill.current.getEditor().clipboard.dangerouslyPasteHTML(content);
  };

  getEditorContent = () => {
    return this.quill.current.getEditor().getContents();
  };

  render() {
    return (
      <ReactQuill
        ref={this.quill}
        onChange={this.handleChange}
        readOnly={this.props.readOnly}
        theme={this.props.theme}
      />
    );
  }
}

export default NewEditor;
