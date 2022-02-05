const {v4: uuid} = require('uuid');
const hash = require('sha1');

const insertIntoDb = require('../utility/db').insertIntoDb;
const logger = require('../logger').logger;

const getKey = (req, res) => {
    const key = uuid();
    const {keyType} = req.body;
    try {
        if(keyType !== 'in' && keyType !== 'out'){
            throw 'invalid key type';
        }
        await insertIntoDb(`${keytype}keys`, hash(key));
    }
    catch(err) {
        logger.log(err);
        res.status(400).json({success: false});
    }
    res.status(200).json({success: true, key: key});
};
module.exports = getKey;