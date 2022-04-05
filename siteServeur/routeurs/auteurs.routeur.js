let express = require("express");
let routeur = express.Router();
const twig = require("twig");
const auteurController = require("../controllers/auteur.controller");

// :id = récupération du paramètre transféré dans l'URL
routeur.get("/auteurs/:id", auteurController.showAuthor);
routeur.get("/auteurs/", auteurController.showAllAuthors);
routeur.post("/auteurs/", auteurController.addAuthor);
routeur.post("/auteurs/delete/:id", auteurController.deleteAuthor);
routeur.get("/auteurs/modification/:id",  auteurController.updateAuthor);
routeur.post("/auteurs/modificationServeur", auteurController.updateAuthorValidation);

module.exports = routeur;