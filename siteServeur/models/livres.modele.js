const mongoose = require("mongoose"); //logiciel bdd

// Structure / schema - schema() -> sorte de classe
const livreSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    nom : String,
    auteur : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Auteur",
        required : true
    },
    pages : Number,
    description: String,
    image: String
})
// Association  - model() -> On va l'importer dans routeur.js
module.exports = mongoose.model("Livre", livreSchema); // (la table "livre", la structure associée)

