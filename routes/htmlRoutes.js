/* eslint-disable prettier/prettier */
/* eslint-disable no-empty-function */
/* eslint-disable no-unused-vars */
var db = require("../models");
var passport = require("passport");
var moment = require("moment");

module.exports = function (app) {
  function titleCase(str) {
    var splitStr = str.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
      // You do not need to check if i is larger than splitStr length, as your for does that for you
      // Assign it back to the array
      splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    // Directly return the joined string
    return splitStr.join(' ');
  }
  // Load fridge page
  app.get("/", function (req, res) {
    if (req.session.passport) {
      var userAccount = req.session.passport.user.profile._json;
      res.render("fridge", {
        username: userAccount.given_name,
        userToken: userAccount.sub,
        layout: "main-auth"
      });

    } else {
      res.render("fridge", {
        username: "User"
      });
    }
  });

  // Load recipes page
  app.get("/recipes", function (req, res) {
    if (req.session.passport) {
      var userAccount = req.session.passport.user.profile._json;
      res.render("recipes", {
        username: userAccount.given_name,
        userToken: userAccount.sub,
        layout: "main-auth"
      });

    } else {
      res.render("recipes", {
        username: "User"
      });
    }
  });

  app.get("/recipes/:recipeId", function (req, res) {
    var recipeId = req.params.recipeId;

    db.Recipe.findOne({
      where: {
        id: recipeId
      },
      include: {
        model: db.Ingredient,
        as: "Ingredients",
        attributes: ["id", "name"],
        through: {
          model: db.RecipeIngredient
        }
      }

    }).then(function (recipe) {

      db.User.findOne({
        where: {
          token: recipe.UserToken
        }
      }).then(function (user) {
        var ingredients = [];
        for (ri of recipe.Ingredients) {
          var ingredientObj = {
            igName: titleCase(ri.name),
            quantity: ri.RecipeIngredient.quantity,
            unit: ri.RecipeIngredient.unit
          }

          ingredients.push(ingredientObj);
        }

        var renderConfig = {
          id: recipe.id,
          name: recipe.name,
          prep: recipe.prepTime,
          cook: recipe.cookTime,
          serving: recipe.servingSize,
          cuisine: recipe.cuisine,
          description: recipe.description,
          createdOn: moment(recipe.createdAt).format('MMMM Do YYYY'),
          author: user.name,
          instructions: recipe.instructions.split(";*;"),
          ingredients: ingredients,
          url: `https://chef-me-up.herokuapp.com${req.originalUrl}`
        };

        if (req.session.passport) {
          var userAccount = req.session.passport.user.profile._json;
          renderConfig.userToken = userAccount.sub;
          renderConfig.layout = "main-auth";
        }

        res.render("recipe", renderConfig);
      });

    });
  });

  // Load favorites page
  app.get("/favorites", function (req, res) {
    if (req.session.passport) {
      var userAccount = req.session.passport.user.profile._json;
      res.render("favorites", {
        username: userAccount.given_name,
        userToken: userAccount.sub,
        layout: "main-auth"
      });

    } else {
      res.render("favorites", {
        username: "User"
      });
    }
  });

  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile"]
    })
  );
  app.get("/auth/google/callback", passport.authenticate("google"), function (req, res) {
    var userAccount = req.session.passport.user.profile._json;
    db.User.findOne({
      where: {
        token: userAccount.sub
      }
    }).then(function (userData) {
      var userInfo = {
        name: userAccount.given_name,
        token: userAccount.sub,
        ingredients: "",
        favorites: ""
      };

      if (!userData) {
        db.User.create(userInfo);
      }
    });

    res.redirect("/");
  });

  app.get("/logout", function (req, res) {
    req.session.destroy(function (err) {
      res.redirect("/");
    });
  });

  app.get("*", function (req, res) {
    res.redirect("/");
  });
};