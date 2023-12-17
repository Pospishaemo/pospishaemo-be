class TokenDto {
  accessToken;
  refreshToken;

  constructor(model) {
    this.accessToken = model.accessToken;
    this.refreshToken = model.refreshToken;
  }
}

module.exports = TokenDto;
