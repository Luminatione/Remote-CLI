const { v4: uuid } = require('uuid');
const hash = require('sha1');
const insertIntoDb = require('../Utility/db/remoteCLIDbWrapper').insertIntoDb;
const crypto = require('crypto');

const ctx = require('../env');
const { logger } = require('../logger');

const encryptSessionId = (sessionId, inKey) => {
    const initVector = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(ctx.sessionEncryptionAlgorithm, inKey.substr(0, 32), initVector);
    const encryptedSessionId = cipher.update(sessionId, 'utf8', 'hex') + cipher.final('hex');
    return {encryptedSessionId: encryptedSessionId, initVector: initVector.toString('hex')};
}

const createSession = async (req, res) => {
    try {
        const { inKey } = req.body;
        if (!inKey) {
            throw 'No valid in key provided';
        }
        const sessionId = uuid();
        const {encryptedSessionId, initVector} = encryptSessionId(sessionId, inKey);
        await insertIntoDb(ctx.dbSessionsCollectionName, { sessionId:encryptedSessionId, initVector: initVector, inKey: hash(inKey) });
        res.status(200).json({ success: true, sessionId: sessionId });
    }
    catch (err) {
        logger.error(err.stack);
        res.status(400).json({ success: false });
    }
};

module.exports = createSession;