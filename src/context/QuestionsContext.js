import React from 'react';

const questionsContext = React.createContext({
    questions: [],
    getQuestion: (id) => {},
    addNewAnswer: (question) => {},
    deleteAnswer: (answerId, questionId) => {}
});

export default questionsContext;