import React from 'react';

const questionsContext = React.createContext({
    questions: [],
    getQuestion: (id) => {},
    addNewQuestion: (question) => {},
    modifyQuestion: (question) => {},
    deleteQuestion: (question) => {},
    addNewAnswer: (question) => {},
    deleteAnswer: (answerId, questionId) => {}
});

export default questionsContext;