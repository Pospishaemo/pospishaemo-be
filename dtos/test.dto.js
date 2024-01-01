class TestDto {
  id;
  question;
  correctAnswer;
  answers;

  constructor(model) {
    this.id = model._id;
    this.question = model.question;
    this.answers = model.answers;
  }
}

module.exports = TestDto;
