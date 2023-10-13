function Tile(x, y, lit) {

  this.x = x;
  this.y = y;

  this.lit = lit; // whether or not the tile is highlighted
}

// DRAWS THE TILE
Tile.prototype.draw = function() {

	fill((this.lit) ? "#f45" : "#000000");

	rect(this.x * tileSize, this.y * tileSize, tileSize, tileSize);
};

// RETURNS WHERER OR NOT PASSED X & Y LAND WITHIN THIS TILE
Tile.prototype.clickedBy = function(x, y) {

	// CALCULATE BOUNDS
  var leftX = this.x * tileSize;
  var rightX = leftX + tileSize;

  var topY = this.y * tileSize;
  var bottomY = topY + tileSize;

  return !(x < leftX || x > rightX || y < topY || y > bottomY);
};

// RETURNS THE CLICKED TILE
function getTile(mouseX, mouseY) {

	for (var x = 0; x < gridSize; x++) {

		for (var y = 0; y < gridSize; y++) {
			// loop through all tiles

			if (grid[x][y].clickedBy(mouseX, mouseY)) {

				return grid[x][y];
			}
		}
	}

	return null;
}
