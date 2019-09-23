import React from "react";
import "./QuestionPreview.css";
import answeredIcon from "../../../assets/icons/answered-icon.png";
import userIcon from "../../../assets/icons/user-icon.png";
import dateIcon from "../../../assets/icons/date-icon.png";
import answersIcon from "../../../assets/icons/answers-icon.png";
import deleteIcon from "../../../assets/icons/delete-icon.png";


const stripHtml = (html) =>{
  // Create a new div element
  var temporalDivElement = document.createElement("div");
  // Set the HTML content with the providen
  temporalDivElement.innerHTML = html;
  // Retrieve the text property of the element (cross-browser support)
  return temporalDivElement.textContent || temporalDivElement.innerText || "";
}

const QuestionPreview = props => {
  return (
    <div className="question-preview-wrapper">
      <div
        className="indicator"
        style={props.hasCorrectAnswer ? { backgroundColor: "#33cc33" } : null}
      >
        {props.hasCorrectAnswer ? <img src={answeredIcon} alt=""></img> : null}
      </div>
      <div className="content">
        <h2 onClick={() => props.onClick(props.id)}>{props.title}</h2>
        <div className="contentWrapper">
          <p>{stripHtml(props.content)}</p>
        </div>
        <span className="correct-answer-label">
          {props.hasCorrectAnswer ? "Question answered" : null}
        </span>
        {props.editable ? (
          <div className="delete-button" onClick={props.onDelete}>
            <img src={deleteIcon} alt="" /> <span>Delete</span>
          </div>
        ) : null}
      </div>
      <div className="labels">
        <div className="answers-label">
          <img src={answersIcon} alt="" />
          <span>{props.numberOfAnswers} Answer</span>
        </div>
        <div className="date-label">
          <img src={dateIcon} alt="" />
          <span>{props.createDate}</span>
        </div>
        <div className="author-label">
          <img src={userIcon} alt="" />
          <span>{props.author}</span>
        </div>
      </div>
    </div>
  );
};

export default QuestionPreview;
