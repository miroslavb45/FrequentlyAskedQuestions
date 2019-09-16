import React from 'react';

const questionsContext = React.createContext({
    questions: [],
    getQuestion: (id) => {},
    setQuestion: (id, newQuestion) => {}
});

export default questionsContext;