const express = require('express');
const logger = require('./logger').logger;
const basicUtilityRouter = require('./routes/basicUtilityRouter');
const commandsRouter = require('./routes/commandsRouter');
const keyValidator = require('./validateKey');
const sessionValidator = require('./validateSession');

const app = express();

const logConnectionToServer = (req, res, next) => {
    logger.info(`Connection. Method: ${req.method}, url: ${req.url}`);
    next();
}

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use('/createSession', keyValidator.validateInKey);
app.use('/', logConnectionToServer);
app.use('/', basicUtilityRouter);
app.use('/commands', sessionValidator.validateSession);
app.use('/commands', commandsRouter);

app.listen(80, () => {
    logger.info('Server started, listening on 80');
});