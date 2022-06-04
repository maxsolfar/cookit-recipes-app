const { DishType } = require("../db");

const DISH_TYPES = [
  "main course",
  "side dish",
  "dessert",
  "appetizer",
  "salad",
  "bread",
  "breakfast",
  "soup",
  "beverage",
  "sauce",
  "marinade",
  "fingerfood",
  "snack",
  "drink"
]

/*
 * ADD DISHTYPES DB
 */
const addDishTypesDB = async () => {
  try {
    DISH_TYPES.forEach(type => {
      DishType.findOrCreate({
        where: { name: type }
      });
  });

  } catch (error) {
    console.log(`Can't add DISHTYPES to DB: ${error}`);
  }
};

/*
? GET ALL DISHTYPES FROM DB 
*/

const getDishTypes = async (req, res, next) => {
  try {

    const allDishTypes= await DishType.findAll();
    const types = allDishTypes?.map(type => {
      return {
          name: type.name,
      }
    });
    res.send(types);
  } catch (error) {
    res.status(400).send(`Can't get All DISH TYPES: ${error}`);
  }
};

module.exports = {
  addDishTypesDB,
  getDishTypes,
};