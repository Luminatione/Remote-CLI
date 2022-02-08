const hash = require('sha1');

const findInDb = require('./utility/db/remoteCLIDbWrapper').findInDb;
const logger = require('./logger').logger;
const ctx = require('./env');

const validateSession = async (req, res, next) => {
    const {sessionId} = req.body;
    try {
        const findResult = await findInDb(ctx.dbSessionsCollectionName, {sessionId: hash(sessionId)});
        if(findResult)
        {
            return next();
        }
        throw 'attempt to access no existing session'
    }
    catch(err) {
        logger.warn(err.stack);
        res.status(400).json({success: false});
    }

}

module.exports.validateSession = validateSession;