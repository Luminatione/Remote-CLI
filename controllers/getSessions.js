const logger = require('../logger').logger;
const findAll = require('../utility/db/remoteCLIDbWrapper').findAll;
const ctx = require('../env');
const crypto = require('crypto');

const hash = require('sha1');

const decryptSessionId = (session, inKey) => {
    const decipher = crypto.createDecipheriv(ctx.sessionEncryptionAlgorithm, inKey.substr(0, 32), Buffer.from(session.initVector, 'hex'));
    const decryptedSessionId = decipher.update(session.sessionId, 'hex', 'utf8') + decipher.final('utf8');
    return decryptedSessionId;
}

const getSessions = async (req, res) => {
    try {
        const {inKey} = req.body;
        let response = await findAll(ctx.dbSessionsCollectionName, {inKey: hash(inKey)});
        response = response.map(session => decryptSessionId(session, inKey));           
        res.status(200).json({sessions: response});
    }

    catch (err) {
        logger.error(err.stack);
        res.status(400).json({success: false});
    }
}
module.exports = getSessions;