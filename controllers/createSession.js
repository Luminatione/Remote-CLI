const {v4: uuid} = require('uuid');
const hash = require('sha1');
const insertIntoDb = require('../Utility/db/remoteCLIDbWrapper').insertIntoDb;

const ctx = require('../env');


const createSession = async (req, res) => {
    try{
        const {inKey} = req.body;
        if(!inKey)
        {
            throw 'No valid in key provided';
        }
        const sessionId = uuid();
        await insertIntoDb(ctx.dbSessionsCollectionName, { sessionId: hash(sessionId), inKey: hash(inKey) });
        res.status(200).json({success: true, sessionId: sessionId});
    }
    catch(err) {
        res.status(400).json({success: false});
    }
};

module.exports = createSession;