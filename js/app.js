const searchBox = document.querySelector("#search");
const pokemonCharacters = document.querySelector(".pokemonCharacters");
const leftBtn = document.querySelector("#left");
const rightBtn = document.querySelector("#right");
const modalPokemon = document.querySelector(".modalPokemon");
const pError = document.querySelector(".Error");
let start = 0;
let end = 12;
console.log(start, end);

let arrayPokemons = [];

leftBtn.style = "visibility:hidden";

searchBox.addEventListener("keyup", (e) => {
    hideError();
    const stringSearch = e.target.value.toUpperCase();
    const filteredPokemons = arrayPokemons.filter((pokemon) => {
        return pokemon.name.toUpperCase().includes(stringSearch);
    });
    listPokemons(filteredPokemons.slice(0, 12));
});

const loadPokemons = () => {
    const url = "https://pokeapi.co/api/v2/pokemon?limit=120";
    fetch(url)
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            const Pokemons = data.results.map((pokemon, i = 1) => ({
                name: pokemon.name,
                img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                    i + 1
                }.png`,
                id: i + 1,
            }));
            arrayPokemons = Pokemons;
            listPokemons(Pokemons.slice(start, end));
        });
};

const listPokemons = (pokemons) => {
    if (pokemons.length <= 0) {
        showError();
    }
    const stringHTML = pokemons
        .map((pokemon) => {
            return `
      <li class="pokemon">
        <img src="${pokemon.img}" alt="${pokemon.name}" />
        <span onClick="getDetailPokemon(${pokemon.id})">${pokemon.name}</span>
      </li>`;
        })
        .join("");
    pokemonCharacters.innerHTML = stringHTML;
};

const showError = () => {
    pError.classList.add("ErrorActive");
};

const hideError = () => {
    pError.classList.remove("ErrorActive");
};

const getDetailPokemon = (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    fetch(url)
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            const detailPoke = {
                name: data.name,
                img: data.sprites.front_default,
                types: data.types.map((types) => types.type.name).join(", "),
                base_exp: data.base_experience,
                height: data.height,
                weight: data.weight,
            };
            showDetailPokemon(detailPoke);
            modalPokemon.classList.add("modalPokemonActive");
        });
};

const showDetailPokemon = (pokemon) => {
    const stringHTML = `
  <div class="modalContent">
    <div class="imgPoke">
      <img src="${pokemon.img}"/> 
    </div>
    <div class="prop">
      <p>Name</p>
      <p>Types</p>
      <p>Base Exp.</p>
      <p>Height</p>
      <p>Weight</p>
    </div>
    <div class="value">
      <p>${pokemon.name}</p>
      <p>${pokemon.types}</p>
      <p>${pokemon.base_exp}</p>
      <p>${pokemon.height}</p>
      <p>${pokemon.weight}</p>
    </div>
    <span onClick="closeModal();" class="closeModal">X</span>
  </div>`;
    modalPokemon.innerHTML = stringHTML;
};

const closeModal = () => {
    modalPokemon.classList.remove("modalPokemonActive");
};

rightBtn.addEventListener("click", () => {
    // listPokemons(["0"]);
    leftBtn.style = "visibility: visible";
    start += 12;
    end += 12;
    listPokemons(arrayPokemons.slice(start, end));
    if (end == 120) {
        rightBtn.style = "visibility: hidden";
    }
});

leftBtn.addEventListener("click", () => {
    // listPokemons(["0"]);
    start -= 12;
    end -= 12;
    listPokemons(arrayPokemons.slice(start, end));
    if (start == 0) {
        leftBtn.style = "visibility: hidden";
    }
    if (end == 108) {
        rightBtn.style = "visibility: visible";
    }
});

loadPokemons();
