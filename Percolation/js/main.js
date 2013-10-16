/*
    Percolation
*/

(function (global) {
    
    'use strict';
    
    var Color = {},
        Grid = {},
        Tile = function (x, y, width, height) {
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
        };
    
    Color.prototype = {
        black: '#000000',
        blue: '#00B7FF',
        white: '#ffffff'
    };
    
    Grid.prototype = {
        rows: 0,
        cols: 0,
        tileCount: 0,
        tilesRemoved: 0,
        percolated: false,
        generate: function (rows, cols) {
            
            if (typeof rows !== Number || rows <= 0) {
                return;
            } else if (typeof cols !== Number || cols <= 0) {
                return;
            }
            
            this.rows = rows;
            this.cols = cols;
            this.tileCount = rows * cols;
            
            var grid = [], r, c, x, y, w, h;
            
            for (r = 0; r < rows; r += 1) {
                grid[r] = [];
                for (c = 0; c < cols; c += 1) {
                    x = 0;
                    y = 0;
                    grid[r][c] = new Tile(x, y, w, h);
                }
            }
            
            return grid;
        }
    };
    
    /*
       The Tile object is the basic unit of the grid. 
    */
    Tile.prototype = {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        isFilled: false,    // Is it filled with water?
        isEmpty: false,     // Is it still blocked?
        color: Color.black  // black = blocked, blue = filled, white = empty
    };
    
    function percolationApp() {
        
        var DOM = global.document,
            stage = DOM.getElementById("percolation-demo"),
            graphics = stage.getContext("2d"),
            grid = new Grid();
        
    }
    
    /*
        Wait for the browser window to load everything.   
    */
    function onLoad() {
        percolationApp();
    }
    global.window.addEventListener('load', onLoad, false);
    
}(this));