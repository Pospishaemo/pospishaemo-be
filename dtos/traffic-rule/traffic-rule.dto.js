class TrafficRuleDto {
  text;
  fullParagraphNumber;
  paragraphNumber;

  constructor(model) {
    this.text = model.text;
    this.fullParagraphNumber = model.fullParagraphNumber;
    this.paragraphNumber = model.paragraphNumber;
  }
}

module.exports = TrafficRuleDto;
