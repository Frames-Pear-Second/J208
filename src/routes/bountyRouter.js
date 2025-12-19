const express = require("express");
const controllers = require("../controllers/bountyController");

const router = express.Router();

router.get("/", controllers.getAll);
router.get("/add", controllers.getAddForm);
router.post("/add", controllers.addNew);
router.get("/delete/:id", controllers.del);
router.get("/update/:id", controllers.getUpdateForm);
router.post("/update", controllers.update);

module.exports = router;