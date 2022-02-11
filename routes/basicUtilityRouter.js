//Router for providing keys and checking site or targets status

const router = require('express').Router();

const checkStatus = require('../controllers/checkStatus');
const getKey = require('../controllers/getKey');
const createSession = require('../controllers/createSession');
const availabilityMonitor = require('../controllers/availabilityMonitor');
const getSessions = require('../controllers/getSessions');

router.get('/checkStatus', checkStatus);
router.get('/getKey', getKey);
router.post('/createSession', createSession);
router.get('/getSessions', getSessions);
router.get('/online', availabilityMonitor.checkTargetAvailability);
router.post('/online', availabilityMonitor.imOnline);
router.delete('/online', availabilityMonitor.imOffline);

module.exports = router;
