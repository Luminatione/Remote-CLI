const router = require('express').Router();

const addCommandToExecution = require('../controllers/addCommandToExecution');

router.post('/addCommand', addCommandToExecution);


module.exports = router;