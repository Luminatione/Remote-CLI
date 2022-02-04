const { MongoClient } = require('mongodb');
const {v4: uuid} = require('uuid');
const hash = require('sha1');

const logger = require('../logger').logger; 
const ctx = require('../env');

const client = new MongoClient(ctx.dbConnectionString, { useNewUrlParser: true, useUnifiedTopology: true });

const createSession = async (req, res) => {
    try{
        const {inKey} = req.body;
        if(!inKey)
        {
            throw 'No valid in key provided';
        }
        const connection = await client.connect();
        const collection = connection.db(ctx.dbName).collection(ctx.dbSessionsCollectionName);
        const sessionId = uuid();
        await collection.insertOne({ sessionId: hash(sessionId), inKey: hash(inKey) });
        res.status(200).json({success: true, sessionId: sessionId});
    }
    catch(err) {
        logger.error(err);
        res.status(400).json({success: false});
    }
    finally
    {
        await client.close();
    }
};

module.exports = createSession;