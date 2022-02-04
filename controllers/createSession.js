const { MongoClient } = require('mongodb');

const ctx = require('../env');
const client = new MongoClient(ctx.dbConnectionString, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect(err => {
  const collection = client.db(ctx.dbName).collection("devices");
  // perform actions on the collection object
  client.close();
});