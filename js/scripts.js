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
        let listPokemon = document.querySelector('.list-group');
        let listItem = document.createElement('li');
        listItem.classList.add('list-group-item');
        let button = document.createElement('button');
        button.innerText = pokemon.name;
        button.classList.add('btn', 'btn-primary', 'buttonPokemon');
        button.setAttribute('data-toggle', 'modal');
        button.setAttribute('data-target', '#exampleModal');
        listItem.appendChild(button);
        listPokemon.appendChild(listItem);

        button.addEventListener('click', function () {
            showDetails(pokemon);
        });
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
            item.imageUrlFront = details.sprites.front_default;
            item.imageUrlBack = details.sprites.back_default;
            item.height = details.height;
            item.weight = details.weight;
            item.types = details.types.map(type => type.type.name).join(', ');
            item.abilities = details.abilities.map(ability => ability.ability.name).join(', ');
        }).catch(function (e) {
            console.error(e);
        });
    }    

    function showDetails(item) {
        loadDetails(item).then(function () {
            showModal(item);
        });
    }

    function showModal(item) {
        let modalBody = $('.modal-body');
        let modalTitle = $('.modal-title');
        let modalHeader = $('.modal-header');

        modalTitle.empty();
        modalBody.empty();

        let nameElement = $('<h1>' + item.name + '</h1>');
        let imageElementFront = $('<img class = "modal-img" style = "width:20%">');
        imageElementFront.attr('src', item.imageUrlFront);
        let imageElementBack = $('<img class = "modal-img" style = "width:20%">');
        imageElementBack.attr('src', item.imageUrlBack);
        let heightElement = $('<p>' + 'height: ' + item.height + '</p>');
        let weightElement = $('<p>' + 'weight: ' + item.weight + '</p>');
        let typesElement = $('<p>' + 'types: ' + item.types + '</p>');
        let abilitiesElement = $('<p>' + 'abilities: ' + item.abilities + '</p>');

        modalTitle.append(nameElement);
        modalBody.append(imageElementFront);
        modalBody.append(imageElementBack);
        modalBody.append(heightElement);
        modalBody.append(weightElement);
        modalBody.append(typesElement);
        modalBody.append(abilitiesElement);    
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







// Old code parts


    // function addListItem(pokemon) {
    //     let listPokemon = document.querySelector('.list-group');
    //     let listItem = document.createElement('li');
    //     let button = document.createElement('button');
    //     button.innerText = pokemon.name;
    //     listPokemon.classList.add('buttonContainer');
    //     listItem.classList.add('list-group-item');
    //     button.classList.add('buttonPokemon');
    //     listItem.appendChild(button);
    //     listPokemon.appendChild(listItem);

    //     addEventListener(button, pokemon);
    // }

    // function addEventListener(button, pokemon) {
    //     button.addEventListener('click', function (event) {
    //         showDetails(pokemon);
    //     })
    // }


    // function loadDetails(item) {
    //     let url = item.detailsUrl;
    //     return fetch(url).then(function (response) {
    //         return response.json();
    //     }).then(function (details) {
    //         item.imageUrl = details.sprites.front_default;
    //         item.height = details.height;
    //         item.types = details.types;
    //     }).catch(function (e) {
    //         console.error(e);
    //     });
    // }

        // let modalContainer = document.querySelector('#modal-container');
        // modalContainer.innerHTML = '';
        // let modal = document.createElement('div');
        // modal.classList.add('modal');

        // let closeButtonElement = document.createElement('button');
        // closeButtonElement.classList.add('modal-close');
        // closeButtonElement.innerText = 'Close';
        // closeButtonElement.addEventListener('click', hideModal);

        // window.addEventListener('keydown', (e) => {
        //     let modalContainer = document.querySelector('#modal-container');
        //     if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
        //         hideModal();
        //     }
        // });

        // modalContainer.addEventListener('click', (e) => {
        //     let target = e.target;
        //     if (target === modalContainer) {
        //         hideModal();
        //     }
        // });

        // let nameElement = document.createElement('h3');
        // nameElement.innerText = 'Pokemon name is ' + name;

        // let heightElement = document.createElement('p');
        // heightElement.innerText = 'Pokemon height is ' + height;

        // let imageElement = document.createElement('img');
        // imageElement.src = img;
        // imageElement.classList.add('imagePokemon');

        // modal.appendChild(closeButtonElement);
        // modal.appendChild(nameElement);
        // modal.appendChild(heightElement);
        // modal.appendChild(imageElement);
        // modalContainer.appendChild(modal);

        // modalContainer.classList.add('is-visible');

        // Close modal function
    // function hideModal() {
    //     let modalContainer = document.querySelector('#modal-container');
    //     modalContainer.classList.remove('is-visible');
    // }