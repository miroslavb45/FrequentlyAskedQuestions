class QuestionEntity {
    constructor(id, author, title, content, answers) {
        this.id = id;
        this.author = author;
        this.title = title;
        this.content = content;
        this.createDeate = new Date().toDateString();
        this.answers = answers;
    }

}
export default QuestionEntity;