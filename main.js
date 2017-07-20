//globals
var ocean;
var canvas;
var canvas_size = 600;
function setup() {
    canvas = createCanvas(canvas_size, canvas_size);
    ocean = new Ocean();
}
function draw() {
    clear();
    background(0, 0, 25);
    frameRate(5);
    if (ocean) {
        ocean.MoveCreatures();
    }
}
;
//Creatures
class Creature {
    constructor(foodChain, name) {
        //born randomely in different positions 
        this.pos = [Math.floor((Math.random() * canvas_size) + 1), Math.floor((Math.random() * canvas_size) + 1)];
        this.foodChain = foodChain;
        this.name = name;
    }
    ;
}
var Direction;
(function (Direction) {
    Direction[Direction["Up"] = 1] = "Up";
    Direction[Direction["Down"] = 2] = "Down";
    Direction[Direction["Left"] = 3] = "Left";
    Direction[Direction["Right"] = 4] = "Right";
})(Direction || (Direction = {}));
class Ocean {
    constructor() {
        this.Creatures = [new Creature(100, "shark"), new Creature(20, "fish"), new Creature(10, "crab")];
    }
    MoveCreatures() {
        for (var i = 0; i < this.Creatures.length; i++) {
            this.MoveCreature(this.Creatures[i]);
        }
        for (var i = 0; i < this.Creatures.length - 1; i++) {
            if ((this.Creatures[i].pos[0] >= this.Creatures[i + 1].pos[0] - 15 && this.Creatures[i].pos[0] <= this.Creatures[i + 1].pos[0] + 15) &&
                (this.Creatures[i].pos[1] >= this.Creatures[i + 1].pos[1] - 15 && this.Creatures[i].pos[1] <= this.Creatures[i + 1].pos[1] + 15) &&
                this.Creatures[i].foodChain > this.Creatures[i + 1].foodChain) {
                this.Creatures[i + 1].name = "dead";
            }
        }
    }
    MoveCreature(creature) {
        let dir = this.GetDirection();
        let move = 0;
        if (creature.name === "shark") {
            move = 15;
            fill(255, 0, 0);
        }
        if (creature.name === "fish") {
            move = 10;
            fill(0, 255, 0);
        }
        if (creature.name === "crab") {
            move = 5;
            fill(0, 0, 255);
        }
        if (dir === Direction.Up) {
            if (creature.pos[1] < 595) {
                creature.pos[1] = creature.pos[1] + move;
            }
            else {
                creature.pos[1] = creature.pos[1] - move;
            }
        }
        if (dir === Direction.Down) {
            if (creature.pos[1] > 5) {
                creature.pos[1] = creature.pos[1] - move;
            }
            else {
                creature.pos[1] = creature.pos[1] + move;
            }
        }
        if (dir === Direction.Right) {
            if (creature.pos[0] < 595) {
                creature.pos[0] = creature.pos[0] + move;
            }
            else {
                creature.pos[0] = creature.pos[0] - move;
            }
        }
        if (dir === Direction.Left) {
            if (creature.pos[0] > 5) {
                creature.pos[0] = creature.pos[0] - move;
            }
            else {
                creature.pos[0] = creature.pos[0] + move;
            }
        }
        ellipse(creature.pos[0], creature.pos[1], move, move);
    }
    GetDirection() {
        switch (Math.floor((Math.random() * 4) + 1)) {
            case 1:
                return Direction.Up;
            case 2:
                return Direction.Down;
            case 3:
                return Direction.Left;
            case 4:
                return Direction.Right;
        }
        ;
    }
}
window.onload = () => {
};
//# sourceMappingURL=main.js.map