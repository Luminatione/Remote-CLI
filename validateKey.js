const hash = require('sha1');

const findInDb = require('./utility/db/remoteCLIDbWrapper').findInDb;
const logger = require('./logger').logger;
const ctx = require('./env');

const validateKey = async (req, res, next, keyType, key) => {
    try {
        const findResult = await findInDb(keyType, {key: hash(key)});
        if(findResult)
        {
            return next();
        }
        throw 'attempt to take action without valid key'
    }
    catch(err) {
        logger.warn(err.stack);
        res.status(400).json({success: false});
    }
};

const validateInKey = async (req, res, next) => {
    const {inKey} = req.body;
    await validateKey(req, res, next, ctx.dbInKeysCollectionName, inKey);
};

const validateOutKey = async (req, res, next) => {
    const {outKey} = req.body;
    await validateKey(req, res, next, ctx.dbOutKeysCollectionName, outKey);
}

module.exports.validateInKey = validateInKey;
module.exports.validateOutKey = validateOutKey;