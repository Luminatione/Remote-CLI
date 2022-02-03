const router = require('express').Router();
const checkStatus = require('../controllers/checkStatus');

router.get('/', checkStatus);

module.exports = router;
