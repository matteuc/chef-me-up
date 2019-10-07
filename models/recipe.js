/* eslint-disable indent */
/* eslint-disable prettier/prettier */
module.exports = function(sequelize, DataTypes) {
    var Recipe = sequelize.define("Recipe", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        description: DataTypes.TEXT,
        prepTime: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        cookTime: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        servingSize: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        instructions: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        cuisine: DataTypes.STRING
    });
    Recipe.associate = function(models) {
        Recipe.belongsTo(models.User, {
            foreignKey: {
                allowNull: false,
                as: "Author"
            }
        });
        Recipe.belongsToMany(models.Ingredient, {
            through: "RecipeIngredient",
            as: "Ingredients",
            foreignKey: "recipeId",
            otherKey: "ingredientId",
            allowNull: false

        });
    };

    return Recipe;
};