class AnswerEntity {
  constructor(id, author, content, isCorrect = false) {
    this.id = id;
    this.author = author;
    this.content = content;
    this.isCorrect = isCorrect;
  }
}
export default AnswerEntity;
