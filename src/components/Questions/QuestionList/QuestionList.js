import React, { Component } from "react";
import QuestionPreview from "../QuestionPreview/QuestionPreview";
import QuestionsContext from "../../../context/QuestionsContext";
import { isEditableByCurrentUser } from "../../../utils/Utils";
import QuestionsCreate from "../QuestionCreate/QuestionsCreate";

class QuestionList extends Component {
  static contextType = QuestionsContext;

  state = {
    questions: this.context.questions
  };

  render() {
    return (
      <div>
        <input onChange={this.filterChangeHandler}></input>
        {this.state.questions
          .filter(question =>
            this.props.filterByAuthor
              ? question.author === this.props.filterByAuthor
              : true
          )
          .map(question => {
            const isQuestionEditableByCurrentUser = isEditableByCurrentUser(
              question.author
            );
            const hasCorrectAnswer =
              question.answers.filter(item => item.isCorrect).length > 0;
            return (
              <QuestionPreview
                key={question.id}
                id={question.id}
                title={question.title}
                author={question.author}
                createDate={question.createDate}
                content={question.content}
                onClick={this.questionSelectionHandler}
                editable={isQuestionEditableByCurrentUser}
                onDelete={() => this.context.deleteQuestion(question.id)}
                numberOfAnswers={question.answers.length}
                hasCorrectAnswer={hasCorrectAnswer}
              />
            );
          })}

        <QuestionsCreate {...this.props} />
      </div>
    );
  }

  questionSelectionHandler = id => {
    this.props.history.push("/questions/" + id);
  };
  filterChangeHandler = event => {
    this.setState({
      questions: this.context.questions.filter(question =>
        question.title.toLowerCase().includes(event.target.value.toLowerCase())
      )
    });
  };
}

export default QuestionList;
