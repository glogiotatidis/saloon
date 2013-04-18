define(function(require) {
    var loader = require('game/loader');
    var Entity = require('flux/entity');
    var TiledGraphic = require('flux/graphics/tiled');
    var Tilemap = require('flux/tilemap');

    function Door(x, y, map_name, map_file, player1_x, player1_y) {
        Entity.call(this, x, y);
        this.map_name = map_name;
        this.map_file = map_file;
        this.player1_x = player1_x;
        this.player1_y = player1_y;
        this.setHitbox(0, 0, 16, 16);
    }
    Door.prototype = Object.create(Entity.prototype);

    Door.prototype.tick = function() {
        Entity.prototype.tick.call(this);
        var collision = this.getCollideEntity('player1', 0, 0);
        if (collision) {
            this.world.enable_map(this.map_name);
            this.world.entity_types.player1[0].x = this.player1_x;
            this.world.entity_types.player1[0].y = this.player1_y;
        }
    };

    return Door;
});
