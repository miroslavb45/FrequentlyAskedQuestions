class AnswerEntity {
  constructor(id, author, content, isCorrect = false, questionId) {
    this.id = id;
    this.author = author;
    this.content = content;
    this.isCorrect = isCorrect;
    this.createDate = new Date().toDateString();
    this.questionId = questionId;
  }
}
export default AnswerEntity;
