const UserModel = require('../models/user.model');
const TrafficRuleSectionModel = require('../models/traffic-rule/traffic-rule-section.model');
const TrafficRuleSectionDto = require('../dtos/traffic-rule/traffic-rule-section.dto');
const TrafficRuleDto = require('../dtos/traffic-rule/traffic-rule.dto');
const { UnexpectedError, ValidationError } = require('../utils/error-generator');

class TrafficRuleService {
  async getTrafficRuleSections(userId) {
    const trafficRuleSections = await TrafficRuleSectionModel.find();

    if (userId) {
      const user = await UserModel.findById(userId);

      // We use this data structure for better code execution speed
      const learnedTrafficRules = {};

      user.learnedTrafficRules.forEach((learnedTrafficRuleId) => {
        learnedTrafficRules[learnedTrafficRuleId] = true;
      });

      const sections = trafficRuleSections.map((trafficRuleSection) => ({
        ...new TrafficRuleSectionDto(trafficRuleSection),
        isLearned: !!learnedTrafficRules?.[trafficRuleSection._id],
      }));

      return {
        sections: sections.map((section) => new TrafficRuleSectionDto(section)),
      };
    }

    return {
      sections: trafficRuleSections.map((section) => new TrafficRuleSectionDto(section)),
    };
  }

  async getTrafficRuleParagraphsBySectionId(sectionId) {
    if (!sectionId) {
      throw ValidationError('sectionId is required!');
    }

    const trafficRuleSection =
      await TrafficRuleSectionModel.findById(sectionId).populate('paragraphs');

    return {
      ...new TrafficRuleSectionDto(trafficRuleSection),
      paragraphs: trafficRuleSection.paragraphs.map((section) => new TrafficRuleDto(section)),
    };
  }

  async toggleTrafficRuleSectionLearned(userId, sectionId) {
    const trafficRuleSection = await TrafficRuleSectionModel.findById(sectionId);

    if (!trafficRuleSection) {
      throw UnexpectedError('Invalid section id!');
    }

    const user = await UserModel.findById(userId);

    const sectionIndex = user.learnedTrafficRules.indexOf(sectionId);

    let currentIsLearned;

    if (sectionIndex !== -1) {
      user.learnedTrafficRules.splice(sectionIndex, 1);
      currentIsLearned = false;
    } else {
      user.learnedTrafficRules.push(sectionId);
      currentIsLearned = true;
    }

    await user.save();

    return { currentIsLearned };
  }
}

module.exports = new TrafficRuleService();
