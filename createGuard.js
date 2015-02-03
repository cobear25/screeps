/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('harvester'); // -> 'a thing'
 */
 module.exports = function (level) {

	if(level == 1) {
        Game.spawns.Spawn1.createCreep([Game.MOVE, Game.ATTACK, Game.TOUGH, Game.TOUGH], null, {role: 'guard'});
    } else if(level == 2) {
        Game.spawns.Spawn1.createCreep([Game.MOVE, Game.ATTACK, Game.ATTACK, Game.TOUGH, Game.TOUGH], null, {role: 'guard'});
    }
}
