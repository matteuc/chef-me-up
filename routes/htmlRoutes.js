/* eslint-disable prettier/prettier */
/* eslint-disable no-empty-function */
/* eslint-disable no-unused-vars */
var db = require("../models");
var passport = require("passport");

module.exports = function (app) {
  // Load fridge page
  app.get("/", function (req, res) {
    if (req.session.user) {
      res.cookie("user", req.session.user);
      res.render("fridge", {
        layout: "main-auth"
      });

    } else {
      res.cookie("user", "");
      res.render("fridge");
    }
    // db.User.findAll({}).then(function(pantryItems) {
    //   res.render("fridge");
    // });
  });

  // Load recipes page
  app.get("/recipes", function (req, res) {
    if (req.session.user) {
      res.cookie("user", req.session.user);
      res.render("recipes", {
        layout: "main-auth"
      });

    } else {
      res.cookie("user", "");
      res.render("recipes");
    }    
    // db.User.findAll({}).then(function(recipes) {
    //   res.render("recipes");
    // });
  });

  // Load favorites page
  app.get("/favorites", function (req, res) {
    if (req.session.user) {
      res.cookie("user", req.session.user);
      res.render("favorites", {
        layout: "main-auth"
      });

    } else {
      res.cookie("user", "");
      res.render("favorites");
    }    
    // db.User.findAll({}).then(function(favorites) {
    //   res.render("favorites");
    // });
  });

  // PASSPORT: GOOGLE AUTHENTICATION ROUTES
  // Middleware to check if the user is authenticated
  function isUserAuthenticated(req, res, next) {
    if (req.user) {
      next();
    } else {
      res.send("You must login!");
    }
  }

  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile"]
    })
  );
  app.get("/auth/google/callback", passport.authenticate("google"), function (req, res) {
    req.session.user = {
      id: req.user._json.sub,
      name: req.user._json.given_name,
      picture: req.user._json.picture
    };
    res.json(req.session.user);
  });

  app.get("/logout", function (req, res) {
    req.logout();
    req.session = null;
    res.redirect("/");
  });

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.redirect("/");
  });
};