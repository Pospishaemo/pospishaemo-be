const RoadSignSectionModel = require('../models/road-sign/road-sign-section.model');
const UserModel = require('../models/user.model');
const RoadSignSectionDto = require('../dtos/road-sign/road-sign-section.dto');
const RoadSignDto = require('../dtos/road-sign/road-sign.dto');
const { UnexpectedError } = require('../utils/error-generator');

class RoadSignService {
  async getRoadSignSections(userId) {
    const roadSignSections = await RoadSignSectionModel.find();

    if (userId) {
      const user = await UserModel.findById(userId);

      // We use this data structure for better code execution speed
      const learnedRoadSigns = {};

      user.learnedRoadSigns.forEach((learnedRoadSignId) => {
        learnedRoadSigns[learnedRoadSignId] = true;
      });

      const sections = roadSignSections.map((roadSignSection) => ({
        ...new RoadSignSectionDto(roadSignSection),
        isLearned: !!learnedRoadSigns?.[roadSignSection._id],
      }));

      return {
        sections: sections.map((section) => new RoadSignSectionDto(section)),
      };
    }

    return {
      sections: roadSignSections.map((section) => new RoadSignSectionDto(section)),
    };
  }

  async getRoadSignParagraphsBySectionId(sectionId) {
    const roadSignSection = await RoadSignSectionModel.findById(sectionId).populate('paragraphs');

    return {
      name: roadSignSection.name,
      sectionNumber: roadSignSection.sectionNumber,
      paragraphs: roadSignSection.paragraphs.map((section) => new RoadSignDto(section)),
    };
  }

  async toggleRoadSignSectionLearned(userId, sectionId) {
    const roadSignSection = await RoadSignSectionModel.findById(sectionId);

    if (!roadSignSection) {
      throw UnexpectedError('Invalid section id!');
    }

    const user = await UserModel.findById(userId);

    const sectionIndex = user.learnedRoadSigns.indexOf(sectionId);

    let currentIsLearned;

    if (sectionIndex !== -1) {
      user.learnedRoadSigns.splice(sectionIndex, 1);
      currentIsLearned = false;
    } else {
      user.learnedRoadSigns.push(sectionId);
      currentIsLearned = true;
    }

    await user.save();

    return { currentIsLearned };
  }
}

module.exports = new RoadSignService();
