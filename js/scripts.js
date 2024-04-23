let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=10';

    function add(pokemon) {
        if (
            typeof pokemon === "object" && "name" in pokemon
        ) {
            pokemonList.push(pokemon);
        } else {
            console.log("pokemon is not correct");
        }
    }

    function getAll() {
        return pokemonList;
    }

    function addListItem(pokemon) {
        let listPokemon = document.querySelector('.list-group');
        let listItem = document.createElement('li');
        let button = document.createElement('button');
        button.innerText = pokemon.name;
        button.classList.add('btn', 'btn-primary');
        button.setAttribute('data-target', '#pokemonModal');
        button.setAttribute('data-toggle', 'modal');
        listItem.classList.add('list-group-item');
        listItem.appendChild(button);
        listPokemon.appendChild(listItem);

        addEventListener(button, pokemon);
    }

    function addEventListener(button, pokemon) {
        button.addEventListener('click', function (event) {
            showDetails(pokemon);
        })
    }

    function loadList() {
        return fetch(apiUrl).then(function (response) {
            return response.json();
        }).then(function (json) {
            json.results.forEach(function (item) {
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url
                };
                add(pokemon);
                console.log(pokemon);
            });
        }).catch(function (e) {
            console.error(e);
        })
    }

    function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function (details) {
            item.name = details.name;
            item.imageUrlFront = details.sprites.front_default;
            item.imageUrlBack = details.sprites.back_default;
            item.height = details.height;
            item.weight = details.weight;
            item.types = details.types;
            item.abilities = details.abilities;
        }).catch(function (e) {
            console.error(e);
        });
    }

    let modal = document.querySelector('.modal');

    function showDetails(item) {
        loadDetails(item).then(function () {
            showModal(item);
        });
    }

    function showModal(pokemon) {
        let modalBody = document.querySelector('.modal-body');
        let modalHeader = document.querySelector('.modal-header');
        modalBody.innerHTML = '';


        let modalTitle = document.querySelector('.modal-title');
        let closeButtonElement = document.querySelector('.close');

        let pokemonName = document.createElement('h2');
        pokemonName.innerHTML = pokemon.name;

        let pokemonHeight = document.createElement('p');
        pokemonHeight.innerHTML = 'Height: ' + pokemon.height;

        let pokemonweight = document.createElement('p');
        pokemonweight.innerHTML = 'Weight: ' + pokemon.weight;

        let pokemonType = document.createElement('p');
        let types = pokemon.types.map(type => type.type.name);
        pokemonType.innerHTML = 'Types: ' + types.join(', ');

        let abilities = document.createElement('p');
        let abilitiesList = pokemon.abilities.map(ability => ability.ability.name);
        abilities.innerText = 'Abilities: ' + abilitiesList.join(', ');


        let imageElementFront = document.createElement('img');
        imageElementFront.classList.add('modal-img');
        imageElementFront.src = pokemon.imageUrlFront;


        let imageElementBack = document.createElement('img');
        imageElementBack.classList.add('modal-img');
        imageElementBack.src = pokemon.imageUrlBack;

        modalHeader.appendChild(modalTitle);
        modalHeader.appendChild(closeButtonElement);
        modalBody.appendChild(pokemonName);
        modalBody.appendChild(pokemonHeight);
        modalBody.appendChild(pokemonweight);
        modalBody.appendChild(pokemonType);
        modalBody.appendChild(abilities);
        modalBody.appendChild(imageElementFront);
        modalBody.appendChild(imageElementBack);
    }


    function closeModal() {
        modal.classList.remove('is-visible');
    }

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('is-visible')) {
            closeModal();
        }
    });

    modal.addEventListener('click', (e) => {
        let target = e.target;
        if (target === modal) {
            closeModal();
        }

    });

    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
        showDetails: showDetails
    };
})();


pokemonRepository.loadList().then(function () {
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});

