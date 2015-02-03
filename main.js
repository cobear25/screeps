var harvester = require('harvester');
var createHarvester = require('createHarvester');
var createGuard = require('createGuard');
var createWarrior = require('createWarrior');
var createArcher = require('createArcher');
var createHealer = require('createHealer');
var createBuilder = require('createBuilder');
var getCreepsForRole = require('getCreepsForRole');

var harvesters = getCreepsForRole('harvester');
var guards = getCreepsForRole('guard');
var archers = getCreepsForRole('archer');
var healers = getCreepsForRole('healer');
var builders = getCreepsForRole('builder');

var creeps = Game.spawns.Spawn1.room.find(Game.MY_CREEPS);
console.log("creeps in: "+creeps.length);
if(creeps.length <= 4) {
    createHarvester(1);
} else if (creeps.length <= 8) {
    createWarrior(1);
} else if (creeps.length == 9 && healers.length < 1) {
    createHealer(1);
} else if (creeps.length <= 13) {
    createHarvester(2);
} else if (creeps.length <= 16) {
    createArcher(2);
} else if (creeps.length == 17) {
    createBuilder(1);
} else if (creeps.length <= 23) {
    createWarrior(1);
} else if (creeps.length <= 25 && healers.length < 5) {
    createHealer(1);
} else if (creeps.length <= 29) {
    createWarrior(2);
} else if (creeps.length <= 34) {
    createArcher(2);
} else {
    if (healers.length < 3) {
        createHealer(2);
    } else {
        createWarrior(3);
    }
}

if (creeps.length % 6 === 0 && creeps.length > 30) {
    createBuilder(2);
}

if (harvesters.length > 15 && (guards.length < 2 && archers.length < 2)) {
    createArcher(1);
} else if (harvesters.length < 8 && creeps.length > 25) {
    createHarvester(2);
}
// } else if (creeps.length <= 10) {
//     createGuard(1);
// } else if (creeps.length <= 15) {
//     createGuard(2);
// } else if (creeps.length <= 20) {
//     createHarvester(2);
// } else {
//     createWarrior(1);
// }
// if (Game.spawns.Spawn1.energy > 200 && creeps.length > 5) {
//     createWarrior(2);
// }

for(var name in Game.creeps) {
	var creep = Game.creeps[name];
	if(creep.memory.role == 'harvester') {
		harvester(creep);
	}
	if(creep.memory.role == 'builder') {
		if(creep.energy == 0) {
			creep.moveTo(Game.spawns.Spawn1);
			Game.spawns.Spawn1.transferEnergy(creep);
		}
		else {
			var targets = creep.room.find(Game.CONSTRUCTION_SITES);
			if(targets.length) {
				creep.moveTo(targets[0]);
				creep.build(targets[0]);
			}
		}
	}
	if(creep.memory.role == 'guard') {
    	var targets = creep.room.find(Game.HOSTILE_CREEPS);
    	if(targets.length) {
    		creep.moveTo(targets[0]);
    		creep.attack(targets[0]);
    	} else {
    	    creep.moveTo(Game.flags.Flag1);
    	}
    }
    if(creep.memory.role == 'archer') {
        var target = creep.pos.findClosest(Game.HOSTILE_CREEPS);
    	if(target) {
            var targetsInRange = creep.pos.findInRange(Game.HOSTILE_CREEPS, 3);
            if(targetsInRange.length > 0) {
                creep.rangedAttack(targetsInRange[0]);
            } else {
                creep.moveTo(target);
            }
    	} else {
    	    creep.moveTo(Game.flags.Flag2);
    	}
    }
    if(creep.memory.role == 'healer') {
        var target = creep.pos.findClosest(Game.MY_CREEPS, {
            filter: function(object) {
                return object.hits < object.hitsMax;
            }
        });
        if(target) {
            creep.moveTo(target);
            creep.heal(target);
        } else {
            creep.moveTo(Game.flags.Flag3);
        }
    }
    if(creep.memory.role == 'builder') {
        if(creep.energy === 0) {
            creep.moveTo(Game.spawns.Spawn1);
            Game.spawns.Spawn1.transferEnergy(creep);
            // var source = creep.pos.findClosest(Game.SOURCES);
		  //  creep.moveTo(source);
		  //  creep.harvest(source);
        }
        else {
            var targets = creep.room.find(Game.CONSTRUCTION_SITES);
            if(targets.length) {
                creep.moveTo(targets[0]);
                creep.build(targets[0]);
            }
        }
    }
}

