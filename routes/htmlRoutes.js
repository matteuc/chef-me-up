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
    res.redirect("/");
  });

  app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
  });

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.redirect("/");
  });
};