const fs = require('fs');
const { parse } = require('csv-parse');
const path = require('path'); // Remove curly braces for 'path'

const habitablePlanets = [];

function isHabitablePlanet(planet) {
    return (
        planet['koi_disposition'] === 'CONFIRMED' &&
        planet['koi_insol'] > 0.36 &&
        planet['koi_insol'] < 1.11 &&
        planet['koi_prad'] < 1.6
    );
}

 function loadPlanetsData() {
    return new Promise((resolve, reject) => {
        fs.createReadStream(path.join(__dirname, '..', '..', 'data', 'kepler_data.csv'))
            .pipe(parse({
                comment: '#',
                columns: true,
            }))
            .on('data', (data) => {
                if (isHabitablePlanet(data)) {
                    habitablePlanets.push(data);
                }
            })
            .on('error', (err) => {
                console.error(err);
                reject(err);
            })
            .on('end', () => {
                console.log(`${habitablePlanets.length} habitable planets found!`);
                resolve();
            });
    });
}

// Invoke the function to populate the habitablePlanets array before exporting
// async function initializeData() {
//     try {
//         await loadPlanetsData();
//     } catch (error) {
//         console.error('Error loading planet data:', error);
//     }
// }

// initializeData(); // Invoke the initialization function

// Correct way to export the habitablePlanets array
// exports.planets = habitablePlanets;
module.exports = {
    loadPlanetsData,
    planets:habitablePlanets,
};
// const fs = require('fs');
// const { parse } = require('csv-parse');
// const path  = require('path');

// const habitablePlanets = [];

// function isHabitablePlanet(planet) {
//     return (
//         planet['koi_disposition'] === 'CONFIRMED' &&
//         planet['koi_insol'] > 0.36 &&
//         planet['koi_insol'] < 1.11 &&
//         planet['koi_prad'] < 1.6
//     );
// }

// function loadPlanetsData() {
//     return new Promise((resolve, reject) => {
//         fs.createReadStream(path.join(__dirname, '..', '..', 'data', 'kepler_data.csv'))
//             .pipe(parse({
//                 comment: '#',
//                 columns: true,
//             }))
//             .on('data', (data) => {
//                 if (isHabitablePlanet(data)) {
//                     habitablePlanets.push(data);
//                 }
//             })
//             .on('error', (err) => {
//                 console.error(err);
//                 reject(err);
//             })
//             .on('end', () => {
//                 console.log(`${habitablePlanets.length} habitable planets found!`);
//                 resolve();
//             });
//     });
// }

// // Invoke the function to populate the habitablePlanets array before exporting
// async function initializeData() {
//     try {
//         await loadPlanetsData();
//     } catch (error) {
//         console.error('Error loading planet data:', error);
//     }
// }

// initializeData(); // Invoke the initialization function

// exports = {
//     planets: habitablePlanets,
// };
