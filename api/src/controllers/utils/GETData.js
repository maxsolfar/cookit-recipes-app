const axios = require("axios");
const { Recipe, Diet, Cuisine, DishType } = require("../../db");
const { URL_RECIPES, URL_RECIPES_INFO } = require("./APIAccess");
const { API_KEY } = process.env;

/*Number of recipes requested*/
const nRecipes = 108;

const getAPIData = async () => {
  try {
    const APIData = await axios.get(
      `${URL_RECIPES}apiKey=${API_KEY}&number=${nRecipes}`
    );

    let apiRecipes = [];
    APIData &&
      APIData.data.results?.map((recipe) => {
        apiRecipes.push({
          id: recipe.id,
          title: recipe.title,
          summary: recipe.summary,
          image: recipe.image,
          healthScore: recipe.healthScore,
          readyInMinutes: recipe.readyInMinutes,
          cuisines: recipe.cuisines?.map((cuisine) => cuisine),
          diets: recipe.diets?.map((diet) => diet),
          created: false,
        });
      });

    return apiRecipes;
  } catch (error) {
    console.log(`GET API DATA ${error}`);
  }
};

const getAPIDataDetail = async (id) => {
  try {
    const APIData = await axios.get(
      `${URL_RECIPES_INFO}${id}/information?apiKey=${API_KEY}`
    );
      let Recipe = {
      id: APIData.data.id,
      title: APIData.data.title,
      summary: APIData.data.summary,
      image: APIData.data.image,
      healthScore: APIData.data.healthScore,
      steps: APIData.data.analyzedInstructions
        ?.map((instruction) =>
          instruction.steps?.flatMap((step) => [step.step])
        ).flat(1),
      readyInMinutes: APIData.data.readyInMinutes,
      cuisines: APIData.data.cuisines?.map((cuisine) => cuisine),
      dishTypes: APIData.data.dishTypes?.map((type) => type),
      diets: APIData.data.diets?.map((diet) => diet),
      created: false,
    };
    return Recipe;
  } catch (error) {
    console.log(`GET API DATA DETAIL ${error}`);
  }
};

const getDBData = async () => {
  try {
    let DBData = await Recipe.findAll({
      include: [
        {
          model: Diet,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
        {
          model: Cuisine,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
        {
          model: DishType,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
      ],
    });

    return DBData;
  } catch (error) {
    console.log(`GET DB DATA ${error}`);
  }
};

module.exports = {
  getAPIData,
  getAPIDataDetail,
  getDBData,
};
