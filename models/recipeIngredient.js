module.exports = function(sequelize, DataTypes) {
  var RecipeIngredient = sequelize.define("RecipeIngredient", {
    unit: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    quantity: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        len: [1]
      }
    }
  });
  RecipeIngredient.associate = function(models) {
    RecipeIngredient.belongsTo(models.Ingredient, {
      foreignKey: {
        allowNull: false,
        as: "Ingredient"
      }
    });
    RecipeIngredient.belongsTo(models.Recipe, {
      foreignKey: {
        allowNull: false,
        as: "Recipe"
      }
    });
  };
  return RecipeIngredient;
};
