/*
    Percolation
*/

(function (global) {
    
    'use strict';
    
    /*
        Basic colors for percolation grid.
    */
    var Color = {
            black: '#000000',
            blue: '#00B7FF',
            white: '#ffffff'
        };
    
    /*
       The Tile object is the basic unit of the grid. 
    */
    function Tile(xPos, yPos, width, height) {
        var x = xPos,
            y = yPos,
            w = width,
            h = height,
            isFilled = false,       // Is it filled with water?
            isEmpty = false,        // Is it empty?
            isTop = false,
            color = Color.black,    // black = blocked, blue = filled, white = empty
            state = 'blocked',      // Current state of the tile.
            links = [];             // Links to other tiles for recursion.  
        
        return {
            fillTile: function () {
                isFilled = true;
                isEmpty = false;
                color = Color.blue;
                state = 'filled';
            },
            pullTile: function () {
                isEmpty = true;
                color = Color.white;
                state = 'empty';
                if (isTop) {
                    this.fillTile();
                }
                this.checkLinks();
            },
            linkTile: function (tile) {
                links.push(tile);
            },
            checkLinks: function () {
                var i, max = links.length;
            
                for (i = 0; i < max; i += 1) {
                    if (links[i].getState() === 'filled' && state === 'empty') {
                        this.fillTile();
                        this.checkLinks();
                    } else if (links[i].getState() === 'empty' && state === 'filled') {
                        links[i].fillTile();
                        links[i].checkLinks();
                    }
                }
            },
            draw: function (context) {
                context.fillStyle = color;
                context.fillRect(x, y, width, height);
                context.strokeRect(x, y, width, height);
            },
            setTop: function () {
                isTop = true;
            },
            getState: function () {
                return state;
            },
            getLinks: function () {
                return links;
            }
        };
    }
    
    /*
        The Grid serves as the container for all the tiles.
    */
    function Grid(rows, cols) {
        
        var r, c,
            x = 0,
            y = 0,
            w = 20,
            h = 20,
            rowCount = rows,
            colCount = cols,
            linkTiles = function (grid) {
                for (r = 0; r < rows; r += 1) {
                    for (c = 0; c < cols; c += 1) {
                        var tile = grid[r][c];
                        if (grid[r - 1] !== undefined) {
                            tile.linkTile(grid[r - 1][c]);
                        }
                        
                        if (grid[r + 1] !== undefined) {
                            tile.linkTile(grid[r + 1][c]);
                        }
                        
                        if (grid[r][c - 1] !== undefined) {
                            tile.linkTile(grid[r][c - 1]);
                        }
                        
                        if (grid[r][c + 1] !== undefined) {
                            tile.linkTile(grid[r][c + 1]);
                        }
                    }
                }
            },
            generateTiles = function (rows, cols) {
                var grid = [];
                for (r = 0; r < rows; r += 1) {
                    grid[r] = [];
                    for (c = 0; c < cols; c += 1) {
                        grid[r][c] = new Tile(x, y, w, h);
                        if (r === 0) {
                            grid[r][c].setTop();
                        }
                        x += 20;
                    }
                    x = 0;
                    y += 20;
                }
                linkTiles(grid);
                return grid;
            },
            tiles = generateTiles(rows, cols),
            tileCount = rows * cols,
            tilesRemoved = 0,
            onTileRemove = function () {
                tilesRemoved += 1;
            };
        
        return {
            getRowCount: function () {
                return rowCount;
            },
            getColCount: function () {
                return colCount;
            },
            getTiles: function () {
                return tiles;
            },
            getTile: function (row, col) {
                return tiles[row][col];
            },
            getTileCount: function () {
                return tileCount;
            },
            removeTile: function (tile) {
                tile.pullTile();
                tilesRemoved += 1;
            }
        };
    }
    
    /*
        Use the canvas element to display the Percolation.
    */
    function percolationApp() {
        
        var DOM = global.document,
            canvas = DOM.getElementById("percolation-demo"),
            context = canvas.getContext("2d"),
            grid = new Grid(5, 5);
        
        canvas.width = global.window.outerWidth;
        canvas.height = global.window.outerHeight;
        
        function update() {
            var rows = grid.getRowCount(),
                cols = grid.getColCount(),
                rRow = Math.floor(Math.random() * rows),
                rCol = Math.floor(Math.random() * cols),
                tiles = grid.getTiles(),
                currTile = tiles[rRow][rCol];
            
            if (currTile.getState() === 'blocked') {
                grid.removeTile(currTile);
            }
            
            function render() {
                var r,
                    c;
                
                for (r = 0; r < rows; r += 1) {
                    for (c = 0; c < cols; c += 1) {
                        tiles[r][c].draw(context);
                    }
                }
            }
            
            render();
        }
        
        global.window.setInterval(update, 500);
    }
    
    /*
        Wait for the browser window to load everything.   
    */
    function onLoad() {
        percolationApp();
    }
    global.window.addEventListener('load', onLoad, false);
    
}(this));