let pokemonsNumber = 1;
let transparent = false;

async function fetchPokemons(index) {
  if(index) {
    for (let i = pokemonsNumber + 1; i <= index; i++) {
      await getPokemons(i);
    };
    return;
  };
  
  for (let i = 1; i <= pokemonsNumber; i++) {
    await getPokemons(i);
  };
};

const getPokemons = async id => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}/`;
  const res = await fetch(url);
  const json = await res.json();
  
  createCard(json);
};

const createCard = pokemon => {
  function getTypes(array) {
    let types = [];
    array.forEach((element, index) => {
      types.push(element.type.name)
    });
    return types.join(', ');
  }
  
  const container = document.querySelector('.container');
  const div = document.createElement('div');
  div.setAttribute('class', 'pokemon')
  const { id, name, sprites, types } = pokemon;
  console.log(sprites)
  const type = getTypes(types);
  const pokeInnerHtml = `
    <img src="${sprites.front_default}" alt="${name}" />
    <h1>Name: ${name}</h1>
    <h2 class="id">Id: ${id}</h2>
    <h2>Type: ${type}</h2>
  `
  
  div.innerHTML = pokeInnerHtml;
  if(transparent) {
    div.setAttribute('transparent', 'true')
  }
  container.appendChild(div);
};

document.querySelector('button').addEventListener('click', () => {
  let next = pokemonsNumber + 10;
  fetchPokemons(next);
  pokemonsNumber += 10;
  transparent = true;
});

fetchPokemons();

document.addEventListener('scroll', () => {
  elements = document.querySelectorAll('.pokemon');
  elements.forEach((element, index) => {
    if(element.getBoundingClientRect().top < window.innerHeight - 200) {
      element.removeAttribute('transparent');
    }
  });
});
