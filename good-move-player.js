const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const player = {
    x: canvas.width / 2 - 20,  // X-axis starting position
    y: canvas.height - 40,     // Y-axis starting position
    width: 40,                 
    height: 40,                
    color: 'lightgrey',          
    dx: 1,                     
    dy: 1                      
};

// Object to track which keys are pressed
const keysPressed = {};

function drawPlayer() {
    ctx.fillStyle = player.color;
    ctx.beginPath();
    
    // Draw a simple triangular starship
    ctx.moveTo(player.x + player.width / 2, player.y); // Top of the triangle
    ctx.lineTo(player.x, player.y + player.height);    // Bottom-left
    ctx.lineTo(player.x + player.width, player.y + player.height); // Bottom-right
    ctx.closePath();
    
    ctx.fill(); // Fill the shape with color
}

// Update player position based on keys pressed
function updatePlayerPosition() {
    if (keysPressed['ArrowLeft'] && player.x > 0) {
        player.x -= player.dx;
    }
    if (keysPressed['ArrowRight'] && player.x + player.width < canvas.width) {
        player.x += player.dx;
    }
    if (keysPressed['ArrowUp'] && player.y > 0) {
        player.y -= player.dy;
    }
    if (keysPressed['ArrowDown'] && player.y + player.height < canvas.height) {
        player.y += player.dy;
    }
}





// Listen for keydown events
document.addEventListener('keydown', (event) => {
    keysPressed[event.key] = true;
});

// Listen for keyup events
document.addEventListener('keyup', (event) => {
    keysPressed[event.key] = false;
});

// star

const bullets = [];
const bulletWidth = 2;
const bulletHeight = 8;
const bulletSpeed = 20;

function drawBullet(bullet) {
    ctx.fillStyle = "blue"
    ctx.fillRect(bullet.x, bullet.y, bulletWidth, bulletHeight);
}
function createBullet() {
    let x = player.x;
    let y = player.y;
    const color = 'white';
    bullets.push({ x, y, color });  // Додаємо shot до масиву
}

function updateBullet() {
    bullets.forEach((bullet, index) => {
        bullet.y -= bulletSpeed;  // up
        if (bullet.y > canvas.height) {  // Якщо перешкода вийшла за межі екрану
            bullets.splice(index, 1);  // Видаляємо її з масиву
        }
    });
}

function shot(bullet) {
    if (keysPressed[' ']) {
        drawBullet(bullet);
        createBullet();
        updateBullet();
    }
}


// Main game loop
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);  // Clear the canvas
    updatePlayerPosition();  // Update player position
    drawPlayer();  // Draw the player
    requestAnimationFrame(gameLoop);  // Continue the loop
    shot(bullet);
}

// Start the game loop
gameLoop();
