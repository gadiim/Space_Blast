import { ammoValue, hpValue } from './game.js';

import {
    starship,
    startBlinkingHp,
    stopBlinkingHp,
    startBlinkingAmmo,
    stopBlinkingAmmo
} from './starship.js';

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// HP

const hpPackArray = [];

function drawHpPack(hpPack) {                                       // drawing object
    ctx.fillStyle = hpPack.color;                                   // set color
    ctx.fillRect(hpPack.x, hpPack.y, hpPack.width, hpPack.height);  // draw rectangle
    ctx.fillStyle = 'tomato';                                       // text color
    ctx.font = 'bold 18px Arial';                                   // style and size
    ctx.textAlign = 'center';                                       // text to center
    ctx.textBaseline = 'middle';                                    // text vertically to the center
    ctx.fillText('HP', hpPack.x + hpPack.width / 2, hpPack.y + hpPack.height / 2);//text
}

function createHpPack() {
    const hpPack = {                                // create object
        x: Math.random() * (canvas.width - 30),     // start position horizontally
        y: 30,                                      // start position vertically
        width: 30,                                  // object size (width)
        height: 30,                                 // object size (height)
        color: 'yellow',                            // object color
        speed: 2,                                   // object speed (movement rate)
    }
    hpPackArray.push(hpPack);                       // add to array
}

function updateHpPack() {                           // updating object data
    hpPackArray.forEach((hpPack, index) => {
        hpPack.y += hpPack.speed;                   // moving dawn
        if (hpPack.y > canvas.height) {             // if edge
            hpPackArray.splice(index, 1);           // remove from array
        }
    });
}

function checkHpCollision(packs) {                   // objects intersection
    for (let i = 0; i < packs.length; i++) {
        const pack = packs[i];
        if (
            pack.x < starship.x + starship.width && // pack is to left
            pack.x + pack.width > starship.x &&     // pack is to right
            pack.y < starship.y + starship.height && // pack is above of starship
            pack.y + pack.height > starship.y       // pack is below of starship
        ) {
            starship.hp++;                          // grow hp
            hpValue.innerText = starship.hp;        // show in display
            startBlinkingHp();                      // blinking effect
            setTimeout(() => {
                stopBlinkingHp();                   // stop blinking
            }, 1000);                               // 1 sec blinking duration
            hpPackArray.splice(i, 1);               // removing objects
        }
    }
}

export {
    hpPackArray,
    drawHpPack,
    createHpPack,
    updateHpPack,
    checkHpCollision
};

// AMMO

const ammoPackArray = [];

function drawAmmoPack(ammoPack) {                                       // drawing object
    ctx.fillStyle = ammoPack.color;                                   // set color
    ctx.fillRect(ammoPack.x, ammoPack.y, ammoPack.width, ammoPack.height);  // draw rectangle
    
    ctx.fillStyle = 'blue';                                       // text color
    ctx.font = 'bold 12px Arial';                                   // style and size
    ctx.textAlign = 'center';                                       // text to center
    ctx.textBaseline = 'middle';                                    // text vertically to the center
    ctx.fillText('AMMO', ammoPack.x + ammoPack.width / 2, ammoPack.y + ammoPack.height / 2);//text
}

function createAmmoPack() {
    const ammoPack = {                                  // create object
        x: Math.random() * (canvas.width - 30),         // start position horizontally
        y: 30,                                          // start position vertically
        width: 40,                                      // object size (width)
        height: 25,                                     // object size (height)
        color: 'yellow',                                // object color
        speed: 2.5                                       // object speed (movement rate)
    }
    ammoPackArray.push(ammoPack);                         // add to array
}

function updateAmmoPack() {                             // updating object data
    ammoPackArray.forEach((ammoPack, index) => {
        ammoPack.y += ammoPack.speed;                   // moving dawn
        if (ammoPack.y > canvas.height) {               // if edge
            ammoPackArray.splice(index, 1);             // remove from array
        }
    });
}

function checkAmmoCollision(packs) {                    // objects intersection
    for (let i = 0; i < packs.length; i++) {
        const pack = packs[i];
        if (
            pack.x < starship.x + starship.width &&     // pack is to left
            pack.x + pack.width > starship.x &&         // pack is to right
            pack.y < starship.y + starship.height &&    // pack is above of starship
            pack.y + pack.height > starship.y           // pack is below of starship
        ) {
            starship.ammo+=10;                            // grow hp
            ammoValue.innerText = starship.ammo;        // show in display
            startBlinkingAmmo();                        // blinking effect
            setTimeout(() => {
                stopBlinkingAmmo();                     // stop blinking
            }, 1000);                                   // 1 sec blinking duration
            ammoPackArray.splice(i, 1);                 // removing objects
        }
    }
}

export {
    ammoPackArray,
    drawAmmoPack,
    createAmmoPack,
    updateAmmoPack,
    checkAmmoCollision
};
