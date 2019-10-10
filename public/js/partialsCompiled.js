(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['addRecipeForm'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=container.propertyIsEnumerable;

  return "            <option data-default=\"false\">"
    + container.escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"name","hash":{},"data":data}) : helper)))
    + "</option>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.propertyIsEnumerable;

  return "<form id=\"main-form\">\n    <div class=\"form-group\">\n        <label for=\"new-recipe-name\">Name</label>\n        <input type=\"text\" class=\"form-control\" id=\"new-recipe-name\" data-toggle=\"manual\" data-container=\"body\"\n            data-placement=\"top\" data-content=\"\">\n    </div>\n    <div class=\"form-group\">\n        <label for=\"new-recipe-description\">Description <span class=\"text-muted\">(optional)</span></label>\n        <textarea class=\"form-control\" id=\"new-recipe-description\" rows=\"3\"></textarea>\n    </div>\n    <div class=\"form-group\">\n        <label for=\"new-recipe-cuisine\">Cuisine <span class=\"text-muted\">(optional)</span></label>\n        <select id=\"new-recipe-cuisine\" class=\"form-control\">\n            <option data-default=\"true\" selected>Choose...</option>\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.cuisines : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "        </select>\n    </div>\n    <div class=\"form-row\">\n        <div class=\"form-group col-4\">\n            <label for=\"new-recipe-serving\">Serving Size</label>\n            <input type=\"number\" class=\"form-control\" id=\"new-recipe-serving\" data-toggle=\"manual\" data-container=\"body\"\n                data-placement=\"top\" data-content=\"\">\n\n        </div>\n        <div class=\"form-group col-4\">\n            <label for=\"new-recipe-prep\">Prep. Time <span class=\"text-muted\">(min.)</span></label>\n            <input type=\"number\" class=\"form-control\" id=\"new-recipe-prep\" data-toggle=\"manual\" data-container=\"body\"\n                data-placement=\"top\" data-content=\"\">\n\n        </div>\n        <div class=\"form-group col-4\">\n            <label for=\"new-recipe-cook\">Cook Time <span class=\"text-muted\">(min.)</span></label>\n            <input type=\"number\" class=\"form-control\" id=\"new-recipe-cook\" data-toggle=\"manual\" data-container=\"body\"\n                data-placement=\"top\" data-content=\"\">\n        </div>\n    </div>\n    <hr>\n    <h4> Ingredients </h4>\n    <div class=\"form-row\">\n        <div id=\"new-ingredient-list\">\n            <div class=\"new-ingredient-block form-row\">\n                <div class=\"form-group col-6\">\n                    <label for=\"new-recipe-ingredient-name-0\">Name</label>\n                    <input placeholder=\"Click to add an ingredient!\" type=\"text\"\n                        class=\"new-recipe-ingredient-name-input form-control\" id=\"new-recipe-ingredient-name-0\"\n                        data-toggle=\"manual\" data-container=\"body\" data-placement=\"top\" data-content=\"\" readonly>\n                </div>\n                <div class=\"form-group col-3\">\n                    <label for=\"new-recipe-ingredient-quantity-0\">Quantity</label>\n                    <input type=\"number\" class=\"form-control\" id=\"new-recipe-ingredient-quantity-0\" data-toggle=\"manual\"\n                        data-container=\"body\" data-placement=\"top\" data-content=\"\">\n                </div>\n                <div class=\"form-group col-2\">\n                    <label for=\"new-recipe-ingredient-unit-0\">Unit</label>\n                    <select id=\"new-recipe-ingredient-unit-0\" data-toggle=\"manual\" data-container=\"body\"\n                        data-placement=\"top\" data-content=\"\" class=\"form-control\">\n                        <option selected>tsp</option>\n                        <option>tbsp</option>\n                        <option>oz</option>\n                        <option>lb</option>\n                        <option>g</option>\n                        <option>kg</option>\n                        <option>cup(s)</option>\n                        <option>mL</option>\n                    </select>\n                </div>\n                <div class=\"form-group col-1\">\n                    &nbsp;\n                </div>\n            </div>\n        </div>\n\n        <button type=\"button\" id=\"add-recipe-ingredient-btn\" class=\"btn btn-success btn-lg btn-block\">Add\n            Ingredient&nbsp;&nbsp;<i class=\"fas fa-plus-circle fa-sm\"></i></button>\n    </div>\n    <hr>\n    <h4> Instructions </h4>\n    <div class=\"form-row\">\n        <div id=\"new-instruction-list\" class=\"container\">\n            <div class=\"new-instruction-block row\">\n                <div class=\"col-1\" style=\"padding-top: 5px\">\n                    <strong>1.</strong>\n                </div>\n                <div class=\"form-group col-10\">\n                    <input type=\"text\" class=\"form-control\" id=\"new-recipe-instruction-0\" data-toggle=\"manual\"\n                        data-container=\"body\" data-placement=\"top\" data-content=\"\">\n                </div>\n                <div class=\"col-1\">\n                    &nbsp; \n                </div>\n            </div>\n        </div>\n\n        <button type=\"button\" id=\"add-recipe-instruction-btn\" class=\"btn btn-info btn-lg btn-block\">Add\n            Instruction&nbsp;&nbsp;<i class=\"fas fa-plus-circle fa-sm\"></i></button>\n    </div>\n</form>\n<div id=\"ingredient-selection\" data-formId=\"\">\n\n    <div id=\"ig-search\" class=\"p-1 bg-light rounded rounded-pill shadow-sm mb-4\">\n        <div class=\"input-group\">\n            <div class=\"input-group-prepend\">\n                <button id=\"ig-search-submit-btn\" type=\"submit\" class=\"btn btn-link text-warning\"><i\n                        class=\"fa fa-search\"></i></button>\n            </div>\n            <input id=\"ig-search-input\" type=\"search\" placeholder=\"What ingredient are you looking for?\"\n                aria-describedby=\"ig-search-submit-btn\" class=\"form-control border-0 bg-light\">\n        </div>\n    </div>\n\n    <p id=\"ig-search-error\" class=\"mt-1 text-danger text-center font-weight-bold\">\"<span id=\"error-ig-name\"></span>\"\n        could not be found!</p>\n\n    <div id=\"ingredient-selection-content\">\n\n    </div>\n    <div id=\"no-ig-msg\" class=\"text-center\">\n        <p class=\"card-text text-muted text-center\">No ingredients have been added yet.</p>\n        <p><i class=\"fas fa-carrot fa-3x\"></i></p>\n    </div>\n\n</div>\n\n\n<script src=\"/js/igSelect.js\"></script>";
},"useData":true});
templates['ingredient'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=container.propertyIsEnumerable, alias2=depth0 != null ? depth0 : (container.nullContext || {}), alias3=container.hooks.helperMissing, alias4="function", alias5=container.escapeExpression;

  return "            <button type=\"button\" class=\"ig-select-btn btn btn-success\" data-name=\""
    + alias5(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias3),(typeof helper === alias4 ? helper.call(alias2,{"name":"name","hash":{},"data":data}) : helper)))
    + "\" data-id=\""
    + alias5(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias3),(typeof helper === alias4 ? helper.call(alias2,{"name":"id","hash":{},"data":data}) : helper)))
    + "\"><i class=\"fas fa-plus fa-sm\"></i></button>\n";
},"3":function(container,depth0,helpers,partials,data) {
    var helper, alias1=container.propertyIsEnumerable;

  return "            <input type=\"checkbox\" class=\"ingredient-checkbox form-check-input\" data-id=\""
    + container.escapeExpression(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"id","hash":{},"data":data}) : helper)))
    + "\">\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=container.propertyIsEnumerable, alias2=depth0 != null ? depth0 : (container.nullContext || {}), alias3=container.hooks.helperMissing, alias4="function", alias5=container.escapeExpression;

  return "<li class=\"ingredient-block list-group-item\" data-id=\""
    + alias5(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias3),(typeof helper === alias4 ? helper.call(alias2,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" data-name=\""
    + alias5(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias3),(typeof helper === alias4 ? helper.call(alias2,{"name":"name","hash":{},"data":data}) : helper)))
    + "\" data-checked=\"false\">\n    <div class=\"d-flex justify-content-between align-items-center\">\n        <span class=\"font-weight-bold text-muted\">"
    + alias5(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias3),(typeof helper === alias4 ? helper.call(alias2,{"name":"name","hash":{},"data":data}) : helper)))
    + "</span>\n        <div class=\"text-center\">\n"
    + ((stack1 = helpers["if"].call(alias2,(depth0 != null ? depth0.isForm : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "        </div>\n    </div>\n</li>";
},"useData":true});
templates['loginAlert'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=container.propertyIsEnumerable;

  return "<div class=\"text-center\">\n    <h5>"
    + container.escapeExpression(((helper = (helper = helpers.message || (depth0 != null ? depth0.message : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"message","hash":{},"data":data}) : helper)))
    + "</h5>\n    <a href=\"/auth/google\">\n      <img class=\"img-fluid login-btn\" src=\"images/login-google.png\">\n    </a>\n</div>";
},"useData":true});
templates['newRecipeIngredient'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=container.propertyIsEnumerable, alias2=depth0 != null ? depth0 : (container.nullContext || {}), alias3=container.hooks.helperMissing, alias4="function", alias5=container.escapeExpression;

  return "<div data-id="
    + alias5(((helper = (helper = helpers.idx || (depth0 != null ? depth0.idx : depth0)) != null ? helper : alias3),(typeof helper === alias4 ? helper.call(alias2,{"name":"idx","hash":{},"data":data}) : helper)))
    + " class=\"new-ingredient-block form-row\">\n    <div class=\"form-group col-6\">\n        <label for=\"new-recipe-ingredient-name-"
    + alias5(((helper = (helper = helpers.idx || (depth0 != null ? depth0.idx : depth0)) != null ? helper : alias3),(typeof helper === alias4 ? helper.call(alias2,{"name":"idx","hash":{},"data":data}) : helper)))
    + "\">Name</label>\n        <input placeholder=\"Click to add an ingredient!\" type=\"text\" class=\"new-recipe-ingredient-name-input form-control\"\n            id=\"new-recipe-ingredient-name-"
    + alias5(((helper = (helper = helpers.idx || (depth0 != null ? depth0.idx : depth0)) != null ? helper : alias3),(typeof helper === alias4 ? helper.call(alias2,{"name":"idx","hash":{},"data":data}) : helper)))
    + "\" data-toggle=\"manual\" data-container=\"body\" data-placement=\"top\"\n            data-content=\"\" readonly>\n    </div>\n    <div class=\"form-group col-3\">\n        <label for=\"new-recipe-ingredient-quantity-"
    + alias5(((helper = (helper = helpers.idx || (depth0 != null ? depth0.idx : depth0)) != null ? helper : alias3),(typeof helper === alias4 ? helper.call(alias2,{"name":"idx","hash":{},"data":data}) : helper)))
    + "\">Quantity</label>\n        <input type=\"number\" class=\"form-control\" id=\"new-recipe-ingredient-quantity-"
    + alias5(((helper = (helper = helpers.idx || (depth0 != null ? depth0.idx : depth0)) != null ? helper : alias3),(typeof helper === alias4 ? helper.call(alias2,{"name":"idx","hash":{},"data":data}) : helper)))
    + "\" data-toggle=\"manual\"\n            data-container=\"body\" data-placement=\"top\" data-content=\"\">\n    </div>\n    <div class=\"form-group col-2\">\n        <label for=\"new-recipe-ingredient-unit-"
    + alias5(((helper = (helper = helpers.idx || (depth0 != null ? depth0.idx : depth0)) != null ? helper : alias3),(typeof helper === alias4 ? helper.call(alias2,{"name":"idx","hash":{},"data":data}) : helper)))
    + "\">Unit</label>\n        <select id=\"new-recipe-ingredient-unit-"
    + alias5(((helper = (helper = helpers.idx || (depth0 != null ? depth0.idx : depth0)) != null ? helper : alias3),(typeof helper === alias4 ? helper.call(alias2,{"name":"idx","hash":{},"data":data}) : helper)))
    + "\" class=\"form-control\" data-toggle=\"manual\" data-container=\"body\"\n            data-placement=\"top\" data-content=\"\">\n            <option selected>tsp</option>\n            <option>tbsp</option>\n            <option>oz</option>\n            <option>lb</option>\n            <option>g</option>\n            <option>kg</option>\n            <option>cup(s)</option>\n            <option>mL</option>\n        </select>\n    </div>\n    <div class=\"form-group col-1\">\n        <i data-id=\""
    + alias5(((helper = (helper = helpers.idx || (depth0 != null ? depth0.idx : depth0)) != null ? helper : alias3),(typeof helper === alias4 ? helper.call(alias2,{"name":"idx","hash":{},"data":data}) : helper)))
    + "\" class=\"delete-ingredient-btn fas fa-trash-alt\"></i>\n    </div>\n</div>";
},"useData":true});
templates['newRecipeInstruction'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=container.propertyIsEnumerable, alias2=depth0 != null ? depth0 : (container.nullContext || {}), alias3=container.hooks.helperMissing, alias4="function", alias5=container.escapeExpression;

  return "<div data-id="
    + alias5(((helper = (helper = helpers.idx || (depth0 != null ? depth0.idx : depth0)) != null ? helper : alias3),(typeof helper === alias4 ? helper.call(alias2,{"name":"idx","hash":{},"data":data}) : helper)))
    + " class=\"new-instruction-block form-row\">\n    <div class=\"col-1\" style=\"padding-top: 5px\">\n        <strong>"
    + alias5(((helper = (helper = helpers.num || (depth0 != null ? depth0.num : depth0)) != null ? helper : alias3),(typeof helper === alias4 ? helper.call(alias2,{"name":"num","hash":{},"data":data}) : helper)))
    + ".</strong>\n    </div>\n    <div class=\"form-group col-10\">\n        <input type=\"text\" class=\"form-control\" id=\"new-recipe-instruction-"
    + alias5(((helper = (helper = helpers.idx || (depth0 != null ? depth0.idx : depth0)) != null ? helper : alias3),(typeof helper === alias4 ? helper.call(alias2,{"name":"idx","hash":{},"data":data}) : helper)))
    + "\">\n    </div>\n    <div class=\"form-group col-1\">\n        <i data-id=\""
    + alias5(((helper = (helper = helpers.idx || (depth0 != null ? depth0.idx : depth0)) != null ? helper : alias3),(typeof helper === alias4 ? helper.call(alias2,{"name":"idx","hash":{},"data":data}) : helper)))
    + "\" class=\"delete-instruction-btn fas fa-trash-alt\"></i>\n    </div>\n</div>";
},"useData":true});
templates['recipeItem'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=container.propertyIsEnumerable;

  return "      <span class=\"badge badge-success\">"
    + container.escapeExpression(((helper = (helper = helpers.numMatches || (depth0 != null ? depth0.numMatches : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"numMatches","hash":{},"data":data}) : helper)))
    + "</span>&nbsp;<span class=\"text-muted\">matches</span>\n";
},"3":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=container.propertyIsEnumerable, alias2=depth0 != null ? depth0 : (container.nullContext || {});

  return "       <br>\n      <p class=\"font-italic\">You currently have <span class=\"text-success font-weight-bold\">"
    + container.escapeExpression(((helper = (helper = helpers.numMatches || (depth0 != null ? depth0.numMatches : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(alias2,{"name":"numMatches","hash":{},"data":data}) : helper)))
    + "</span> of this recipe's ingredients!</p>\n      <ul class=\"list-group\">\n"
    + ((stack1 = helpers.each.call(alias2,(depth0 != null ? depth0.matches : depth0),{"name":"each","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "      </ul>\n";
},"4":function(container,depth0,helpers,partials,data) {
    var helper, alias1=container.propertyIsEnumerable;

  return "        <li class=\"list-group-item\">"
    + container.escapeExpression(((helper = (helper = helpers.ingredientName || (depth0 != null ? depth0.ingredientName : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"ingredientName","hash":{},"data":data}) : helper)))
    + "</li>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=container.propertyIsEnumerable, alias2=depth0 != null ? depth0 : (container.nullContext || {}), alias3=container.hooks.helperMissing, alias4="function", alias5=container.escapeExpression;

  return "<div class=\"card\">\n  <div class=\"card-header d-flex justify-content-between\" id=\"heading-"
    + alias5(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias3),(typeof helper === alias4 ? helper.call(alias2,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" data-toggle=\"collapse\"\n    data-target=\"#collapse-"
    + alias5(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias3),(typeof helper === alias4 ? helper.call(alias2,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" aria-expanded=\"false\" aria-controls=\"collapse-"
    + alias5(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias3),(typeof helper === alias4 ? helper.call(alias2,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">\n    <span class=\"mb-0\">\n      "
    + alias5(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias3),(typeof helper === alias4 ? helper.call(alias2,{"name":"name","hash":{},"data":data}) : helper)))
    + "\n    </span>\n    <div>\n"
    + ((stack1 = helpers["if"].call(alias2,(depth0 != null ? depth0.numMatches : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "    </div>\n  </div>\n\n  <div id=\"collapse-"
    + alias5(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias3),(typeof helper === alias4 ? helper.call(alias2,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" class=\"collapse\" aria-labelledby=\"heading-"
    + alias5(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias3),(typeof helper === alias4 ? helper.call(alias2,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">\n    <div class=\"card-body text-center\">\n       <button data-link=\"/recipes/"
    + alias5(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias3),(typeof helper === alias4 ? helper.call(alias2,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" type=\"button\" class=\"btn btn-info btn-block\">View recipe&nbsp;&nbsp;<i class=\"fas fa-info-circle fa-sm\"></i></button>\n"
    + ((stack1 = helpers["if"].call(alias2,(depth0 != null ? depth0.numMatches : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n    </div>\n  </div>\n</div>";
},"useData":true});
templates['searchbar'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=container.propertyIsEnumerable, alias2=depth0 != null ? depth0 : (container.nullContext || {}), alias3=container.hooks.helperMissing, alias4="function", alias5=container.escapeExpression;

  return "<div id=\"ig-search\" class=\"p-1 bg-light rounded rounded-pill shadow-sm mb-4\">\r\n    <div class=\"input-group\">\r\n        <div class=\"input-group-prepend\">\r\n            <button id=\"ig-search-submit-btn\" type=\"submit\" class=\"btn btn-link text-warning\"><i\r\n                    class=\"fa fa-search\"></i></button>\r\n        </div>\r\n        <input id=\"ig-search-input\" type=\"search\" placeholder=\""
    + alias5(((helper = (helper = helpers.placeholder || (depth0 != null ? depth0.placeholder : depth0)) != null ? helper : alias3),(typeof helper === alias4 ? helper.call(alias2,{"name":"placeholder","hash":{},"data":data}) : helper)))
    + "\" aria-describedby=\"ig-search-submit-btn\"\r\n            class=\"form-control border-0 bg-light\">\r\n    </div>\r\n</div>\r\n<p id=\"ig-search-error\" class=\"mt-1 text-danger text-center font-weight-bold\">\"<span id=\"error-ig-name\" ></span>\" "
    + alias5(((helper = (helper = helpers.error || (depth0 != null ? depth0.error : depth0)) != null ? helper : alias3),(typeof helper === alias4 ? helper.call(alias2,{"name":"error","hash":{},"data":data}) : helper)))
    + "</p>";
},"useData":true});
})();