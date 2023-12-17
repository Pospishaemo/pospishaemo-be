class TestDto {
  id;
  question;
  correctAnswer;
  answers;

  constructor(model) {
    this.id = model._id;
    this.question = model.question;
    this.correctAnswer = model.correctAnswer;
    this.answers = model.answers;
  }
}

module.exports = TestDto;
