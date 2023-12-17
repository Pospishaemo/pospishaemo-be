const MessageModel = require('../models/message.model');

class ContactService {
  async message(fullName, contactInfo, message) {
    return MessageModel.create({
      fullName,
      contactInfo,
      message,
      date: new Date(),
    });
  }
}

module.exports = new ContactService();
