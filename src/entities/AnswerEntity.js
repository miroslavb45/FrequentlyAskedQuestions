class AnswerEntity {
  constructor(id, author, content) {
    this.id = id;
    this.author = author;
    this.content = content;
    this.isCorrect = false;
  }
}
export default AnswerEntity;
