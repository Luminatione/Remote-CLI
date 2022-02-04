//Router for providing keys and checking site or targets status

const router = require('express').Router();

const checkStatus = require('../controllers/checkStatus');
const getKey = require('../controllers/getKey');
const createSession = require('../controllers/createSession');

router.get('/checkStatus', checkStatus);
router.get('/getKey', getKey);
router.post('/createSession', createSession);

module.exports = router;
