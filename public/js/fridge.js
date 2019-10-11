$(document).ready(function () {
    var userTokenElement = $("#userToken");
    var userToken;
    if(userTokenElement) {
        userToken = userTokenElement.attr("data-token");
    }
    var fridgeContent = $("#fridge-content");
    var emptyMsg = $("#empty-fridge-msg");

    var igCatalog = {};

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

                igCatalog[ingredient.name.toLowerCase()] = ingredient.id;

                var ingredientPartial = Handlebars.templates.ingredient(ingredientInfo);
                $(ingredientPartial).hide();
                fridgeContent.append(ingredientPartial);

            })
            markIngredients();

        })
    }

    function markIngredients() {
        var addStatus = $("#add-ingredient-btn").attr("data-add");
        $("#sync-fridge-btn").addClass("fa-spin");

        function markIngredientElements(ingredientIDs) {
 
            // Mark the ingredients on the DOM
            $.each(ingredientIDs, function (idx, ingredientID) {
                if(ingredientID !== "") {
                     // Mark ingredient block as unchecked
                    $(`.ingredient-block[data-id="${ingredientID}"]`).attr("data-checked", "true");
                    $(`.ingredient-checkbox[data-id="${ingredientID}"]`).prop('checked', true);
                }
            });
            if(addStatus == "false") {
                hideUnmarked();
                showMarked();
            }
        }

        // If user is signed in, mark fridge items
        if (userToken) {
            $.get(`/api/${userToken}/fridge`, function (data) {
                $("#sync-fridge-btn").removeClass("fa-spin");

                var ingredientIDs = data;
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
            } else {
                hideUnmarked();
                showMarked();
                emptyMsg.show();
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

    function hideAll() {
        $(".ingredient-block").hide();
    }

    function showMarked() {
        $('.ingredient-block[data-checked="true"]').show();
    }

    function hideUnmarked() {
        $('.ingredient-block[data-checked="false"]').hide();

        var numChecked = $('.ingredient-checkbox:checkbox:checked').length;
        if (numChecked == 0) {
            emptyMsg.show();
        } else {
            emptyMsg.hide();
        }
    }

    function showUnmarked() {
        $('.ingredient-block[data-checked="false"]').show();

        var ingredientCheckboxes = $('.ingredient-checkbox:checkbox:not(:checked)');
        if(ingredientCheckboxes.length) {
            emptyMsg.hide();
        }
        
    }

    $("#add-ingredient-btn").click(function (e) {
        e.preventDefault();
        var addStatus = $(this).attr("data-add");
        // Get all ingredient elements that are currently not checked
        if (addStatus == "true") {
            // HIDE SEARCHBAR
            $("#ig-search").hide();
            $("#ig-search-input").val("");
            $("#ig-search-error").hide();

            // If unadded ingredients are currently showing, hide them

            $(this).removeClass("text-danger fa-minus-square")
            $(this).addClass("text-success fa-plus-square")
            $(this).attr("data-add", "false");
            hideUnmarked();
            showMarked();
            
        } else {
            // SHOW SEARCHBAR
            hideAll();
            emptyMsg.hide();
            $("#ig-search").show();
            $("#ig-search-input").focus();

            // If not, show all unadded ingredients
            $(this).removeClass("text-success fa-plus-square")
            $(this).addClass("text-danger fa-minus-square")
            $(this).attr("data-add", "true");
            
        }
    })

    $(document).on("click", ".ingredient-checkbox[type='checkbox']", function () {
        var ingredientID = $(this).attr("data-id");
        var ingredients = localStorage.getItem("ingredients");
        var addStatus = $("#add-ingredient-btn").attr("data-add");

        if ($(this).prop("checked") == false) {
            // Mark ingredient block as unchecked
            $(`.ingredient-block[data-id="${ingredientID}"]`).attr("data-checked", "false");
            if(addStatus == "false") {
                hideUnmarked();
                showMarked();
            }
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
                    localStorage.setItem("ingredients", removeIngredient(ingredientIDs, ingredientID).join(";"));
                }
            }
        } else {
            // Mark ingredient block as checked
            $(`.ingredient-block[data-id="${ingredientID}"]`).attr("data-checked", "true")

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
                    localStorage.setItem("ingredients", addIngredient(ingredientIDs, ingredientID).join(";"));
                } else {
                    localStorage.setItem("ingredients", ingredientID);
                }
            }
        }
    })

    $("#ig-search-input").on('input', function(){
        var igInput = $(this).val();
        hideAll();
        $("#ig-search-error").hide();

        if(igInput == "") {
            hideAll();
            return;
        } 

        for(i in igCatalog) {
            if(i.includes(igInput.toLowerCase())) {
                $(`.ingredient-block[data-id="${igCatalog[i]}"]`).show();
            }
        }

        if($(".ingredient-block:visible").length == 0) {
            $("#error-ig-name").text(igInput);
            $("#ig-search-error").show();
        }

    })

    $("#add-new-ingredient-btn").click(function (e) {
        var newIg = $("#ig-search-input").val().trim();
        $.ajax({
            url: "/api/ingredients",
            type: "POST",
            data: {
                name: newIg.toLowerCase()
            }
        }).then(function(newIg){
            $("#new-ig-msg").fadeIn();
            $("#new-ig-name").text(titleCase(newIg.name));
            setTimeout(function(){ 
                $("#new-ig-msg").fadeOut();
                setTimeout(function(){
                    location.reload();
                },1000);
             }, 3000);
        
        });
    })

    // Load ingredients when page loads
    loadIngredients();
})