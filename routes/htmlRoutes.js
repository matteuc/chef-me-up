/* eslint-disable prettier/prettier */
/* eslint-disable no-empty-function */
/* eslint-disable no-unused-vars */
var db = require("../models");
var passport = require("passport");

module.exports = function (app) {
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

    db.Recipe.findAll({
      where: {
        id: recipeId
      }
    }).then(function(recipe) {
      // TODO: Fill in config with the data necessary for rendering a recipe
        var renderConfig = {
          
        };
      
        if(req.session.passport) {
          var userAccount = req.session.passport.user.profile._json;
          renderConfig.userToken = userAccount.sub;
          renderConfig.layout = "main-auth";
        }
        
        res.render("recipeView", renderConfig);
      })
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
    if (req.session.passport) {
      var userAccount = req.session.passport.user.profile._json;
      db.User.findOrCreate({
        where: {
          token: userAccount.sub
        },
        defaults: {
          name: userAccount.given_name,
          ingredients: "",
          favorites: ""
        }
      });
    }
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