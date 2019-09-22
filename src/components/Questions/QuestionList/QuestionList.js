import React, { Component } from "react";
import QuestionPreview from "../QuestionPreview/QuestionPreview";
import QuestionsContext from "../../../context/QuestionsContext";
import { isEditableByCurrentUser } from "../../../utils/Utils";
import "./QuestionList.css";

class QuestionList extends Component {
  static contextType = QuestionsContext;

  state = {
    questions: this.context.questions
  };

  render() {
    return (
      <div className="questionList">
        <h1>Questions</h1>
        {this.state.questions
          .filter(question =>
            this.props.filterByAuthor
              ? question.author === this.props.filterByAuthor
              : true
          )
          .filter(question =>
            this.context.filterValue
              ? question.title
                  .toLowerCase()
                  .includes(this.context.filterValue.toLowerCase())
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
                onDelete={this.onDelete}
                numberOfAnswers={question.answers.length}
                hasCorrectAnswer={hasCorrectAnswer}
              />
            );
          })}
        {/* 
        <QuestionsCreate {...this.props} /> */}
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

  onDelete = question => {
    this.context.deleteQuestion(question.id, newQuestions => {
      this.setState({ questions: newQuestions });
    });
  };
}

export default QuestionList;
