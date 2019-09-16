import React from "react";
import './QuestionPreview.css';

const QuestionPreview = props => {
  return (
  <div className="question-preview-wrapper">
      <p>ID: {props.id}</p>
      <p>Title: {props.title}</p>
      <p>Content. {props.content}</p>
      <p>Author: {props.author.displayName}</p>
      <p>Create Date: {props.createDate}</p>
  </div>
  );
};



export default QuestionPreview;
