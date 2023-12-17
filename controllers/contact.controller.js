const ContactService = require('../services/contact.service');
const generateResponse = require('../utils/response-generator');

class ContactController {
  async message(req, res, next) {
    try {
      const { fullName, contactInfo, message } = req.body;

      await ContactService.message(fullName, contactInfo, message);

      return res.status(200).send(generateResponse());
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ContactController();
