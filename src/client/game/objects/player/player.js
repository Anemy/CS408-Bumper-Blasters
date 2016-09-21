/**
 * This file contains the player class and the functions related to the player.
 * Contants for the player are kept in playerConstants.js
 */

const PlayerConstants = require('./playerConstants');

class Player {
  /*
   * Creates the player, placing it at the location provided, with the given skin preset.
   *
   * @param {Integer} xSpawn - Location to spawn on x axis.
   * @param {Integer} ySpawn - Location to spawn on y axis.
   * @param {Integer} skin - The reference to what the player looks like in playerConstants.skins.
   */
  create(xSpawn, ySpawn, skin) {
    this.x = xSpawn;
    this.y = ySpawn;

    this.width = PlayerConstants.playerSize;
    this.height = PlayerConstants.playerSize;

    this.skin = skin;
  }

  draw(ctx) {
    switch(PlayerConstants.skins[this.skin].type) {
    case PlayerConstants.skinTypes.COLOR:
      ctx.fillStyle = PlayerConstants.skins[this.skin].rgb;
      ctx.fillRect(this.x, this.y, this.width, this.height);
      break;
    }
  }
}

module.exports = Player;