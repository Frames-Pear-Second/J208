const express = require("express");
const controller = require("../controllers/hunterController");

const router = express.Router();

router.get("/", (req, res) => {
    res.redirect("/hunter/login");
});

router.get("/login", controller.loginForm);
router.post("/login", controller.login);
router.get("/register", controller.registerForm);
router.post("/register", controller.register);
router.post("/claimReward", controller.claimReward);
router.get("/:alias", controller.getHunter);

module.exports = router;