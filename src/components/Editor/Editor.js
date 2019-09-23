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
 modules = {
    toolbar: [
      [{ font: [] }, { size: [] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ script: "super" }, { script: "sub" }],
      [{ header: "1" }, { header: "2" }, "blockquote", "code-block"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" }
      ],
      ["direction", { align: [] }],
      ["link", "image", "video", "formula"],
      ["clean"]
    ]
  };

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
        modules={this.modules}
      />
    );
  }
}

export default NewEditor;
