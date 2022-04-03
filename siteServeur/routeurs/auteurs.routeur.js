let express = require("express");
let routeur = express.Router();
const twig = require("twig");
const auteurController = require("../controllers/auteur.controller");

routeur.get("/auteurs/:id", auteurController.showAuthor);

module.exports = routeur;