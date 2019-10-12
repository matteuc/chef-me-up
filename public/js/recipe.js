$(document).ready(function () {
    var userToken = $("#userToken").attr("data-token");
    var loginAlertFavorites = Handlebars.templates.loginAlert({ message: "Sign in to save a recipe to your Favorites!" });
    var recipeID = $("#favorite-btn").attr("data-id");

    var FAVORITES_PATH;
    if (userToken) {
        FAVORITES_PATH = `/api/${userToken}/favorites/id-list`;
        $.get(FAVORITES_PATH, function (data) {
            var favorites = data;
            //  MARK FAVORITE BUTTON IF USER HAS FAVORITED THIS RECIPE
            if (favorites.includes(recipeID)) {
                // Change favorite button appearance
                $("#favorite-btn").attr("data-favorite", "true");
                $("#favorite-btn").removeClass("far");
                $("#favorite-btn").addClass("fas");
            }
        })

    }

    $(document).on("click", "#favorite-btn", function () {
        var isFavorite = $(this).attr("data-favorite");

        if (userToken) {

            if (isFavorite == "true") {
                // Change favorite button appearance
                $(this).attr("data-favorite", "false");
                $(this).removeClass("fas");
                $(this).addClass("far");

                // Make an API DELETE request 
                $.ajax({
                    url: `/api/${userToken}/favorites`,
                    type: "DELETE",
                    data: {
                        id: recipeID
                    }
                });

            }
            else {
                // Change favorite button appearance
                $(this).attr("data-favorite", "true");
                $(this).removeClass("far");
                $(this).addClass("fas");

                // Make an API POST request 
                $.ajax({
                    url: `/api/${userToken}/favorites`,
                    type: "POST",
                    data: {
                        id: recipeID
                    }
                });
            }

        } else {
            // show bootbox alert
            bootbox.alert({
                message: loginAlertFavorites,
                centerVertical: true,
                backdrop: true,
                closeButton: false
            });
        }
    });

    // CHANGE PAGE TITLE
    var rName = $("#r-name").text();
    $("title").text(`${rName} | chefMEup`);

});