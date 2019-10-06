/* eslint-disable indent */
/* eslint-disable prettier/prettier */
var db = require("../models");

module.exports = function(app) {
    //Ingredients
    // GET route for getting all of ingredients by category 
    app.get("/api/ingredients", function(req, res) {
        db.Ingredient.findAll({
            order: ["category"]
        }).then(function(dbresult) {
            res.json(dbresult);
        });
    });
};
