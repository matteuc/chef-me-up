/* eslint-disable indent */
/* eslint-disable prettier/prettier */
var db = require("../models");

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

    function findRecipes(ingredientIDs, res) {
        // Find recipes that match ingredientIDs
        db.RecipeIngredient.findAll({
            where: {
                $or: [{
                    ingredientId: ingredientIDs
                }]
            }
        }).then(function (recipeIngredients) {
            var recipeMatches = {};
            function RecipeMatch(name, id, numMatches, matches) {
                this.name = name;
                this.id = id;
                this.numMatches = numMatches;
                this.matches = matches;
            }

            for (var idx = 0; idx < recipeIngredients.length; idx++) {
                var ri = recipeIngredients[idx];
                var formalIngredientName = titleCase(ri.ingredientName);
                var formalRecipeName = titleCase(ri.recipeName);

                var match;

                // If the recipe has already been seen
                if (recipeMatches[ri.recipeId]) {
                    match = recipeMatches[ri.recipeId];
                }
                // If the recipe has not been seen yet   
                else {
                    match = new RecipeMatch(formalRecipeName, ri.recipeId, 0, []);
                }

                match.numMatches++;
                newMatch.matches.push({ ingredientName: formalIngredientName });
                recipeMatches[ri.recipeId] = match;
            }

            res.json(recipeMatches);
        });

    }

    // GET route for getting all of ingredients by category 
    app.get("/api/ingredients", function (req, res) {
        db.Ingredient.findAll({}).then(function (ingredients) {
            res.json(ingredients);
        });
    });

    app.get("/api/:userToken/fridge", function (req, res) {
        var userToken = req.params.userToken;
        var ingredientIDs;
        db.User.findOne({
            where: {
                token: userToken
            }
        }).then(function (userInfo) {
            ingredientIDs = userInfo.ingredients.split(";");
            res.json(ingredientIDs);
        });
    });

    app.get("/api/:userToken/recipes", function (req, res) {
        var userToken = req.params.userToken;
        db.User.findOne({
            where: {
                token: userToken
            }
        }).then(function (userInfo) {
            ingredientIDs = userInfo.ingredients.split(";");
            findRecipes(ingredientIDs, res);
        });

    });

    app.get("/api/custom/recipes", function (req, res) {
        var ingredientIDs = req.body.split(";");
        findRecipes(ingredientIDs, res);

    });

    app.get("/api/recipes", function (req, res) {

        db.Recipe.findAll({}).then(function (recipes) {
            res.json(recipes);
        });

    });

    app.delete("/api/:userToken/fridge", function (req, res) {
        var userToken = req.params.userToken;
        var ingredientID = req.body.id;
        db.User.findOne({
            where: {
                token: userToken
            }
        }).then(function (userInfo) {
            var ingredients = userInfo.ingredients.split(";");
            var idx = ingredients.indexOf(ingredientID);
            if (idx > -1) {
                ingredients.splice(idx, 1);
            }

            db.User.update({
                ingredients: ingredients.join(";")
            },
                {
                    where: {
                        token: userToken
                    }
                });
            res.json({});
        });

    });

    app.post("/api/:userToken/fridge", function (req, res) {
        var userToken = req.params.userToken;
        var ingredientID = req.body.id;
        db.User.findOne({
            where: {
                token: userToken
            }
        }).then(function (userInfo) {

            var ingredients = userInfo.ingredients.split(";");
            ingredients.push(ingredientID);
            var product = ingredients.join(";");

            db.User.update({
                ingredients: product
            }, {
                where: {
                    token: userToken
                }
            }).then(function () {

                res.json({});
            });
        });

    });

    app.post("/api/:userToken/recipes", function (req, res) {
        // Add recipe to database with userToken as a foreign key
        var userToken = req.params.userToken;
        var recipeInfo = JSON.parse(req.body.info);
        recipeInfo.UserToken = userToken;
        var ingredients = JSON.parse(req.body.ingredients);
        db.Recipe.create(recipeInfo).then(function (newRecipe) {
            var recipeID = newRecipe.id;

            // 
            // Add RecipeIngredient's to Database 
            // 
            db.Ingredient.findAll({}).then(function (existingIngredients) {

                // Get all current Ingredient's and create searchup object
                var igCatalog = {};
                for (eIngredient of existingIngredients) {
                    igCatalog[eIngredient.name] = eIngredient;
                }

                // Initialize an array to store all  RecipeIngredients "recipeIngredients"
                var recipeIngredients = [];
                // Initialize an array to store all uncreated Ingredients "newIngredients"
                var newIngredients = [];
                var newIngredientNames = [];

                // iterate through "ingredients" and assign to "oldIngredients" and  "newIngredients" as appropriate
                for (i of ingredients) {
                    // If ingredient already exists in the database
                    if (igCatalog[i.name.toLowerCase()]) {
                        i.ingredientId = igCatalog[i.name.toLowerCase()].id;
                        i.recipeId = recipeID;
                        recipeIngredients.push(i);
                    }
                    // If ingredient does not exist yet
                    else {
                        i.recipeId = recipeID;
                        newIngredients.push(i);
                        newIngredientNames.push({ name: i.name.toLowerCase() });
                    }
                }
                // Bulk create newIngredients in Ingredient Table

                db.Ingredient.bulkCreate(newIngredientNames).then(function (arr) {
                    for (var idx = 0; idx < newIngredients.length; i++) {
                        newIngredients[idx].ingredientId = arr[idx].id;
                    }
                    // Then bulk create all ingredients in RecipeIngredientTable
                    recipeIngredients.concat(newIngredients);
                    db.RecipeIngredient.create(recipeIngredients).then(function (data) {
                        res.json(data);
                    })
                });
            })

        })

    });

};
