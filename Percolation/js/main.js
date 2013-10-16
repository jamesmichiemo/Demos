(function (global) {
    
    'use strict';
    
    global.console.log("I ran.");
    
    var Color = {},
        Grid = {},
        Tile = {};
    
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
            
            var grid = [], r, c;
            
            for (r = 0; r < rows; r += 1) {
                grid[r] = [];
                for (c = 0; c < cols; c += 1) {
                    grid[r][c] = new Tile();
                }
            }
        }
    };
    
    Tile.prototype = {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        isFilled: false,
        isEmpty: false,
        color: Color.black
    };
    
    function percolationApp() {
        
//        var DOM = global.document,
//            stage = DOM.getElementById("percolation-demo"),
//            graphics = stage.getContext("2d");
        
    }
    
    function onLoad() {
        percolationApp();
    }
    global.addEventListener('load', onLoad, false);
    
}(this));