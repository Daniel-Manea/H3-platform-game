// RETURNS A RANDOM GENERATED PATH FROM THE BOTTOM LEFT TILE TO THE TOP ROW OF TILES
function generatePath(gridSize) {

	var path = []; // returning path

	path.push(new Tile(0, gridSize - 1, true)); // bottom left tile begins the path

  while (path[path.length - 1].y != 0) {
		// as long as the path hasn't reached the top of the screen

    var pool = []; // available Tiles to push to the path
    var previous = path[path.length - 1]; // previous Tile

		// FIND POTENTIAL NEXT STEPS
		var relativeTiles = getRelativeTiles(previous);

		// LEAVE OUT TILES THAT ARE OFF THE GRID OR ALREADY IN THE PATH
		for (var i = 0; i < relativeTiles.length; i++) {

			if (validateTile(relativeTiles[i], path, gridSize)) {

				pool.push(relativeTiles[i]);
			}
		}

    path.push(random(pool)); // CHOOSE A TILE
  }

	return path;
}

// VALIDATE TILES - TILES MUST NOT BE OFF THE GRID, AND MUST NOT BE ALREADY IN THE ARRAY
function validateTile(tile, path, gridSize) {

	if ((tile.x >= 0 && tile.x < gridSize) &&
			(tile.y >= 0 && tile.y < gridSize)) {
			// TILE IS IN BOUNDS

			// TILE IS NOT ALREADY IN THE PATH
			return !arrIncludes(path, tile);
		}

	return false;
}

// RETURNS TILES RELATIVE TO PASSED TILE
function getRelativeTiles(tile) {

	var west = new Tile(tile.x - 1, tile.y, true);
	var east = new Tile(tile.x + 1, tile.y, true);
	var north = new Tile(tile.x, tile.y - 1, true);

	return [west, east, north];
}

// RETURNS WHETHER THE PASSED TILE IS INCLUDED WITHIN THE PASSED POOL
function arrIncludes(pool, tile) {

  var t = JSON.stringify(tile);
  for (var i = 0; i < pool.length; i++)
    if (JSON.stringify(pool[i]) === t) // all properties match
      return true;

  return false;
}

// RETURNS WHETHER THE PASSED STEPS MATCH THE PASSED PATH
function onPath(path, steps) {

  for (var i = 0; i < steps.length; i++)
    if (path[i].x != steps[i].x || path[i].y != steps[i].y)
      return false;

  return true;
}

// INITIALIZED A NEW PATH
function newPath() {

  resetGrid();
  animating = true; // animating
  animationTime = 0;
  path = generatePath(gridSize);
  steps = [];
}
