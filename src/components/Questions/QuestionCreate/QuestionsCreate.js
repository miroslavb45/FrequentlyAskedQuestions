import React, { Component } from "react";
import { Validations } from "../../../utils/Utils";
import uuidv1 from "uuid";
import Auth from "../../../authentication/Auth";
import QuestionsContext from "../../../context/QuestionsContext";
import Editor from "../../Editor/Editor";
import "./QuestionCreate.css";
import Question from "../../../entities/QuestionEntity";

class QuestionsCreate extends Component {
  static contextType = QuestionsContext;
  editorRef = React.createRef();

  render() {
    return (
      <div className="new-question-wrapper">
        <div className="new-question-label-wrapper">
          <h1>New Question</h1>
        </div>
        <form onSubmit={this.newQuestionHandler}>
          <div className="title-wrapper">
            <label>Title</label>
            <input type="text" name="title" className="title-input"></input>
          </div>
          <div className="question-wrapper">
            <label>Question</label>
            <Editor theme="snow" ref={this.editorRef}></Editor>
          </div>
          <input
            type="submit"
            value="Create new question"
            id="add-question-button"
          />
        </form>
      </div>
    );
  }

  newQuestionHandler = event => {
    event.preventDefault();
    const title = event.target.elements.title.value;
    const content = this.editorRef.current.state.text;
    if (
      title &&
      content &&
      Validations.notStartingWithSpace.test(title) &&
      Validations.notStartingWithSpace.test(content)
    ) {
      const newQuestion = new Question(
        uuidv1(),
        Auth.getActiveUser(),
        title,
        content,
        []
      );
      this.context.addNewQuestion(newQuestion);
      this.props.history.push("/questions/" + newQuestion.id);
    } else {
      alert("Input validation failed!");
    }
  };
}

export default QuestionsCreate;
