// Récupération du module Express, etc.
const express = require("express");
const serveur = express(); // L'assigner dans une autre variable et le lancer
const morgan = require("morgan");
const routeurLivres = require("./routeurs/livres.routeur"); //import routeur
const routeurGlobal = require("./routeurs/global.routeur"); 
const routeurAuteur = require("./routeurs/auteurs.routeur"); 
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const session = require('express-session');

//express-session (cf doc) * :
serveur.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}));


//Connexsion
mongoose.connect("mongodb://localhost/biblio", {useNewUrlParser:true, useUnifiedTopology:true});

serveur.use(express.static("public")); //pour utiliser le fichier css dans dossier "public"
serveur.use(morgan("dev"));
serveur.use(bodyParser.urlencoded({extended:false}));
// * express-session
serveur.set('trust proxy', 1); 

serveur.use((request, response, next) =>{
    response.locals.message = request.session.message;
    delete request.session.message; // Sinon, l'alerte ne s'en va pas quand on actualise.
    next();
})

// indiquer au serveur d'utiliser ce routeur pour les routes commençant par / dans l'url :
serveur.use("/", routeurLivres);
serveur.use("/", routeurAuteur); // attention à l'ordre (?)
serveur.use("/", routeurGlobal);


// Définir le port d'écoute
serveur.listen(8889);




