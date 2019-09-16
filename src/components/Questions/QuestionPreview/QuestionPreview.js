import React, { useContext } from "react";
import "./QuestionPreview.css";
import QuestionsContext from "../../../context/QuestionsContext";

const QuestionPreview = props => {
  const context = useContext(QuestionsContext);

  return (
    <div className="question-preview-wrapper">
      <p contenteditable="true">ID: {props.id}</p>
      <p onClick={() => props.onClick(props.id)}>
        <span className="question-preveiw-title">Title: {props.title}</span>
      </p>
      <p>Content: {props.content}</p>
      <p>Author: {props.author.displayName}</p>
      <p>Create Date: {props.createDate}</p>
      <button
        key="deleteButton"
        onClick={props.onDelete}
      >
        Delete
      </button>
    </div>
  );
};

export default QuestionPreview;
