const {v4: uuid} = require('uuid');
const hash = require('sha1');

const insertIntoDb = require('../utility/db/remoteCLIDbWrapper').insertIntoDb;
const logger = require('../logger').logger;
const ctx = require('../env');

const getGetKeyTypeCollection = (keyType) => {
    switch(keyType)
    {
        case 'in':
            return ctx.dbInKeysCollectionName;
        case 'out':
            return ctx.dbOutKeysCollectionName;
        default:
            throw 'Invalid key type';
    }
}

const getKey = async (req, res) => {
    const key = uuid();
    const {keyType} = req.body;
    try {
        const collectionName = getGetKeyTypeCollection(keyType);
        await insertIntoDb(collectionName, {key: hash(key)});
        res.status(200).json({success: true, key: key});
    }
    catch(err) {
        logger.error(err.stack);
        res.status(400).json({success: false});
    }
};
module.exports = getKey;