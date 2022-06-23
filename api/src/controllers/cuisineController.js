const { Cuisine } = require("../db");

const CUISINES = [
    "African",
    "American",
    "British",
    "Cajun",
    "Caribbean",
    "Chinese",
    "Eastern European",
    "European",
    "French",
    "German",
    "Greek",
    "Indian",
    "Irish",
    "Italian",
    "Japanese",
    "Jewish",
    "Korean",
    "Latin American",
    "Mediterranean",
    "Mexican",
    "Middle Eastern",
    "Nordic",
    "Southern",
    "Spanish",
    "Thai",
    "Vietnamese"
]

/*
 * ADD CUISINES DB
 */
const addCuisinesDB = async () => {
  try {
    CUISINES.forEach(cuisine => {
      Cuisine.findOrCreate({
        where: { name: cuisine }
      });
  });

  } catch (error) {
    console.log(`Can't add CUISINES to DB: ${error}`);
  }
};

/*
? GET ALL CUISINES FROM DB 
*/

const getCuisines = async (req, res, next) => {
  try {

    const allCuisines= await Cuisine.findAll();
    const cuisines = allCuisines?.map(cuisine => {
      return {
          name: cuisine.name,
      }
    });
    return res.send(cuisines);
  } catch (error) {
    return res.status(400).send(`Can't get All CUISINES: ${error}`);
  }
};

module.exports = {
  addCuisinesDB,
  getCuisines,
};