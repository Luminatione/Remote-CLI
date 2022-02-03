const express = require('express');
const logger = require('./logger').logger;
const checkStatusRouter = require('./routes/checkStatusRouter');

const app = express();


const logConnectionToServer = (req, res, next) =>
{
    logger.info(`Connection. Method: ${req.method}, url: ${req.url}`);
    next();
}

app.use('/', logConnectionToServer);
app.use('/checkStatus', checkStatusRouter);

app.listen(80, () => 
{
    console.log("Listeing on 80");
});