const express = require("express");
const path = require("path");

const bountyRouter = require("./routes/bountyRouter");
const hunterRouter = require("./routes/hunterRouter");
const leaderboardRouter = require("./routes/leaderboardRouter");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, '../public')));

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.get("/", (req, res) => res.redirect("/bounties"));

app.use("/bounties", bountyRouter);
app.use("/hunter", hunterRouter);
app.use("/leaderboard", leaderboardRouter);

app.use((req, res) => {
    res.status(404).render('pages/error/notFound', {message: ""});
});

module.exports = app;