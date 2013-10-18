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
    function Tile(x, y, width, height) {
        var isFilled = false,       // Is it filled with water?
            isEmpty = false,        // Is it empty?
            color = Color.black,    // black = blocked, blue = filled, white = empty
            state = 'blocked';      // Current state of the tile.
        
        return {
            x: x,
            y: y,
            width: width,
            height: height,
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
            },
            draw: function (context) {
                context.fillStyle = color;
                context.fillRect(x, y, width, height);
                context.strokeRect(x, y, width, height);
            },
            getState: function () {
                return state;
            }
        };
    }
    
    /*
        The Grid serves as the container for all the tiles.
    */
    function Grid(rows, cols) {
        
        if (typeof rows === Number || rows <= 0) {
            return;
        } else if (typeof cols === Number || cols <= 0) {
            return;
        }
        
        var r, c,
            x = 0,
            y = 0,
            w = 20,
            h = 20,
            tiles = [],
            tileCount = rows * cols,
            generateTiles = function (rows, cols) {
                for (r = 0; r < rows; r += 1) {
                    tiles[r] = [];
                    for (c = 0; c < cols; c += 1) {
                        tiles[r][c] = new Tile(x, y, w, h);
                        x += 20;
                    }
                    x = 0;
                    y += 20;
                }
            };
        
        generateTiles(rows, cols);
        
        return {
            getRowCount: function () {
                return rows;
            },
            getColCount: function () {
                return cols;
            },
            getTiles: function () {
                return tiles;
            },
            getTile: function (row, col) {
                return tiles[row][col];
            },
            getTileCount: function () {
                return tileCount;
            }
        };
    }
    Grid.prototype = {
        /*
            Check if there are any filled tiles in the last row.
        */
        checkPercolation: function () {
            var r = this.rows - 1,
                c = this.cols;
            
            for (c; c >= 0; c -= 1) {
                if (this.tiles[r][c].getState() === 'filled') {
                    return true;
                }
            }
            
            return false;
        }
    };
    
    /*
        Use the canvas element to display the Percolation.
    */
    function percolationApp() {
        
        var DOM = global.document,
            canvas = DOM.getElementById("percolation-demo"),
            context = canvas.getContext("2d"),
            grid = new Grid(10, 5);
        
        canvas.width = global.window.outerWidth;
        canvas.height = global.window.outerHeight;
        
        function update() {
            var rows = grid.getRowCount(),
                cols = grid.getColCount(),
                rRow = Math.floor(Math.random() * rows),
                rCol = Math.floor(Math.random() * cols),
                tiles = grid.getTiles(),
                currTile = tiles[rRow][rCol];
            
            global.console.log(currTile.getState());
            
            if (currTile.getState() === 'blocked') {
                currTile.pullTile();
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
        
        global.window.setInterval(update, 1000);
//        global.window.clearInterval(update);
    }
    
    /*
        Wait for the browser window to load everything.   
    */
    function onLoad() {
        percolationApp();
    }
    global.window.addEventListener('load', onLoad, false);
    
}(this));