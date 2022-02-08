const logger = require('../logger').logger;
const insertIntoDb = require('../utility/db/remoteCLIDbWrapper').insertIntoDb;

const hash = require('sha1');

const processExiprationDate = (date) => {
    if(date && !Date.parse(date))
    {
        throw 'Invalid expiration date';
    }
    if(!date)
    {
        date = new Date(Date.now() + 30 * 60 * 1000);
    }
    return date;
}

const addCommand = async (req, res) => {
    try
    {
        let {outKey, command, expirationDate, sessionId} = req.body;
        expirationDate = processExiprationDate(expirationDate);
        await insertIntoDb(hash(sessionId), {outKey: hash(outKey), command: command, expirationDate: expirationDate});
        res.status(200).json({success: true});
    }
    catch (err)
    {
        logger.error(err.stack);
        res.status(400).json({success: false});
    }
};
module.exports = addCommand;