let pokemonRepository = (function () {
    let pokemonList = [
        {
            name: 'Bulbasaur',
            height: 0.7,
            weight: 6.9,
            type: ['grass', 'poison']
        },
        {
            name: 'Charmander',
            height: 0.6,
            weight: 8.5,
            type: 'fire'
        },
        {
            name: 'Cubone',
            height: 0.4,
            weight: 6.5,
            type: 'ground'
        },
        {
            name: 'Squirtle',
            height: 0.5,
            weight: 9.0,
            type: 'water'
        }
    ];

    function getAll() {
        return pokemonList;
    }

    function add( pokemon ) {

        if (!Object.keys( pokemon ).every(property => ['name', 'height', 'weight', 'type'].includes(property))) {
            document.write('Pokemon property is wrong' + '<br>');                
        } else if (typeof pokemon.name !== 'string') {
            document.write('Pokemon name "' + pokemon.name + '" is wrong' + '<br>');
        } else if (typeof pokemon.height !== 'number') {
            document.write('Pokemon height "' + pokemon.height + '" is wrong' + '<br>');
        } else if (typeof pokemon.weight !== 'number') {
            document.write('Pokemon weight "' + pokemon.weight + '" is wrong' + '<br>');
        } else if (typeof pokemon.type !== 'string' ) {
            document.write('Pokemon type "' + pokemon.type + '" is wrong' + '<br>');
        } else {
            pokemonList.push( pokemon );
        }
    }

    function addListItem ( pokemon ) {
        let pokemonList = document.querySelector( '.pokemon-list' );
        let listPokemon = document.createElement ( 'li' );
        let button = document.createElement ( 'button' );
        button.innerText = pokemon.name;
        button.classList.add( 'buttonPokemon' );
        listPokemon.appendChild ( button );
        pokemonList.appendChild ( listPokemon );

        addEventListener ( button, pokemon.name )
    }

    function addEventListener ( button, pokemon ) {
        button.addEventListener ( 'click', function (event) {
            showDetails ( pokemon );
        })
    }

    function showDetails ( pokemon ) {
        console.log ( pokemon );
    }

    return {
        getAll: getAll,
        add: add,
        addListItem: addListItem
    }
})();


pokemonRepository.add(
    {
        name: 'Eevee',
        height: 0.3,
        weight: 6.5,
        type: 'normal'
    })


let pokemonList = pokemonRepository.getAll();
pokemonList.forEach ( createPokemon );

function createPokemon ( element ) {
    pokemonRepository.addListItem ( element );    
}

