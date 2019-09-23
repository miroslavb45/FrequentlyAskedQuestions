import React from "react";

const questionsContext = React.createContext({
  questions: [],
  getQuestion: id => {},
  addNewQuestion: question => {},
  updateQuestion: question => {},
  deleteQuestion: question => {},
  addNewAnswer: question => {},
  deleteAnswer: (answerId, questionId) => {},
  updateAnswer: (questionId, answerId, answerContent) => {}
});

export default questionsContext;
