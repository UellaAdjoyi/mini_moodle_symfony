const maxSelection = 6;
let selections = [];

function gererSelection() {
  const select = document.getElementById("liste");
  const options = Array.from(select.options);
  let selectedOption = select.options[select.selectedIndex];

  if (selectedOption && !selections.includes(selectedOption.value)) {
    // Si on sélectionne un élément, on l'ajoute
    if (selections.length < maxSelection) {
      selections.push(selectedOption.value);
      selectedOption.disabled = true; // Désactive cette option

    } else {
      selectedOption.selected = false; // Empêche de sélectionner plus de 6 éléments
      alert("Vous ne pouvez sélectionner que 6 UEs !");
    }
  }

  // Mettre à jour l'affichage des éléments sélectionnés
  afficherSelections();
}

function afficherSelections() {
  const zone = document.getElementById("selectionAffichee");
  const liste = document.getElementById("listeSelection");
  liste.innerHTML = ""; // Nettoyer la zone

  selections.forEach(item => {
    const span = document.createElement("span");
    span.textContent = item;
    span.classList.add("selected-item");
    span.onclick = () => deselectionner(item); // Ajouter un événement pour désélectionner l'élément
    liste.appendChild(span);
  });

  zone.style.display = selections.length > 0 ? "block" : "none";
}

function deselectionner(item) {
  // Retirer l'élément de la liste des sélectionnés
  selections = selections.filter(val => val !== item);
  
  // Réactiver l'option correspondante dans la liste déroulante
  const select = document.getElementById("liste");
  Array.from(select.options).forEach(option => {
    if (option.value === item) {
      option.disabled = false; // Réactiver l'option
    }
  });

  // Mettre à jour l'affichage
  afficherSelections();
}