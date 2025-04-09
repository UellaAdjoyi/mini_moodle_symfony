document.addEventListener("DOMContentLoaded", function () {
    function loadUEs() {
        fetch("../../php/get_ues.php")
            .then(response => response.json())
            .then(data => {
                const ueList = document.getElementById("ue-list");
                ueList.innerHTML = "";
                data.forEach(ue => {
                    const ueItem = document.createElement("div");
                    ueItem.classList.add("list-group-item");
                    ueItem.innerHTML = `
                        <span>${ue.code} - ${ue.intitule}</span>
                        <button class="btn btn-danger btn-sm float-end delete-ue" data-id="${ue.id}">Supprimer</button>
                    `;
                    ueList.appendChild(ueItem);
                });
                attachDeleteEvent();
            })
            .catch(error => console.error("Erreur lors du chargement des UE :", error));
    }

    function attachDeleteEvent() {
        document.querySelectorAll(".delete-ue").forEach(button => {
            button.addEventListener("click", function () {
                const ueId = this.getAttribute("data-id");
                if (confirm("Voulez-vous vraiment supprimer cette UE ?")) {
                    fetch("../../php/delete_ue.php", {
                        method: "POST",
                        headers: { "Content-Type": "application/x-www-form-urlencoded" },
                        body: "id=" + ueId
                    }).then(response => response.text())
                        .then(() => loadUEs());
                }
            });
        });
    }

    loadUEs();
});
