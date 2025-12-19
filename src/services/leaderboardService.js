const hunterService = require('../services/hunterService');

async function fetchLeaderboard(){
    let hunters = await hunterService.getHunters();
    return hunters.filter(h => h.total).sort((a, b) => b.amount - a.amount);
}

module.exports = {fetchLeaderboard}