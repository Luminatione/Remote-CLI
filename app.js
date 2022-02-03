const express = require('express');
const logger = require('./logger').logger;
const basicUtilityRouter = require('./routes/basicUtilityRouter');

const app = express();


const logConnectionToServer = (req, res, next) => {
    logger.info(`Connection. Method: ${req.method}, url: ${req.url}`);
    next();
}

app.use('/', logConnectionToServer);
app.use('/', basicUtilityRouter);

app.listen(80, () => {
    logger.info('Srver started, listening on 80');
});