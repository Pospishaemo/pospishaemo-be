const UnexpectedError = (message) => ({
  type: 'UNEXPECTED',
  message,
});

const ValidationError = (message) => ({
  type: 'VALIDATION',
  message,
});

const AuthenticationError = (message) => ({
  type: 'AUTHENTICATION',
  message,
});

module.exports = {
  UnexpectedError,
  ValidationError,
  AuthenticationError,
};
