const hash = require('sha1');

const findInDb = require('./utility/db/remoteCLIDbWrapper').findInDb;
const logger = require('./logger').logger;

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
        logger.warn(`${err} on ${req.url}`);
        res.status(400).json({success: false});
    }
};

const validateInKey = async (req, res, next) => {
    const {inKey} = req.body;
    validateKey(req, res, next, 'inkeys', inKey);
};

const validateOutKey = (req, res, next) => {
    const {outKey} = req.body;
    validateKey(req, res, next, 'outkeys', outKey);
}

module.exports.validateInKey = validateInKey;
module.exports.validateOutKey = validateOutKey;