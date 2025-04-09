// fonctio appelle sur les categories

function toggleSubList(event) {
    event.preventDefault();
    const subList = event.target.nextElementSibling;
    subList.classList.toggle("d-none");
  }

  // fonction appeller sur deplier

  function expandAll(event) {
    event.preventDefault();
    const subLists = document.querySelectorAll("#categories .sub-list");
    subLists.forEach(list => list.classList.remove("d-none"));
  }