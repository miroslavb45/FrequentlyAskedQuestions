import React, { Component } from "react";
import QuestionPreview from "../QuestionPreview/QuestionPreview";
import QuestionsContext from "../../../context/QuestionsContext";
import Auth from "../../../authentication/Auth";
import uuidv1 from "uuid/v1";
import {Validations, isEditableByCurrentUser} from '../../../utils/Utils';

class QuestionList extends Component {
  static contextType = QuestionsContext;
  render() {
    return (
      <div>
        {this.context.questions.map(question => {
            const isQuestionEditableByCurrentUser = isEditableByCurrentUser(question.author);
            console.log(isQuestionEditableByCurrentUser)
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
            />
          );
        })}

        <form onSubmit={this.newQuestionHandler}>
          <label>
            Title
            <input type="text" name="title" />
          </label>

          <label>
            Content
            <input type="text" name="content" />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }


  questionSelectionHandler = id => {
    this.props.history.push("/questions/" + id);
  };

  newQuestionHandler = event => {
    event.preventDefault();
    const title = event.target.elements.title.value;
    const content = event.target.elements.content.value;

    if (
      title &&
      content &&
      Validations.notStartingWithSpace.test(title) &&
      Validations.notStartingWithSpace.test(content)
    ) {
      const newQuestion = {
        id: uuidv1(),
        author: Auth.getActiveUser(),
        title: title,
        content: content,
        createDate: new Date().toDateString(),
        answers: []
      };
      this.context.addNewQuestion(newQuestion);
    }else{
        alert("Input validation failed!");
    }
  };
}

export default QuestionList;
