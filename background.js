const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const starsTiny = [];

function drawTinyStar(star) {                               // drawing object
    ctx.fillStyle = star.color;                             // set color
    ctx.fillRect(star.x, star.y, star.width, star.height);  // draw rectangle
}

function createTinyStar() {
    const tinyStar = {                                      // create object
        x: Math.random() * (canvas.width - 1),              // start position horizontally
        y: 0,                                               // start position vertically
        width: 1,                                           // object size (width)
        height: 1,                                          // object size (height)
        color: 'white',                                     // object color
        speed: 8,                                           // object speed (movement rate)
    }
    starsTiny.push(tinyStar);                               // add to array
}

function updateTinyStars() {                                // updating object data
    starsTiny.forEach((star, index) => {                    // each object
        star.y += star.speed;                               // moving dawn
        if (star.y + star.height > canvas.height) {         // if edge
            starsTiny.splice(index, 1);                     // remove from array
        }
    });
}

export {
    starsTiny,
    drawTinyStar,
    createTinyStar,
    updateTinyStars
};


const starsLarge = [];

function drawLargeStar(star) {                              // drawing object
    ctx.fillStyle = star.color;                             // set color
    ctx.fillRect(star.x, star.y, star.width, star.height);  // draw rectangle
}
function createLargeStar() {
    const largeStar = {                                     // create object
        x: Math.random() * (canvas.width - 2),              // start position horizontally
        y: 0,                                               // start position vertically
        width: 2,                                           // object size (width)
        height: 2,                                          // object size (height)
        color: 'lightgray',                                 // object color
        speed: 10,                                          // object speed (movement rate)
    }
    starsLarge.push(largeStar);                             // add to array
}

function updateLargeStars() {                               // updating object data
    starsLarge.forEach((star, index) => {                   // each object
        star.y += star.speed;                               // moving dawn
        if (star.y + star.height > canvas.height) {         // if edge
            starsLarge.splice(index, 1);                    // remove from array
        }
    });
}

export {
    starsLarge,
    drawLargeStar,
    createLargeStar,
    updateLargeStars
};