const { Router } = require("express");

const cuisineRouter = Router();

const { getCuisines } = require("../controllers/cuisineController");


cuisineRouter.get("/", getCuisines);

module.exports = cuisineRouter;