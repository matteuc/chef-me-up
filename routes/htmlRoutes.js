/* eslint-disable prettier/prettier */
/* eslint-disable no-empty-function */
/* eslint-disable no-unused-vars */
var db = require("../models");
var passport = require("passport");

module.exports = function(app) {
  // Load fridge page
  app.get("/", function(req, res) {
    if (req.session.token) {
      res.cookie("token", req.session.token);
      console.log("cookie set");
    } else {
      res.cookie("token", "");
      console.log("cookie not set");
    }
    res.render("fridge");
    // db.User.findAll({}).then(function(pantryItems) {
    //   res.render("fridge");
    // });
  });

  // Load recipes page
  app.get("/recipes", function(req, res) {
    res.render("recipes");
    // db.User.findAll({}).then(function(recipes) {
    //   res.render("recipes");
    // });
  });

  // Load favorites page
  app.get("/favorites", function(req, res) {
    res.render("favorites");
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
  app.get("/auth/google/callback", passport.authenticate("google"), function(req, res) {
    res.json(req.user);
  });

  // Secret route
  app.get('/secret', isUserAuthenticated, (req, res) => {
    res.send('You have reached the secret route');
  });

  app.get("/logout", function(req, res) {
    req.logout();
    req.session = null;
    res.redirect("/");
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.redirect("/");
  });
};
