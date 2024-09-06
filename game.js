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
    Shot,
    Blast
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
    checkAmmoCollision,
    blastPackArray,
    drawBlastPack,
    createBlastPack,
    updateBlastPack,
    checkBlastCollision
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

import {
    comets,
    drawComet,
    createComet,
    updateComet,
    asteroids,
    drawAsteroid,
    createAsteroid,
    updateAsteroids
} from './obstacles.js';

import {
    darkMode,
    sound,
    music,
    toggleDark,
    toggleSound,
    toggleMusic,
    togglePause
} from './nav-buttons.js';

import { keys } from './keys.js';

// import { updateSetting } from './DBStorage.js';

import {
    BinaryRandom,
    Random,
    toReduceSound,
    toLoopMusic,
    showMessage
} from './utils.js';

export const canvas = document.getElementById('gameCanvas');
export const ctx = canvas.getContext('2d');

export const startTheme = new Audio('./assets/sounds/space-adventure.mp3');
export const mainTheme = new Audio('./assets/sounds/space-line.mp3');
export const damageCrash = new Audio('./assets/sounds/damage-crash.mp3');
export const blastExplosion = new Audio('./assets/sounds/blast-explosion.mp3');
export const laserShot = new Audio('./assets/sounds/laser-shot.mp3');
export const starshipCrash = new Audio('./assets/sounds/starship-crash.mp3');
export const levelUpSound = new Audio('./assets/sounds/level-up.mp3');
export const collectBonusSound = new Audio('./assets/sounds/collect-bonus.mp3');
export const clickButtonSound = new Audio('./assets/sounds/click-button.mp3');

export let gameInterval;                // game update interval
export let isGame = false;              // game state
export let isPaused = false;            // game state
export let isGameOver = false;          // game state
export let isInvulnerable = false;      // spceship state
export let FPS = 55;                    // game speed

export let score = 0;                   
export let levelScore = 0;                   
export let ammoScore = 0;                   
export let hpScore = 0;                   
export let blastScore = 0;                   

export let scoreValue = document.getElementById('score-value');
export let levelValue = document.getElementById('level-value');
export let hpValue = document.getElementById('hp-value');
export let ammoValue = document.getElementById('ammo-value');
export let blastValue = document.getElementById('blast-value');

scoreValue.innerText = score;
// levelValue.innerText = 1;
hpValue.innerText = starship.hp;
ammoValue.innerText = starship.ammo;
blastValue.innerText = starship.blast;


///////////////////////////////////////////
// GAME EVENTS

function checkCollision(objects) {          // check collides player  with obstacle
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
                bullet.x < object.x + object.radius &&        // bullet оn the left
                bullet.x + bullet.width > object.x &&           // bullet оn the right
                bullet.y < object.y + object.radius &&        // bullet is above
                bullet.y + bullet.height > object.y             // bullet is below
            ) {
                if (sound) { toReduceSound(damageCrash, 0.4) };
                Scores (object.pts);                            // score counter
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

            if (sound) {                                        // crash sound
                starshipCrash.play();
            };

            startBlinkingInvulnerable();                        // blinking effect
            setTimeout(() => {
                isInvulnerable = false;                         // disactivate invulnerability
                stopBlinkingInvulnerable();                     // stop blinking
            }, 2000);                                           // 2 sec blinking duration
            starship.x = canvas.width / 2 - 20;                 // back to start position
            starship.y = canvas.height - 60;
            isInvulnerable = true;                              // activate invulnerability
            return;                                             // skip collision
        } else {
            starship.hp--;                                      // less hp
            hpValue.innerText = starship.hp;                    // show in display

            if (sound) {                                        // explosion sound
                blastExplosion.currentTime = 1;                 // sound beginning from 1st sec
                blastExplosion.play();
            };
            let blinkInterval = setInterval(() => {             // spaceship explosion effect
                canvas.style.backgroundColor = canvas.style.backgroundColor === 'transparent' ? 'white' : 'transparent';
            }, 400);
            setTimeout(() => {
                clearInterval(blinkInterval);
                canvas.style.backgroundColor = 'tomato';
            }, 1000);

            clearInterval(gameInterval);                        // stop update chances

            isGame = false;
            isGameOver = true;
        }
    }
}

