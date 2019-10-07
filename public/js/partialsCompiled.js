(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
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
templates['recipe'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    return "";
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