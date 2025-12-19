const { ObjectId } = require('mongodb');
const { getDB } = require('../data/connection');

async function addBounty(firstName, nickname, lastName, gender, state, reward){
    const db = getDB();
    return await db.collection('bounties').insertOne({
        name: {
            first: firstName,
            nick: nickname,
            last: lastName
        },
        gender,
        state,
        reward,
        createdAt: new Date()
    })
};

async function getAllBounties(){
    const db = getDB();
    return await db.collection('bounties').find().sort({createdAt: -1}).toArray();
}

async function getBountyById(id){
    const db = getDB();
    return await db.collection('bounties').findOne({_id: new ObjectId(id)});
}

async function updateBounty(id, bounty){
    const db = getDB();
    await db.collection('bounties').updateOne(
        {_id: new ObjectId(id)},
        {$set: {
            name: bounty.name,
            gender: bounty.gender,
            state: bounty.state,
            reward: bounty.reward
            }
        }
    )
}

async function deleteBounty(id){
    const db = getDB();
    await db.collection('bounties').deleteOne({_id: new ObjectId(id)});
}

module.exports = {addBounty, getAllBounties, getBountyById, updateBounty, deleteBounty}