/* eslint-disable indent */
/* eslint-disable prettier/prettier */
var db = require("../models");
var cuisines = require("../data/cuisines.json");

module.exports = function (app) {
    // Get all current Ingredient's and create searchup object
    var igCatalog;
    db.Ingredient.findAll({}).then(function (existingIngredients) {

        // Get all current Ingredient's and create searchup object
        igCatalog = {};
        for (eIngredient of existingIngredients) {
            igCatalog[eIngredient.name] = eIngredient;
        }
    });

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

    var associationMade = false;
    function findRecipes(ingredientIDs, res) {
        // Generate associations
        if(!associationMade) {

            db.Recipe.hasMany(db.RecipeIngredient, {
                foreignKey: "",
                as: "ri"
            });
    
            db.Ingredient.hasMany(db.RecipeIngredient, {
                foreignKey: "",
                as: "i"
            });
            associationMade = true;
        }

        // Find recipes that match ingredientIDs
        db.Recipe.findAll({
            include: [{
                    model: db.RecipeIngredient,
                    as: "ri",
                    required: true,
                    attributes: [],
                    where: {
                        ingredientId: ingredientIDs
                    },
                },
                {
                    model: db.Ingredient,
                    as: "Ingredients",
                    required: true,
                },
            ]
        }).then(function (recipeMatches) {
            var recipes = [];
            for (r of recipeMatches) {
                var recipeItem = {
                    id: r.id,
                    name: r.name,
                    numMatches: r.Ingredients.length
                }

                var ingredientMatches = [];
                for (i of r.Ingredients) {
                    var ingredientMatch = {
                        ingredientName: titleCase(i.name)
                    }
                    ingredientMatches.push(ingredientMatch);
                }

                recipeItem.matches = ingredientMatches;
                recipes.push(recipeItem);
            }

            res.json(recipes);
        });

    }

    // GET route for getting all of ingredients by category 
    app.get("/api/ingredients/:id?", function (req, res) {
        var id = req.params.id;
        if (id) {
            db.Ingredient.findOne({
                where: {
                    id: id
                }
            }).then(function (ingredient) {
                ingredient.name = titleCase(ingredient.name);
                res.json(ingredient);
            });
        } else {
            db.Ingredient.findAll({}).then(function (ingredients) {
                for(var idx = 0; idx < ingredients.length; idx++) {
                    ingredients[idx].name = titleCase(ingredients[idx].name);
                }

                res.json(ingredients);
            });
        }
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

    app.get("/api/custom/recipes", function (req, res) {
        var ingredientIDs = req.query.ingredientsStr.split(";");
        findRecipes(ingredientIDs, res);

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


    app.get("/api/recipes", function (req, res) {

        db.Recipe.findAll({}).then(function (recipes) {
            res.json(recipes);
        });

    });

    app.get("/api/cuisines", function (req, res) {
        res.json(cuisines);
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
            }, {
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
            var recipeName = newRecipe.name;

            // 
            // Add RecipeIngredient's to Database 
            // 

            // Initialize an array to store all  RecipeIngredients "recipeIngredients"
            var recipeIngredients = [];
            // Initialize an array to store all uncreated Ingredients "newIngredients"
            var newIngredientNames = [];

            // iterate through "ingredients" and assign to "oldIngredients" and  "newIngredients" as appropriate
            for (i of ingredients) {
                // If ingredient already exists in the database
                var lowerName = i.name.toLowerCase();
                if (igCatalog[lowerName]) {
                    i.ingredientId = igCatalog[lowerName].id;
                    i.recipeId = recipeID;
                    i.recipeName = recipeName;
                    i.ingredientName = lowerName;
                    recipeIngredients.push(i);
                }
                // If ingredient does not exist yet
                else {
                    newIngredientNames.push({
                        name: i.name.toLowerCase()
                    });
                }
            }

            // Bulk create RecipeIngredient Table
            db.RecipeIngredient.bulkCreate(recipeIngredients).then(function (data) {
                res.json({
                    added: data,
                    notAdded: newIngredientNames
                });
            })

        })

    });

};