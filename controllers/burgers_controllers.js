var express = require("express");
var router = express.router();

var burger = require("../models/burger.js");

router.get("/", function(req, res){
    burger.select(function(data){
        var burgerOb = {
            burgers: data
        };
        res.render("index", burgerOb)
    });
});

router.post("/api/burgers", function(req, res){
    burger.insert([
        "burger_name", "devoured"
    ], [
        req.body.burger_name, req.body.devoured
    ], function(result){
        res.json({id: result.insertId});
    });
});

router.put("api/burgers/:id", function(req, res){
    var condition = `id = ${req.params.id}`;
        burger.update({
            devoured: req.body.devoured
        }, condition, function(result){
            if(result.changedRows == 0){
                return res.status(404).end();
            } else{
                res.status(200).end();
            }
        })
});

module.exports = router;