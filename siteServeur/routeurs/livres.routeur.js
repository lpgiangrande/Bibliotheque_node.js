let express = require("express");
let routeur = express.Router();
const twig = require("twig");
const livreController = require("../controllers/livre.controller");
const multer = require("multer");

// PARAMETRAGE MULTER (images serveur):

//diskStorage -> destination (cb = callback)
const storage = multer.diskStorage({
    destination : (requete, file, cb)=> {
        cb(null, "./public/images/")
    },
    filename : (requete, file, cb)=> {
        var date = date = new Date().toLocaleDateString().replace(/\//g, '-');
        cb(null, date+"-"+Math.round(Math.random() * 10000)+"-"+file.originalname)
    }
});
// Types de fichiers acceptés
const fileFilter = (requete, file, cb) =>{
    if(file.mimetype === "image/jpeg" || file.mimetype === "image/png"){
        cb(null, true)
    } else {
        cb(new Error("l'image n'est pas acceptée"),false)
    }
}

const upload = multer({
    storage : storage,
    limits : {
        fileSize : 1024 * 1024 * 5
    },
    fileFilter : fileFilter
})


//////// ROUTES 

// Page => Books list
routeur.get("/livres", livreController.showBookList); // nom fichier+fonction flêchée associée
// Page => Add book (Formulaire d'ajout de livre)
routeur.post("/livres", upload.single("image"), livreController.addBook);
// Page => Books list -> Selected book, details
routeur.get("/livres/:id", livreController.showBookDetails);
// Update selected book (formulaire)
routeur.get("/livres/modification/:id", livreController.updateBook);
// Update BDD, alerte, redirection
routeur.post("/livres/modificationServeur", livreController.updateBookValidation);
// Modifier le champs image du livre
routeur.post("/livres/updateImage", upload.single("image"), livreController.updateImage);
////////  SUPPRESSION //////// 
routeur.post("/livres/delete/:id", livreController.deleteBook);


module.exports = routeur;
