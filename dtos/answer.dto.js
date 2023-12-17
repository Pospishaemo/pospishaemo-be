class AnswerDto {
  id;
  text;

  constructor(model) {
    this.id = model._id;
    this.text = model.text;
  }
}

module.exports = AnswerDto;
