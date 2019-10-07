module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    name: DataTypes.STRING,
    token: {
      type: DataTypes.STRING,
      allowNull: false
    },
    ingredients: {
      type: DataTypes.TEXT
      // ,
      // get: function() {
      //   var ingredients = this.getDataValue("ingredients").split(";");
      //   // 'this' allows you to access attributes of the instance
      //   return ingredients;
      // },
      // set: function(val) {
      //   var ingredients = this.getDataValue("ingredients").split(";");
      //   ingredients.push(val);
      //   this.setDataValue("ingredients", ingredients);
      // }
    },
    favorites: {
      type: DataTypes.TEXT
      // ,
      // get: function() {
      //   var favorites = this.getDataValue("favorites").split(";");
      //   // 'this' allows you to access attributes of the instance
      //   return favorites;
      // },
      // set: function(val) {
      //   var favorites = this.getDataValue("favorites").split(";");
      //   favorites.push(val);
      //   this.setDataValue("favorites", favorites);
      // }
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
