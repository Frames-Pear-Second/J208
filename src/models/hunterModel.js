const { ObjectId } = require('mongodb');
const { getDB } = require('../data/connection');

async function registerHunter(alias, password) {
    const db = getDB();
    return await db.collection('hunters').insertOne({
        alias,
        password,
        total: 0
    })
}

async function getAllHunters(){
    const db = getDB();
    return await db.collection('hunters').find().sort({total: -1}).toArray();
}

async function getHunterByAlias(alias){
    const db = getDB();
    return await db.collection('hunters').findOne({alias: alias});
}

async function getHunterById(id){
    const db = getDB();
    return await db.collection('hunters').findOne({_id: new ObjectId(id)});
}

async function updateTotal(id, total){
    const db = getDB();
    await db.collection('hunters').updateOne(
        {_id: new ObjectId(id)},
        {$set: {
            total: total
        }}
    )
}

module.exports = {registerHunter, getAllHunters, getHunterByAlias, getHunterById, updateTotal}