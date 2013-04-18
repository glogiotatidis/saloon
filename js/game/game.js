define(function(require) {
    var Engine = require('flux/engine');
    var Graphic = require('flux/graphics/graphic');
    var TiledGraphic = require('flux/graphics/tiled');
    var Tilemap = require('flux/tilemap');

    var loader = require('game/loader');
    var Player = require('game/player');
    var SaloonWorld = require('game/world');
    var Door = require('game/door');

    // REGISTER RESOURCES TO LOAD HERE
    loader.register('tiles_player', 'img/player.png', 'image');
    loader.register('tiles_bar', 'img/tiles.png', 'image');
    loader.register('map_bar', 'maps/bar.tmx', 'map');
    loader.register('map_bar1', 'maps/bar1.tmx', 'map');


    // callback run once all resources have been loaded.
    loader.loadAll().done(function() {
        // Initialize engine.
        var engine = new Engine(256, 224, 3, new SaloonWorld());
        engine.bg_color = '#000000';

        // ADD INITIAL STATE (entities, worlds, etc) HERE
        engine.addEntity(new Player(5 * 16, 6 * 16));

        engine.world.enable_map('map_bar');
        // Append canvas to screen and start the engine!
        document.querySelector('#game').appendChild(engine.canvas);
        engine.start();
    });
});
