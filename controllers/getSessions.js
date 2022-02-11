const logger = require('../logger').logger;
const findAll = require('../utility/db/remoteCLIDbWrapper').findAll;
const ctx = require('../env');

const hash = require('sha1');

const getSessions = async (req, res) => {
    try {
        const {inKey} = req.body;
        const response = await findAll(ctx.dbSessionsCollectionName, {inKey: hash(inKey)});
        res.status(200).json({sessions: response});
    }
    catch (err) {
        logger.error(err.stack);
        res.status(400).json({success: false});
    }
}
module.exports = getSessions;