// background first!!!!
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);   // clear screen
    if (isGame) {
        starsTiny.forEach(drawTinyStar);                    // draw stars
        starsLarge.forEach(drawLargeStar);                  // draw stars
        asteroids.forEach(drawAsteroid);                    // draw asteroids
        comets.forEach(drawComet);                          // draw comets
        bullets.forEach(drawBullet);                        // draw all bullets in the array
        drawStarship();                                     // draw starship
        hpPackArray.forEach(drawHpPack);                    // draw HP
        ammoPackArray.forEach(drawAmmoPack);                // draw ammo
        blastPackArray.forEach(drawBlastPack);              // draw blast
    }                   
}

function update() {                                     // update positions
    if (isGame) {                                       // if true
        updateTinyStars();                              // update stars
        updateLargeStars();                             // update stars
        updateAsteroids();                              // update asteroids2
        updateComet();                                  // update comets
        updateStarship();                               // update starship
        updateHpPack();                                 // update hp
        updateAmmoPack();                               // update ammo
        updateBlastPack();                              // update blast
        bullets.forEach(updateBullet);                  // update bullets

        checkCollisions();                              // check collisions
        checkCrashTarget(asteroids, bullets);
        checkHpCollision(hpPackArray);
        checkAmmoCollision(ammoPackArray);
        checkBlastCollision(blastPackArray);

        draw();                                         // draw everything
    }
}

function updateObjectChances() {                        // update chance to create objects

        if (Math.random() < 1) {                        // 100% chance to create a star
            createTinyStar();
        }
        if (Math.random() < 0.2) {                      // 20% chance to create a star
            createLargeStar();
        }
        if (Math.random() < 0.07) {                    // 7% chance to create an asteroid
            createAsteroid();
        }
        if (Math.random() < 0.03) {                     // 3% chance to create a Comet
            createComet();
        }
}

function screenStartGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    canvas.style.backgroundColor = '';
    ctx.fillStyle = 'white';
    ctx.font = '45px Pixelify Sans';
    ctx.textAlign = 'center'
    ctx.fillText("STAR BLAST", canvas.width / 2, canvas.height / 2);
}

function screenGameOver() {
    setInterval(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        canvas.style.backgroundColor = '';
        ctx.fillStyle = 'white';
        ctx.font = '45px Pixelify Sans';
        ctx.textAlign = 'center'
        ctx.fillText("GAME OVER!", canvas.width / 2, canvas.height / 2);
    }, 1500);
}

export function Scores (pts) {                  // score counter
    score += pts;                               // common score counter
    levelScore += pts;                          // level score counter
    ammoScore += pts;                           // ammo score counter
    hpScore += pts;                             // hp score counter
    blastScore += pts;                          // blast score counter
    scoreValue.innerText = score;
}

// Start game
function startGame() {
    hpValue.innerText = starship.hp;
    ammoValue.innerText = starship.ammo;
    blastValue.innerText = starship.blast;
    if (!isGame) {
        if (music) { 
            mainTheme.volume = 0.7;
            toLoopMusic(mainTheme) };
        isGame = true;
        isGameOver = false;

        showMessage('DESTROY ASTEROIDS!!!');

        createHpPack();                                     // creating ammo pack
        createAmmoPack();                                   // creating hp pack
        createBlastPack();                                  // creating blast pack
        startGameInterval();                               // starting a game interval
    }
}

