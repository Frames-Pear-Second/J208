const bountyModel = require('../models/bountyModel');
const bountyService = require('../services/bountyService');

async function getAll(req, res) {
    try{
        const {gender, state, sort} = req.query;
        let bounties = await bountyModel.getAllBounties();

        if (gender !== undefined && gender !== "") {
            bounties = bounties.filter(b => b.gender == gender);
        }
        if (state !== undefined && state !== "") {
            bounties = bounties.filter(b => b.state == state);
        }

        if (sort === "reward") {
            bounties.sort((a, b) => b.reward - a.reward);
        } else if (sort === "date") {
            bounties.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        }

        res.status(200).render('pages/bounty/index', {bounties});

    }catch(error){
        res.status(500).render('pages/error/server', { message: "Trouble fetching the bounty"});
    }
}

function getAddForm(req, res) {
    res.render('pages/bounty/addNew', {errors: []});
}

async function addNew(req, res){
    try{
        const {firstName, nickname, lastName, gender, state, reward} = req.body;
        const validationResult = bountyService.validateBounty(firstName, nickname, lastName, reward);
        
        if(validationResult.length > 0){
            return res.status(400).render('pages/bounty/addNew', {errors: validationResult});
        }
        
        bountyModel.addBounty(
                firstName.trim(),
                nickname.trim(),
                lastName.trim(),
                Number(gender),
                Number(state),
                parseFloat(reward)
            );
        res.redirect("/bounties");  

    }catch(error){
        res.status(500).render('pages/error/server', {message: "This bounty wouldn\'t stick"});
    }
}

async function getUpdateForm(req, res) {
    try{
        const id = req.params.id;
        const bounty = await bountyModel.getBountyById(id);

        if (!bounty) {
            return res.status(404).render('pages/error/notFound', { message: "Bounty ain\'t been found"} );
        }

        res.status(200).render('pages/bounty/update', {bounty, errors: []});
    }catch(error){
         res.status(500).render('pages/error/server', { message: "Trouble pullin\' the papers for editin\'" });
    }
}

async function update(req, res){
    try{
        const {id, firstName, nickname, lastName, gender, state, reward} = req.body;

        const validationResult = bountyService.validateBounty(firstName, nickname, lastName, reward);

        if(validationResult.length){
            res.status(400).render('pages/bounty/update', {bounty, errors: valitationResult});
        }

        const bounty = bountyService.getParsedBounty(firstName, nickname, lastName, gender, state, reward);
        bountyModel.updateBounty(id, bounty);

        res.redirect("/bounties");  

    }catch(error){
        res.status(500).render('pages/error/server', { message: "This bounty won\'t take changes" });
    }
}

async function del(req, res) {
    try{
        const id = req.params.id;

        const bounty = await bountyModel.getBountyById(id);

        if (!bounty) {
            return res.status(404).render('pages/error/notFound', { message: "Bounty ain\'t been found" });
        }
    
        bountyModel.deleteBounty(id);
        res.redirect("/bounties");  

    }catch(error){
        res.status(500).render('pages/error/server', { message: "Couldn\'t scrap the bounty" });
    }
}

module.exports = {getAll, getAddForm, addNew, getUpdateForm, update, del}