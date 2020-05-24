const pokemonCharacters = document.querySelector(".pokemonCharacters");
const leftBtn = document.querySelector("#left");
const rightBtn = document.querySelector("#right");
let pagination = 0;

const loadPokemons = () => {
  const promises = [];
  for (let i = 1; i <= pagination + 12; i++) {
    const urlApi = `https://pokeapi.co/api/v2/pokemon/${i}`;
    promises.push(fetch(urlApi).then((res) => res.json()));
  }
  Promise.all(promises).then((done) => {
    const Pokemons = done.map((data) => ({
      name: data.name,
      image: data.sprites["front_default"],
    }));
    listPokemons(Pokemons);
  });
};

const listPokemons = (pokemons) => {
  const stringHTML = pokemons
    .map((pokemon) => {
      return `
      <li class="pokemon">
        <img src="${pokemon.image}" alt="${pokemon.name}" />
        <a href="">${pokemon.name}</a>
      </li>`;
    })
    .join("");
  pokemonCharacters.innerHTML = stringHTML;
};

rightBtn.addEventListener("click", () => {});

leftBtn.addEventListener("click", () => {});

loadPokemons();
