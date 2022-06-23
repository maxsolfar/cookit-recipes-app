const { Router } = require("express");

const recipeRouter = Router();

const { getAllRecipes, getRecipeDetail, postRecipe } = require("../controllers/recipeController");


recipeRouter.get("/", getAllRecipes);
recipeRouter.get("/:idRecipe", getRecipeDetail);

recipeRouter.post("/", postRecipe); 



module.exports = recipeRouter;