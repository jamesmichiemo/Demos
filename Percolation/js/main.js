/*
    Percolation
*/

(function (global) {
    
    'use strict';
    
    var Color = {
            black: '#000000',
            blue: '#00B7FF',
            white: '#ffffff'
        };
    
    /*
       The Tile object is the basic unit of the grid. 
    */
    function Tile(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    Tile.prototype = {
        isFilled: false,    // Is it filled with water?
        isEmpty: false,     // Is it still blocked?
        color: Color.black  // black = blocked, blue = filled, white = empty
    };
    
    /*
        The Grid serves as the container for all the tiles.
    */
    function Grid(rows, cols) {
        if (typeof rows !== Number || rows <= 0) {
            return;
        } else if (typeof cols !== Number || cols <= 0) {
            return;
        }
        
        this.rows = rows;
        this.cols = cols;
        this.tileCount = rows * cols;
        
        var r, c, x, y, w, h;
        
        for (r = 0; r < rows; r += 1) {
            this.tiles[r] = [];
            for (c = 0; c < cols; c += 1) {
                x = 0;
                y = 0;
                this.tiles[r][c] = new Tile(x, y, w, h);
            }
        }
    }
    Grid.prototype = {
        tiles: [],
        tileCount: 0,
        tilesRemoved: 0,
        percolated: false
    };
    
    /*
        Use the canvas element to display the Percolation.
    */
    function percolationApp() {
        
        var DOM = global.document,
            stage = DOM.getElementById("percolation-demo"),
            graphics = stage.getContext("2d"),
            grid = new Grid(10, 10);
        
        
    }
    
    /*
        Wait for the browser window to load everything.   
    */
    function onLoad() {
        percolationApp();
    }
    global.window.addEventListener('load', onLoad, false);
    
}(this));