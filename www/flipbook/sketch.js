var resultsViewed = false;
var population1;
var lifespan = 1200;
var iteration = 0;
var totalIters = 1;
var size;
var targets = [];
var populations = [];
var results = [];
var drawing = false;
var mutating = false;
var drawingCount = 0;
var count = 0;
var target1;
var target2;
var maxforce = .01;

function ShapeTargetBasic(x,y,s1,s2,shape,color){
  this.pos = {};
  this.pos.x = x;
  this.pos.y = y;
  this.s1 = s1;
  this.s2 = s2;
  this.shape = shape;
  this.color = color;
  this.draw = function(self,isReference){
    push();
    translate(self.pos.x,self.pos.y);
    rectMode(CENTER);
    ellipseMode(CENTER);
    noStroke();
    fill(self.color);
    if(isReference){
      extraX = width/2;
    }
    else{
      extraX = 0;
    }
    if(self.shape == "rect"){
      rect(0+extraX,0,self.s1,self.s2);
    }
    else if(self.shape == "circle"){
      ellipse(0+extraX,0,self.s1,self.s2);
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
  this.draw = function(self,isReference){
    xs = self.target.xs;
    ys = self.target.ys;
    cx = self.pos.x;
    cy = self.pos.y;
    if(isReference){
      extraX = width/2;
    }
    else{
      extraX = 0;
    }
    xs = xs.map((cur)=>{return cur+cx+extraX});
    ys = ys.map((cur)=>{return cur+cy});
    noStroke();
    fill(self.color);
    triangle(xs[0],ys[0],xs[1],ys[1],xs[2],ys[2]);
  }
}
function setup() {
  createCanvas(720,360);
  background(255);

  targets.push(new ShapeTargetBasic(98,180,113,225,"rect",color(0,28,119)));
  targets.push(new ShapeTargetBasic(234,156,144,153,"rect",color(
    253,183,171
  )));
  targets.push(new ShapeTargetBasic(306,79,24,24,"rect",color(76,109,235)));
  targets.push(new ShapeTargetBasic(196,109,13.52,13.52,"circle",color(0,0,0)));
  // targets.push(new ShapeTargetTriangle([184,228,180],[36,69,89],color(0,28,119)));
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
      });
      drawingCount ++;
      if(drawingCount == drawingLimit){
        drawing = false;
        mutating = true;
        drawingCount = 0;
      }
    }

    // Displays count to window
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
              curObject = {x:cur.pos.x,y:cur.pos.y,shape:cur.shape};
              curObjectArray.push(curObject);
              state.total++;
          });
          curObjectArray = shuffle(curObjectArray);
          state.objects.push(curObjectArray);
          population.evaluate();
          population.selection();
        });
        curObjectArray = state.objects;
        newArray = [];
        for(var i = 0; i < curObjectArray[0].length;i++){
          a = curObjectArray;
          n = [];
          for(var j = 0; j < curObjectArray.length;j++){
            n.push(a[j][i]);
          }
          newArray.push(n);
        }
        state.objects = newArray;
        count = 0;
        iteration ++;
        results.push(state);
      }
    }
  }
  else if((results[results.length-1].sum / (results[results.length-1].total)) < 1){
    totalIters++;
    console.log(totalIters);
  }
  else if(!resultsViewed){
    window.alert("Got your drawing hahaah you can't stop me!");
    console.log(results);
    allResults = [];
    curShape = [];
    results.map((cur)=>{
      cur.objects.map((x)=>{
        curShape.push(x);
      })
    });
    allResults = curShape;
    console.log(allResults);
    console.log(JSON.stringify(allResults));
    resultsViewed = !resultsViewed;
  }
  if(!resultsViewed){
    targets.map((cur)=>{
      cur.draw(cur,true);
    })
    text("Generation: "+iteration,20,height-20);
  }
}
