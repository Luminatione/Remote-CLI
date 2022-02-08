const logger = require('../logger').logger;
const insertIntoDb = require('../utility/db/remoteCLIDbWrapper').insertIntoDb;

const hash = require('sha1');

const addCommandExecutionResult = async (req, res) => {
    try
    {
        const {inKey, result, sessionId} = req.body;
        await insertIntoDb(hash(sessionId), {inKey: hash(inKey), result: result});
        res.status(200).json({success: true});
    }
    catch (err)
    {
        logger.error(err);
        res.status(400).json({success: false});
    }
};
module.exports = addCommandExecutionResult;