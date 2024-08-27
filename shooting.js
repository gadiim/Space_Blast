const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

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
    if (event.key === ' ') {  // Check if the spacebar is pressed
        const newBullet = {
            x: canvas.width / 2 + 4,
            y: canvas.height - 10,
            width: 4,
            height: 8,
            color: 'blue',
            speed: 10
        };
        bullets.push(newBullet); // Add the new bullet to the array
        console.log('Bullet shot');
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    bullets.forEach(drawBullet); // Draw all bullets in the array
}

function update() {
    bullets.forEach(updateBullet); // Update all bullets in the array
    draw();
}

// Function to start the game
function startGame() {
    gameInterval = setInterval(() => {
        update();
    }, 50);
    console.log('startGame');
}

document.addEventListener('keydown', Shot);

startGame();
