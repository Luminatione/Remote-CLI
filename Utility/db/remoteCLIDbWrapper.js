const { MongoClient } = require('mongodb');

const logger = require('../../logger').logger; 
const ctx = require('../../env');

const client = new MongoClient(ctx.dbConnectionString, { useNewUrlParser: true, useUnifiedTopology: true });
let connection;
client.connect((err, db) => 
{
    if(err)
    {
        logger.error(err);
        throw err;
    }
    connection = db;
});

const insert = async (collectionName, obj) => {

    try {
        const collection = connection.db(ctx.dbName).collection(collectionName);
        return await collection.insertOne(obj);
    }
    catch(err) {
        logger.error(err);
        throw err;
    }
    
};

const find = async (collectionName, obj) => {
    try {
        const collection = connection.db(ctx.dbName).collection(collectionName);
        return await collection.findOne(obj);
    }
    catch(err) {
        logger.error(err);
        throw err;
    }
};

module.exports.insertIntoDb = insert;
module.exports.findInDb = find;