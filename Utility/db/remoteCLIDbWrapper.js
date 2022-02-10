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
        logger.error(err.stack);
        throw err;
    }
    
};

const find = async (collectionName, obj) => {
    try {
        const collection = connection.db(ctx.dbName).collection(collectionName);
        return await collection.findOne(obj);
    }
    catch(err) {
        logger.error(err.stack);
        throw err;
    }
};
const findAll = async (collectionName, obj) => {
    try {
        const collection = connection.db(ctx.dbName).collection(collectionName);
        return await collection.find(obj).toArray();
    }
    catch(err) {
        logger.error(err.stack);
        throw err;
    }
};
const remove = async (collectionName, obj) => {
    try {
        const collection = connection.db(ctx.dbName).collection(collectionName);
        return await collection.deleteOne(obj);
    }
    catch(err) {
        logger.error(err.stack);
        throw err;
    }
};
const update = async (collectionName, obj, newObj) => {
    try {
        const collection = connection.db(ctx.dbName).collection(collectionName);
        return await collection.updateOne(obj, newObj);
    }
    catch(err) {
        logger.error(err.stack);
        throw err;
    }
};
module.exports.insertIntoDb = insert;
module.exports.findInDb = find;
module.exports.findAll = findAll;
module.exports.removeFromDb = remove;
module.exports.update = update;