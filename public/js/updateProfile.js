document.addEventListener("DOMContentLoaded", function () {
    const editProfileBtn = document.getElementById("editProfileBtn");
    const editProfileModal = new bootstrap.Modal(document.getElementById("editProfileModal"));
    const editProfileForm = document.getElementById("editProfileForm");

    // Ouvrir le modal au clic sur "Modifier le profil"
    editProfileBtn.addEventListener("click", function (event) {
        event.preventDefault();
        editProfileModal.show();
    });

    // Sauvegarder les modifications
    editProfileForm.addEventListener("submit", function (event) {
        event.preventDefault();

        let name = document.getElementById("profileName").value;
        let email = document.getElementById("profileEmail").value;
        let avatar = document.getElementById("profileAvatar").files[0]; // Fichier sélectionné

        if (!name || !email) {
            alert("Veuillez remplir tous les champs obligatoires !");
            return;
        }

        // Affichage des nouvelles infos en console (ajax)
        console.log("Nom :", name);
        console.log("Email :", email);
        console.log("Avatar :", avatar ? avatar.name : "Aucune image sélectionnée");


        editProfileModal.hide();

        // Message de confirmation
        alert("Profil mis à jour avec succès !");
    });
});
