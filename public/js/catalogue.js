document.addEventListener("DOMContentLoaded", function () {
    console.log("JavaScript chargé !");

    //  base de données en mémoire pour tester
    let ueData = [
        { id: 1, code: "UE101", intitule: "Mathématiques", image: null },
        { id: 2, code: "UE102", intitule: "Programmation", image: null },
        { id: 3, code: "UE103", intitule: "Mécanique", image: null },
        { id: 2, code: "UE102", intitule: "Electricité", image: null }

    ];

    let userData = [
        { id: 1, nom: "ADH", prenoms: "Mathématiques" },
        { id: 2, nom: "ASC", prenoms: "John" },
        { id: 3, nom: "DUPU", prenoms: "Marie" },
        { id: 4, nom: "ANT", prenoms: "Didier" },

    ];

    // Références DOM
    const ueTab = document.getElementById("ue-tab");
    const userTab = document.getElementById("user-tab");
    const ueContent = document.getElementById("ue-content");
    const userContent = document.getElementById("user-content");
    const ueList = document.getElementById("ue-list");
    const userList = document.getElementById("user-list");

    // Fonction de chargement des UE
    function loadUE() {
        ueList.innerHTML = "";
        ueData.forEach(ue => {
            let ueItem = document.createElement("div");
            ueItem.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");

            // Vérifier si l'image est fournie, sinon utiliser une image par défaut
            let baseUrl = document.body.dataset.baseUrl;
            let imageUrl = ue.image ? ue.image : `${baseUrl}/images/ue.png`;

            ueItem.innerHTML = `
                <div class="d-flex align-items-center">
                    <img src="${imageUrl}" alt="UE Image" class="ue-img me-2">
                    <span>${ue.code} - ${ue.intitule}</span>
                </div>
                <div>
                    <button class="btn btn-success btn-sm assign-ue" data-id="${ue.id}">Assigner</button>
                    <button class="btn btn-primary btn-sm update-ue" data-id="${ue.id}">Modifier</button>
                    <button class="btn btn-danger btn-sm delete-ue" data-id="${ue.id}">Effacer</button>
                </div>
            `;

            ueList.appendChild(ueItem);
        });

    }



    // l'ajout d'UE
    document.getElementById("add-ue-form").addEventListener("submit", function (e) {
        e.preventDefault();
        let code = document.getElementById("ue-code").value;
        let intitule = document.getElementById("ue-title").value;
        let ueImageInput = document.getElementById("ue-image");
        let ueImage = ueImageInput.files[0]; // Récupérer le fichier image
        let defaultImage = "images/ue.png";

        // Vérifier si une image est sélectionnée
        let imagePath = ueImage ? URL.createObjectURL(ueImage) : defaultImage;

        if (code && intitule) {
            // Ajouter une nouvelle UE
            let newUE = { id: Date.now(), code: code, intitule: intitule };
            ueData.push(newUE);
            loadUE(); // Rafraîchir la liste
            alert("UE ajoutée !");
            document.getElementById("ue-code").value = "";
            document.getElementById("ue-title").value = "";
        } else {
            alert("Veuillez remplir tous les champs.");
        }
    });

    // Supprimer une UE avec confirmation
    ueList.addEventListener("click", function (e) {
        if (e.target.classList.contains("delete-ue")) {
            let ueId = e.target.getAttribute("data-id");
            if (confirm("Voulez-vous vraiment supprimer cette UE ?")) {
                // Supprimer l'UE de l'array
                ueData = ueData.filter(ue => ue.id !== parseInt(ueId));
                loadUE(); // Rafraîchir la liste
                alert("UE supprimée !");
            }
        }
    });


    //Modification d'une Ue
    function editUE(ueId) {
        let ue = ueData.find(item => item.id == ueId);
        if (!ue) return;

        // Affichage du formulaire avec les valeurs actuelles
        document.getElementById("ueId").value = ue.id;
        document.getElementById("ueCode").value = ue.code;
        document.getElementById("ueIntitule").value = ue.intitule;
        document.getElementById("ueImage").value = ue.image || "";

        let modal = new bootstrap.Modal(document.getElementById("editUEModal"));
        modal.show();
    }
    document.getElementById("saveUEChanges").addEventListener("click", () => {
        if (confirm("Voulez-vous sauvegarder vos modifications ?")) {
            let ueId = document.getElementById("ueId").value;
            let ue = ueData.find(item => item.id == ueId);
            if (!ue) return;

            // Mettre à jour les valeurs
            ue.code = document.getElementById("ueCode").value;
            ue.intitule = document.getElementById("ueIntitule").value;
            ue.image = document.getElementById("ueImage").value;

            // Mettre à jour l'affichage
            loadUE();
            let modal = bootstrap.Modal.getInstance(document.getElementById("editUEModal"));
            modal.hide();
        }
    });

    ueList.addEventListener("click", (event) => {
        if (event.target.classList.contains("update-ue")) {
            let ueId = event.target.getAttribute("data-id");
            editUE(ueId);
        }
    })


    // Gestion des onglets
    ueTab.addEventListener("click", function () {
        ueContent.style.display = "block";
        userContent.style.display = "none";
        ueTab.classList.add("active");
        userTab.classList.remove("active");
    });

    userTab.addEventListener("click", function () {
        ueContent.style.display = "none";
        userContent.style.display = "block";
        userTab.classList.add("active");
        ueTab.classList.remove("active");
    });


    //Users
    function loadUser() {
        userList.innerHTML = "";
        userData.forEach(user => {
            let userItem = document.createElement("div");
            userItem.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");
            userItem.innerHTML = `
                <span>${user.nom}  ${user.prenoms}</span>
                <button class="btn btn-primary btn-sm update-ue" data-id="${user.id}">Modifier</button>
                <button class="btn btn-danger btn-sm delete-ue" data-id="${user.id}">Effacer</button>
            `;
            userList.appendChild(userItem);
        });
    }

    // Charger les UE au démarrage
    loadUE();
    loadUser();
    populateUserSelect();


    // Afficher l'onglet UE par défaut
    ueTab.click();

    //Assignation d'UEs
    userData.forEach(user => {
        user.ues = []; //Tableau des ids des UEs
    });

    //Mise à jour du sélecteur de user
    function populateUserSelect() {
        const userSelect = document.getElementById("user-select");
        userSelect.innerHTML = "";
        userData.forEach(user => {
            const option = document.createElement("option");
            option.value = user.id;
            option.textContent = `${user.nom} ${user.prenoms}`;
            userSelect.appendChild(option);
        });
    }

    // Quand on clique sur "Assigner"
    ueList.addEventListener("click", function (e) {
        if (e.target.classList.contains("assign-ue")) {
            const ueId = parseInt(e.target.dataset.id);
            const selectedUserId = parseInt(document.getElementById("user-select").value);
            const user = userData.find(u => u.id === selectedUserId);
            if (!user) return;

            if (!user.ues.includes(ueId)) {
                user.ues.push(ueId);
                alert("UE assignée !");
                updateAssignedUEList(user);
            } else {
                alert("UE déjà assignée.");
            }
        }
    });

    function updateAssignedUEList(user) {
        const list = document.getElementById("assigned-ue-list");
        list.innerHTML = "";

        user.ues.forEach(ueId => {
            const ue = ueData.find(u => u.id === ueId);
            if (ue) {
                const li = document.createElement("li");
                li.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");
                li.textContent = `${ue.code} - ${ue.intitule}`;

                const btn = document.createElement("button");
                btn.textContent = "Retirer";
                btn.classList.add("btn", "btn-sm", "btn-danger");
                btn.onclick = () => {
                    user.ues = user.ues.filter(id => id !== ueId);
                    updateAssignedUEList(user);
                };

                li.appendChild(btn);
                list.appendChild(li);
            }
        });
    }

    //Affichage des Ues au changement d'user
    document.getElementById("user-select").addEventListener("change", function () {
        const selectedUserId = parseInt(this.value);
        const user = userData.find(u => u.id === selectedUserId);
        if (user) {
            updateAssignedUEList(user);
        }
    });


});


