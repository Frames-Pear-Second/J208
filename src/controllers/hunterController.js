const hunterModel = require('../models/hunterModel');
const hunterService = require('../services/hunterService');
const bountyService = require('../services/bountyService');

async function registerForm(req, res){
    res.render('pages/hunter/register', {errorMsg: ""});
}

async function register(req, res){
    try{
        const {alias, password} = req.body;

        if(!hunterService.validateAlias(alias)){
            return res.status(400).render('pages/hunter/register', { errorMsg: "That Alias cannot be used" });
        }
        if(!hunterService.validatePassword(password)){
            return res.status(400).render('pages/hunter/register', { errorMsg: "That Password is invalid" });
        }

        const isHunter = await hunterModel.getHunterByAlias(alias);
        if(isHunter){
            return res.status(409).render('pages/hunter/register', { errorMsg: "That Alias is alredy being used" });
        }
        
        const hashedPass = hunterService.hashPassword(password);

        await hunterModel.registerHunter(alias, hashedPass);
        res.redirect("/hunter/login");
    }
    catch(error){
        res.status(500).render('pages/error/server', { message: ""});
    }
}

async function loginForm(req, res){
    res.render('pages/hunter/login', {errorMsg: ""});
}

async function login(req, res){
    try{
        const {alias, password} = req.body;
    
        const hunter = await hunterModel.getHunterByAlias(alias.trim());

        if(!hunter){
            return res.render('pages/hunter/login', { errorMsg: "Hunter not found" });
        }
        else if(!hunterService.verifyPassword(password, hunter.password)){
            return res.render('pages/hunter/login', { errorMsg: "Password doesn't match" });
        }

        res.redirect(`/hunter/${encodeURIComponent(hunter.alias)}`);
    }
    catch(error){
        res.status(500).render('pages/error/server', { message: ""});
    }
}

async function claimReward(req, res) {
    try{
        const {bountyId, hunterId} = req.body;

        const reward = await bountyService.getReward(bountyId);
        const hunter = await hunterModel.getHunterById(hunterId);

        if (!reward || !hunter) {
            return res.status(404).render('pages/errors/notFound');
        }

        const total = (hunter.total || 0) + reward;

        await hunterModel.updateTotal(hunterId, total);

        bountyService.scrapBounty(bountyId);

        res.redirect(`/hunter/${encodeURIComponent(hunter.alias)}`);

    }catch(error){
        res.status(500).render('pages/error/server', { message: ""});
    }
}

async function getHunter(req, res){
    try{
        const alias = req.params.alias;
        if(!alias){ 
            return res.status(400).redirect("/hunter/login");
        }

        const hunter = await hunterModel.getHunterByAlias(alias);
        if(!hunter){
            return res.status(404).render('pages/errors/notFound');
        }

        const bounties = await bountyService.getAllBounties();
        res.status(200).render('pages/hunter/profile', {
            hunter,
            bounties
        })
    }catch(error){
        res.status(500).render('pages/error/server', { message: ""});
    }
}

module.exports = {registerForm, register, loginForm, login, getHunter, claimReward, claimReward}