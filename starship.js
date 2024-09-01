import {
    ammoValue,
    blastValue,
    isPaused,
    isGame,
    blastExplosion,
    laserShot,
    score,
    Scores
} from './game.js';

import {
    keys,
    onKeyDown,
    onKeyUp
} from './keys.js';

import {
    sound,
    music,
    darkMode
} from './nav-buttons.js';

import {
    toReduceSound
} from './utils.js';

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');



let blinkInterval;

const starship = {
    x: canvas.width / 2 - 20,  // X-axis starting position
    y: canvas.height - 60,     // Y-axis starting position
    width: 35,
    height: 40,
    color: 'lightblue',
    dx: 5,                      // move step by X
    dy: 5,                      // move step by Y
    //drawinhg
    flameWidth: 10,
    flameHeight: 3,
    flameColor: 'tomato',
    widthFuselage: 10,
    heightFuselage: 20,
    colorFuselage: 'grey',
    widthCockpit: 8,
    heightCockpit: 10,
    colorCockpit: 'blue',

    hp: 1,
    ammo: 10,
    blast: 1
};

function drawStarshipFuselage() {
    ctx.fillStyle = starship.colorFuselage;
    ctx.fillRect(   starship.x + ((starship.width / 2) - (starship.widthFuselage / 2)), 
                    starship.y + starship.height / 2, 
                    starship.widthFuselage, 
                    starship.heightFuselage);
}

function drawStarshipCockpit() {
    ctx.fillStyle = starship.colorCockpit;
    ctx.fillRect(   starship.x + ((starship.width / 2) - (starship.widthCockpit / 2)), 
                    starship.y + starship.height / 2.5, 
                    starship.widthCockpit, 
                    starship.heightCockpit);
}
function drawStarshipFlame() {
    ctx.fillStyle = starship.flameColor;
    ctx.fillRect(   starship.x + ((starship.width / 2) - (starship.flameWidth / 2)), 
                    starship.y + starship.height, 
                    starship.flameWidth, 
                    starship.flameHeight);
}

function drawStarship() {

    // let gradient = ctx.createLinearGradient(starship.x, starship.y, starship.x + starship.width, starship.y + starship.height);
    // gradient.addColorStop(0, 'lightblue');
    // gradient.addColorStop(1, 'blue');
    // ctx.fillStyle = gradient;

    ctx.beginPath();
    ctx.fillStyle = starship.color;
    ctx.moveTo( starship.x + starship.width / 2, 
                starship.y);                        // top
    ctx.lineTo( starship.x, 
                starship.y + starship.height);      // left
    ctx.lineTo( starship.x + starship.width, 
                starship.y + starship.height);      // right
    ctx.closePath();
    ctx.fill();

    drawStarshipFuselage();
    drawStarshipCockpit();
    drawStarshipFlame();
}

// starshipstates
function startBlinkingHp() {
    blinkInterval = setInterval(() => {
        starship.color = starship.color === 'transparent' ? 'green' : 'transparent';
    }, 75);
}

function stopBlinkingHp() {
    clearInterval(blinkInterval);
    starship.color = 'lightblue';
}

function startBlinkingAmmo() {
    blinkInterval = setInterval(() => {
        starship.color = starship.color === 'transparent' ? 'blue' : 'transparent';
    }, 75);
}

function stopBlinkingAmmo() {
    clearInterval(blinkInterval);
    starship.color = 'lightblue';
}

function startBlinkingInvulnerable() {
    blinkInterval = setInterval(() => {
        starship.color = starship.color === 'transparent' ? 'red' : 'transparent';
    }, 75);
}

function stopBlinkingInvulnerable() {
    clearInterval(blinkInterval);
    starship.color = 'lightblue';
}
///////////////////////////////////

function updateStarship() {                     // Update starship position based on key states
    if (keys.ArrowLeft && starship.x > 0) {
        starship.x -= starship.dx;
    }
    if (keys.ArrowRight && starship.x + starship.width < canvas.width) {
        starship.x += starship.dx;
    }
    if (keys.ArrowUp && starship.y > 0) {
        starship.y -= starship.dy;

    }
    if (keys.ArrowDown && starship.y + starship.height < canvas.height) {
        starship.y += starship.dy;
        starship.flameHeight = 1;
    };

    if (keys.ArrowRight || keys.ArrowLeft) {
        starship.width = 28;
    }
    else { starship.width = 35; };

    if (keys.ArrowUp) {
        starship.flameHeight = 8;
        starship.flameColor = 'red';
    }
    else if (keys.ArrowDown) {
        starship.flameHeight = 2;
        starship.flameColor = 'orange';
    }
    else {
        starship.flameHeight = 3;
        starship.flameColor = 'tomato';
    };
}

export {
    starship,
    drawStarship,
    startBlinkingHp,
    stopBlinkingHp,
    startBlinkingAmmo,
    stopBlinkingAmmo,
    startBlinkingInvulnerable,
    stopBlinkingInvulnerable,
    updateStarship,
    onKeyDown,
    onKeyUp
};
///////////////////////////////////////////////////////////////////////////////////////
//SHOTING

let bullets = []; // Array to store multiple bullets

function drawBullet(bullet) {
    ctx.fillStyle = bullet.color;
    ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
}

function updateBullet(bullet, index) {
    bullet.y -= bullet.speed;
    if (bullet.y + bullet.height < 0) { // If the bullet reaches the top of the screen
        bullets.splice(index, 1); // Remove the bullet from the array
    }
}

function Shot(event) {
    if (isGame && !isPaused && keys.Space) {
        if (event.key === ' ' && bullets.length < 5 && starship.ammo > 0) {  // Check if the spacebar is pressed
            const newBullet = {
                width: 4,
                height: 8,
                x: starship.x + starship.width / 2 - 2,
                y: starship.y,
                color: 'blue',
                speed: 10
            };
            if (sound) { toReduceSound(laserShot, 0.4) };
            bullets.push(newBullet); // Add the new bullet to the array
            starship.ammo--;
            ammoValue.innerText = starship.ammo;
        }
    }
}

export {
    bullets,
    drawBullet,
    updateBullet,
    Shot
};

///////////////////////////////////////////////////////////////////////////////////////

// blast

function Blast(objects) {
    if (isGame && !isPaused && starship.blast > 0) {
        if (sound) { 
            blastExplosion.currentTime = 1.5;
            blastExplosion.play() 
        };

        for (let ob = objects.length - 1; ob >= 0; ob--) {      // for all objects
            const object = objects[ob];
            Scores (object.pts);                                // score counter
        }

        objects.length = 0;                                     // delete all obstacles
        canvas.style.backgroundColor = 'white';

        setTimeout(() => {
            clearInterval(blinkInterval);
            canvas.style.backgroundColor = darkMode ?
                'var(--canvas-background-color-dark-mode)' :
                'var(--canvas-background-color-light-mode)';
        }, 2000);

    };
}

export {
    Blast
};
