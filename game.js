const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let gameInterval;              // Інтервал для оновлення гри
let isGameOver = false;        // Прапорець, що відображає стан гри (закінчена чи ні)

// starship

// starship

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

};

// Key state tracking
const keys = {
    ArrowLeft: false,
    ArrowRight: false,
    ArrowUp: false,
    ArrowDown: false,
    Space: false,
    Enter: false
};

function drawStarshipFlame() {
    ctx.fillStyle = starship.flameColor;
    ctx.fillRect(starship.x + (starship.width/2-(starship.flameWidth/2)), starship.y + starship.height, starship.flameWidth, starship.flameHeight);
}

function drawStarship() {
    ctx.fillStyle = starship.color;
    ctx.beginPath();
    // Draw a simple triangular starship
    ctx.moveTo(starship.x + starship.width / 2, starship.y); // Top of the triangle
    ctx.lineTo(starship.x, starship.y + starship.height);    // Bottom-left
    ctx.lineTo(starship.x + starship.width, starship.y + starship.height); // Bottom-right
    ctx.closePath();
    ctx.fill(); // Fill the shape with color
    
    ctx.fillStyle = 'grey';
    ctx.fillRect(starship.x + (starship.width/2-5), starship.y + starship.height / 2, 10, 20);

    ctx.fillStyle = 'blue';
    ctx.fillRect(starship.x + (starship.width/2-4), starship.y + starship.height / 2.5, 8, 10);

    drawStarshipFlame();
    // ctx.fillStyle = 'tomato';
    // ctx.fillRect(starship.x + (starship.width/2-5), starship.y + starship.height, 10, 3);

}

// Update starship position based on key states
function updateStarship() {
    if (keys.ArrowLeft && starship.x > 0) {  
        starship.x -= starship.dx;  
        // starship.width = 30;
    }
    if (keys.ArrowRight && starship.x + starship.width < canvas.width) {  
        starship.x += starship.dx; 
        // starship.width = 30; 
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
    else {starship.width = 35;};

    if (keys.ArrowUp) {
        starship.flameHeight = 8; 
        starship.flameColor = 'red';
    }
    else if (keys.ArrowDown) {
        starship.flameHeight = 2; 
        starship.flameColor = 'orange';
    }
    else {starship.flameHeight = 3;
            starship.flameColor = 'tomato';
    };
    
}

// Handle key down event
function onKeyDown(event) {
    if (event.key === 'ArrowLeft') {
        keys.ArrowLeft = true;
    } else if (event.key === 'ArrowRight') {
        keys.ArrowRight = true;
    } else if (event.key === 'ArrowUp') {
        keys.ArrowUp = true;
    } else if (event.key === 'ArrowDown') {
        keys.ArrowDown = true;
    } else if (event.key === ' ') {  // Spacebar
        keys.Space = true;
    } else if (event.key === 'Enter') {
        keys.Enter = true;
    }
}

// Handle key up event
function onKeyUp(event) {
    if (event.key === 'ArrowLeft') {
        keys.ArrowLeft = false;
    } else if (event.key === 'ArrowRight') {
        keys.ArrowRight = false;
    } else if (event.key === 'ArrowUp') {
        keys.ArrowUp = false;
    } else if (event.key === 'ArrowDown') {
        keys.ArrowDown = false;
    } else if (event.key === ' ') {  // Spacebar
        keys.Space = false;
    } else if (event.key === 'Enter') {
        keys.Enter = false;
    }
}

//////////////////////////


//SHOTING

let bullets = []; // Array to store multiple bullets
let ammo = 10;

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
    if (event.key === ' ' && bullets.length < 5 && ammo > 0) {  // Check if the spacebar is pressed
        const newBullet = {
            width: 4,
            height: 8,
            x: starship.x + starship.width/2 - 2,
            y: starship.y,

            color: 'blue',
            speed: 10
        };
        bullets.push(newBullet); // Add the new bullet to the array
        console.log('Bullet shot');
        ammo -= 1;
    }
}




//////////////////////

/// BACKGROUND

// star

const stars = [];
const starWidth = 1;
const starHeight = 1;
const starSpeed = 8;

function drawStar(star) {
    ctx.fillStyle = star.color;
    ctx.fillRect(star.x, star.y, starWidth, starHeight);
}
function createStar() {
    const x = Math.random() * (canvas.width - starWidth);  // Випадкова позиція по осі X
    const color = 'white';
    stars.push({ x, y: 0, color });  // Додаємо star до масиву
    
}

