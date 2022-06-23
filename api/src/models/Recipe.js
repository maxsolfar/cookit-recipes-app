const { DataTypes, UUIDV4 } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey:true,
      defaultValue: UUIDV4,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    summary:{
      type: DataTypes.TEXT,
      allowNull: false,
    },
    image :{
      type: DataTypes.TEXT,
      allowNull: false,
    },
    healthScore:{
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    steps: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      allowNull: true,
    }, 
    readyInMinutes:{
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    created: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    }
  },{timestamps: false});
};
