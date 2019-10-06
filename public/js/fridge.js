$(document).ready(function () {
    var userTokenElement = $("#userToken");
    var userToken;
    if(userTokenElement) {
        userToken = userTokenElement.attr("data-token");
    }
    var fridgeContent = $("#fridge-content");
    var emptyMsg = $("#empty-fridge-msg");

    function loadIngredients() {

        $.get("/api/ingredients", function (data) {
            var ingredients = data;


            if (ingredients.length) {
                fridgeContent.empty();
            } else {
                emptyMsg.show();
            }

            $.each(ingredients, function (idx, ingredient) {

                var ingredientInfo = {
                    id: ingredient.id,
                    name: ingredient.name
                };

                var ingredientPartial = Handlebars.templates.ingredient(ingredientInfo);
                fridgeContent.append(ingredientPartial);

            })
            markIngredients();
        })
    }

    function markIngredients() {
        function markIngredientElements(ingredientIDs) {
            // Mark the ingredients on the DOM
            $.each(ingredientIDs, function (idx, ingredientID) {
                $(`.ingredient-checkbox[data-id="${ingredientID}"]`).prop('checked', true);
            })
        }

        // If user is signed in, mark fridge items
        if (userToken) {
            $.get(`/api/${userToken}/fridge`, function (res) {
                $("#sync-fridge-btn").removeClass("fa-spin");

                var ingredients = res.data;
                var ingredientIDs = ingredients.split(";");
                markIngredientElements(ingredientIDs);

            })

        }
        // If not, use local storage
        else {
            $("#sync-fridge-btn").removeClass("fa-spin");

            var ingredients = localStorage.getItem("ingredients");
            if (ingredients) {
                var ingredientIDs = ingredients.split(";");
                markIngredientElements(ingredientIDs);

            }
        }
    }

    function addIngredient(arr, id) {
        arr.push(id);
        return arr;
    }

    function removeIngredient(arr, id) {
        var idx = arr.indexOf(id);
        if (idx > -1) {
            arr.splice(idx, 1);
         }

         return arr;
    }

    $("#sync-fridge-btn").click(function (e) {
        e.preventDefault();
        markIngredients();
    })

    $("#add-ingredient-btn").click(function (e) {
        e.preventDefault();
        var addStatus = $(this).attr("data-add");
        // Get all ingredient elements that are currently not checked
        var ingredientCheckboxes = $('.ingredient-checkbox:checkbox:not(:checked)');
        if (addStatus == "true") {
            // If unadded ingredients are currently showing, hide them
            $.each(ingredientCheckboxes, function (idx, ingredientCheckbox) {
                ingredientCheckbox.parent().hide();
            })
            $(this).removeClass("text-danger fa-minus-square")
            $(this).addClass("text-success fa-plus-square")
            $(this).attr("data-add", "false");
        } else {
            // If not, show all unadded ingredients
            $.each(ingredientCheckboxes, function (idx, ingredientCheckbox) {
                ingredientCheckbox.parent().show();
            })
            $(this).removeClass("text-success fa-plus-square")
            $(this).addClass("text-danger fa-minus-square")
            $(this).attr("data-add", "true");
        }
    })

    $(".ingredient-checkbox[type='checkbox']").click(function () {
        var ingredientID = $(this).attr("data-id");
        var ingredients = localStorage.getItem("ingredients");
        if ($(this).prop("checked") == true) {
            if (userToken) {
                // Make an API DELETE request 
                $.ajax({
                    url: `/api/${userToken}/fridge`,
                    type: "DELETE",
                    data: {
                        id: ingredientID
                    }
                });

            } else {
                // Remove ingredient from localStorage
                if (ingredients) {
                    var ingredientIDs = ingredients.split(";");
                    localStorage.setItem("ingredients", JSON.stringify(removeIngredient(ingredientIDs, ingredientID)));
                }
            }
        } else {
            if (userToken) {
                // Make an API POST request 
                $.ajax({
                    url: `/api/${userToken}/fridge`,
                    type: "POST",
                    data: {
                        id: ingredientID
                    }
                });

            } else {
                // Add ingredient to localStorage
                if (ingredients) {
                    var ingredientIDs = ingredients.split(";");
                    localStorage.setItem("ingredients", JSON.stringify(addIngredient(ingredientIDs, ingredientID)));
                }
            }
        }
    })

    // Load ingredients when page loads
    // loadIngredients()
    emptyMsg.show();

})