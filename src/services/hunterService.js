const { createHash } = require('node:crypto');
const hunterModel = require('../models/hunterModel');

function validateAlias(alias){
    const regex = /^(?=(?:.*[A-Za-z]){3,})(?!.*  )[A-Za-z0-9 ]{5,}$/;

    return regex.test(alias);
}

function validatePassword(password){
    const regex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;

    return regex.test(password);
}

function hashPassword(password) {
    const hash = createHash('sha256');
    hash.update(password); 
    return hash.digest('hex'); 
}

function verifyPassword(password, hashedPassword) {
    const hash = hashPassword(password); 
    return hash === hashedPassword;
}

async function getHunters() {
    return hunterModel.getAllHunters();
}


module.exports = {validateAlias, validatePassword, hashPassword, verifyPassword, getHunters}