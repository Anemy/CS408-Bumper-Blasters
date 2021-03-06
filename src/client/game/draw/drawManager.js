'use strict';

/**
 * This object manages the drawing in the game.
 */

// Load in the constants (colors, sizes, etc.) for drawing.
const DrawConstants = require('./drawConstants');
const Constants = require('../../../shared/game/constants');
const PlayerConstants = require('../../../shared/player/playerConstants');

class DrawManager {
  constructor() {
    const canvas = document.getElementById('gameCanvas');

    // The drawable canvas reference.
    this.ctx = canvas.getContext('2d');

    this.ctx.canvas.width = Constants.width;
    this.ctx.canvas.height = Constants.height;
  }

  draw() {
    // Clear the last frame.
    this.ctx.clearRect(0, 0, Constants.width, Constants.height); 

    this.drawMap();
  }

  // Returns the drawing context.
  getDraw() {
    return this.ctx;
  }

  drawMap() {
    this.ctx.fillStyle = DrawConstants.mapBackgroundColor;
    this.ctx.fillRect(0,0, Constants.width, Constants.height);

    const gridSize = Constants.width / DrawConstants.gridAmount;
    this.ctx.strokeStyle = DrawConstants.mapGridColor;
    for(var i = 0; i < DrawConstants.gridAmount + 1; i++) {
      // Randomly paint in certain squares to flicker.
      // for(var k = 0; k < DrawConstants.gridAmount + 1; k++) {
      //   if (Math.random() * 10 < 2) {
      //     const red = (245 - Math.floor(Math.random() * DrawConstants.mapGridFlickerRange));
      //     const green = (245 - Math.floor(Math.random() * DrawConstants.mapGridFlickerRange));
      //     const blue = (225 - Math.floor(Math.random() * DrawConstants.mapGridFlickerRange));

      //     this.ctx.fillStyle = `rgb(${red},${green},${blue})`;
      //     this.ctx.fillRect(gridSize * i, gridSize * k, gridSize, gridSize);
      //   }
      // }

      // Vertical lines.
      this.ctx.beginPath();
      this.ctx.moveTo(gridSize * i, 0);
      this.ctx.lineTo(gridSize * i, Constants.height);
      this.ctx.closePath();
      this.ctx.stroke();

      // Horizontal lines.
      // Because of the 16:9 aspect ratio, only draw squares, this means that there are more in the square
      if (gridSize * i < Constants.height) {
        this.ctx.beginPath();
        this.ctx.moveTo(0, gridSize * i);
        this.ctx.lineTo(Constants.width, gridSize * i);
        this.ctx.closePath();
        this.ctx.stroke();
      } else if(gridSize * (i - 1) <= Constants.height) {
        // This draws the end border line.
        this.ctx.beginPath();
        this.ctx.moveTo(0, Constants.height);
        this.ctx.lineTo(Constants.width, Constants.height);
        this.ctx.closePath();
        this.ctx.stroke();
      }
    }

    this.ctx.strokeStyle = DrawConstants.mapBorderColor;
    // Draw bars around the game.
    this.ctx.beginPath();
    this.ctx.moveTo(Constants.width - 1, 0); // right side 
    this.ctx.lineTo(Constants.width - 1, Constants.height);
    this.ctx.moveTo(Constants.width, 0); // top
    this.ctx.lineTo(0, 0);
    this.ctx.moveTo(1, 0); // left
    this.ctx.lineTo(1, Constants.height);
    this.ctx.moveTo(0, Constants.height - 1); // bottom
    this.ctx.lineTo(Constants.width, Constants.height - 1);
    this.ctx.closePath();
    this.ctx.stroke();
  }

  drawLeaderboard(players) {
    let i = 0;
    for(let p in players) {
      this.ctx.fillStyle = 'rgb(0,0,0)';
      this.ctx.font = Math.floor(16 * Constants.scale) + 'px Arial';
      this.ctx.textBaseline = 'bottom';
      this.ctx.textAlign = 'left';
      this.ctx.fillText(players[p].username || PlayerConstants.defaultUsername, 2, 18*Constants.scale + i * 16 * Constants.scale);
      this.ctx.fillText(players[p].kills, 140 * Constants.scale, 18*Constants.scale + i * 16 * Constants.scale);

      i++;
    }
  }
}

module.exports = DrawManager;