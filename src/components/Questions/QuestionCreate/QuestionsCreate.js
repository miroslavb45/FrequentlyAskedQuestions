import React, { Component } from "react";
import { Validations } from "../../../utils/Utils";
import uuidv1 from "uuid";
import Auth from "../../../authentication/Auth";
import QuestionsContext from "../../../context/QuestionsContext";

class QuestionsCreate extends Component {
  static contextType = QuestionsContext;

  render() {
    return (
      <div style={{ marginTop: "45px" }}>
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
      console.log(this);

      this.props.history.push("/questions/" + newQuestion.id);
    } else {
      alert("Input validation failed!");
    }
  };
}

export default QuestionsCreate;
