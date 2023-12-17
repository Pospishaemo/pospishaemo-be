const RoadSignService = require('../services/road-sign.service');
const generateResponse = require('../utils/response-generator');

class RoadSignController {
  async getRoadSignSections(req, res, next) {
    try {
      const userId = req.user?.id;

      const trafficRuleSections = await RoadSignService.getRoadSignSections(userId);

      res.send(generateResponse(trafficRuleSections));
    } catch (error) {
      next(error);
    }
  }

  async getRoadSigns(req, res, next) {
    try {
      const { sectionId } = req.query;

      const trafficRuleSections = await RoadSignService.getRoadSignParagraphsBySectionId(sectionId);

      res.send(generateResponse(trafficRuleSections));
    } catch (error) {
      next(error);
    }
  }

  async toggleRoadSignSectionLearned(req, res, next) {
    try {
      const userId = req.user?.id;
      const { sectionId } = req.body;

      const trafficRuleSections = await RoadSignService.toggleRoadSignSectionLearned(
        userId,
        sectionId,
      );

      res.send(generateResponse(trafficRuleSections));
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new RoadSignController();
