define(function(require) {
    var loader = require('game/loader');
    var DefaultWorld = require('flux/worlds/default');
    var TiledGraphic = require('flux/graphics/tiled');
    var Tilemap = require('flux/tilemap');
    var Door = require('game/door');

    function SaloonWorld(tilemap) {
        DefaultWorld.call(this);

        this.tilemap = tilemap;
    }

    SaloonWorld.prototype = Object.create(DefaultWorld.prototype);

    SaloonWorld.prototype.render = function(ctx) {
        if (this.tilemap !== undefined) {
            this.tilemap.render(ctx);
        }

        DefaultWorld.prototype.render.call(this, ctx);
    };

    SaloonWorld.prototype.enable_map = function enable_map(map_name) {
        var map = loader.get(map_name);
        var tilemap = new Tilemap(map.layers.tiles.grid, 0, 0);
        var engine = this.engine;

        // Clear all entities except player
        engine.world.entities.forEach(function(entity, index) {
            if (entity.type !== 'player1') {
                delete entity.world.entities[index];
            }
        });

        map.objectGroups.doors.objects.forEach(function(door, index) {
            engine.addEntity(new Door(door.x, door.y,
                                      door.properties.map_name,
                                      door.properties.map_file,
                                      door.properties.player1_x,
                                      door.properties.player1_y));
        });
        tilemap.graphic = new TiledGraphic(loader.get('tiles_bar'),
                                           16, 16, 0, 0);
        engine.world.tilemap = tilemap;
    };

    return SaloonWorld;
});
