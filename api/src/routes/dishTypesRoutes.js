const { Router } = require("express");

const dishTypeRouter = Router();

const { getDishTypes } = require("../controllers/dishTypeController");


dishTypeRouter.get("/", getDishTypes);

module.exports = dishTypeRouter;
