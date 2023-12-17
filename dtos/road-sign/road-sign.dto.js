class RoadSignDto {
  name;
  imageUrl;
  fullParagraphNumber;
  paragraphNumber;

  constructor(model) {
    this.name = model.name;
    this.imageUrl = model.imageUrl;
    this.fullParagraphNumber = model.fullParagraphNumber;
    this.paragraphNumber = model.paragraphNumber;
  }
}

module.exports = RoadSignDto;
