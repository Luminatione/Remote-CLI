const router = require('express').Router();
const keyValidator =  require('../validateKey');

const addCommandToExecution = require('../controllers/addCommandToExecution');
const addCommandExecutionResult = require('../controllers/addCommandExecutionResult');

router.post('/addCommand', addCommandToExecution);
router.post('/addCommandExecutionResult', addCommandExecutionResult);

router.use('/addCommand', keyValidator.validateOutKey);
router.use('/addCommandExecutionResult', keyValidator.validateInKey);

module.exports = router;