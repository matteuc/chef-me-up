$(document).ready(function () {
    var loginAlertRecipes = `<div class="text-center">\
    <h5>To add your own recipes, please login:</h5>
    <a href="/auth/google">\
      <img class="img-fluid login-btn" src="images/login-google.png">\
    </a>\
</div>`;
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
    var recipesContent = $("#recipes-content");
    var noRecipesMsg = $("#no-recipes-msg");


    function loadRecipes() {
        function renderRecipes(recipes) {
            recipesContent.empty();
            if(recipes.length) {
                $.each(recipes, function (recipe) {
        
                    var recipePartial = Handlebars.templates.recipeItem(recipe);
                    recipesContent.append(recipePartial);
        
                })
            } else {
                noRecipesMsg.show();
            }
        }
        // If user only want to return recipes that matches their ingredients
        if(ingredientOnly) {

            if (userToken) {
                $.get(USER_RECIPES_PATH, function (res) {
                    var recipes = res;
                    renderRecipes(recipes);
                })
    
            } else {
                // Make an API request based on the locally stored ingredients list
                var ingredients = localStorage.getItem("ingredients");
                if(ingredients) {
                    $.get(CUSTOM_RECIPES_PATH, ingredients, function (res) {
                        var recipes = res;
                        renderRecipes(recipes);
                    })
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
        e.preventDefault();
        if (userToken) {
            // TODO: Show Bootbox Modal to prompt recipe creation
            var recipeInfo = {

            };
            $.ajax({
                url: "/api/recipes",
                type: "POST",
                data: recipeInfo,
                success: function (res) {

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

    // Load recipes when page first loads
    loadRecipes();
});