class UserDto {
  id;
  username;
  email;
  role;
  learnedTrafficRules;
  learnedRoadSigns;

  constructor(model) {
    this.id = model._id;
    this.username = model.username;
    this.email = model.email;
    this.role = model.role;
    this.learnedTrafficRules = model.learnedTrafficRules;
    this.learnedRoadSigns = model.learnedRoadSigns;
  }
}

module.exports = UserDto;
