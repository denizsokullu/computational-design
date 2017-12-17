// Constructor function
function Rocket(dna,target) {
  this.pos = createVector(width/4, height/2);
  this.vel = createVector();
  this.acc = createVector();
  this.s1 = target.s1;
  this.s2 = target.s2;
  this.target = target;
  this.color = target.color;
  this.shape = target.shape;
  this.completed = false;
  this.crashed = false;
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
  this.calcFitness = function() {
    // Takes distance to target
    var d = dist(this.pos.x, this.pos.y, target.pos.x, target.pos.y);
    // Maps range of fitness
    maxDist = Math.sqrt((width**2)+(height**2));
    this.fitness = map(d, 0, maxDist, maxDist, 0);
    if (this.completed) {
      this.fitness *= 200;
    }
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
    return fitness;
  }
  // Updates state
  this.update = function() {
    // Checks distance from rocket to target
    var d = dist(this.pos.x, this.pos.y, this.target.pos.x, this.target.pos.y);
    // If distance less than 10 pixels, then it has reached target
    if (d < 8) {
      this.completed = true;
      this.pos = this.target.pos;
    }
    if(this.pos.y < 0 || this.pos.x < 0 || this.pos.y > height || this.pos.x > width/2){
      this.crashed = true;
    }
    this.applyForce(this.dna.genes[count]);
    if (!this.completed && !this.crashed) {
      this.vel.add(this.acc);
      this.pos.add(this.vel);
      this.acc.mult(0);
      this.vel.limit(4);
    }
  }
  this.show = target.draw;

}
