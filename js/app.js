const searchBox = document.querySelector("#search");
const pokemonCharacters = document.querySelector(".pokemonCharacters");
const leftBtn = document.querySelector("#left");
const rightBtn = document.querySelector("#right");
let arrayPokemons = [];
let pagination = 0;

searchBox.addEventListener("keyup", (e) => {
  const stringSearch = e.target.value.toUpperCase();
  const filteredPokemons = arrayPokemons.filter((pokemon) => {
    return pokemon.name.toUpperCase().includes(stringSearch);
  });
  listPokemons(filteredPokemons);
});

const loadPokemons = () => {
  const promises = [];
  for (let i = 1; i <= 100; i++) {
    const urlApi = `https://pokeapi.co/api/v2/pokemon/${i}`;
    promises.push(fetch(urlApi).then((res) => res.json()));
  }
  Promise.all(promises).then((done) => {
    const Pokemons = done.map((data) => ({
      id: data.id,
      name: data.name,
      image: data.sprites["front_default"],
    }));
    listPokemons(Pokemons);
    arrayPokemons = Pokemons;
  });
};

const listPokemons = (pokemons) => {
  const stringHTML = pokemons
    .map((pokemon) => {
      return `
      <li class="pokemon">
        <img src="${pokemon.image}" alt="${pokemon.name}" />
        <a href="" id="${pokemon.id}">${pokemon.name}</a>
      </li>`;
    })
    .join("");
  pokemonCharacters.innerHTML = stringHTML;
};

rightBtn.addEventListener("click", () => {});

leftBtn.addEventListener("click", () => {});

loadPokemons();
