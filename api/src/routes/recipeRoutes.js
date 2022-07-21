const { Router } = require("express");

const recipeRouter = Router();

const { getAllRecipes, getRecipeDetail, postRecipe, deleteRecipe, editRecipe } = require("../controllers/recipeController");


recipeRouter.get("/", getAllRecipes);
recipeRouter.get("/:idRecipe", getRecipeDetail);

recipeRouter.post("/", postRecipe); 

recipeRouter.delete("/:idRecipe", deleteRecipe); 

recipeRouter.put("/:idRecipe", editRecipe);

module.exports = recipeRouter;