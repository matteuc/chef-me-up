module.exports = function(sequelize, DataTypes) {
  var Recipe = sequelize.define("Recipe", {
    public: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
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
    // We're saying that a Post should belong to an Author
    // A Post can't be created without an Author due to the foreign key constraint
    Recipe.belongsTo(models.User, {
      foreignKey: {
        allowNull: false,
        as: "Author"
      }
    });
    Recipe.hasMany(models.RecipeIngredient, {
      foreignKey: {
        allowNull: false,
        as: "Ingredients"
      }
    });
  };

  return Recipe;
};
