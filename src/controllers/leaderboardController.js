const leaderboardService = require('../services/leaderboardService');

async function getLeaderboard(req, res) {
    try{
        const leaderboard = await leaderboardService.fetchLeaderboard();
        res.render('pages/leaderboard/leaderboard', { leaderboard});
    }catch(error){
        res.status(500).render('pages/errors/server');
    }
}

module.exports= {getLeaderboard}