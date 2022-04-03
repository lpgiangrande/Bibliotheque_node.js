const table = document.querySelector("#tableauLivres");
const addFormulaire = document.querySelector('#addForm');
const updateFormulaire = document.querySelector('#updateForm');

let l1 = {
    nom : "L'algorithmique selon H2PROG",
    auteur : "Matthieu GASTON",
    pages : 200
}
let l2 = {
    nom : "La France du 19ème",
    auteur : "Albert Patrick",
    pages : 400
}
let l3 = {
    nom : "Le Monde des Animaux",
    auteur : "Marc Merlin",
    pages : 250
}
let l4 = {
    nom : "Le Virus d'Asie",
    auteur : "Tya MILO",
    pages : 150
}
let biblio = [l1, l2, l3, l4];
afficherLivres();


// AFFICHER LES LIVRES AJOUTÉS VIA FORM DANS LE HTML
function afficherLivres(){
    // récup balise tbody :
    let tableauLivres = document.querySelector("#tableauLivres tbody");
    let livres = ""; // variable vide qu'on va remplir :
    // boucle de remplissage : //+= sinon écrase la valeur de la variable à chaque tour
    for (i = 0; i <= biblio.length -1; i++){
        livres += `<tr>
                        <td>${biblio[i].nom}</td> 
                        <td>${biblio[i].auteur}</td>
                        <td>${biblio[i].pages}</td>
                        <td><button type="button" onClick="modifierLivre(${i})" class="btn btn-warning btn-sm">Modifier</button></td>
                        <td><button type="button" onClick="supprimerLivre(${i})" class="btn btn-danger btn-sm">Supprimer</button></td>
                     <tr/>`
    } 
    //affichage dans le html après la boucle :
    tableauLivres.innerHTML = livres; 
}

// ** (voir fin document)
// ->Il vaut mieux laisser le form dans le html, on fait donc ainsi après avoir copier coller le form dans livres.html :

// FONCTION SUR BOUTON AJOUT LIVRE:
function addForm(){
    //Supprimer l'attribut class add-form pour afficher le form
    document.querySelector('#addForm').removeAttribute("class"); // supp l'attribut classe
    updateFormulaire.className = "d-none"; //cacher le form update
}

// Récupération id du bouton de valid du formulaire + ajout event au click
// Annulation de la soumission du formulaire au rafraichisseme
// Récupérer les valeurs saisies pour titre, auteur, nb pages
// Générer un nouveau livre, et l'enregistrer dans la variable livres (tableau)
// Rafraîchir le tableau (livre enregistré mais doit s'afficher dans le HTML) et vider le formulaire
document.querySelector('#validAddForm').addEventListener('click', function(e){
    e.preventDefault(); // pour ne pas vider les valeurs saisies avant de les avoir stockées
    let titre = document.querySelector('#addForm #titre').value;
    let auteur = document.querySelector('#addForm #auteur').value;
    let pages = document.querySelector('#addForm #pages').value;
    ajoutLivre(titre, auteur, pages);
    addFormulaire.reset(); // vide les valeurs du form quand on clic sur 'ajout'
    addFormulaire.className = "d-none"; // cacher le form
});
function ajoutLivre(titre, auteur, pages){
    let livre = {
        nom : titre,
        auteur : auteur,
        pages : pages
    }
    biblio.push(livre);
    afficherLivres();
}

// ANNULER AJOUT LIVRE
document.querySelector('#annulAddForm').addEventListener('click', function(e){
    formulaire.className = "d-none";
});

// FONCTION SUPPRIMER UN LIVRE -> numero livre concerné via compteur i + splice
function supprimerLivre(pos){
    if(confirm("Voulez-vous vraiment supprimer ?")){
        console.log("La pos est : " + pos);
        biblio.splice(pos, 1); // Prend la position de départ + le nb d'élém à supp
        afficherLivres(); // relancer l'affichage de la bibli mise à jour
        alert("suppression effectuée");
    } else {
        alert("suppression annulée");
    }
}

/* FONCTION MODIFIER UN LIVRE -> Afficher le formulaire de modif
- Recup id
- afficher le form de modif(fonciton), 
- récup les valeurs du livres,
- champs caché dans form de modif pour stocker l'id/position du livre en cours de modif) */
function modifierLivre(pos){
    addFormulaire.className = "d-none";
    document.querySelector('#updateForm').removeAttribute("class"); // pour que le form s'affiche
    document.querySelector('#updateForm #titre').value = biblio[pos].nom;
    document.querySelector('#updateForm #auteur').value = biblio[pos].auteur;
    document.querySelector('#updateForm #pages').value = biblio[pos].pages;
    document.querySelector('#updateForm #idLivre').value =pos;
}

document.querySelector("#validupdateForm").addEventListener('click', function(e){
    e.preventDefault(); // empecher valid formulaire avant les modifs
    let newTitle = document.querySelector('#updateForm #titre').value;
    let newAuthor = document.querySelector('#updateForm #auteur').value;
    let newPages = document.querySelector('#updateForm #pages').value;
    let idLivre = document.querySelector('#updateForm #idLivre').value;

    biblio[idLivre].nom = newTitle;
    biblio[idLivre].auteur = newAuthor;
    biblio[idLivre].pages = newPages;
    afficherLivres();
    updateFormulaire.className = "d-none"; // cacher le form
})


/* PBmatique : si on clic sur 'ajout' puis 'modifier', on a les deux formulaires
qui s'affichent à la suite.
- Permutter de formulaire en formulaire : 
--> dans chaque fonction, quand on clic sur l'un, on cache l'autre
*/

/* ** créer un formulaire en javascript 
function addForm(){
    if(!document.querySelector("#addForm")){ // pour empecher de relancer la fonction si un formulaire est deja en cours (pas de doublon)
        let myForm = document.createElement('form');
        myForm.setAttribute("id", "addForm");
        myForm.innerHTML = `
        <fieldset>
            <legend class="text-center mt-4">Création d'un livre</legend>
                <div class="form-group">
                    <label for="titre">Titre</label>
                    <input type="text" class="form-control" id="titre">
                </div>
                <div class="form-group">
                    <label for="auteur">Auteur</label>
                    <input type="text" class="form-control" id="auteur">
                </div>
                <div class="form-group">
                    <label for="pages">Pages</label>
                    <input type="number" class="form-control" id="pages">
                </div>
                <button type="submit" class="btn btn-primary">Valider</button>
        </fieldset>
        `;
        document.querySelector(".container").appendChild(myForm);
    }
}*/