const server = require('./src/app.js');
const { conn } = require('./src/db.js');

const { addCuisinesDB } = require("./src/controllers/cuisineController");
const { addDietsDB } = require("./src/controllers/dietController");
const { addDishTypesDB } = require("./src/controllers/dishTypeController");

// Syncing all the models at once.
conn.sync({ force: false }).then(() => {
  addCuisinesDB();
  addDietsDB();
  addDishTypesDB();

  server.listen(process.env.PORT, () => {
    console.log(`Listening at ${process.env.PORT}`);
  });
});
