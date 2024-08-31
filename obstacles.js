import { BinaryRandom, Random } from './utils.js'

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// comet

const comets = [];

function drawComet(comet) {                                                         // drawing object
    ctx.beginPath();                                                                // drawing circle
    ctx.arc(comet.x + comet.radius / 2, 
            comet.y + comet.radius / 2,
            comet.radius / 2, 
            0, Math.PI * 2);
    ctx.fillStyle = comet.color;                                                    // set color
    ctx.fill();

    for (let i = 0; i < 20; i++) {                                                  // drawing comet tail
        ctx.fillStyle = 'red';  
        ctx.fillRect(
            comet.x + Math.random() * comet.radius - comet.radius / 1.5,
            comet.y + Math.random() * comet.radius - comet.radius / 1.5,
            2,
            2
        );
    }
}

function createComet() {                                                            // create object
    const choiceSpeed = Random(8, 12);                                              // determine speed
    const choice = BinaryRandom();                                                  
    const vector = Math.random() * (canvas.width);                                  // determine the movement from which side
    const choiceX = !choice ? vector : 0;
    const choiceY = choice ? vector : 0;
    const grayColors = ['#808080', '#C0C0C0', '#404040'];                           // colors to choose
    const choiceColor = grayColors[Math.floor(Math.random() * grayColors.length)];  // choosen color

    const comet = {                                                                 // create object
        x: choiceX,                                                                 // start position horizontally
        y: choiceY,                                                                 // start position vertically
        radius: 20,                                                                 // object size
        color: choiceColor,                                                         // object color
        speed: choiceSpeed,
        pts: 1,                                                         // object speed (movement rate)
    }
    comets.push(comet);                                                             // add to array
}

function updateComet() {                                                            // updating object data
    comets.forEach((comet, index) => {                                              // each object
        comet.y += comet.speed;                                                     // moving down;
        // asteroid.x -= comet.speed;                                               // moving left;
        comet.x += comet.speed;                                                     // moving right;
        if (comet.y > canvas.height) {                                              // if edge
            comets.splice(index, 1);                                                // remove from array
        }
    });
}

export {
    comets,
    drawComet,
    createComet,
    updateComet,
}

///////////////////
// asteroid

const asteroids = [];

function drawAsteroid(asteroid) {
    ctx.beginPath();                                    // drawing shadow
    ctx.arc((asteroid.x + 2) + (asteroid.radius / 2),   // drawing shadow circle
            (asteroid.y + 2) + (asteroid.radius / 2),   // offset by 2 pixels
            (asteroid.radius / 2),
            0, Math.PI * 2);
    ctx.fillStyle = 'gray';                             // shadow circle color
    ctx.fill();
    ctx.beginPath();                                    // drawing asteroid
    ctx.arc(asteroid.x + (asteroid.radius / 2),         // drawing asteroid circle
            asteroid.y + (asteroid.radius / 2),
            (asteroid.radius / 2),
        0,
        Math.PI * 2);
    ctx.fillStyle = asteroid.color;                     // shadow circle color
    ctx.fill();
}

function createAsteroid() {   
    const randomSize = Random(30, 40);                                  // determine size
    const randomSpeed = Random(3, 5);                                   // determine speed
    const randomX = Math.random() * (canvas.width - randomSize);        // determinestart position horizontally              
    const grayShade = Math.floor(Math.random() * 16).toString(16);      // determine gray shade
    const randomColor = `#${grayShade}${grayShade}${grayShade}`;
    asteroids.push({                                                    // add to array
                    x: randomX,                                         // start position horizontally
                    y: 0,                                               // start position vertically
                    color: randomColor,                                 // object color
                    radius: randomSize,                                 // object size
                    speed: randomSpeed,                                 // object speed (movement rate)
                    pts: 1,});                                          // petitions                                                                  
}

function updateAsteroids() {                                            // updating object data  
    asteroids.forEach((asteroid, index) => {                            // each object
        asteroid.y += asteroid.speed;                                   // moving down;
        if (asteroid.y > canvas.height) {                               // if edge
            asteroids.splice(index, 1);                                 // remove from array
        }
    });
}

export {
    asteroids,
    drawAsteroid,
    createAsteroid,
    updateAsteroids
}

// EXPLOSION
// asteroid.isDestroyed = false;       // Set to true when asteroid is destroyed
// asteroid.explosionRadius = asteroid.radius; // Initial radius for the explosion
// asteroid.explosionAlpha = 1;        // Alpha value for fade-out effect
// asteroid.isVisible = true;          // Visibility flag
// function drawAsteroid(asteroid) {
//     if (!asteroid.isDestroyed) {
//         // Drawing the asteroid and its shadow
//         ctx.beginPath();                                   
//         ctx.arc((asteroid.x + 2) + (asteroid.radius / 2),   
//                 (asteroid.y + 2) + (asteroid.radius / 2),   
//                 (asteroid.radius / 2),
//                 0, Math.PI * 2);
//         ctx.fillStyle = 'gray';                             
//         ctx.fill();
//         ctx.beginPath();                                    
//         ctx.arc(asteroid.x + (asteroid.radius / 2),         
//                 asteroid.y + (asteroid.radius / 2),
//                 (asteroid.radius / 2),
//             0,
//             Math.PI * 2);
//         ctx.fillStyle = asteroid.color;                     
//         ctx.fill();
//     } else {
//         // Drawing the explosion
//         ctx.beginPath();
//         ctx.arc(asteroid.x + (asteroid.radius / 2),
//                 asteroid.y + (asteroid.radius / 2),
//                 asteroid.explosionRadius,
//                 0, Math.PI * 2);
//         ctx.fillStyle = `rgba(255, 69, 0, ${asteroid.explosionAlpha})`; // Orange explosion with transparency
//         ctx.fill();
        
//         // Increase explosion size and fade out
//         asteroid.explosionRadius += 1;  // Increase the explosion size
//         asteroid.explosionAlpha -= 0.05;  // Fade out the explosion

//         // Remove asteroid after explosion effect
//         if (asteroid.explosionAlpha <= 0) {
//             asteroid.isVisible = false;  // Hide the asteroid after the explosion
//         }
//     }
// }