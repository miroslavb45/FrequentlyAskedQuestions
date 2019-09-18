import React from "react";
import "./QuestionPreview.css";

const QuestionPreview = props => {
  return (
    <div className="question-preview-wrapper">
      <p>ID: {props.id}</p>
      <p onClick={() => props.onClick(props.id)}>
        <span className="question-preveiw-title">Title: {props.title}</span>
      </p>
      <p>Content: {props.content}</p>
      <p>Author: {props.author}</p>
      <p>Create Date: {props.createDate}</p>
      {props.editable ? (
        <button key="deleteButton" onClick={props.onDelete}>
          Delete
        </button>
      ) : null}
      <p>Number of answers: {props.numberOfAnswers}</p>
      {props.hasCorrectAnswer ? <p>Question Answered</p> : null}
    </div>
  );
};

export default QuestionPreview;
