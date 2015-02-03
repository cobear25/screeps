module.exports = function(role) {
    var array = [];
    for (var key in Game.creeps) {
        var creep = Game.creeps[key];
        if (creep.memory.role == role) {
            array.push(creep);
        }
    }
    return array;
}
