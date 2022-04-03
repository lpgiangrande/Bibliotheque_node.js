const mongoose = require("mongoose"); 

// Structure / schema - schema() -> sorte de classe
const auteurSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    nom : String,
    prenom : String,
    age : Number,
    sexe: Boolean
})

module.exports = mongoose.model("Auteur", auteurSchema); 
