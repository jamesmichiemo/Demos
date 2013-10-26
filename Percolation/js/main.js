/*
    Percolation: To filter or trickle through.
    
    In this script we can see how fluid starts from the top, and spreads out
    as more paths open up. This is a good and basic example of recursion and
    pathfinding. The app uses a random approach to open all Tiles (rRow, rCol). 
    The canvas is used to perform all rendering. 
    
    Instantiated objects (Ex. Grid, Tile) use privileged methods and private 
    properties to do everything. If you dont feel like reading how any of the
    objects work. Then feel free to check out the percolationApp() method at 
    the bottom.
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
    function Tile(x, y, width, height) {
        var vec2D = {x: x, y: y},
            w = width,
            h = height,
            isFilled = false,       // Is it filled with water?
            isEmpty = false,        // Is it empty?
            isTop = false,          // Is it at the top of the grid?
            color = Color.black,    // black == blocked, blue == filled, white == empty
            state = 'blocked',      // Current state of the tile.
            links = [];             // Links to other tiles for recursion.  
        
        return {
            /*
                The fillTile and pullTile method take care of state changes within the
                object.
            */
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
                /* 
                    If the Tile object is inside the first row of the grid. 
                    Then it gets filled automatically.
                */
                if (isTop) {
                    this.fillTile();
                }
                this.checkLinks();  // Check if any of the linked tiles are filled.
            },
            linkTile: function (tile) {
                links.push(tile);   // Register the tile as a link.
            },
            /*
                checkLinks will check if any of the linked tiles are filled.
                This will allow us to fill the newly opened paths recursively.
            */
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
            // grab the context from the canvas and draw the object.
            draw: function (context) {
                context.fillStyle = color;
                context.fillRect(vec2D.x, vec2D.y, width, height);
                context.strokeRect(vec2D.x, vec2D.y, width, height);
            },
            // If the Tile is inside the first row then run this method.
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
    function Grid() {
        
        var vec2D = {x: 0, y: 0},   // (x, y) coordinates.
            w = 0,                  // Tile width.
            h = 0,                  // Tile height.
            rowCount = 0,           // How many rows are in the grid?
            colCount = 0,           // How many cols are ... 
            tileCount = 0,          // How many tiles does the grid contain?
            tilesRemoved = 0,       // How many tiles have been removed?
            tiles = [],             // Multidimensional Array for Grid.
            gridWidth = 0,          // Total width of the grid.
            gridHeight = 0;         // Total height ...
        
        /*
            generateTiles creates a new tiles [] multidimensional array.
            Given the rows and cols.
        */
        function generateTiles(rows, cols) {
            var r, c,
                x = vec2D.x,
                y = vec2D.y;
            
            tiles = [];     // Re-initialize the array.
            
            for (r = 0; r < rows; r += 1) {
                tiles[r] = [];
                for (c = 0; c < cols; c += 1) {
                    tiles[r][c] = new Tile(x, y, w, h);
                    
                    // Let the tile object know it's at the top.
                    if (r === 0) {
                        tiles[r][c].setTop();
                    }
                    x += w;
                }
                x = vec2D.x;
                y += h;
            }
            
            /*
                Here allow generateTiles to set the dimensions and other data,
                so we can easily manipulate the grid.
            */
            rowCount = rows;
            colCount = cols;
            tileCount = rows * cols;
            gridWidth = w * rows;
            gridHeight = h * cols;
        }
        
        /*
            The linkTiles method will allow us to link the tiles that are approximate
            to each other and call them recursively when new Tiles are emptied. This
            method is called when the tiles
        */
        function linkTiles() {
            var r, c,
                tile = null;

            for (r = 0; r < rowCount; r += 1) {
                for (c = 0; c < colCount; c += 1) {
                    tile = tiles[r][c]; // Current Tile
                    
                    // Top
                    if (tiles[r - 1] !== undefined) {
                        tile.linkTile(tiles[r - 1][c]);
                    }
                    
                    // Bottom
                    if (tiles[r + 1] !== undefined) {
                        tile.linkTile(tiles[r + 1][c]);
                    }
                    
                    // Left
                    if (tiles[r][c - 1] !== undefined) {
                        tile.linkTile(tiles[r][c - 1]);
                    }
                    
                    // Right
                    if (tiles[r][c + 1] !== undefined) {
                        tile.linkTile(tiles[r][c + 1]);
                    }
                }
            }
        }
        
        return {
            /*
                createTiles will take care of initializing the entire grid for us.
                It will also take care of the grid's position and size.
            */
            createTiles: function (rows, cols, x, y, tileWidth, tileHeight) {
                vec2D.x = x;
                vec2D.y = y;
                w = tileWidth;
                h = tileHeight;
                
                generateTiles(rows, cols);
                linkTiles();
                
                // Return the newly formed multi-dim array.
                return tiles;
            },
            /*
                Check the lastRow to see if there are any filled Tiles.
            */
            checkPercolation: function () {
                var c,
                    lastRow = rowCount - 1;
                
                for (c = 0; c < colCount; c += 1) {
                    // Only return true if we find a filled Tile.
                    if (tiles[lastRow][c].getState() === 'filled') {
                        return true;
                    }
                }
                
                return false;
            },
            // Simple method for changing the Tile's state and increasing our counter.
            removeTile: function (tile) {
                tile.pullTile();
                tilesRemoved += 1;
            },
            /*
                Simple method for printing how many tiles were removed and the percentage.
            */
            showStats: function (context) {
                var boxWidth = gridWidth + 1,
                    boxHeight = 50,
                    percentage = String(Math.round((tilesRemoved / tileCount) * 100)) + "%",
                    message = String(tilesRemoved) + " / " + String(tileCount) + " = " + percentage;
                
                context.fillStyle = Color.white;
                context.globalAlpha = 0.9;
                context.fillRect(0, 0, boxWidth, boxHeight);
                context.globalAlpha = 1;
                context.fillStyle = Color.black;
                context.font = "25px Arial";
                context.fillText(message, 10, 35);
            },
            getRowCount: function () {
                return rowCount;
            },
            getColCount: function () {
                return colCount;
            },
            getTileCount: function () {
                return tileCount;
            },
            getWidth: function () {
                return gridWidth;
            },
            getHeight: function () {
                return gridHeight;
            },
            getTilesRemoved: function () {
                return tilesRemoved;
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
            timer = null,   // timer takes care of calling the update loop repeatedly given the timeframe.
            
            // Initialize the grid and grab how many rows and cols there exist.
            grid = new Grid(),
            tiles = grid.createTiles(30, 30, 0, 0, 10, 10),
            rows = grid.getRowCount(),
            cols = grid.getColCount();
        
        // Allow the canvas take the whole browser window.
        canvas.width = global.window.outerWidth;
        canvas.height = global.window.outerHeight;
        
        // Render all of the tiles inside the grid.
        function render() {
            var r,
                c;
            
            for (r = 0; r < rows; r += 1) {
                for (c = 0; c < cols; c += 1) {
                    tiles[r][c].draw(context);
                }
            }
        }
        
        /* 
            Grab a Tile from a random row and column and then test 
            if the Tile is blocked or not.
        */
        function update() {
            var rRow = Math.floor(Math.random() * rows),
                rCol = Math.floor(Math.random() * cols),
                currTile = tiles[rRow][rCol];
            
            if (currTile.getState() === 'blocked') {
                grid.removeTile(currTile);
            }
            
            render();
            
            // After doing everything, lets check if the grid percolated.
            if (grid.checkPercolation()) {
                global.window.clearInterval(timer);
                grid.showStats(context);    // Print the stats at the top of the grid.
            }
        }
        
        // Repeatedly call the update function every 10 milliseconds. 
        timer = global.window.setInterval(update, 10);
    }
    
    /*
        Wait for the browser window to load everything.   
    */
    function onLoad() {
        percolationApp();   // Execute application.
    }
    global.window.addEventListener('load', onLoad, false);
    
}(this));