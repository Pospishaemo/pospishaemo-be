class RoadSignSectionDto {
  id;
  name;
  sectionNumber;
  isLearned;

  constructor(model) {
    this.id = model._id || model.id;
    this.name = model.name;
    this.sectionNumber = model.sectionNumber;
    this.isLearned = model.isLearned;
  }
}

module.exports = RoadSignSectionDto;
