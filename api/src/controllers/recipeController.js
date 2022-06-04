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
          res
            .status(404)
            .send(`Recipes with name: ${name} doesn't exist : ${error}`);
        }
      }
      else{
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
      const DBData = await getDBData();
      const findDB = DBData?.find((data) => data.id === idRecipe);
      if (findDB) {
        res.status(200).send(findDB);
      } else {
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
    vegetarian,
    vegan,
    glutenFree,
    dairyFree,
    cuisines,
    dishTypes,
    diets } = req.body;

  if (!title || !summary || !cuisines || !dishTypes || !diets) {
    res.status(400).send({ error: "Missing data in the request" });
  }

  try {
    const newRecipe = await Recipe.create({
      title,
      summary,
      healthScore,
      steps,
      vegetarian,
      vegan,
      glutenFree,
      dairyFree,
      image:
        image ||
        "https://spoonacular.com/recipeImages/716426-556x370.jpg",
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

    newRecipe.addDiet(dietsDb);
    newRecipe.addDishType(dishTypesDb);
    newRecipe.addCuisine(cuisinesDb);

    res.send(newRecipe);

  } catch (error) {
    res.status(400).send({ error: `Can't add new recipe ${error}` });
  }
};


module.exports = {
  getAllRecipes,
  getRecipeDetail,
  postRecipe
};
