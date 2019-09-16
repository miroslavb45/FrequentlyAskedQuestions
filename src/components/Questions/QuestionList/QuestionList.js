import React, { Component } from "react";
import QuestionPreview from "../QuestionPreview/QuestionPreview";
import QuestionsContext from "../../../context/QuestionsContext";

class QuestionList extends Component {
  static contextType = QuestionsContext;
  render() {
    return this.context.questions.map(question => {
      return (
        <div
          onClick={() => {
            this.questionSelectionHandler(question.id);
          }}
          key={question.id}
        >
          <QuestionPreview
            id={question.id}
            title={question.title}
            author={question.author}
            createDate={question.createDate}
            content={question.content}
          />
        </div>
      );
    });
  }

  componentDidMount() {
    console.log(this.context);
  }
  questionSelectionHandler = id => {
    this.props.history.push("/questions/" + id)
  };
}

export default QuestionList;
