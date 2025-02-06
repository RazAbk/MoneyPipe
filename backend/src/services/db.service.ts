const { MongoClient } = require('mongodb')

const config = require('../config')
const { Logger } = require('../logger');

module.exports = {
    getCollection
}

// Database Name
const dbName = 'moneypipe_db'

let dbConn: any = null

async function getCollection(collectionName: string) {
    try {
        const db = await connect();
        const collection = await db.collection(collectionName)
        return collection
    } catch (err) {
        Logger.error('error while getting collection', err);
        throw err
    }
}

async function connect() {
    if (dbConn) return dbConn
    try {
        const client = await MongoClient.connect(config.dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
        const db = client.db(dbName)
        dbConn = db
        return db
    } catch (err) {
        Logger.error('error while connection to MongoDB', err);
        throw err
    }
}




