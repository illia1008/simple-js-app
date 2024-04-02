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

    function add(pokemon) {
        pokemonList.push(pokemon);
    }

    return {
        getAll: getAll,
        add: add
    }
})();

console.log(pokemonRepository.getAll());

pokemonRepository.add(
    {
        name: 'Eevee',
        height: 0.3,
        weight: 6.5,
        type: ['normal']
    })

console.log(pokemonRepository.getAll());

let pokemonList = pokemonRepository.getAll();

// This is conditional criteria
let heightLimit = 0.65;

// forEach loop method1
pokemonList.forEach(pokemon);

function pokemon(element) {
    if (element.height > heightLimit) {
        document.write(element.name + ' (height:' + element.height +
            ');' + ' - Wow, that\'s big!' + '<br>');
    }
    else {
        document.write(element.name + ' (height:' + element.height +
            ');' + '<br>');
    }
}

// forEach loop method2
// pokemonList.forEach(function(element) {
//     if (element.height > heightLimit) {
//         document.write(element.name + ' (height:' + element.height +
//             ');' + ' - Wow, that\'s big!' + '<br>');
//     }
//     else {
//         document.write(element.name + ' (height:' + element.height +
//             ');' + '<br>');
//     }
// });

// forEach loop method3
// pokemonList.forEach(element => {
//     if (element.height > heightLimit) {
//         document.write(element.name + ' (height:' + element.height +
//             ');' + ' - Wow, that\'s big!' + '<br>');
//     }
//     else {
//         document.write(element.name + ' (height:' + element.height +
//             ');' + '<br>');
//     }
// });