module.exports = function(sequelize, DataTypes) {
  var Ingredient = sequelize.define("Ingredient", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    }
  });
  Ingredient.associate = function(models) {
    Ingredient.hasMany(models.RecipeIngredient, {
      foreignKey: {
        allowNull: false,
        as: "Ingredients"
      }
    });
  };
  return Ingredient;
};
