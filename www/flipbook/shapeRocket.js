// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/bGz7mv2vD6g

// Constructor function
function Rocket(dna,target) {
  // Physics of rocket at current instance
  this.pos = createVector(width/2, height/2);
  this.vel = createVector();
  this.acc = createVector();
  this.s1 = target.s1;
  this.s2 = target.s2;
  this.target = target;
  this.color = target.color;
  this.shape = target.shape;
  // Checkes rocket has reached target
  this.completed = false;
  // Checks if rocket had crashed
  this.crashed = false;
  // Gives a rocket dna
  if (dna) {
    this.dna = dna;
  } else {
    this.dna = new DNA();
  }
  this.fitness = 0;

  // Object can recieve force and add to acceleration
  this.applyForce = function(force) {
    this.acc.add(force);
  }
  // Calulates fitness of rocket
  this.calcFitness = function() {
    // Takes distance to target
    var d = dist(this.pos.x, this.pos.y, target.pos.x, target.pos.y);
    // Maps range of fitness
    maxDist = Math.sqrt((width**2)+(height**2));
    this.fitness = map(d, 0, maxDist, maxDist, 0);
    // If rocket gets to target increase fitness of rocket
    if (this.completed) {
      this.fitness *= 200;
    }
    // If rocket does not get to target decrease fitness
    if (this.crashed) {
      this.fitness /= 10;
    }
  }
  this.showFitness = function() {
    // Takes distance to target
    var d = dist(this.pos.x, this.pos.y, target.pos.x, target.pos.y);
    // Maps range of fitness
    maxDist = Math.sqrt((width**2)+(height**2));
    fitness = map(d, 0, maxDist, maxDist, 0);
    // If rocket gets to target increase fitness of rocket
    // If rocket does not get to target decrease fitness
    return fitness;
  }
  // Updates state of rocket
  this.update = function() {
    // Checks distance from rocket to target
    var d = dist(this.pos.x, this.pos.y, this.target.pos.x, this.target.pos.y);
    // If distance less than 10 pixels, then it has reached target
    if (d < 4) {
      this.completed = true;
      this.pos = this.target.pos;
      // this.pos.x += (this.target.s2/2);
      // this.pos.y += (this.target.s1/2);
    }
    if(this.pos.y < 0 || this.pos.x < 0 || this.pos.y > height || this.pos.x > width){
      this.crashed = true;
    }
    // // Rocket hit the barrier
    // if (this.pos.x > rx && this.pos.x < rx + rw && this.pos.y > ry && this.pos.y < ry + rh) {
    //   this.crashed = true;
    // }
    // // Rocket has hit left or right of window
    // if (this.pos.x > width || this.pos.x < 0) {
    //   this.crashed = true;
    // }
    // // Rocket has hit top or bottom of window
    // if (this.pos.y > height || this.pos.y < 0) {
    //   this.crashed = true;
    // }


    //applies the random vectors defined in dna to consecutive frames of rocket
    this.applyForce(this.dna.genes[count]);
    // if rocket has not got to goal and not crashed then update physics engine
    if (!this.completed && !this.crashed) {
      this.vel.add(this.acc);
      this.pos.add(this.vel);
      this.acc.mult(0);
      this.vel.limit(4);
    }
  }
  // displays rocket to window
  this.show = target.draw;

}
