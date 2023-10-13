
var gridSize = 5;

var grid = [];
var path = []; // correct path
var steps = []; // player's path

var tileSize; // size of each Tile

var animating; // false = playing
var animationTime; // frame in the animation for the steps
var stepTime; // how long each step is shown for

var level;

var gameOver; // synchonized flag to end the game
var newLevel; // synchonized flag to create new level

function setup() {

  createCanvas(window.innerWidth, window.innerHeight);

  // INITIALIZE VALUES
  level = 1;
  stepTime = 60;

	newLevel = false;
	gameOver = false;

  newPath();

  textAlign(CENTER);
  textSize(tileSize * 0.4);
}

function draw() {

  background("#000000");

	drawGrid();
	drawLevel();

	pollTasks();
}

function pollTasks() {

	if (animating) {

		handleAnimation();
	}

	if (newLevel) {

		nextLevel();
	}

	if (gameOver) {

		endGame();
	}
}

// HANDLES USER INPUT
function mousePressed() {
  if (animating) {
		// BLOCK INPUTS WHILE ANIMATING
		return;
	}

  var clickedTile = getTile(mouseX, mouseY);

  if (clickedTile == null)
    return;

  steps.push(clickedTile);

  grid[clickedTile.x][clickedTile.y].lit = true; // display

  // CHECK FOR CORRECT PATH
	if (!onPath(path, steps)) {
		gameOver = true;
	}

  // CHECK FOR NEW LEVEL
	if (steps.length == path.length) {
    newLevel = true;
	}
}

// DRAW THE GRID
function drawGrid() {

  strokeWeight(4);
  stroke(255);

  for (var x = 0; x < gridSize; x++) {
    for (var y = 0; y < gridSize; y++) {

      grid[x][y].draw();
    }
  }
}

// DRAW THE CURRENT LEVEL TEXT
function drawLevel() {
	noStroke();
	fill("#f56");
	text("Level " + level, width / 1.5, tileSize);
}

// ANIMATES THE PATH TO THE SCREEN MEANT TO BE CALLED EVERY FRAME WITH THE STATE OF 0
function handleAnimation() {

  animationTime++;

  var route = Math.floor(animationTime / stepTime); // CURRENT STEP

  if (route >= path.length) {
		// ANIMATION COMPLETE

    animating = false; // PLAYING
    resetGrid();
    return;
  }

	// DISPLAY NEXT STEP
  var tile = path[route];
  grid[tile.x][tile.y].lit = true;
}

// RETURNS AN INITIALIZED GRID
function resetGrid() {
  grid = [];
  tileSize = Math.min(width / gridSize, height / gridSize);
  // CREATES A 2D ARRAY
  for (var x = 0; x < gridSize; x++) {
    var col = [];
    for (var y = 0; y < gridSize; y++) {

      col.push(new Tile(x, y, false));
    }
    grid.push(col);
  }

};

// SETS UP FOR A NEW LEVEL
function nextLevel() {

  level++;
  gridSize++;
  newPath();
  stepTime /= 1.25;
  resetGrid();
	newLevel = false;
}

// GAME OVER SCREEN
function endGame() {

	noLoop();
  noStroke();
	fill("#f56");
  text("Game Over!", width / 1.5, height / 2);
	gameOver = false;
}