function updateStars() {
    stars.forEach((star, index) => {
        star.y += starSpeed;  // Переміщуємо перешкоду вниз
        if (star.y + starHeight > canvas.height) {  // Якщо перешкода вийшла за межі екрану
            stars.splice(index, 1);  // Видаляємо її з масиву
        }
    });
}

const stars2 = [];
const star2Width = 2;
const star2Height = 2;
const star2Speed = 10;

function drawStar2(star) {
    ctx.fillStyle = star.color;
    ctx.fillRect(star.x, star.y, star2Width, star2Height);
}
function createStar2() {
    const x = Math.random() * (canvas.width - star2Width);  // Випадкова позиція по осі X
    const color = 'lightgrey';
    stars2.push({ x, y: 0, color });  // Додаємо star до масиву
    
}

function updateStars2() {
    stars2.forEach((star, index) => {
        star.y += star2Speed;  // Переміщуємо перешкоду вниз
        if (star.y + star2Height > canvas.height) {  // Якщо перешкода вийшла за межі екрану
            stars2.splice(index, 1);  // Видаляємо її з масиву
        }
    });
}

/////////////////////////

/// ASTEROIDS

// asteroid 3

const asteroids3 = [];
const asteroid3Radius = 20;
const asteroid3Height = 20;
const asteroid3Speed = 10;

function drawAsteroid3(asteroid) {
    ctx.beginPath();
    ctx.arc(asteroid.x + asteroid3Radius / 2, asteroid.y + asteroid3Radius / 2, asteroid3Radius / 2, 0, Math.PI * 2);
    ctx.fillStyle = asteroid.color || 'gray';
    ctx.fill();
  
    for (let i = 0; i < 20; i++) {
      ctx.fillStyle = 'red';
      ctx.fillRect(
        asteroid.x + Math.random() * asteroid3Radius - asteroid3Radius / 2,
        asteroid.y + Math.random() * asteroid3Radius - asteroid3Radius / 2,
        2,
        2
      );
    }
}

function createAsteroid3() {
    const x = Math.random() * (canvas.width - asteroid3Radius);
    const grayColors = ['#808080', '#C0C0C0', '#404040'];
    const color = Math.floor(Math.random() * grayColors.length);
    asteroids3.push({ x, y: -asteroid3Radius, color });
}

function updateAsteroids3() {
    asteroids3.forEach((asteroid, index) => {
        asteroid.y += asteroid3Speed;  // moving down;
         // asteroid.x -= asteroid3Speed; // moving left;
        asteroid.x += asteroid3Speed; // moving right;
        if (asteroid.y > canvas.height) {  // Якщо перешкода вийшла за межі екрану
            asteroids3.splice(index, 1);  // Видаляємо її з масиву
        }
    });
}

///////////////////
// asteroid 3

const asteroids2 = [];
const asteroid2Radius = 30;
const asteroid2Speed = 3;