function startGameInterval() {
    clearInterval(gameInterval);                           // stopping the current interval, if it exists

    gameInterval = setInterval(() => {
        update();                                       // update game state
        updateObjectChances();                          // update chance to create objects

        if (levelScore % 25 === 0 && levelScore !== 0) {// new level every 25 points
            
            showMessage('LEVEL UP!');
            
            levelValue.innerText++;                   // next level
            if (sound) { levelUpSound.play() };          // signal next level
            levelScore = 0;                             // reset level score counter
            FPS -= 5;                                  // FPS reduction
            createAmmoPack();                           // bonus ammo pack
            
            startGameInterval();                        // restart interval with new FPS value
            
        };
        if (ammoScore % 9 === 0 && ammoScore !== 0) {  // creating ammo pack every ten points
            createAmmoPack();                           // creating ammo pack
            ammoScore = 0;                              // reset ammo pack counter
        };
        if (hpScore % 47 === 0 && hpScore !== 0) {      // creating hp pack every fifty points
            createHpPack();                             // creating hp pack
            createAmmoPack();                           // bonus ammo pack
            hpScore = 0;                                // reset hp pack counter
        };
        if (blastScore % 28 === 0 && blastScore !== 0) {// creating blast pack every fifty points
            createBlastPack();                          // creating blast pack
            createAmmoPack();                           // bonus ammo pack
            blastScore = 0;                             // reset blast pack counter
        };

        if (isGameOver && !isGame) {
            screenGameOver();
        }
    }, FPS);                                             // update every FPS milliseconds
}


export function pauseGame() {
    if (isGame) {
        if (isPaused) {                                 // Resume the game
            gameInterval = setInterval(() => {
                update();                               // update game state
                updateObjectChances();                  // update chance to create objects
            }, FPS);                                    // Update every FPS milliseconds
            isPaused = false;
            togglePause();
            
        } else {                                        // pause the game    
            clearInterval(gameInterval);
            isPaused = true;
            togglePause();
            showMessage('PAUSE');
        }
    }
}

///////////////////////////////////////////////////////////////////////
// KEYS

document.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && !isGameOver) {
        if (sound) { clickButtonSound.play() };
        startGame();
    }
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'p') {
        if (sound) { clickButtonSound.play() };
        pauseGame();
        console.log('pauseGame');
    }
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'd') {
        if (sound) { clickButtonSound.play() };
        toggleDark();
        console.log('toggleDark');
    }
});   

document.addEventListener('keydown', (event) => {
    if (event.key === 's') {
        clickButtonSound.play();
        toggleSound();       
        console.log('toggleSound');
    }
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'm') {
        if (sound) { clickButtonSound.play() };
        toggleMusic(); 
        music ? mainTheme.play() : mainTheme.pause();
        console.log('toggleMusic'); 
    }
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'n') {
        if (sound) { clickButtonSound.play() };
        window.location.reload();
        console.log('reload'); 
    }
});    

document.addEventListener('keydown', (event) => {
    if (event.key === '0') {
        Blast(comets);
        Blast(asteroids);
        if (starship.blast > 0) {
            starship.blast--;
            blastValue.innerText = starship.blast;
        }
    }
});

///////////////////////////////////////////////////////////////////////
// NAV BUTTONS

const btnStart = document.getElementById('btn-start');
btnStart.onclick = () => { 
    startGame();
    btnStart.blur();
 };


function exitGame() {
    document.body.textContent = 'Thank you for visiting!';
    setTimeout(() => { window.close() }, 3000);
}

const btnExitGame = document.getElementById('btn-exit-game');
btnExitGame.onclick = () => { 
    exitGame() 
};

const buttonDarkMode = document.getElementById('btn-dark-mode');
buttonDarkMode.onclick = () => { 
    toggleDark(); 
    buttonDarkMode.blur();
    canvas.focus();
};

const buttonSoundMode = document.getElementById('btn-sound-mode');
buttonSoundMode.onclick = () => { 
    toggleSound(); 
    buttonSoundMode.blur();
    canvas.focus();
};

const buttonMusicMode = document.getElementById('btn-music-mode');
buttonMusicMode.onclick = () => { 
    toggleMusic();
    music ? mainTheme.play() : mainTheme.pause(); 
    buttonMusicMode.blur();
    canvas.focus();
};

const buttonNewGame = document.getElementById('btn-new-game');
buttonNewGame.onclick = () => { 
    window.location.reload();
    buttonNewGame.blur();
    canvas.focus();
};

const buttonPause = document.getElementById('btn-pause');
buttonPause.onclick = () => { 
    pauseGame(); 
    buttonPause.blur();
    canvas.focus();
};


////////////////////////////////////////////////////////////////////////
// START
screenStartGame();

