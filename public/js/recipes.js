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

    var ingredientIdx = 0;
    var instructionIdx = 0;


    var USER_RECIPES_PATH;
    var ALL_RECIPES_PATH = "/api/recipes";
    var CUSTOM_RECIPES_PATH = "/api/custom/recipes";
    var ingredientOnly = true;
    var userTokenElement = $("#userToken");
    var userToken;
    if (userTokenElement) {
        userToken = userTokenElement.attr("data-token");
        USER_RECIPES_PATH = `/api/${userToken}/recipes`;
    }
    var rCatalog = [];
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
            rCatalog = [];
            noRecipesMsg.show();
            if (recipes.length) {
                noRecipesMsg.hide();
                // Sort recipes according to number of matches
                recipes = recipes.sort(compareFn);
                $.each(recipes, function (idx, recipe) {

                    var recipePartial = Handlebars.templates.recipeItem(recipe);
                    recipesContent.append(recipePartial);
                    rCatalog.push(recipe);

                })
                hideAll();
                updateRecipes();
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
        function noErrorFn() {
            var errorCount = 0;

            var NAME_ERROR = "You must provide a name for the recipe.";
            var COOKPREP_ERROR = "You must provide a positive non-zero amount of time.";
            var SERVINGS_ERROR = "You must provide a positive non-zero integer.";
            var INAME_ERROR = "You must provide a name for the ingredient";
            var QUANTITY_ERROR = "You must provide a positive non-zero quantity.";
            var IN_ERROR = "You must provide a description for this instruction.";
            var IG_MIN_ERROR = "You must provide at least one ingredient for this recipe.";
            var IN_MIN_ERROR = "You must provide at least one instruction for this recipe.";

            var rName = $("#new-recipe-name");
            var rServing = $("#new-recipe-serving");
            var rCook = $("#new-recipe-cook");
            var rPrep = $("#new-recipe-prep");

            $(".invalid-input").removeClass("invalid-input");

            // Check if recipe name is empty
            if (rName.val().trim() == "") {
                errorCount++;
                rName.attr("data-content", NAME_ERROR);
                rName.addClass("invalid-input");
                rName.popover();
            }

            // Check if serving size is a decimal or negative or zero
            var rServingSize = rServing.val();
            if (rServingSize <= 0 || rServingSize == null || (rServingSize % 1) !== 0 || isNaN(rServingSize)) {
                errorCount++;
                rServing.attr("data-content", SERVINGS_ERROR);
                rServing.addClass("invalid-input");
                rServing.popover();

            }

            // Check if cooking time is negative or zero or empty
            var rCookTime = rCook.val();
            if (rCookTime <= 0 || rCookTime == null || isNaN(rCookTime) || (rCookTime % 1) !== 0) {
                errorCount++;
                rCook.attr("data-content", COOKPREP_ERROR);
                rCook.addClass("invalid-input");
                rCook.popover();
            }

            // Check if prep time is negative or zero
            var rPrepTime = rPrep.val();
            if (rPrepTime <= 0 || rPrepTime == null || isNaN(rPrepTime) || (rPrepTime % 1) !== 0) {
                errorCount++;
                rPrep.attr("data-content", COOKPREP_ERROR);
                rPrep.addClass("invalid-input");
                rPrep.popover();
            }

            var completeIngredients = 0;
            for (var i = 0; i <= ingredientIdx; i++) {
                var iName = $(`#new-recipe-ingredient-name-${i}`);
                var iQuantity = $(`#new-recipe-ingredient-quantity-${i}`);
                var errorCt = 0;

                if (iName.attr("placeholder") == "Click to add an ingredient!") {
                    errorCt++;
                    iName.attr("data-content", INAME_ERROR);
                    iName.addClass("invalid-input");
                    iName.popover();
                }

                if (iQuantity.val() <= 0 || iQuantity.val() == null || isNaN(iQuantity.val())) {
                    errorCt++;

                    iQuantity.attr("data-content", QUANTITY_ERROR);
                    iQuantity.addClass("invalid-input");
                    iQuantity.popover();
                }

                if (errorCt == 0) {
                    completeIngredients++;
                }

            }

            // CHECK THERE IS AT LEAST ONE COMPLETE INGREDIENT
            if (completeIngredients == 0) {
                errorCount++;
                var firstIg = $("#new-recipe-ingredient-name-0");
                firstIg.attr("data-content", IG_MIN_ERROR);
                firstIg.addClass("invalid-input");
                firstIg.popover("show");
            }

            var completeInstructions = 0;
            for (var j = 0; j <= instructionIdx; j++) {
                var instruction = $(`#new-recipe-instruction-${j}`);
                if (instruction.val().trim() == "") {
                    instruction.attr("data-content", IN_ERROR);
                    instruction.addClass("invalid-input");
                    instruction.popover();
                } else {
                    completeInstructions++;
                }
            }

            // CHECK THERE IS AT LEAST ONE COMPLETE INSTRUCTION
            if (completeInstructions == 0) {
                errorCount++;
                var firstIn = $("#new-recipe-instruction-0");
                firstIn.attr("data-content", IN_MIN_ERROR);
                firstIn.addClass("invalid-input");
                firstIn.popover("show");
            }

            if (errorCount == 0) {
                return true;
            } else {
                return false;

            }
        }

        function addRecipe() {
            // RETRIEVE ALL RECIPE INFORMATION
            var recipeName = $("#new-recipe-name").val().trim();
            var recipeDescription = $("#new-recipe-description").val().trim();
            var recipeCuisine = $("#new-recipe-cuisine").val().trim();
            var recipeServing = $("#new-recipe-serving").val();
            var recipePrep = $("#new-recipe-prep").val();
            var recipeCook = $("#new-recipe-cook").val();

            if (recipeCuisine == "Choose...") {
                recipeCuisine = "General";
            }

            // GET ALL INGREDIENTS
            var recipeIngredients = [];
            for (var i = 0; i <= ingredientIdx; i++) {
                var iName = $(`#new-recipe-ingredient-name-${i}`).attr("placeholder");
                var iQuantity = $(`#new-recipe-ingredient-quantity-${i}`).val();
                var iUnit = $(`#new-recipe-ingredient-unit-${i}`).val();

                var newIngredient = {
                    name: iName,
                    quantity: iQuantity,
                    unit: iUnit
                };
                recipeIngredients.push(newIngredient);

            }

            // GET ALL INSTRUCTIONS
            var recipeInstructions = [];
            for (var i = 0; i <= instructionIdx; i++) {
                var value = $(`#new-recipe-instruction-${i}`).val();
                recipeInstructions.push(value);
            }

            ingredientIdx = 0
            instructionIdx = 0;
            recipeInstructions = recipeInstructions.join(";*;");

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
                    callback: function () { }
                }, {
                    label: "Add Recipe!",
                    className: "btn btn-success",
                    callback: function () {
                        if (noErrorFn()) {
                            addRecipe();
                            formPrompt.modal('hide');
                        }
                        
                        return false;
                    }
                }],
                onEscape: true,
                backdrop: true
            })

        } else {
            bootbox.alert({
                message: loginAlertRecipes,
                centerVertical: true,
                backdrop: true,
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
        $(`#new-recipe-ingredient-name-${blockId}`).popover("hide");
        $(`#new-recipe-ingredient-quantity-${blockId}`).popover("hide");
        $(`#new-recipe-ingredient-unit-${blockId}`).popover("hide");

        $(`.new-ingredient-block[data-id="${blockId}"`).remove();
        ingredientIdx--;
    })

    $(document).on("click", ".delete-instruction-btn", function () {
        var blockId = $(this).attr("data-id");
        $(`#new-recipe-instruction-${blockId}`).popover("hide");
        $(`.new-instruction-block[data-id="${blockId}"`).remove();
        instructionIdx--;
    })

    $(document).on("click", ".new-recipe-ingredient-name-input", function () {
        $("#main-form").fadeOut();
        $("#ingredient-selection").attr("data-formId", $(this).attr("id"));
        $('.popover').remove();
        $(".modal-footer .btn-success").hide();
        $("#ig-search").show();
        $("#ingredient-selection").fadeIn();
        $("#ig-search-input").focus();
    });

    function hideAll() {
        $(".recipe-block").hide();
    }

    function showAll() {
        $(".recipe-block").hide();
    }

    function updateRecipes() {
        var rQuery = $("#r-search-input").val().trim();
        var rCuisine = $("#recipe-cuisine").val();
        if(!ingredientOnly) {
            hideAll();
        } else {
            showAll();
        }

        $("#r-search-error").hide();

        if(rQuery == "") {
            return;
        } 
    
        for(r of rCatalog) {
            var matchesQuery = r.name.toLowerCase().includes(rQuery.toLowerCase());
            var matchesCuisine = (rCuisine == r.cuisine) || (rCuisine == "All")
            
            if( !ingredientsOnly && matchesQuery && matchesCuisine ) {
                $(`.recipe-block[data-id="${r.id}"]`).show();
            } else if( ingredientsOnly && matchesQuery && matchesCuisine ) {
                $(`.recipe-block[data-id="${r.id}"]`).hide();
            }
        }

        if($(".recipe-block:visible").length == 0 && rQuery !== "") {
            $("#error-r-cuisine").text(rCuisine);
            $("#error-r-name").text(rQuery);
            $("#r-search-error").show();
        }
    }
    $("#r-search-input").on('input', function(){
        updateRecipes()
    });

    $("#recipe-cuisine").change( function(){
        updateRecipes()
    });


    $("#ig-search").show();
    // Load recipes when page first loads
    loadRecipes();
});