const { Router } = require("express");

const dietRouter = Router();

const { getDiets } = require("../controllers/dietController");


dietRouter.get("/", getDiets);

module.exports = dietRouter;