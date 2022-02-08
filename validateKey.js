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
    validateKey(req, res, next, ctx.dbInKeysCollectionName, inKey);
};

const validateOutKey = (req, res, next) => {
    const {outKey} = req.body;
    validateKey(req, res, next, ctx.dbOutKeysCollectionName, outKey);
}

module.exports.validateInKey = validateInKey;
module.exports.validateOutKey = validateOutKey;