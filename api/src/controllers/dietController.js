const { Diet } = require("../db");

const DIETS = [
    "Gluten Free",
    "Ketogenic",
    "Vegetarian",
    "Lacto-Vegetarian",
    "Ovo-Vegetarian",
    "Vegan",
    "Pescetarian",
    "Paleo",
    "Primal",
    "Low FODMAP",
    "Whole30"
]

/*
 * ADD DIETS DB
 */
const addDietsDB = async () => {
  try {
    DIETS.forEach(diet => {
      Diet.findOrCreate({
        where: { name: diet }
      });
  });

  } catch (error) {
    console.log(`Can't add DIETS to DB: ${error}`);
  }
};

/*
? GET ALL DIETS FROM DB 
*/

const getDiets = async (req, res, next) => {
  try {

    const allDiets= await Diet.findAll();
    const diets = allDiets?.map(diet => {
      return {
          name: diet.name,
      }
    });
    res.send(diets);
  } catch (error) {
    res.status(400).send(`Can't get All DIETS: ${error}`);
  }
};

module.exports = {
  addDietsDB,
  getDiets,
};