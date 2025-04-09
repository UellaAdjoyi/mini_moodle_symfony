document.addEventListener("DOMContentLoaded", function () {
    // function loadUsers() {
    //     fetch("../../php/get_users.php")
    //         .then(response => response.json())
    //         .then(data => {
    //             const userList = document.getElementById("user-list");
    //             userList.innerHTML = "";
    //             data.forEach(user => {
    //                 const userItem = document.createElement("div");
    //                 userItem.classList.add("list-group-item");
    //                 userItem.innerHTML = `
    //                     <span>${user.nom} ${user.prenom} - ${user.email}</span>
    //                     <button class="btn btn-danger btn-sm float-end delete-user" data-id="${user.id}">Supprimer</button>
    //                 `;
    //                 userList.appendChild(userItem);
    //             });
    //             attachDeleteEvent();
    //         })
    //         .catch(error => console.error("Erreur lors du chargement des utilisateurs :", error));
    // }

    function attachDeleteEvent() {
        document.querySelectorAll(".delete-user").forEach(button => {
            button.addEventListener("click", function () {
                const userId = this.getAttribute("data-id");
                if (confirm("Voulez-vous vraiment supprimer cet utilisateur ?")) {
                    fetch("../../php/delete_user.php", {
                        method: "POST",
                        headers: { "Content-Type": "application/x-www-form-urlencoded" },
                        body: "id=" + userId
                    }).then(response => response.text())
                        .then(() => loadUsers());
                }
            });
        });
    }



    loadUsers();
});

