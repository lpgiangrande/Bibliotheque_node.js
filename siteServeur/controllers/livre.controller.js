//////// CONTROLLER LIVRE ////////

// Toutes les fonctions flêchées présentes dans routeur.js concernant Livre

const mongoose = require("mongoose");
const livreSchema = require("../models/livres.modele"); // Import du modele
const auteurSchema = require("../models/auteurs.modele");
const fs = require("fs");

// READ - BOOKS LIST
exports.showBookList = (request, response) =>{
    auteurSchema.find() // 1ère requête
    .exec()
    .then(auteurs => {
        // 2e requête :
        // Affichage - find(), exec(), then(), catch()
        livreSchema.find()
            .populate("auteur")
            .exec()
            .then(livres => {
                //console.log(livres);
                // on renvoie la nouvelle page quand la requête est terminée
                response.render("livres/liste.html.twig", {
                    liste : livres, 
                    auteur : auteurs, 
                    message : response.locals.message
                }); //renvoie objet json {livres} dans la propriété "liste"
            })  
        .catch(error => {
            console.log(error);
        }); //traitement des erreurs + tard
    })
    .catch(error => {
        console.log(error);
    });
}

// CREATE -  BOOK
exports.addBook = (request, response) => {
    const livre = new livreSchema({
        _id: new mongoose.Types.ObjectId(),
        auteur : request.body.auteur, // le name du formulaire, ici 'auteur"
        nom : request.body.titre,
        pages :request.body.pages,
        description : request.body.description,
        image : request.file.path.substring(14) // enlève les 13 1ers caractères, soit /public/images
    });
    livre.save() // sauvegarder en BDD
    .then(result => {
        //console.log(result);
        response.redirect("/livres");
    })
    .catch(error =>{
        console.log(error);
    })
}

// READ - BOOK DETAILS
exports.showBookDetails = (request, response) => {
    livreSchema.findById(request.params.id)
    .populate("auteur")//Info pour avoir 1 objet complexe qui contient toutes les infos de l'auteur
    .exec()
    .then(livre => {
        response.render("livres/livre.html.twig", {livre : livre, isModified : false});
    })
    .catch(error =>{
        console.log(error);
    })
}

// UPDATE 
exports.updateBook = (request, response) => {
    livreSchema.findById(request.params.id)
    .exec()
    .then(livre => {
        response.render("livres/livre.html.twig", {livre : livre, isModified : true});
    })
    .catch(error =>{
        console.log(error);     
    })
}

exports.updateBookValidation = (request, response) => {
    // Traitement du formulaire de modification -> récupérer l'id du livre
    const livreUpdate = {
        nom : request.body.titre,
        auteur : request.body.auteur, 
        pages : request.body.pages,
        description : request.body.description
    }
    livreSchema.updateOne({_id:request.body.identifiant}, livreUpdate)
    .exec()
    .then(result =>{
        if (result.nModified < 1) throw new Error ("Echec : requête de modification");
        request.session.message = {
            type : 'success', // = 'success' pour couleur verte de l'alerte Bootstrap
            contenu :  'Modification effectuée.'
        }
        response.redirect("/livres");
    })
    .catch(error =>{
        console.log(error); 
        request.session.message = {
            type : 'danger', // = 'success' pour couleur verte de l'alerte Bootstrap
            contenu :  error.message
        }
        response.redirect("/livres");    
    })
}

exports.updateImage = (request, response) => {
    // 1
    // Traitement de récupération du nom de l'image à supprimer : 
    let livre = livreSchema.findById(request.body.identifiant) 
    .select("image")
    .exec()
    // 2
    // Suppression de l'image sur le serveur : 
    .then(livre =>{
        fs.unlink("./public/images/"+livre.image, error => {
            console.log(error);
        })
        // 3
        // récup l'image à modifier :
        const livreUpdate = {
            image : request.file.path.substring(14)
        }
        livreSchema.updateOne({_id:request.body.identifiant}, livreUpdate)
        .exec()
        .then(result => {
            // redirection page "modif" + concaténation de l'id du livre courant
            response.redirect("/livres/modification/"+request.body.identifiant)
        })
        .catch(error => {
            console.log(error);
        })
    })
}

// DELETE
exports.deleteBook = (request, response) => {
    // 1 : Suppression IMAGE serveur
    let livre = livreSchema.findById(request.params.id) // Prep de la requête Select
    .select("image")
    .exec()
    .then(livre =>{
        fs.unlink("./public/images/"+livre.image, error => {
            console.log(error);
        })
        // 2 : Suppresion LIVRE
        livreSchema.remove({_id:request.params.id}) // REQUETE 
        .exec()
        .then(result => {
            // session / alerte :
            request.session.message = {
                type : 'success', // = 'success' pour couleur verte de l'alerte Bootstrap
                contenu :  'Suppression effectuée.'
            }
            response.redirect("/livres");
        })
        .catch(error => {
            console.log(error);
        })
    })
    .catch(error => {
        console.log(error);
    })
}
