const modalPokemon = document.querySelector(".modalPokemon");
const a = document.querySelector("#hola");
const closeModal = document.querySelector(".closeModal");

a.addEventListener("click", function (e) {
  e.preventDefault();
  modalPokemon.classList.add("modalPokemonActive");
});

closeModal.addEventListener("click", function () {
  modalPokemon.classList.remove("modalPokemonActive");
});
