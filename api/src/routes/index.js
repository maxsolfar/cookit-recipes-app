const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const recipeRouter = require("./recipeRoutes");
const dietRouter = require("./dietRoutes");
const cuisineRouter = require("./dietRoutes");
const dishTypeRouter = require("./dishTypesRoutes");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/recipes", recipeRouter);
router.use("/cuisines", cuisineRouter);
router.use("/diets", dietRouter);
router.use("/cuisines", dishTypeRouter);

module.exports = router;
