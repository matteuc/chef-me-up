$(document).ready(function () {
  var loginAlert = Handlebars.templates.loginAlert({ message: "Sign in to view your favorites!" });
  var userToken = $("#userToken").attr("data-token");
  var favoritesContent = $("#favorites-content");
  var noFavMsg = $("#no-fav-msg");
  var FAVORITES_PATH;
  if(userToken) {
    FAVORITES_PATH = `/api/${userToken}/favorites`;
  }

  function loadFavorites() {
    function renderFavorites(favorites) {
      favoritesContent.empty();
      noFavMsg.show();
      if (favorites.length !== 0) {
        noFavMsg.hide();
        $.each(favorites, function (idx, favorite) {

          var favoritePartial = Handlebars.templates.favorite(favorite);
          favoritesContent.append(favoritePartial);

        })
      }
    }

    if (userToken) {
      $.get(FAVORITES_PATH, function (data) {
        var favorites = data;
        renderFavorites(favorites);
    })

    } else {
      noFavMsg.show();
      bootbox.alert({
        message: loginAlert,
        centerVertical: true,
        closeButton: false
      });
    }

  }



  $(document).on("click", ".favorite-btn", function () {
    var recipeID = $(this).attr("data-id");

    // Mark ingredient block as unchecked
    $(`.favorite-block[data-id="${recipeID}"]`).remove();

    if (userToken) {
      // Make an API DELETE request 
      $.ajax({
        url: `/api/${userToken}/favorites`,
        type: "DELETE",
        data: {
          id: recipeID
        }
      });

    }
  });

  loadFavorites();
});
