//Router for providing keys and checking site or targets status

const router = require('express').Router();
const checkStatus = require('../controllers/checkStatus');
const getKey = require('../controllers/getKey');

router.get('/checkStatus', checkStatus);
router.get('/getKey', getKey);

module.exports = router;
