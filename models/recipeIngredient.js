/* eslint-disable prettier/prettier */
/* eslint-disable indent */
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

    return RecipeIngredient;
};