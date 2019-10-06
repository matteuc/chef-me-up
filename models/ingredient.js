/* eslint-disable prettier/prettier */
/* eslint-disable indent */
module.exports = function(sequelize, DataTypes) {
    var Ingredient = sequelize.define("Ingredient", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        }
    });
    Ingredient.associate = function(models) {
        Ingredient.belongsToMany(models.Recipe, {
            through: "RecipeIngredient",
            as: "Recipe",
            foreignKey: "ingredientId",
            otherKey: "recipeId",
            allowNull: false
        });
    };
    return Ingredient;
};