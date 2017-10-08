//Hover Functions
SETTINGS.hoverFunctions = {
  none : function(target){},
  bubble: function(target){
    t = target;
    data = SETTINGS.hoverStorage.bubble;
    ratio = data.ratio;
    maxDist = data.maxDistance;
    distance = dist(t.x+t.xStart,t.y+t.yStart,mouseX,mouseY);
    if (distance < maxDist){
      t.xs = distance/ratio;
      t.ys = distance/ratio;
    }
  },
  bounce : function(target){
    t = target;
    data = t.data.hoverBounce;
    settingData = SETTINGS.hoverStorage.bounce
    settingData.update(t);
    t.x = data.position.x;
    t.y = data.position.y;
  }
}
SETTINGS.hoverFunction = "none"
SETTINGS.hoverRep = SETTINGS.hoverFunctions.none
SETTINGS.hoverStorage = {
  bubble: {
    ratio : 4,
    maxDistance : 80,
    createGUI(){
      clearAll("hover");
      bubbleHoverFolder = gui.addFolder("Bubble Behaviour");
      data = settings.hoverStorage.bubble
      bubbleHoverFolder.add(data,"ratio",1,20);
      bubbleHoverFolder.add(data,"maxDistance",1,400);
      bubbleHoverFolder.open();
    }
  },
  none : {
    createGUI(){
      clearAll("hover");
    }
  },
  bounce : {
    maxSpeed : 10,
    maxForce : 1,
    distance : 100,
    createGUI : function(){
      clearAll("hover");
      bounceHoverFolder = gui.addFolder("Bounce Behaviour");
      data = settings.hoverStorage.bounce;
      bounceHoverFolder.add(data,"distance",0,500).step(1);
      bounceHoverFolder.add(data,"maxSpeed",0,20).step(0.01);
      bounceHoverFolder.add(data,"maxForce",0,2).step(0.001);
      bounceHoverFolder.open();
    },
    behaviours : function(t){
      var arrive = this.arrive(t,t.data.hoverBounce.target);
      var mouse = createVector(mouseX-t.xStart,mouseY-t.yStart);
      var flee = this.flee(t,mouse);

      arrive.mult(1);
      flee.mult(20);

      this.applyForce(t,arrive);
      this.applyForce(t,flee);
    },
    applyForce : function(t,f){
      t.data.hoverBounce.acceleration.add(f);
    },
    update : function(t){
      this.behaviours(t);
      t.data.hoverBounce.position.add(t.data.hoverBounce.velocity);
      t.data.hoverBounce.velocity.add(t.data.hoverBounce.acceleration);
      t.data.hoverBounce.acceleration.mult(0);
    },
    flee : function(t,target){
      var desired = p5.Vector.sub(target,t.data.hoverBounce.position);
      var d = desired.mag();
      if (d < this.distance){
        desired.setMag(this.maxSpeed);
        desired.mult(-1);
        var steer = p5.Vector.sub(desired,t.data.hoverBounce.velocity);
        steer.limit(this.maxForce);
        return steer;
      }else{
        return createVector(0,0);
      }
    },
    arrive : function(t,target){
      var desired = p5.Vector.sub(target,t.data.hoverBounce.position);
      var d = desired.mag();
      var speed = this.maxSpeed;
      if( d < this.distance){
        console.log(this.distance)
        var speed = map(d,0,this.distance,0,this.maxSpeed);
      }
      desired.setMag(speed);
      var steer = p5.Vector.sub(desired,t.data.hoverBounce.velocity);
      steer.limit(this.maxForce);
      return steer;
    },
    seek : function(t,target){
      var desired = p5.Vector.sub(target,t.data.hoverBounce.position);
      desired.setMag(this.maxSpeed);
      var steer = p5.Vector.sub(desired,t.data.hoverBounce.velocity);
      ster.limit(this.maxForce);
      return steer;
    }
  }
}
