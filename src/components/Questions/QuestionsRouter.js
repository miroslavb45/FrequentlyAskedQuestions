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
        author: "miroslavb45",
        content:
          "Cillum esse elit occaecat excepteur Lorem aliquip enim occaecat dolor mollit ad tempor aliqua. Aliquip anim anim velit labore do mollit dolore officia. Id nulla exercitation cillum laborum quis laborum consectetur esse do. Irure cillum officia adipisicing nostrud. Aliqua sunt elit pariatur dolor fugiat velit cillum ipsum amet. Excepteur occaecat magna magna nulla anim irure deserunt quis proident velit.",
        createDate: new Date().toDateString(),
        answers: [
          {
            id: "answer1",
            author: "testuser1",
            content: "This is a short but good answer."
          }
        ],
        correctAnswersId: null
      },
      {
        id: "quest2",
        title: "Question title 2",
        author: "miroslavb45",
        content:
          "Cillum esse elit occaecat excepteur Lorem aliquip enim occaecat dolor mollit ad tempor aliqua. Aliquip anim anim velit labore do mollit dolore officia. Id nulla exercitation cillum laborum quis laborum consectetur esse do. Irure cillum officia adipisicing nostrud. Aliqua sunt elit pariatur dolor fugiat velit cillum ipsum amet. Excepteur occaecat magna magna nulla anim irure deserunt quis proident velit.",
        createDate: new Date().toDateString(),
        answers: [
          {
            id: "answer1",
            author: "testuser1",
            content: "This is a short but good answer."
          }
        ],
        correctAnswersId: null
      }
    ]
  };
  render() {
    return (
      <QuestionsContext.Provider
        value={{
          questions: this.state.questions,
          getQuestion: this.getQuestion,
          addNewQuestion: this.addNewQuestion,
          deleteQuestion: this.deleteQuestion,
          addNewAnswer: this.addNewAnswer,
          deleteAnswer: this.deleteAnswer
        }}
      >
        <ProtectedRoute path="/questions" exact component={QuestionList} />
        <ProtectedRoute path={"/questions/:id"} component={QuestionView} />
      </QuestionsContext.Provider>
    );
  }

  getQuestion = id => {
    return this.state.questions.find(question => question.id === id);
  };

  addNewAnswer = answer => {
    const newQuestions = [...this.state.questions];
    let question = newQuestions.find(
      question => question.id === answer.questionId
    );
    delete answer.questionId;

    question.answers.push(answer);
    this.setState({ question: newQuestions });
  };

  deleteAnswer = (answerId, questionId) => {
    const newQuestions = [...this.state.questions];
    let question = newQuestions.find(question => question.id === questionId);

    const answerToDelete = question.answers.find(
      answer => answer.id === answerId
    );
    question.answers.splice(question.answers.indexOf(answerToDelete), 1);

    this.setState({ question: newQuestions });
  };

  addNewQuestion = question => {
    const newQuestions = [...this.state.questions];
    newQuestions.push(question)

    this.setState({questions: newQuestions});
  };

  deleteQuestion = questionId => {
    const newQuestions = [...this.state.questions];
    let question = newQuestions.find(question => question.id === questionId);
    newQuestions.splice(newQuestions.indexOf(question), 1);
    this.setState({ questions: newQuestions });
  }

}

export default QuestionsRouter;
