import {
    starship,
    drawStarship,
    startBlinkingInvulnerable,
    stopBlinkingInvulnerable,
    updateStarship,
    onKeyDown,
    onKeyUp,
    bullets,
    drawBullet,
    updateBullet,
    Shot
} from './starship.js';

import {
    hpPackArray,
    drawHpPack,
    createHpPack,
    updateHpPack,
    checkHpCollision,
    ammoPackArray,
    drawAmmoPack,
    createAmmoPack,
    updateAmmoPack,
    checkAmmoCollision
} from './bonuses.js';

import {
    starsTiny,
    drawTinyStar,
    createTinyStar,
    updateTinyStars,
    starsLarge,
    drawLargeStar,
    createLargeStar,
    updateLargeStars
} from './background.js';

import { BinaryRandom, Random } from './utils.js'

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let gameInterval;              // Інтервал для оновлення гри
let isGameOver = false;        // Прапорець, що відображає стан гри (закінчена чи ні)
let isInvulnerable = false;
// let blinkInterval;

export let ammoValue = document.getElementById('ammo-value');
export let hpValue = document.getElementById('hp-value');

hpValue.innerText = starship.hp;
ammoValue.innerText = starship.ammo;

/////////////////////////

/// ASTEROIDS

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
        speed: choiceSpeed,                                                         // object speed (movement rate)
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

///////////////////
// asteroid

const asteroids = [];
const asteroidRadius = 30;
const asteroid2Speed = 3;


function drawAsteroid(asteroid) {
    ctx.beginPath();
    ctx.arc(asteroid.x + 2 + asteroidRadius / 2, asteroid.y + 2 + asteroidRadius / 2, asteroidRadius / 2, 0, Math.PI * 2);
    ctx.fillStyle = 'gray';
    ctx.fill();
    ctx.beginPath();
    ctx.arc(asteroid.x + asteroidRadius / 2, asteroid.y + asteroidRadius / 2, asteroidRadius / 2, 0, Math.PI * 2);
    ctx.fillStyle = asteroid.color || 'gray';
    ctx.fill();


    // for (let i = 0; i < 5; i++) {
    //   ctx.fillStyle = 'yellow';
    //   ctx.fillRect(
    //     asteroid.x + Math.random() * asteroid2Radius - asteroid2Radius / 10,
    //     asteroid.y + Math.random() * asteroid2Radius - asteroid2Radius / 20,
    //     2,
    //     2
    //   );
    // }
}

function createAsteroid() {
    let speed = Math.floor(Math.random() * 5) + 3;
    const x = Math.random() * (canvas.width - asteroidRadius);
    const grayShade = Math.floor(Math.random() * 16).toString(16);
    const color = `#${grayShade}${grayShade}${grayShade}`;
    asteroids.push({ x, y: -asteroidRadius, color, speed });
}

function updateAsteroids() {
    asteroids.forEach((asteroid, index) => {
        asteroid.y += asteroid.speed;  // Переміщуємо перешкоду вниз
        if (asteroid.y > canvas.height) {  // Якщо перешкода вийшла за межі екрану
            asteroids.splice(index, 1);  // Видаляємо її з масиву
        }
    });
}

// const asteroids= [];
// const asteroidRadius = 35;
// const asteroid2Speed = 3;


// function drawAsteroid(asteroid) {
//     ctx.beginPath();
//     ctx.arc(asteroid.x + 2 + asteroid.radius / 2,
//             asteroid.y + 2 + asteroid.radius / 2,
//             asteroid.radius / 2,
//             0, Math.PI * 2);
//     ctx.fillStyle = 'gray';
//     ctx.fill();
//     ctx.beginPath();
//     ctx.arc(asteroid.x + asteroid.radius / 2,
//             asteroid.y + asteroid.radius / 2,
//             asteroid.radius / 2,
//         0,
//         Math.PI * 2);
//     ctx.fillStyle = asteroid.color;
//     ctx.fill();
// }

// function createAsteroid() {
//     console.log('createAsteroid');
//     const size = 35;
//     const choiceSpeed = Random(3, 5);
//     const choiceX = Math.random() * (canvas.width - size);                          
//     const grayShade = Math.floor(Math.random() * 16).toString(16);                  // determine gray shade
//     const choiceColor = `#${grayShade}${grayShade}${grayShade}`;
    
//     const asteroid = {                                                                 // create object
//         x: choiceX,                                                                 // start position horizontally
//         y: 0,                                                                       // start position vertically
//         radius: size,                                                                 // object size
//         color: choiceColor,                                                         // object color
//         speed: choiceSpeed,                                                         // object speed (movement rate)
//     }
//     asteroids.push({ asteroid });                                    // add to array
// }

// function updateAsteroids() {
    
