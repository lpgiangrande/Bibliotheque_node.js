const mongoose = require("mongoose");
const auteurSchema = require("../models/auteurs.modele");
const livreSchema = require("../models/livres.modele")
const fs = require("fs");

exports.showAuthor = (req, res) => {
    auteurSchema.findById(req.params.id)
    .populate("livres")
    /* on a maintenant 1 tableau de livres en + des infos de l'auteur.
    On peut dorénavant l'utiliser dans le template associé */
    .exec()
    .then(auteur => {
        console.log(auteur);
        res.render("auteurs/auteur.html.twig", {auteur : auteur, isModification:false});
    })
    .catch(error => {
        console.log(error);
    })
}

exports.showAllAuthors = (request, response) => {
    // Récupérer l'ensemble de nos auteurs avec le schema.find
    auteurSchema.find()
    // Récupérer les livres liés à l'auteur
    .populate("livres") // sur le champs "livres" = virtual
    .exec()
    .then(auteurs => { // récup auteurs
        response.render("auteurs/liste-auteurs.html.twig", 
            {auteurs : auteurs}); // renvoi réponse avec liste auteur au template grâce à l'objet
    })
    .catch(error => {
        console.log(error);
    })
}

exports.addAuthor = (request, response) => {
    const auteur = new auteurSchema({
        _id : new mongoose.Types.ObjectId(),
        nom : request.body.nom,
        prenom : request.body.prenom,
        age : request.body.age,
        sexe: (request.body.sexe) ? true : false,
    })
    auteur.save()
    .then(result => {
        response.redirect("/auteurs");
    })
    .catch(error => {
        console.log(error);
    })
}


/* 
Suppression  :
- on récupère l'auteur anonyme
- On modifie les livres
- on supprime l'auteur initial (2e then)
*/
exports.deleteAuthor = (request, response) => {
    auteurSchema.find()
    .where("nom").equals("ANONYME")
    .exec()
    .then(auteur => {
        //console.log(auteur); // On récupère l'auteur anonyme
        // On modifie les livres dont l'auteur a été supprimé :
        livreSchema.updateMany(
                // 1er paramètre de updateMany :
                // -> Update les livres ayant le champs "auteur" dont la valeur a été transmise dans l'URL(l'auteur a supprimer)
                // --> soit : tous les livres ayant l'auteur à supprimer
                // 2e paramètre de updateMany : nouvelle valeur à positionner
                {"auteur" : request.params.id}, 
                { "$set" : {"auteur":  auteur[0]._id }}, {"multi" : true})
        .exec()
        .then(
            auteurSchema.remove({_id:request.params.id})
            .where("nom").ne("ANONYME") // ne = not equals -> ne pas supprimer l'auteur anonyme
            .exec()
            .then(response.redirect("/auteurs"))
            .catch()
        )
    })
}

exports.updateAuthor = (request, response) => {
    auteurSchema.findById(request.params.id)
    .populate("livres")
    .exec()
    .then(auteur => {
        console.log(auteur);
        response.render("auteurs/auteur.html.twig", {auteur : auteur, isModification:true});
    })
    .catch(error => {
        console.log(error);
    })
}

exports.updateAuthorValidation = (request, response) => {
    const authorUpdate = {
        nom : request.body.nom,
        prenom :request.body.prenom,
        age : request.body.age,
        sexe : (request.body.sexe) ? true : false // si valeur, true, sinon false
    };
    // indiquer l'auteur à modifier à partir de son ID : {_id:request.body.identifiant}
    // Quelles infos à modifier en mettant l'objet " authorUpdate"
    auteurSchema.updateOne({_id:request.body.identifiant}, authorUpdate)
    .exec()
    .then( results => {
        response.redirect("/auteurs");
    })
    .catch();
}