module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    name: DataTypes.STRING,
    token: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    ingredients: {
      type: DataTypes.TEXT
    },
    favorites: {
      type: DataTypes.TEXT
    }
  });

  User.associate = function(models) {
    // Associating User with Recipes
    // When a Recipe is deleted, also delete any associated Recipes
    User.hasMany(models.Recipe, {
      onDelete: "cascade",
      as: "MyRecipes"
    });
  };
  return User;
};
