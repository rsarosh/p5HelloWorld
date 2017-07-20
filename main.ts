//References of p5.js
declare function ellipse(x: number, y:number, sizeX:number, sizeY: number): any;
declare function createCanvas(x: number, y:number, renderer?: string): any;
declare function fill(r: number,g: number,b: number): any;
declare function clear();
declare function background(r: number,g: number,b: number): any;
declare function frameRate(i: number);

//globals
var ocean: Ocean;
var canvas ;
var canvas_size = 600;

function setup () {
   canvas = createCanvas(canvas_size, canvas_size);
   ocean = new Ocean();
}

function draw () {
  clear();
  background(0,0,25);
  frameRate(5);
   if (ocean) {
       ocean.MoveCreatures();
    }
};

//Creatures
class Creature {
     constructor (foodChain: number, name: string) {
        //born randomely in different positions 
        this.pos = [Math.floor((Math.random() * canvas_size) + 1 ),Math.floor((Math.random() * canvas_size) + 1 )];
        this.foodChain = foodChain;
        this.name = name ;
    };
    public pos: [number, number] ;
    public foodChain: number;
    public name : string;
}

enum Direction {
    Up = 1,
    Down,
    Left,
    Right
}

class Ocean {

    public Creatures = [ new Creature(100, "shark"), new Creature (20, "fish"), new Creature(10, "crab")];

    public MoveCreatures () {
        for ( var i = 0; i < this.Creatures.length ; i ++) {
            this.MoveCreature ( this.Creatures[i]);
        }

        for ( var i = 0; i < this.Creatures.length - 1; i ++) {
            if ( (this.Creatures[i].pos[0] >= this.Creatures[i+1].pos[0] - 15 && this.Creatures[i].pos[0] <= this.Creatures[i+1].pos[0] + 15 ) && 
                 (this.Creatures[i].pos[1] >= this.Creatures[i+1].pos[1] - 15 && this.Creatures[i].pos[1] <= this.Creatures[i+1].pos[1] + 15 ) && 
                this.Creatures[i].foodChain > this.Creatures[i+1].foodChain ) {
                    this.Creatures[i + 1].name = "dead";
                }

        }
        
    }

    private MoveCreature (creature : Creature) {
        let dir: Direction =  this.GetDirection ();
        let move = 0 ;
        if (creature.name === "shark") {
            move = 15;
            fill(255,0,0);
        }
        if (creature.name === "fish") {
            move = 10;
            fill(0,255,0);
        }
        if (creature.name === "crab") {
            move = 5;
            fill(0,0,255);
        }
        if (dir === Direction.Up) {
             if (creature.pos [1] < 595) {
                creature.pos[1] =  creature.pos[1] + move;
             }
            else
            {
                  creature.pos[1] =  creature.pos[1] - move;
            }
        }
        if (dir === Direction.Down) {
            if (creature.pos [1] > 5) {
                creature.pos[1] =  creature.pos[1] - move;
            }
            else
            {
                  creature.pos[1] =  creature.pos[1] + move;
            }
        }
        if (dir === Direction.Right) {
            if (creature.pos [0] < 595) {
                creature.pos[0] =  creature.pos[0] + move;
            }
            else
            {
                  creature.pos[0] =  creature.pos[0] - move;
            }
        }
        if (dir === Direction.Left) {
            if (creature.pos [0] > 5) {
                creature.pos[0] =  creature.pos[0] - move;
            }
            else
            {
                  creature.pos[0] =  creature.pos[0] + move;
            }
        }
     
        ellipse(creature.pos[0], creature.pos[1], move, move);


     
    }

 
    private GetDirection(): Direction 
    { 
        switch (Math.floor((Math.random() * 4) + 1 )){
            case 1:
            return Direction.Up ;
            case 2: 
            return Direction.Down;
            case 3:
            return Direction.Left;
            case 4:
            return Direction.Right;
            };

    }
}



window.onload = () => {

};


