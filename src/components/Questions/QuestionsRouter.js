import React, { Component } from "react";
import QuestionList from "./QuestionList/QuestionList";
import QuestionView from "./QuestionView/QuestionView";
import QuestionsContext from "../../context/QuestionsContext";
import ProtectedRoute from "../../authentication/ProtectedRoute";
import QuestionsCreate from "./QuestionCreate/QuestionsCreate";
import Auth from "../../authentication/Auth";
import AnswerEntity from "../../entities/AnswerEntity";
import QuestionEntity from "../../entities/QuestionEntity";

class QuestionsRouter extends Component {
  state = {
    questions: [
      new QuestionEntity(
        "quest1",
        "miroslavb45",
        "Question title",
        "Cillum esse elit occaecat excepteur Lorem aliquip enim occaecat dolor mollit ad tempor aliqua. Aliquip anim anim velit labore do mollit dolore officia. Id nulla exercitation cillum laborum quis laborum consectetur esse do. Irure cillum officia adipisicing nostrud. Aliqua sunt elit pariatur dolor fugiat velit cillum ipsum amet. Excepteur occaecat magna magna nulla anim irure deserunt quis proident velit.",
        [new AnswerEntity("id1", "miroslavb45", "Sunt nisi eu elit officia officia officia laborum duis pariatur ipsum id....")]
      ),
      new QuestionEntity(
        "quest2",
        "miroslavb45",
        "Question title 2",
        "Cillum esse elit occaecat excepteur Lorem aliquip enim occaecat dolor mollit ad tempor aliqua. Aliquip anim anim velit labore do mollit dolore officia. Id nulla exercitation cillum laborum quis laborum consectetur esse do. Irure cillum officia adipisicing nostrud. Aliqua sunt elit pariatur dolor fugiat velit cillum ipsum amet. Excepteur occaecat magna magna nulla anim irure deserunt quis proident velit.",
        [new AnswerEntity("id2", "miroslavb45", "Tempor id ipsum exercitation eiusmod id ipsum reprehenderit elit et excepteur mollit est consectetur.")]
      )
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
          deleteAnswer: this.deleteAnswer,
          updateQuestion: this.updateQuestion,
          updateAnswer: this.updateAnswer,
          toggleCorrectAnswer: this.toggleCorrectAnswer
        }}
      >
        <ProtectedRoute path="/questions" exact component={QuestionList} />
        <ProtectedRoute
          path="/my-questions"
          exact
          component={props => (
            <QuestionList {...props} filterByAuthor={Auth.getActiveUser()} />
          )}
        />

        <ProtectedRoute
          path={"/questions/:id"}
          exact
          component={QuestionView}
        />
        <ProtectedRoute
          path="/new-question"
          exact
          component={QuestionsCreate}
        />
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
    newQuestions.push(question);

    this.setState({ questions: newQuestions });
  };

  deleteQuestion = questionId => {
    const newQuestions = [...this.state.questions];
    let question = newQuestions.find(question => question.id === questionId);
    newQuestions.splice(newQuestions.indexOf(question), 1);
    this.setState({ questions: newQuestions });
  };

  updateQuestion = updatedQuestion => {
    const newQuestions = [...this.state.questions];
    let questionToEdit = newQuestions.find(
      question => question.id === updatedQuestion.id
    );

    questionToEdit.title = updatedQuestion.title;
    questionToEdit.content = updatedQuestion.content;
    this.setState({ questions: newQuestions });
  };

  updateAnswer = (questionId, answerId, answerContent) => {
    const newQuestions = [...this.state.questions];
    const question = newQuestions.find(question => question.id === questionId);
    const currentAnswers = question.answers;

    const answerToUpdate = currentAnswers.find(
      answer => answer.id === answerId
    );
    answerToUpdate.content = answerContent;

    this.setState({ questions: newQuestions });
  };

  toggleCorrectAnswer = (answerId, questionId) => {
    const newQuestions = [...this.state.questions];
    const question = newQuestions.find(question => question.id === questionId);
    const answer = question.answers.find(answer => answer.id === answerId);
    answer.isCorrect = !answer.isCorrect;

    this.setState({ questions: newQuestions });
  };
}

export default QuestionsRouter;
