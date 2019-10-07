/* eslint-disable indent */
/* eslint-disable prettier/prettier */
var db = require("../models");

module.exports = function(app) {
    function findRecipes(ingredientIDs, res) {
        // Find recipes that match ingredientIDs
        db.RecipeIngredient.findAll({
            where: {
                $or: [{
                    ingredientId: ingredientIDs
                }]
            }
        }).then(function(recipeIngredients) {
            var recipeMatches = {};
            function RecipeMatch(name, id, numMatches, matches) {
                this.name = name;
                this.id = id;
                this.numMatches = numMatches;
                this.matches = matches;
            }

            for(var idx = 0; idx < recipeIngredients.length; idx++) {
                var ri = recipeIngredients[idx];
                var match;

                // If the recipe has already been seen
                if(recipeMatches[ri.recipeId]) {
                  match = recipeMatches[ri.recipeId];
                }
                // If the recipe has not been seen yet   
                else {
                  match = new RecipeMatch(ri.recipeName, ri.recipeId, 0, []); 
                }

                match.numMatches++;
                newMatch.matches.push(ri.ingredientName);
                recipeMatches[ri.recipeId] = match;
            }

            res.json(recipeMatches);
        });

    }

    // GET route for getting all of ingredients by category 
    app.get("/api/ingredients", function(req, res) {
        db.Ingredient.findAll().then(function(ingredients) {
            res.json(ingredients);
        });
    });

    app.get("/api/:userToken/fridge", function(req, res) {
        var userToken = req.params.userToken;
        var ingredientIDs;
        db.User.findOne({
            where: {
                token: userToken
            }
        }).then(function(userInfo) {
            ingredientIDs = userInfo.get("ingredients");
        }).then(db.Ingredient.findAll({
            where: {
                $or: [{
                    id: ingredientIDs
                }]
            }
        })).then(function(ingredients) {
            res.json(ingredients);
        });
    });

    app.get("/api/:userToken/recipes", function(req, res) {
        var userToken = req.params.userToken;
        db.User.findOne({
            where: {
                token: userToken
            }
        }).then(function(userInfo) {
            ingredientIDs = userInfo.get("ingredients");
            findRecipes(ingredientIDs, res);
        });

    });

    app.get("/api/custom/recipes", function(req, res) {
        var ingredientIDs = req.body.split(";");
        findRecipes(ingredientIDs, res);
        
    });

    app.get("/api/recipes", function(req, res) {
        db.Recipe.findAll({}).then(function(recipes){
            res.json(recipes);
        });
    });

    app.delete("/api/:userToken/fridge", function(req, res) {
        var userToken = req.params.userToken;
        var ingredientID = req.body.id;
        db.User.findOne({
            where: {
                token: userToken
            }
        }).then(function(userInfo){
            var ingredients = userInfo.get("ingredients");
            var idx = ingredients.indexOf(ingredientID);
            if(idx > -1) {
                ingredients.splice(idx, 1);
            }

            userInfo.set("ingredients", ingredients);
            res.json({});
        });
        
    });

    app.post("/api/:userToken/fridge", function(req, res) {
        var userToken = req.params.userToken;
        var ingredientID = req.body.id;
        db.User.findOne({
            where: {
                token: userToken
            }
        }).then(function(userInfo){
            var ingredients = userInfo.get("ingredients");
            userInfo.set("ingredients", ingredients.push(ingredientID));
            res.json({});
        });
        
    });

    app.post("/api/:userToken/recipes", function(req, res) {
        // Add recipe to database with userToken as a foreign key
        var userToken = req.params.userToken;
        var recipeInfo = req.body;


    });

    



    
};
