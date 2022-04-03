// Sélectionner les éléments HTML dont nous avons besoin

// La biblio
const tabBiblio = document.querySelector('#tableauLivres');
// le formulaire d'ajout 
const addFormulaire = document.querySelector('#addForm');
// Le formulaire de modif
const updateFormulaire = document.querySelector('#updateForm');


// Remplir la biblio de quelques livres pour tests :
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
let biblio = [l1, l2];
afficherLivres();

// Fonction afficher livres dans l'encart "bibliothèque"
function afficherLivres(){
    //Selec tbody -> le html à remplir.
    let tableauLivres = document.querySelector("#tableauLivres tbody");
    let livres = ""; // initialisé à 0
    for (i=0; i<= biblio.length-1; i++){
        livres += `<tr>
                        <td>${biblio[i].nom}</td> 
                        <td>${biblio[i].auteur}</td>
                        <td>${biblio[i].pages}</td>
                        <td><button type="button" onClick="modifierLivre(${i})" class="btn btn-warning btn-sm">Modifier</button></td>
                        <td><button type="button" onClick="supprimerLivre(${i})" class="btn btn-danger btn-sm">Supprimer</button></td>
                    </tr>`
    } // tableau [indice en cours].attribut

    //affichage dans le html après la boucle de récup des valeurs = 
    tableauLivres.innerHTML = livres;
}

// Ajout de livres :
// 1 = afficher le formulaire au clic
// 2 = coder la fonction ajout


// Affichage addForm
function addForm(){
    document.querySelector('#addForm').removeAttribute("class");
}

document.querySelector('#validAddForm').addEventListener('click', function(e){
    e.preventDefault();
    // Enregistrer les valeurs rentrées
    let titre = document.querySelector('#addForm #titre').value;
    let auteur = document.querySelector('#addForm #auteur').value;
    let pages = document.querySelector('#addForm #pages').value;
    // lancer la fonction 'ajout'
    ajoutLivre(titre, auteur, pages);
})
// Ddéfinir la fonction ajout livre qui prend 3 param :
function ajoutLivre(titre, auteur, pages){

    let livre = {
        nom : titre,
        auteur : auteur,
        pages : pages
    }
    biblio.push(livre); // On ajoute le livre dans la biblio
    afficherLivres(); // On l'affiche dans le HTML (fonction définie plus haut)
    addFormulaire.reset(); // vide les valeurs du form quand on clic sur 'ajout'
    addFormulaire.className = "d-none"; // cacher le form
}

// Supprimer livre
// Evenement au clic du bouton supp déjà defini dans la boucle for du html
function supprimerLivre(pos){
    if(confirm("Voulez-vous vraiment supprimer " + biblio[pos].nom + "?")){
        biblio.splice(pos, 1); // Prend la position de départ + le nb d'élém à supp
        afficherLivres(); // relancer l'affichage de la bibli mise à jour
        alert("suppression effectuée");
    } else {
        alert("suppression annulée");
    }
}

// Modifier Livre

// 1 afficher les valeurs du livres en cours de modif : 
function modifierLivre(pos){
    addFormulaire.className = "d-none";
    // pour que le form "modifier" s'affiche
    document.querySelector('#updateForm').removeAttribute("class"); 
    document.querySelector('#updateForm #titre').value = biblio[pos].nom;
    document.querySelector('#updateForm #auteur').value = biblio[pos].auteur;
    document.querySelector('#updateForm #pages').value = biblio[pos].pages;
    //hidden pour l'id en cours :
    document.querySelector('#updateForm #idLivre').value = pos;
}
// Enregistrer ces valeurs au clic du bouton 'valider'
document.querySelector("#validupdateForm").addEventListener('click', function(e){
    e.preventDefault(); // empecher valid formulaire avant les modifs

    // Nouvelles valeurs :
    let newTitle = document.querySelector('#updateForm #titre').value;
    let newAuthor = document.querySelector('#updateForm #auteur').value;
    let newPages = document.querySelector('#updateForm #pages').value;
    let idLivre = document.querySelector('#updateForm #idLivre').value;

    // Modifier le tableau biblio grâce à l'ID : 
    biblio[idLivre].nom = newTitle;
    biblio[idLivre].auteur = newAuthor;
    biblio[idLivre].pages = newPages;
    afficherLivres();
    updateFormulaire.className = "d-none"; // cacher le form
})