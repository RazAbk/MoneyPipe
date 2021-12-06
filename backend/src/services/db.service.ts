const { MongoClient } = require('mongodb')

const config = require('../config')

module.exports = {
    getCollection
}

// Database Name
const dbName = 'moneypipe_db'

let dbConn: any = null

async function getCollection(collectionName: string) {
    try {
        const db = await connect()
        const collection = await db.collection(collectionName)
        return collection
    } catch (err) {
        console.log(err)
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
        console.log(err)
        throw err
    }
}