//     asteroids.forEach((asteroid, index) => {
//         asteroid.y += asteroid.speed;  // Переміщуємо перешкоду вниз
//         if (asteroid.y > canvas.height) {  // Якщо перешкода вийшла за межі екрану
//             asteroids.splice(index, 1);  // Видаляємо її з масиву
//         }
//     });
// }

///////////////////////////////////////////

// Функція для перевірки зіткнення гравця з перешкодою
function checkCollision(objects) {
    for (let i = 0; i < objects.length; i++) {
        const object = objects[i];
        if (

            starship.x < object.x + object.radius &&
            starship.x + starship.width > object.x &&
            starship.y < object.y + object.radius &&
            starship.y + starship.height > object.y

        ) {
            return true;
        }
    }
    return false;
}

function checkCrashTarget(objects, bullets) {
    // Loop through bullets array backwards to avoid index issues when removing elements
    for (let bu = bullets.length - 1; bu >= 0; bu--) {
        const bullet = bullets[bu];                             // current bullet
        // Loop through objects array backwards to avoid index issues when removing elements
        for (let ob = objects.length - 1; ob >= 0; ob--) {
            const object = objects[ob];                         // current object

            // Check if the current bullet intersects with the current object
            if (
                bullet.x < object.x + asteroid2Radius &&        // bullet оn the left
                bullet.x + bullet.width > object.x &&           // bullet оn the right
                bullet.y < object.y + asteroid2Radius &&        // bullet is above
                bullet.y + bullet.height > object.y             // bullet is below
            ) {
                console.log('Crash detected');                  // console check

                objects.splice(ob, 1);                          // remove the object from the array
                bullets.splice(bu, 1);                          // remove the bullet from the array
                break;                                          // stop loop since
            }
        }
    }
}



function checkCollisions() {
    if (isInvulnerable) {
        return;                                                 // skip collision
    }

    if (checkCollision(asteroids) || checkCollision(comets)) {

        if (starship.hp > 1) {
            starship.hp--;                                      // less hp
            hpValue.innerText = starship.hp;                    // show in display

            startBlinkingInvulnerable();                        // blinking effect

            setTimeout(() => {
                isInvulnerable = false;                         // disactivate invulnerability
                stopBlinkingInvulnerable();                     // stop blinking
            }, 3000);                                           // 3 sec blinking duration

            starship.x = canvas.width / 2 - 20;                 // back to start position
            starship.y = canvas.height - 60;

            isInvulnerable = true;                              // activate invulnerability

            return;                                             // skip collision
        } else {
            isGameOver = true;
            clearInterval(gameInterval);
            alert("Game Over!");
        }
    }
}


// Функція для малювання всіх елементів на екрані
// background first!!!!
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);  // Clear screen
    starsTiny.forEach(drawTinyStar);  // Draw stars
    starsLarge.forEach(drawLargeStar);  // Draw stars

    asteroids.forEach(drawAsteroid);  // Draw asteroids
    comets.forEach(drawComet);  // Draw comets

    bullets.forEach(drawBullet); // Draw all bullets in the array
    drawStarship();  // Draw starship
    hpPackArray.forEach(drawHpPack);
    ammoPackArray.forEach(drawAmmoPack);
}

// Функція для оновлення стану гри
function update() {
    if (!isGameOver) {
        updateTinyStars();  // Update stars
        updateLargeStars();  // Update stars
        updateAsteroids();  // Update asteroids2
        updateComet();  // Update comets
        updateStarship();  // Update starship position
        updateHpPack();
        updateAmmoPack();
        bullets.forEach(updateBullet); // Update all bullets in the array
        checkCollisions();   // Check for collisions

        checkCrashTarget(asteroids, bullets);
        checkHpCollision(hpPackArray);
        checkAmmoCollision(ammoPackArray);

        draw();             // Draw everything
    }
}

// Start game
function startGame() {
    createHpPack();
    createAmmoPack();
    gameInterval = setInterval(() => {
        update();  // Update game state
        if (Math.random() < 6) {  // 600% chance to create a star
            createTinyStar();
        }
        if (Math.random() < 0.2) {  // 20% chance to create a star
            createLargeStar();
        }
        if (Math.random() < 0.05) {  // 5% chance to create an asteroid2
            createAsteroid();
        }
        if (Math.random() < 0.03) {  // 3% chance to create an Comet
            createComet();
        }
    }, 50);  // Update every 50 milliseconds

}

// BUTTONS

//start

document.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        startGame();
    }
});

// Event listeners for key presses
// document.addEventListener('keydown', onKeyDown);
// document.addEventListener('keyup', onKeyUp);
// document.addEventListener('keydown', Shot);


// Start the game
const btnStart = document.getElementById('btn-start');
btnStart.onclick = () => { startGame() };
// startGame();



