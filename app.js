const express = require('express');
const logger = require('./logger').logger;
const basicUtilityRouter = require('./routes/basicUtilityRouter');
const keyValidator = require('./validateKey');

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

app.listen(80, () => {
    logger.info('Server started, listening on 80');
});