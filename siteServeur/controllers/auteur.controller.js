const mongoose = require("mongoose");
const auteurSchema = require("../models/auteurs.modele");
const fs = require("fs");

exports.showAuthor = (req, res) => {
    auteurSchema.findById(req.params.id)
    .exec()
    .then(auteur => {
        console.log(auteur);
        res.render("auteurs/auteur.html.twig", {auteur : auteur});
    })
    .catch(error => {
        console.log(error);
    })
}