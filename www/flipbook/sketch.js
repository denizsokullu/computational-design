// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/bGz7mv2vD6g
var resultsViewed = false;
var population1;
// Each rocket is alive till 400 frames
var lifespan = 1000;
var iteration = 0;
var totalIters = 5;
var size;
var targets = [];
var populations = [];
var results = [];
var drawing = false;
var mutating = false;
var drawingCount = 0;
// Made to display count on screen
// var lifeP;
// Keeps track of frames
var count = 0;
// Where rockets are trying to go
var target1;
var target2;
var maxforce = .008;

function ShapeTargetBasic(x,y,s1,s2,shape,color){
  this.pos = {};
  this.pos.x = x;
  this.pos.y = y;
  this.s1 = s1;
  this.s2 = s2;
  this.shape = shape;
  this.color = color;
  this.draw = function(self){
    push();
    translate(self.pos.x,self.pos.y);
    rectMode(CENTER);
    ellipseMode(CENTER);
    noStroke();
    fill(self.color);
    if(self.shape == "rect"){
      rect(0,0,self.s1,self.s2);
    }
    else if(self.shape == "circle"){
      ellipse(0,0,self.s1,self.s2);
    }
    pop();
  }
}
function ShapeTargetTriangle(x,y,color){
  this.pos = {};
  this.pos.x = (x[0] + x[1] + x[2]) / 3;
  this.pos.y = (y[0] + y[1] + y[2]) / 3;
  //calc distances from center
  cx = this.pos.x;
  cy = this.pos.y;
  this.xs = x.map((cur)=>{return cur-cx});
  this.ys = y.map((cur)=>{return cur-cy});
  this.target = this;
  this.color = color;
  this.shape = "triangle";
  this.draw = function(self){
    xs = self.target.xs;
    ys = self.target.ys;
    cx = self.pos.x;
    cy = self.pos.y;
    xs = xs.map((cur)=>{return cur+cx});
    ys = ys.map((cur)=>{return cur+cy});
    noStroke();
    fill(self.color);
    triangle(xs[0],ys[0],xs[1],ys[1],xs[2],ys[2]);
  }
}
function setup() {
  createCanvas(360,360);
  background(255);

  targets.push(new ShapeTargetBasic(98,180,113,225,"rect",color(0,28,119)));
  targets.push(new ShapeTargetBasic(234,156,144,153,"rect",color(
    253,183,171
  )));
  targets.push(new ShapeTargetBasic(306,79,24,24,"rect",color(76,109,235)));
  targets.push(new ShapeTargetBasic(196,109,13.52,13.52,"circle",color(0,0,0)));
  targets.push(new ShapeTargetTriangle([184,228,180],[36,69,89],color(0,28,119)));
  targets.map((cur)=>{
    populations.push(new Population(cur,cur.s1,cur.s2));
  });

}

function shuffle(array) {
  var copy = [], n = array.length, i;

  // While there remain elements to shuffle…
  while (n) {

    // Pick a remaining element…
    i = Math.floor(Math.random() * array.length);

    // If not already shuffled, move it to the new array.
    if (i in array) {
      copy.push(array[i]);
      delete array[i];
      n--;
    }
  }

  return copy;
}


function draw() {
  if(iteration < totalIters){
    if(!drawing && !mutating && count != lifespan){
      for(var i = 0; i < lifespan; i++){
        populations.map((cur,i)=>{
          cur.run(lifespan,count);
        })
        // population1.run(lifespan,count,size);
        // population2.run(lifespan,count,size);
        count++;
      }
    }
    else if(count == lifespan && !drawing && !mutating){
      drawing = true;
    }
    else if(drawing && !mutating){
      drawingLimit = populations[0].popsize;
      background(255);
      populations.map((population,i)=>{
        rocket = population.rockets[drawingCount];
        max = Math.sqrt((width**2)+(height**2));
        cur = rocket.showFitness();
        success = (cur/max*100);
        if(success > 0){
          rocket.show(rocket);
        }
        // population.evaluate();
        // population.selection();
      });
      drawingCount ++;
      if(drawingCount == drawingLimit){
        drawing = false;
        mutating = true;
        drawingCount = 0;
      }
    }

    // Displays count to window
    // lifeP.html(count);
    else if (count == lifespan && mutating) {
      //go into drawing mode;
      mutating = false;
      state = {total:0,sum:0,objects:[]};
      if(!drawing){
        populations.map((population)=>{
          // population.show(targets[i].color,targets[i].s1,targets[i].s2);
          curObjectArray = [];
          population.rockets.map((cur)=>{
              if(dist(cur.pos.x,cur.pos.y,cur.target.pos.x,cur.target.pos.y)< 1){
                state.sum++;
              }
              curObject = {pos:cur.pos,shape:cur.shape,fitness:cur.showFitness()};
              curObjectArray.push(curObject);
              state.total++;
            });
          // curObjectArray = curObjectArray.sort((a,b)=>{
          //   if(a.fitness == b.fitness){
          //     return 0;
          //   }
          //   return a.fitness > b.fitness ? 1 : -1;
          // })
          curObjectArray = shuffle(curObjectArray);
          state.objects.push(curObjectArray);
          population.evaluate();
          population.selection();
        });
        count = 0;
        iteration ++;
        results.push(state);
        // rect(rx, ry, rw, rh);
        // Renders target
        targets.map((cur)=>{
          // cur.draw(cur);
        })
      }
    }
  }
  else if((results[results.length-1].sum / (results[results.length-1].total)) < 0.90){
    totalIters++;
    console.log(totalIters);
  }
  else if(!resultsViewed){
    window.alert("Got your drawing hahaah you can't stop me!");
    console.log(results);
    allResults = [];
    for(var i = 0; i < targets.length; i++){
      curShape = [];
      results.map((cur)=>{
        cur.objects[i].map((c)=>{
          curShape.push(c);
        })
      });
      allResults.push(curShape);
    }
    console.log(allResults);
    resultsViewed = !resultsViewed;
  }
}
