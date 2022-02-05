const {v4: uuid} = require('uuid');
const hash = require('sha1');

const insertIntoDb = require('../utility/db/remoteCLIDbWrapper').inserIntoDb;
const logger = require('../logger').logger;

const getKey = async (req, res) => {
    const key = uuid();
    const {keyType} = req.body;
    try {
        if(keyType !== 'in' && keyType !== 'out'){
            throw 'invalid key type';
        }
        console.log(`${keyType}Keys`, {key: hash(key)})
        await insertIntoDb(`${keyType}keys`, {key: hash(key)});
        res.status(200).json({success: true, key: key});
    }
    catch(err) {
        logger.error(err);
        res.status(400).json({success: false});
    }
};
module.exports = getKey;