function drawAsteroid2(asteroid) {
    ctx.beginPath();
    ctx.arc(asteroid.x + 2 + asteroid2Radius / 2, asteroid.y + 2 + asteroid2Radius / 2, asteroid2Radius / 2, 0, Math.PI * 2);
    ctx.fillStyle = 'gray';
    ctx.fill();
    ctx.beginPath();
    ctx.arc(asteroid.x + asteroid2Radius / 2, asteroid.y + asteroid2Radius / 2, asteroid2Radius / 2, 0, Math.PI * 2);
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

function createAsteroid2() {
    const x = Math.random() * (canvas.width - asteroid2Radius);
    const grayShade = Math.floor(Math.random() * 16).toString(16);
    const color = `#${grayShade}${grayShade}${grayShade}`;
    asteroids2.push({ x, y: -asteroid2Radius, color });
}

function updateAsteroids2() {
    asteroids2.forEach((asteroid, index) => {
        asteroid.y += asteroid2Speed;  // Переміщуємо перешкоду вниз
        if (asteroid.y > canvas.height) {  // Якщо перешкода вийшла за межі екрану
            asteroids2.splice(index, 1);  // Видаляємо її з масиву
        }
    });
}

///////////////////

//SOME OBSTICAL

// Масив для зберігання перешкод
const obstacles = []; 
const obstacleWidth = 30;      // Ширина перешкоди
const obstacleHeight = 30;     // Висота перешкоди
const obstacleSpeed = 3;       // Швидкість падіння перешкод



// Функція для відображення перешкоди на екрані
function drawObstacle(obstacle) {
    ctx.fillStyle = obstacle.color;
    ctx.fillRect(obstacle.x, obstacle.y, obstacleWidth, obstacleHeight);
}

// Функція для створення нової перешкоди
function createObstacle() {
    const x = Math.random() * (canvas.width - obstacleWidth);  // Випадкова позиція по осі X
    // const color = '#' + Math.floor(Math.random() * 16777215).toString(16);  // Випадковий колір
    const color = 'grey'
    obstacles.push({ x, y: 0, color });  // Додаємо перешкоду до масиву
}


// Функція для оновлення позицій перешкод
function updateObstacles() {
    obstacles.forEach((obstacle, index) => {
        obstacle.y += obstacleSpeed;  // Переміщуємо перешкоду вниз
        if (obstacle.y + obstacleHeight > canvas.height) {  // Якщо перешкода вийшла за межі екрану
            obstacles.splice(index, 1);  // Видаляємо її з масиву
        }
    });
}

///////////////////////////////////////////

// Функція для перевірки зіткнення гравця з перешкодою
function checkCollision(objects) {
    for (let i = 0; i < objects.length; i++) {
        const object = objects[i];
        if (
            starship.x < object.x &&
            starship.x + starship.width > object.x &&
            starship.y < object.y &&
            starship.y + starship.height > object.y
        ) {
            return true;
        }
    }
    return false;
}

function checkCrashTarget(objects, bullets) {
    for (let bu = bullets.length - 1; bu >= 0; bu--) {  // Loop backward to avoid index issues when removing elements
        const bullet = bullets[bu];
        for (let ob = objects.length - 1; ob >= 0; ob--) {
            const object = objects[ob];
            // Check if bullet intersects with object
            if (
                bullet.x < object.x + obstacleWidth &&
                bullet.x + bullet.width > object.x &&
                bullet.y < object.y + obstacleHeight &&
                bullet.y + bullet.height > object.y
            ) {
                console.log('Crash detected');
                // Remove the bullet and the object from the arrays
                objects.splice(ob, 1);
                bullets.splice(bu, 1);
                break; // Exit the inner loop as the bullet is already removed
            }
        }
    }
}


function checkCollisions() {

    if (checkCollision(asteroids2) || checkCollision(asteroids3)) {
        starship.color = 'tomato';
        isGameOver = true;
        clearInterval(gameInterval);
        alert("Game Over!");
    }

    
}

// Функція для руху гравця вліво або вправо


// Функція для малювання всіх елементів на екрані
// background first!!!!
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);  // Clear screen
    stars.forEach(drawStar);  // Draw stars
    stars2.forEach(drawStar2);  // Draw stars
    
    asteroids2.forEach(drawAsteroid2);  // Draw asteroids2
    asteroids3.forEach(drawAsteroid3);  // Draw asteroids3

    bullets.forEach(drawBullet); // Draw all bullets in the array
    drawStarship();  // Draw starship
}   

// Функція для оновлення стану гри
function update() {
    if (!isGameOver) {
        updateStars();  // Update stars
        updateStars2();  // Update stars
        updateAsteroids2();  // Update asteroids2
        updateAsteroids3();  // Update asteroids3
        updateStarship();  // Update starship position
        bullets.forEach(updateBullet); // Update all bullets in the array
        checkCollisions();   // Check for collisions

        checkCrashTarget(asteroids2, bullets);

        draw();             // Draw everything
    }
}

// Start game
function startGame() {
    gameInterval = setInterval(() => {
        update();  // Update game state
        if (Math.random() < 3) {  // 10% chance to create a star
            createStar();
        }
        if (Math.random() < 0.1) {  // 10% chance to create a star
            createStar2();
        }
        if (Math.random() < 0.05) {  // 5% chance to create an asteroid2
            createAsteroid2();
        }
        if (Math.random() < 0.03) {  // 3% chance to create an asteroid3
            createAsteroid3();
        }
    }, 50);  // Update every 50 milliseconds
    isGameRunning = true;
}

// BUTTONS

//start

document.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            startGame(); 
}});

// Event listeners for key presses
document.addEventListener('keydown', onKeyDown);
document.addEventListener('keyup', onKeyUp);
document.addEventListener('keydown', Shot);


// Start the game
const btnStart = document.getElementById('btn-start');
btnStart.onclick=()=>{startGame()};
// startGame();

