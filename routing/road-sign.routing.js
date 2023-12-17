const { Router } = require('express');
const RoadSignController = require('../controllers/road-sign.controller');
const verifyToken = require('../utils/verify-token');

const router = Router();

router.post('/toggle-learned', verifyToken, RoadSignController.toggleRoadSignSectionLearned);
router.get('/sections', verifyToken, RoadSignController.getRoadSignSections);
router.get('/signs', verifyToken, RoadSignController.getRoadSigns);

module.exports = router;
