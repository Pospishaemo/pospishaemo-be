const TrafficRuleService = require('../services/traffic-rule.service');
const generateResponse = require('../utils/response-generator');

class TrafficRuleController {
  async getTrafficRuleSections(req, res, next) {
    try {
      const userId = req.user?.id;

      const trafficRuleSections = await TrafficRuleService.getTrafficRuleSections(userId);

      res.send(generateResponse(trafficRuleSections));
    } catch (error) {
      next(error);
    }
  }

  async getTrafficRuleParagraphs(req, res, next) {
    try {
      const { sectionId } = req.query;

      const trafficRuleSections =
        await TrafficRuleService.getTrafficRuleParagraphsBySectionId(sectionId);

      res.send(generateResponse(trafficRuleSections));
    } catch (error) {
      next(error);
    }
  }

  async toggleTrafficRuleSectionLearned(req, res, next) {
    try {
      const userId = req.user?.id;
      const { sectionId } = req.body;

      const trafficRuleSections = await TrafficRuleService.toggleTrafficRuleSectionLearned(
        userId,
        sectionId,
      );

      res.send(generateResponse(trafficRuleSections));
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new TrafficRuleController();
