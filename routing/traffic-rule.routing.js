const { Router } = require('express');
const TrafficRuleController = require('../controllers/traffic-rule.controller');
const verifyToken = require('../utils/verify-token');

const router = Router();

router.post('/toggle-learned', verifyToken, TrafficRuleController.toggleTrafficRuleSectionLearned);
router.get('/sections', verifyToken, TrafficRuleController.getTrafficRuleSections);
router.get('/rules', verifyToken, TrafficRuleController.getTrafficRuleParagraphs);
 
module.exports = router;
