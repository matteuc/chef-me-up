// Load Ingredient Select Form
var igSelection = $("#ingredient-selection-content");
var emptyMsg = $("no-ig-msg").show();
var igCatalog = {};

function hideAll() {
    $(".ingredient-block").hide();
}

$.get("/api/ingredients", function (data) {
    var ingredients = data;

    if (ingredients.length) {
        igSelection.empty();
    } else {
        emptyMsg.show();
    }

    $.each(ingredients, function (idx, ingredient) {
        var ingredientInfo = {
            id: ingredient.id,
            name: ingredient.name,
            isForm: true
        };

        igCatalog[ingredient.name.toLowerCase()] = ingredient.id;

        var ingredientPartial = Handlebars.templates.ingredient(ingredientInfo);
        igSelection.append(ingredientPartial);
    });

    hideAll();
});

$("#ig-search-input").on('input', function () {
    var igInput = $(this).val();
    hideAll();
    $("#ig-search-error").hide();

    if (igInput == "") {
        hideAll();
        return;
    }

    for (i in igCatalog) {
        if (i.includes(igInput.toLowerCase())) {
            $(`.ingredient-block[data-id="${igCatalog[i]}"]`).show();
        }
    }

    if ($(".ingredient-block:visible").length == 0) {
        $("#error-ig-name").text(igInput);
        $("#ig-search-error").show();
    }

})

$(document).on("click", ".ig-select-btn", function () {
    var igId = $(this).attr("data-id");
    var igName = $(this).attr("data-name");
    var currFormId = $("#ingredient-selection").attr("data-formId");
    $(`#${currFormId}`).attr("placeholder", igName);
    $("#ingredient-selection").fadeOut();
    // HIDE SEARCH BAR
    $("#ig-search").hide();
    $(".modal-footer .btn-success").show();
    $("#main-form").fadeIn();
    // CLEAR SEARCH INPUT
    hideAll();
    $("#ig-search-input").val("");
    $("#ig-search-error").hide();

})