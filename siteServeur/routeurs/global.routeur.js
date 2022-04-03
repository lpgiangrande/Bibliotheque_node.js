let express = require("express");
let routeur = express.Router();
const twig = require("twig");


// Déclarer le premier chemin dispo sur notre serveur -> PAGE D'ACCUEIL
routeur.get("/", (request, response) =>{
    response.render("accueil.html.twig");
})

// 404
routeur.use((request, response, next) => {
    const error = new Error("Page non trouvée"); //normalement renvoyée une page HTML
    error.statut = 404;
    next(error);
})

//nouvelle route qui récupère l'error 
routeur.use((error, request, response) => { 
    response.status(error.status || 500) // mettre statut 404 SINON  (||) 500
    response.end(error.message);
})

module.exports = routeur;