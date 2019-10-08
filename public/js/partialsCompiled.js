(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['addRecipeForm'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<form>\r\n\r\n    <div class=\"form-group\">\r\n        <label for=\"new-recipe-name\">Name</label>\r\n        <input type=\"text\" class=\"form-control\" id=\"new-recipe-name\">\r\n    </div>\r\n    <div class=\"form-group\">\r\n        <label for=\"new-recipe-description\">Description <span class=\"text-muted\">(optional)</span></label>\r\n        <textarea class=\"form-control\" id=\"new-recipe-description\" rows=\"3\"></textarea>\r\n    </div>\r\n    <div class=\"form-group\">\r\n        <label for=\"new-recipe-cuisine\">Cuisine</label>\r\n        <select id=\"new-recipe-cuisine\" class=\"form-control\">\r\n            <option selected>Choose...</option>\r\n            <option>...</option>\r\n        </select>\r\n    </div>\r\n    <div class=\"form-row\">\r\n        <div class=\"form-group col-sm-4\">\r\n            <label for=\"new-recipe-serving\">Serving Size</label>\r\n            <input type=\"number\" class=\"form-control\" id=\"new-recipe-serving\">\r\n\r\n        </div>\r\n        <div class=\"form-group col-sm-4\">\r\n            <label for=\"new-recipe-prep\">Prep. Time <span class=\"text-muted\">(min.)</span></label>\r\n            <input type=\"number\" class=\"form-control\" id=\"new-recipe-prep\">\r\n\r\n        </div>\r\n        <div class=\"form-group col-sm-4\">\r\n            <label for=\"new-recipe-cook\">Cook Time <span class=\"text-muted\">(min.)</span></label>\r\n            <input type=\"number\" class=\"form-control\" id=\"new-recipe-cook\">\r\n        </div>\r\n    </div>\r\n    <hr>\r\n    <h4> Ingredients </h4>\r\n    <div class=\"form-row\">\r\n        <div id=\"new-ingredient-list\">\r\n            <div class=\"new-ingredient-block form-row\">\r\n                <div class=\"form-group col-sm-6\">\r\n                    <label for=\"new-recipe-ingredient-name-0\">Name</label>\r\n                    <input type=\"text\" class=\"form-control\" id=\"new-recipe-ingredient-name-0\">\r\n                </div>\r\n                <div class=\"form-group col-sm-3\">\r\n                    <label for=\"new-recipe-ingredient-quantity-0\">Quantity</label>\r\n                    <input type=\"number\" class=\"form-control\" id=\"new-recipe-quantity-0\">\r\n                </div>\r\n                <div class=\"form-group col-sm-3\">\r\n                    <label for=\"new-recipe-ingredient-unit-0\">Unit</label>\r\n                    <select id=\"new-recipe-ingredient-unit-0\" class=\"form-control\">\r\n                        <option selected>tsp</option>\r\n                        <option>tbsp</option>\r\n                        <option>oz</option>\r\n                        <option>lb</option>\r\n                        <option>g</option>\r\n                        <option>kg</option>\r\n                        <option>cup(s)</option>\r\n                        <option>mL</option>\r\n                    </select>\r\n                </div>\r\n            </div>\r\n        </div>\r\n\r\n        <button type=\"button\" id=\"add-recipe-ingredient-btn\" class=\"btn btn-success btn-lg btn-block\">Add\r\n            Ingredient&nbsp;&nbsp;<i class=\"fas fa-plus-circle fa-sm\"></i></button>\r\n    </div>\r\n    <hr>\r\n    <h4> Instructions </h4>\r\n    <div class=\"form-row\">\r\n        <div id=\"new-instruction-list\" class=\"container\">\r\n            <div class=\"new-instruction-block row\">\r\n                <div class=\"col-sm-1\" style=\"padding-top: 5px\">\r\n                    <strong>1.</strong>\r\n                </div>\r\n                <div class=\"form-group col-sm-11\">\r\n                    <input type=\"text\" class=\"form-control\" id=\"new-recipe-instruction-0\">\r\n                </div>\r\n            </div>\r\n        </div>\r\n\r\n        <button type=\"button\" id=\"add-recipe-instruction-btn\" class=\"btn btn-info btn-lg btn-block\">Add\r\n            Instruction&nbsp;&nbsp;<i class=\"fas fa-plus-circle fa-sm\"></i></button>\r\n    </div>\r\n</form>";
},"useData":true});
templates['ingredient'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=container.propertyIsEnumerable, alias2=depth0 != null ? depth0 : (container.nullContext || {}), alias3=container.hooks.helperMissing, alias4="function", alias5=container.escapeExpression;

  return "<li class=\"ingredient-block list-group-item\" data-id=\""
    + alias5(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias3),(typeof helper === alias4 ? helper.call(alias2,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" >\r\n    <div class=\"d-flex justify-content-between align-items-center\">\r\n        <span class=\"font-weight-bold text-muted\">"
    + alias5(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias3),(typeof helper === alias4 ? helper.call(alias2,{"name":"name","hash":{},"data":data}) : helper)))
    + "</span>\r\n        <div class=\"text-center\">\r\n            <input type=\"checkbox\" class=\"ingredient-checkbox form-check-input\" data-id=\""
    + alias5(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias3),(typeof helper === alias4 ? helper.call(alias2,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">\r\n        </div>\r\n    </div>\r\n</li>";
},"useData":true});
templates['loginAlert'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=container.propertyIsEnumerable;

  return "<div class=\"text-center\">\r\n    <h5>"
    + container.escapeExpression(((helper = (helper = helpers.message || (depth0 != null ? depth0.message : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"message","hash":{},"data":data}) : helper)))
    + "</h5>\r\n    <a href=\"/auth/google\">\r\n      <img class=\"img-fluid login-btn\" src=\"images/login-google.png\">\r\n    </a>\r\n</div>";
},"useData":true});
templates['newRecipeIngredient'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=container.propertyIsEnumerable, alias2=depth0 != null ? depth0 : (container.nullContext || {}), alias3=container.hooks.helperMissing, alias4="function", alias5=container.escapeExpression;

  return "<div class=\"new-ingredient-block form-row\">\r\n    <div class=\"form-group col-sm-6\">\r\n        <label for=\"new-recipe-ingredient-name-"
    + alias5(((helper = (helper = helpers.idx || (depth0 != null ? depth0.idx : depth0)) != null ? helper : alias3),(typeof helper === alias4 ? helper.call(alias2,{"name":"idx","hash":{},"data":data}) : helper)))
    + "\">Name</label>\r\n        <input type=\"text\" class=\"form-control\" id=\"new-recipe-ingredient-name-"
    + alias5(((helper = (helper = helpers.idx || (depth0 != null ? depth0.idx : depth0)) != null ? helper : alias3),(typeof helper === alias4 ? helper.call(alias2,{"name":"idx","hash":{},"data":data}) : helper)))
    + "\">\r\n    </div>\r\n    <div class=\"form-group col-sm-3\">\r\n        <label for=\"new-recipe-ingredient-quantity-"
    + alias5(((helper = (helper = helpers.idx || (depth0 != null ? depth0.idx : depth0)) != null ? helper : alias3),(typeof helper === alias4 ? helper.call(alias2,{"name":"idx","hash":{},"data":data}) : helper)))
    + "\">Quantity</label>\r\n        <input type=\"number\" class=\"form-control\" id=\"new-recipe-quantity-"
    + alias5(((helper = (helper = helpers.idx || (depth0 != null ? depth0.idx : depth0)) != null ? helper : alias3),(typeof helper === alias4 ? helper.call(alias2,{"name":"idx","hash":{},"data":data}) : helper)))
    + "\">\r\n    </div>\r\n    <div class=\"form-group col-sm-3\">\r\n        <label for=\"new-recipe-ingredient-unit-"
    + alias5(((helper = (helper = helpers.idx || (depth0 != null ? depth0.idx : depth0)) != null ? helper : alias3),(typeof helper === alias4 ? helper.call(alias2,{"name":"idx","hash":{},"data":data}) : helper)))
    + "\">Unit</label>\r\n        <select id=\"new-recipe-ingredient-unit-"
    + alias5(((helper = (helper = helpers.idx || (depth0 != null ? depth0.idx : depth0)) != null ? helper : alias3),(typeof helper === alias4 ? helper.call(alias2,{"name":"idx","hash":{},"data":data}) : helper)))
    + "\" class=\"form-control\">\r\n            <option selected>tsp</option>\r\n            <option>tbsp</option>\r\n            <option>oz</option>\r\n            <option>lb</option>\r\n            <option>g</option>\r\n            <option>kg</option>\r\n            <option>cup(s)</option>\r\n            <option>mL</option>\r\n        </select>\r\n    </div>\r\n</div>";
},"useData":true});
templates['newRecipeInstruction'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=container.propertyIsEnumerable, alias2=depth0 != null ? depth0 : (container.nullContext || {}), alias3=container.hooks.helperMissing, alias4="function", alias5=container.escapeExpression;

  return "<div class=\"new-instruction-block row\">\r\n    <div class=\"col-sm-1\" style=\"padding-top: 5px\">\r\n        <strong>"
    + alias5(((helper = (helper = helpers.num || (depth0 != null ? depth0.num : depth0)) != null ? helper : alias3),(typeof helper === alias4 ? helper.call(alias2,{"name":"num","hash":{},"data":data}) : helper)))
    + ".</strong>\r\n    </div>\r\n    <div class=\"form-group col-sm-11\">\r\n        <input type=\"text\" class=\"form-control\" id=\"new-recipe-instruction-"
    + alias5(((helper = (helper = helpers.idx || (depth0 != null ? depth0.idx : depth0)) != null ? helper : alias3),(typeof helper === alias4 ? helper.call(alias2,{"name":"idx","hash":{},"data":data}) : helper)))
    + "\">\r\n    </div>\r\n</div>";
},"useData":true});
templates['recipe'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<style>\r\n    h1 {\r\n        text-align: center;\r\n        font-size: 50px;\r\n\r\n    }\r\n\r\n    h2 {\r\n        font-size: 25px;\r\n    }\r\n\r\n    h3 {\r\n        text-align: center;\r\n    }\r\n\r\n    .recipe-stuff {\r\n        border: 2px solid #F26400;\r\n        border-radius: 15px;\r\n        text-align: center;\r\n        padding: 5px;\r\n\r\n    }\r\n\r\n    .steps-list .list-group-item {\r\n        display: list-item;\r\n    }\r\n</style>\r\n<div class=\"recipeTitle\">\r\n    <h2> Broccoli Soup</h1>\r\n</div>\r\n<br>\r\n<div class=\"container\">\r\n    <div class=\"row recipe-stuff\">\r\n        <div class=\"col-sm\">\r\n            <h2>Yields</h2>\r\n            <div class=\"yields\">\r\n                Serving\r\n            </div>\r\n        </div>\r\n        <div class=\"col-sm\">\r\n            <h2>Prep Time</h2>\r\n            <div class=\"prepTime\">\r\n                Minutes\r\n            </div>\r\n        </div>\r\n        <div class=\"col-sm\">\r\n            <h2>Total Time</h2>\r\n            <div class=\"totalTime\">\r\n                Minutes\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <br>\r\n    <h3>Ingredients</h3>\r\n    <div class=\"listIng\">\r\n        <ul class=\"list-group list-group-flush\">\r\n            <li class=\"list-group-item\">Cras justo odio</li>\r\n            <li class=\"list-group-item\">Dapibus ac facilisis in</li>\r\n            <li class=\"list-group-item\">Morbi leo risus</li>\r\n            <li class=\"list-group-item\">Porta ac consectetur ac</li>\r\n            <li class=\"list-group-item\">Vestibulum at eros</li>\r\n        </ul>\r\n    </div>\r\n    <br>\r\n    <h3>Steps</h3>\r\n    <div class=\"steps-list\">\r\n        <ol class=\"list-group list-group-flush\">\r\n            <li class=\"list-group-item\">Cras justo odio</li>\r\n            <li class=\"list-group-item\">Dapibus ac facilisis in</li>\r\n            <li class=\"list-group-item\">Morbi leo risus</li>\r\n            <li class=\"list-group-item\">Porta ac consectetur ac</li>\r\n            <li class=\"list-group-item\">Vestibulum at eros</li>\r\n        </ol>\r\n    </div>\r\n</div>";
},"useData":true});
templates['recipeItem'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=container.propertyIsEnumerable;

  return "        <li class=\"list-group-item\">"
    + container.escapeExpression(((helper = (helper = helpers.ingredientName || (depth0 != null ? depth0.ingredientName : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"ingredientName","hash":{},"data":data}) : helper)))
    + "</li>\r\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=container.propertyIsEnumerable, alias2=depth0 != null ? depth0 : (container.nullContext || {}), alias3=container.hooks.helperMissing, alias4="function", alias5=container.escapeExpression;

  return "<div class=\"card\">\r\n  <div class=\"card-header d-flex justify-content-between\" id=\"heading-"
    + alias5(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias3),(typeof helper === alias4 ? helper.call(alias2,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" data-toggle=\"collapse\"\r\n    data-target=\"#collapse-"
    + alias5(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias3),(typeof helper === alias4 ? helper.call(alias2,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" aria-expanded=\"false\" aria-controls=\"collapse-"
    + alias5(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias3),(typeof helper === alias4 ? helper.call(alias2,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">\r\n    <span class=\"mb-0\">\r\n      "
    + alias5(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias3),(typeof helper === alias4 ? helper.call(alias2,{"name":"name","hash":{},"data":data}) : helper)))
    + "\r\n    </span>\r\n    <div>\r\n      <span class=\"badge badge-info\">"
    + alias5(((helper = (helper = helpers.numMatches || (depth0 != null ? depth0.numMatches : depth0)) != null ? helper : alias3),(typeof helper === alias4 ? helper.call(alias2,{"name":"numMatches","hash":{},"data":data}) : helper)))
    + "</span>\r\n      <i data-link=\"/recipes/"
    + alias5(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias3),(typeof helper === alias4 ? helper.call(alias2,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" class=\"fas fa-info-circle fa-lg\"></i>\r\n      <i class=\"fas fa-caret-down fa-lg\"></i>\r\n    </div>\r\n  </div>\r\n\r\n  <div id=\"collapse-"
    + alias5(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias3),(typeof helper === alias4 ? helper.call(alias2,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" class=\"collapse\" aria-labelledby=\"heading-"
    + alias5(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias3),(typeof helper === alias4 ? helper.call(alias2,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">\r\n    <div class=\"card-body text-center\">\r\n      <p class=\"font-italic\">You currently have <span class=\"text-success font-weight-bold\">"
    + alias5(((helper = (helper = helpers.numMatches || (depth0 != null ? depth0.numMatches : depth0)) != null ? helper : alias3),(typeof helper === alias4 ? helper.call(alias2,{"name":"numMatches","hash":{},"data":data}) : helper)))
    + "</span> of this recipe's ingredients!</p>\r\n      <ul class=\"list-group\">\r\n"
    + ((stack1 = helpers.each.call(alias2,(depth0 != null ? depth0.matches : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "      </ul>\r\n    </div>\r\n  </div>\r\n</div>";
},"useData":true});
})();