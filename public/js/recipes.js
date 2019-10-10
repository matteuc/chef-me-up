$(document).ready(function () {
    var loginAlertRecipes = Handlebars.templates.loginAlert({
        message: "To add your own recipes, please login:"
    });
    var cuisineList;
    var addRecipeForm;
    // API REQUEST TO GET CUISINES
    $.get("/api/cuisines", function (data) {
        cuisineList = data;
        addRecipeForm = Handlebars.templates.addRecipeForm({
            cuisines: cuisineList
        });
    })

    var newIngredientList = $("#new-ingredient-list");
    var ingredientIdx = 0;
    var newInstructionList = $("#new-instruction-list");
    var instructionIdx = 0;


    var USER_RECIPES_PATH;
    var ALL_RECIPES_PATH = "/api/recipes";
    var CUSTOM_RECIPES_PATH = "/api/custom/recipes";
    var ingredientOnly = true;
    var userTokenElement = $("#userToken");
    var userToken;
    var igCatalog = {};
    if (userTokenElement) {
        userToken = userTokenElement.attr("data-token");
        USER_RECIPES_PATH = `/api/${userToken}/recipes`;
    }
    var recipesContent = $("#recipes-content");
    var noRecipesMsg = $("#no-recipes-msg");

    function loadRecipes() {
        function compareFn(a, b) {
            if (a.numMatches < b.numMatches) {
                return 1;
            } else if (a.numMatches > b.numMatches) {
                return -1;
            } else {
                return 0;
            }

        }

        function renderRecipes(recipes) {
            recipesContent.empty();
            noRecipesMsg.show();
            if (recipes.length) {
                noRecipesMsg.hide();
                // Sort recipes according to number of matches
                recipes = recipes.sort(compareFn);
                $.each(recipes, function (idx, recipe) {

                    var recipePartial = Handlebars.templates.recipeItem(recipe);
                    recipesContent.append(recipePartial);

                })
            }
        }
        // If user only want to return recipes that matches their ingredients
        if (ingredientOnly) {

            if (userToken) {
                $.get(USER_RECIPES_PATH, function (res) {
                    var recipes = res;
                    renderRecipes(recipes);
                })

            } else {
                // Make an API request based on the locally stored ingredients list
                var ingredients = localStorage.getItem("ingredients");
                if (ingredients) {
                    $.get(CUSTOM_RECIPES_PATH, {
                        ingredientsStr: ingredients
                    }, function (res) {
                        var recipes = res;
                        renderRecipes(recipes);
                    })
                } else {
                    recipesContent.empty();
                    noRecipesMsg.show();
                }
            }
        }
        // If user wants to return all recipes in the database
        else {
            $.get(ALL_RECIPES_PATH, function (data) {
                var recipes = data;
                renderRecipes(recipes);
            })
        }

    }

    $("#recipes-toggle").click(function () {
        ingredientOnly = !ingredientOnly;
        loadRecipes();
    })

    $("#add-recipe-btn").click(function (e) {
        function checkError() {
            // PERFORM ERROR VALIDATION
            // Show popovers over appropriate input fields
            // REQUIRED FIELDS:

            // NAME 
            // SERVING SIZE
            // PREP TIME
            // COOK TIME

            // FILL IN POPOVER MESSAGES

            // IF CUISINE SELECTED IS THE DEFAULT, SET THE VALUE OF THIS FIELD TO NULL
            // CHECK TO SEE IF AT LEAST ONE INGREDIENT IS ENTERED
            // CHECK TO SEE IF AT LEAST ONE INSTRUCTION IS ENTERED
            // REMOVE ALL THE INGREDIENTS THAT HAVE THE DEFAULT PLACEHOLDER VALUE
            return true;
        }

        e.preventDefault();
        if (userToken) {
            
            // Show Bootbox Modal to prompt recipe creation
            var formPrompt = bootbox.dialog({
                message: addRecipeForm,
                centerVertical: true,
                closeButton: false,
                buttons: [{
                    label: "Cancel",
                    className: "btn btn-secondary",
                    callback: function () {}
                }, {
                    label: "Add Recipe!",
                    className: "btn btn-success",
                    callback: function () {
                        if (checkError()) {

                            formPrompt.modal('hide');
                        }

                        return false;
                    }
                }],
                callback: function (response) {
                    // RETRIEVE ALL RECIPE INFORMATION
                    var recipeName = $("#new-recipe-name").val().trim();
                    var recipeDescription = $("#new-recipe-description").val().trim();
                    var recipeCuisine = $("#new-recipe-cuisine").val().trim();
                    var recipeServing = $("#new-recipe-serving").val();
                    var recipePrep = $("#new-recipe-prep").val();
                    var recipeCook = $("#new-recipe-cook").val();

                    // GET ALL INGREDIENTS
                    var recipeIngredients = [];
                    for (var i = 0; i <= ingredientIdx; i++) {
                        var iName = $(`#new-recipe-ingredient-name-${i}`).attr("placeholder");
                        var iQuantity = $(`#new-recipe-ingredient-quantity-${i}`).val();
                        var iUnit = $(`#new-recipe-ingredient-unit-${i}`).val();

                        if (!(iName == "" || iName == null || iQuantity == null || isNaN(iQuantity) || iQuantity == 0)) {
                            var newIngredient = {
                                name: iName,
                                quantity: iQuantity,
                                unit: iUnit
                            };
                            recipeIngredients.push(newIngredient);
                        }
                    }

                    // GET ALL INSTRUCTIONS
                    var recipeInstructions = [];
                    for (var i = 0; i <= instructionIdx; i++) {
                        var value = $(`#new-recipe-instruction-${i}`).val();
                        if (!(value == "" || value == null)) {
                            recipeInstructions.push($(`#new-recipe-instruction-${i}`).val());
                        }
                    }

                    ingredientIdx = 0
                    instructionIdx = 0;
                    recipeInstructions = recipeInstructions.join(";");

                    var recipeInfo = {
                        name: recipeName,
                        description: recipeDescription,
                        prepTime: recipePrep,
                        cookTime: recipeCook,
                        servingSize: recipeServing,
                        cuisine: recipeCuisine,
                        instructions: recipeInstructions
                    };

                    // ADD RECIPE TO DATABASE 
                    $.ajax({
                        url: `/api/${userToken}/recipes`,
                        type: "POST",
                        data: {
                            info: JSON.stringify(recipeInfo),
                            ingredients: JSON.stringify(recipeIngredients)
                        },
                        success: function (res) {
                            loadRecipes();
                        }
                    })

                    formPrompt.modal('hide');
                }


            })

        } else {
            bootbox.alert({
                message: loginAlertRecipes,
                centerVertical: true,
                closeButton: false
            })
        }
    })

    $(document).on("click", "#add-recipe-ingredient-btn", function () {
        ingredientIdx++;
        var newIngredientForm = Handlebars.templates.newRecipeIngredient({
            idx: ingredientIdx
        });

        $("#new-ingredient-list").append(newIngredientForm);
    })

    $(document).on("click", "#add-recipe-instruction-btn", function () {
        instructionIdx++;
        var newInstructionForm = Handlebars.templates.newRecipeInstruction({
            num: instructionIdx + 1,
            idx: instructionIdx
        });
        $("#new-instruction-list").append(newInstructionForm);

    })

    $(document).on("click", ".delete-ingredient-btn", function () {
        var blockId = $(this).attr("data-id");
        $(`.new-ingredient-block[data-id="${blockId}"`).remove();
        ingredientIdx--;
    })

    $(document).on("click", ".delete-instruction-btn", function () {
        var blockId = $(this).attr("data-id");
        $(`.new-instruction-block[data-id="${blockId}"`).remove();
        instructionIdx--;
    })

    $(document).on("click", ".new-recipe-ingredient-name-input", function () {
        $("#main-form").fadeOut();
        $("#ingredient-selection").attr("data-formId", $(this).attr("id"));
        $("#ig-search").show();
        $("#ingredient-selection").fadeIn();

    });

    // Load recipes when page first loads
    loadRecipes();
});