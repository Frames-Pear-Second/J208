const bountyModel = require('../models/bountyModel')

async function getAllBounties(){
    return bountyModel.getAllBounties();
}

function validateBounty(firstName, nickname, lastName, reward){
    const firstNameRegex = /^(?=(?:[A-Za-z]*[A-Za-z]){2,})[A-Za-z]+$/;
    const nicknameregex = /^(?:|.*[a-zA-Z].*)$/;
    const lastNameRegex = /^(?=(?:[A-Za-z]*[A-Za-z]){3,})[A-Za-z]+$/;
    const rewardNumber = Number(reward);

    let errors = [];

    if(!firstNameRegex.test(firstName)) errors.push("Incorrect first name!");
    if(!nicknameregex.test(nickname)) errors.push("Incorrect nickname!");
    if(!lastNameRegex.test(lastName)) errors.push("Incorrect last name!");
    if(isNaN(rewardNumber) || rewardNumber <= 0) errors.push("Invalid reward");

    return errors;
}

function getParsedBounty(firstName, nickname, lastName, gender, state, reward){

    const first = firstName.trim();
    const nick = nickname.trim();
    const last = lastName.trim();
    
    return {
        name: {
            first,
            nick,
            last
        },
        gender: Number(gender),
        state: Number(state),
        reward: Number(reward)
    }
}

async function getReward(id){
    const bount = await bountyModel.getBountyById(id);
    return bount.reward;
}

function scrapBounty(id){
    bountyModel.deleteBounty(id);
}

module.exports = {getAllBounties, getParsedBounty, validateBounty, getReward, scrapBounty}