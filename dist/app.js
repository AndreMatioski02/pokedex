"use strict";
const pokemonCard = document.querySelector('.pokemon-cards');
const fetchPokemon = () => {
    const promises = [];
    for (let i = 1; i <= 150; i++) {
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        promises.push(fetch(url).then(res => res.json()));
    }
    Promise.all(promises).then(results => {
        const pokemon = results.map(data => ({
            name: data.name,
            id: data.id,
            image: data.sprites["front_default"],
            type: data.types.map((type) => type.type.name).join(", "),
        }));
        displayPokemon(pokemon);
    });
};
const displayPokemon = (pokemon) => {
    const pokemonHTMLString = pokemon
        .map(pokeman => `
         <div class="card">
            <img class="pokemon-image" src="${pokeman.image}" alt="Pokemon">
            <hr class="hr-style">
            <p class="pokemon-description">${pokeman.id}. ${pokeman.name}</p>
            <p class="pokemon-description">Type: ${pokeman.type}</p>
         </div>
      `).join("");
    pokemonCard.innerHTML = pokemonHTMLString;
};
fetchPokemon();
