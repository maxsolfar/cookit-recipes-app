const axios = require("axios");
const { Recipe, Diet, Cuisine, DishType } = require("../db");
const { getAPIData, getDBData, getAPIDataDetail } = require("./utils/getData");

/*
? GET ALL RECIPES FROM API & DB 
*/
const getAllRecipes = async (req, res, next) => {
  const { name } = req.query;

  try {
    await Promise.all([getAPIData(), getDBData()]).then((data) => {
      const [dataAPI, dataDB] = data;
      if (name) {
        try {
          const dataDBFilter = dataDB?.filter((data) =>
            data.title.toLowerCase().includes(name.toLowerCase())
          );
          const dataAPIFilter = dataAPI?.filter((data) =>
            data.title.toLowerCase().includes(name.toLowerCase())
          );
          const dataByName = [...dataDBFilter, ...dataAPIFilter];
          res.send(dataByName);
          
        } catch (error) {
          res.status(404).send(`Recipes with name: ${name}: ${error}`);
        }
      } else {
        if (!dataDB || dataDB.length === 0) {
          res.status(200).send(dataAPI);
        } else if (!dataAPI || dataAPI.length === 0) {
          res.status(200).send(dataDB);
        } else {
          const allDataRecipes = [...dataAPI, ...dataDB];
          res.status(200).send(allDataRecipes);
        }
      }
    });
  } catch (error) {
    res.status(400).send(`Can't get Recipes: ${error}`);
  }
};

/*
? GET RECIPE DETAIL FROM DB OR API 
*/
const getRecipeDetail = async (req, res, next) => {
  const { idRecipe } = req.params;
  if (idRecipe) {
    try {
      if(idRecipe.length > 8){
        const DBData = await getDBData();
        const findDB = DBData?.find((data) => data.id === idRecipe);
        res.status(200).send(findDB);
      }
      else {
        const APIData = await getAPIDataDetail(idRecipe);
        res.status(200).send(APIData);
      }
    } catch (error) {
      res.status(400).send({ error: "The Recipe doesn't exist" });
    }
  }
};

const postRecipe = async (req, res, next) => {
  const {
    title,
    summary,
    image,
    healthScore,
    steps,
    cuisines,
    dishTypes,
    readyInMinutes,
    diets,
  } = req.body;

  if (
    !title ||
    !summary ||
    !cuisines ||
    !dishTypes ||
    !diets ||
    !readyInMinutes
  ) {
    res.status(400).send({ error: "Missing data in the request" });
  }

  try {
    const newRecipe = await Recipe.create({
      title,
      summary,
      healthScore,
      steps,
      readyInMinutes,
      image: image || "https://spoonacular.com/recipeImages/716426-556x370.jpg",
    });

    const dietsDb = await Diet.findAll({
      where: { name: diets },
    });

    const dishTypesDb = await DishType.findAll({
      where: { name: dishTypes },
    });

    const cuisinesDb = await Cuisine.findAll({
      where: { name: cuisines },
    });

    await newRecipe.addDiets(dietsDb);
    await newRecipe.addDishTypes(dishTypesDb);
    await newRecipe.addCuisines(cuisinesDb);

    res.send(newRecipe);
  } catch (error) {
    res.status(400).send({ error: `Can't add new recipe ${error}` });
  }
};


const deleteRecipe = async (req, res, next) => {
  try {
    const { idRecipe } = req.params;
    const findRecipe = await Recipe.findByPk(idRecipe);
    if (findRecipe) {
      await findRecipe.destroy();
      return res.status(200).send("Recipe was Delete");
    }
  } catch (error) {
    res.status(400).send({ error: "Can't Delete the recipe" });
  }
};

const editRecipe = async (req, res, next) => {
  try {
    const { idRecipe } = req.params;
    const {
      title,
      summary,
      image,
      healthScore,
      steps,
      cuisines,
      dishTypes,
      readyInMinutes,
      diets
    } = req.body;

    const recipe = await Recipe.findOne({
      where: { id: idRecipe },
    });

    const recipeUpdate = await recipe.update({
      title,
      summary,
      image,
      healthScore,
      steps,
      readyInMinutes,
    });

    const dietsDb = await Diet.findAll({
      where: { name: diets },
    });

    const dishTypesDb = await DishType.findAll({
      where: { name: dishTypes },
    });

    const cuisinesDb = await Cuisine.findAll({
      where: { name: cuisines },
    });

    recipeUpdate.setDiets(dietsDb);
    recipeUpdate.setDishTypes(dishTypesDb);
    recipeUpdate.setCuisines(cuisinesDb);

    return res.status(200).send(recipeUpdate);
    
  } catch (error) {
    res.status(400).send({ error: "Can't Update the recipe" + error } );
  }
};

module.exports = {
  getAllRecipes,
  getRecipeDetail,
  postRecipe,
  deleteRecipe,
  editRecipe
};
