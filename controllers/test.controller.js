const TestService = require('../services/test.service');
const generateResponse = require('../utils/response-generator');

class TestController {
  async getTest(req, res, next) {
    try {
      const test = await TestService.getTest();

      res.status(200).send(generateResponse(test));
    } catch (error) {
      next(error);
    }
  }

  async submitAnswers(req, res, next) {
    try {
      const { answers } = req.body;

      const result = await TestService.checkAnswers(answers);

      res.status(200).send(generateResponse(result));
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new TestController();
