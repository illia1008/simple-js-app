// We create Pokemon array with their characteristics
let pockemonList = [
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

// This is conditional criteria
let heightLimit = 0.65;

// Create loop to check every element of the array
// for (let i = 0; i < pockemonList.length; i++) {
//     if (pockemonList[i].height > heightLimit) {
//         document.write(pockemonList[i].name + ' (height:' + pockemonList[i].height +
//             ');' + ' - Wow, that\'s big!' + '<br>');
//     }
//     else {
//         document.write(pockemonList[i].name + ' (height:' + pockemonList[i].height +
//             ');' + '<br>');
//     }
//

// forEach loop method1
pockemonList.forEach(pockemon);

function pockemon(element) {
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
// pockemonList.forEach(function(element) {
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
// pockemonList.forEach(element => {
//     if (element.height > heightLimit) {
//         document.write(element.name + ' (height:' + element.height +
//             ');' + ' - Wow, that\'s big!' + '<br>');
//     }
//     else {
//         document.write(element.name + ' (height:' + element.height +
//             ');' + '<br>');
//     }
// });