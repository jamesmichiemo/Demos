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
            state = 'blocked';      // Keep track of the current state.
        
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    Tile.prototype = (function () {
        return {
            fillTile: function () {
                this.isFilled = true;
                this.isEmpty = false;
                this.color = Color.blue;
                this.state = 'filled';
            },
            pullTile: function () {
                this.isEmpty = true;
                this.color = Color.white;
                this.state = 'empty';
            },
            getState: function () {
                return this.state;
            },
            draw: function (context) {
                context.fillStyle = this.color;
                context.fillRect(this.x, this.y, this.width, this.height);
                context.strokeRect(this.x, this.y, this.width, this.height);
            }
        };
    }());
    
    /*
        The Grid serves as the container for all the tiles.
    */
    function Grid(rows, cols) {
        
        if (typeof rows === Number || rows <= 0) {
            return;
        } else if (typeof cols === Number || cols <= 0) {
            return;
        }
        
        this.rows = rows;
        this.cols = cols;
        this.tileCount = rows * cols;
        this.tilesRemoved = 0;
        this.tiles = [];
        
        var r,
            c,
            x = 0,
            y = 0,
            w = 20,
            h = 20;
        
        for (r = 0; r < rows; r += 1) {
            this.tiles[r] = [];
            for (c = 0; c < cols; c += 1) {
                this.tiles[r][c] = new Tile(x, y, w, h);
                x += 20;
            }
            x = 0;
            y += 20;
        }
    }
    Grid.prototype = {
        /*
            Check if there are any filled tiles in the last row.
        */
        checkPercolation: function () {
            var r = this.tiles.length - 1,
                c = this.tiles[r].length - 1;
            
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
            var r,
                c,
                rRow = Math.floor(Math.random() * grid.rows),
                rCol = Math.floor(Math.random() * grid.cols),
                currTile = grid.tiles[rRow][rCol];
            
            if (currTile.getState() === 'blocked') {
                currTile.pullTile();
            }
            
            function render() {
                for (r = 0; r < grid.rows; r += 1) {
                    for (c = 0; c < grid.cols; c += 1) {
                        grid.tiles[r][c].draw(context);
                    }
                }
            }
            
            render();
//            global.console.log();
        }
        
        global.window.setInterval(update, 10);
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