import React, { Component } from "react";
import QuestionList from "./QuestionList/QuestionList";
import { BrowserRouter, Route } from "react-router-dom";
import QuestionView from "./QuestionView/QuestionView";
import QuestionsContext from "../../context/QuestionsContext";
import ProtectedRoute from "../../authentication/ProtectedRoute";

class QuestionsRouter extends Component {
  state = {
    questions: [
      {
        id: "quest1",
        title: "Question title",
        author: {
          username: "miroslavb45",
          displayName: "Brnic Miroslav"
        },
        content:
          "Cillum esse elit occaecat excepteur Lorem aliquip enim occaecat dolor mollit ad tempor aliqua. Aliquip anim anim velit labore do mollit dolore officia. Id nulla exercitation cillum laborum quis laborum consectetur esse do. Irure cillum officia adipisicing nostrud. Aliqua sunt elit pariatur dolor fugiat velit cillum ipsum amet. Excepteur occaecat magna magna nulla anim irure deserunt quis proident velit.",
        createDate: new Date().toDateString()
      },
      {
        id: "quest2",
        title: "Question title 2",
        author: {
          username: "miroslavb45",
          displayName: "Brnic Miroslav"
        },
        content:
          "Cillum esse elit occaecat excepteur Lorem aliquip enim occaecat dolor mollit ad tempor aliqua. Aliquip anim anim velit labore do mollit dolore officia. Id nulla exercitation cillum laborum quis laborum consectetur esse do. Irure cillum officia adipisicing nostrud. Aliqua sunt elit pariatur dolor fugiat velit cillum ipsum amet. Excepteur occaecat magna magna nulla anim irure deserunt quis proident velit.",
        createDate: new Date().toDateString()
      }
    ]
  };
  render() {
    return (
      <QuestionsContext.Provider
        value={{
          questions: this.state.questions,
          getQuestion: this.getQuestion,
          setQuestion: this.setQuestion
        }}
      >
        <ProtectedRoute path="/questions" exact component={QuestionList} />
        <ProtectedRoute path={"/questions/:id"} component={QuestionView} />
      </QuestionsContext.Provider>
    );
  }

  getQuestion = (id) => {
    return this.state.questions.find(question => question.id === id);
  }
  setQuestion = (question) => {
    
  }
}

export default QuestionsRouter;
