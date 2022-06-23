const { Diet } = require("../db");

const DIETS = [
    "Gluten Free",
    "Dairy Free",
    "Ketogenic",
    "Lacto Ovo Vegetarian",
    "Vegan",
    "Pescatarian",
    "Paleolithic",
    "Primal",
    "Fodmap Friendly",
    "Whole 30"
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
    return res.send(diets);
  } catch (error) {
    return res.status(400).send(`Can't get All DIETS: ${error}`);
  }
};

module.exports = {
  addDietsDB,
  getDiets,
};