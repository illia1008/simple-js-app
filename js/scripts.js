let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=5';

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
        let listPokemon = document.querySelector('.pokemon-list');
        let listItem = document.createElement('li');
        let button = document.createElement('button');
        button.innerText = pokemon.name;
        listPokemon.classList.add('buttonContainer');
        listItem.classList.add('buttonItem');
        button.classList.add('buttonPokemon');
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
            item.imageFrontUrl = details.sprites.front_default;
            item.imageBackUrl = details.sprites.back_default;
            item.height = details.height;
            item.weight = details.weight;
            item.types = details.types;
        }).catch(function (e) {
            console.error(e);
        });
    }

    function showDetails(item) {
        loadDetails(item).then(function () {
            showModal(item.name, item.height, item.weight, item.imageFrontUrl,
                item.imageBackUrl);
        });
    }

    function showModal(name, height, weight, imgFront, imgBack) {
        let modalContainer = document.querySelector('#modal-container');
        modalContainer.innerHTML = '';
        let modal = document.createElement('div');
        modal.classList.add('modal');

        let closeButtonElement = document.createElement('button');
        closeButtonElement.classList.add('modal-close');
        closeButtonElement.innerText = 'Close';
        closeButtonElement.addEventListener('click', hideModal);

        window.addEventListener('keydown', (e) => {
            let modalContainer = document.querySelector('#modal-container');
            if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
                hideModal();
            }
        });

        modalContainer.addEventListener('click', (e) => {
            let target = e.target;
            if (target === modalContainer) {
                hideModal();
            }
        });

        let nameElement = document.createElement('h3');
        nameElement.innerText = 'Pokemon name is ' + name;

        let heightElement = document.createElement('p');
        heightElement.innerText = 'Pokemon height is ' + height;

        let weightElement = document.createElement('p');
        weightElement.innerText = 'Pokemon weight is ' + weight;

        let imageElementFront = document.createElement('img');
        imageElementFront.src = imgFront;
        imageElementFront.classList.add('imagePokemon');

        let imageElementBack = document.createElement('img');
        imageElementBack.src = imgBack;
        imageElementBack.classList.add('imagePokemon');

        modal.appendChild(closeButtonElement);
        modal.appendChild(nameElement);
        modal.appendChild(heightElement);
        modal.appendChild(weightElement);
        modal.appendChild(imageElementFront);
        modal.appendChild(imageElementBack);
        modalContainer.appendChild(modal);

        modalContainer.classList.add('is-visible');
    }

    // Close modal function
    function hideModal() {
        let modalContainer = document.querySelector('#modal-container');
        modalContainer.classList.remove('is-visible');
    }

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

