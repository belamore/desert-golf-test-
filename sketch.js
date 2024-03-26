var flaglocs = []

var sky_col_string = "#bed69a"
var ground_col_string = "#839e3f"
var water_col_string = "#5c9dd0"

var sky_col
var ground_col
var water_col

var bright_sky = 84
var sat_sky = 40

var bright_ground = 84
var sat_ground = 60 //nice

var worldPoints = []
var anchorRight
var anchorLeft

let holeFiller
let holeTrigger

var maxHeight
var minHeight = 80

var minxjump = 30
var maxxjump = 80

var minyjump = 40
var maxyjump = 100

let font

let ground
let groundFill
let ball

function preload(){
  font = loadFont("font.ttf")
}

function setup() {
  createCanvas(960, 540);
  
  // canvasScale(0.5)
  
  textFont(font)
  
  maxHeight = height-30
  
  sky_col = color(sky_col_string)
  ground_col = color(ground_col_string)
  water_col = color(water_col_string)

  ball = new Sprite()
  ball.x = 30
  ball.y = 2*height/3 -4
  ball.diameter = 8
  ball.collider = 'dynamic'
  ball.color = "#ffffff"
  ball.bounciness = 0.3
  // ball.friction = 1.0
  // ball.drag = 0.2
  
  world.gravity.y = 9

  
  worldPoints = [
    
  ]
  
  anchorRight = [width+10, height+10]
  anchorLeft = [-10, height+10]
  
  worldPoints.push([-10, 2*height/3])
  
  let xp = 100
  let yp = 2*height/3
  
  while(xp < width-150-minxjump){
    worldPoints.push([xp, yp])
    var ox = xp
    var oy = yp
    xp += minxjump + random(maxxjump)
    var yd = minyjump + random(maxyjump)
    if(random() < 0.5)
      yd *= -1
    if(random() < 0.3)
      yd = 0
    if(yp + yd < minHeight){
      yd *= -1
    }
    yp += yd
    if(yp > maxHeight){
      worldPoints.push([ox, height+20])
      worldPoints.push([xp, height+20])
      yp = minHeight + random(maxHeight-minHeight)
    }
  }
  

  
  worldPoints.push([width-150, 2*height/3])
  worldPoints.push([width-100, 2*height/3])
  worldPoints.push([width-100, 2*height/3+20])
  worldPoints.push([width-85, 2*height/3+25])
  worldPoints.push([width-70, 2*height/3+20])
  worldPoints.push([width-70, 2*height/3])
  worldPoints.push([width+10, 2*height/3])
  
  worldPoints.push([anchorRight[0], anchorRight[1]])
  worldPoints.push([anchorLeft[0], anchorLeft[1]])
  
  ground = new Sprite(worldPoints);
  ground.collider = 'kinematic';
  // ground.friction = -1
  // ground.color = color(255)
  
  // print(ground.x)
  // print(ground.y)/
  
  // groundSprite
  
  holeFiller = new Sprite(width-85, 2*height/3+25+23)
  holeFiller.width = 50
  holeFiller.height = 50
  holeFiller.color = color(255)
  holeFiller.collider = 'kinematic'
  
  holeTrigger = new Sprite(width-85, 2*height/3+25+5)
  holeTrigger.width = 50
  holeTrigger.height = 50
  holeTrigger.color = color("#ffffff00")
  holeTrigger.collider = 'static'
  
  
  colorMode(HSB, 360, 100, 100)
  
  for(let i=0; i<360; i+=10){
    var c = color(i, sat_sky, bright_sky)
    // print(lightness(c))
  }
  
  hue = random()*360
  
  flaglocs.push(width)
  
  newWidth = width
  // noLoop()
  // frameRate(15)
}

// camera = {
//   x: 0,
//   y:0
// }

var holeWidth = 20
var holeHeight = 20

// function mouseClicked() {
//    setup() 
//   draw()
// }

function addHole(x){
  
}

var ground_cs = [
  ("#839e3f"),
  ("#d7447a"),
  ("#d78343")
]

var sky_cs = [
  ("#bed69a"),
  ("#d57189"),
  ("#d5a871")
]

var maxv = 20


var mouseHeld = false
var strokeStart = []

var maxArrowLength = 200

var hue

var holenum = 1
var strokecount = 0

var scrollDistance = 0
var scrollCount = 0

var holeTransition = false
var holeFill = 0

var ballResetPos = 30

var holenum = 1
var skips = 0

function draw() {
  
  sky_col = color(hue, sat_sky, bright_sky)
  
  if(scrollCount > 0){
    scrollDistance -= 10;
    scrollCount-=10;
    if(scrollCount <= 0){
      scrollCount = 0
      holeTrigger.x = newWidth-85
      holeTrigger.y = 2*height/3+25+5
      ball.vel.x = 0
      ball.vel.y = 0
    }
  }
  
  push()
  
  
  
  translate(scrollDistance, 0)
  
  
  ground_col = color(hue, lerp(40, 70, red(sky_col)/255), lerp(50, 80, red(sky_col)/255))
  
  background(sky_col);
  
  fill(water_col)
  rect(ballResetPos, height-20, width*2, 20)
  
  fill(ground_col)
  
  holeTrigger.draw()
  
  if(holeTransition){
    holeFill++
    holeFiller.y--
    if(holeFill == 25){
      holeTransition = false
      addNewStage()
    }
  }
  
  holeFiller.color = ground_col
  holeFiller.draw()
  
  beginShape()
  for(let i=0; i<worldPoints.length; i++){
    vertex(worldPoints[i][0], worldPoints[i][1])
  }
  vertex(anchorRight[0], anchorRight[1])
  vertex(anchorLeft[0], anchorLeft[1])
  endShape()
  
  fill(255)
  // ellipse(ball.x, ball.y, ball.r)
  
  
  flaglocs.forEach(function(fl){
    push()
    translate(fl,0)
    fill(color("#9c7a54"))
    rect(-68, 2*height/3-30, 3, 30)
    fill(color("#f5f796"))
    beginShape()
    vertex(-65, 2*height/3-30)
    vertex(-27, 2*height/3-30)
    vertex(-22, 2*height/3-22.5)
    vertex(-27, 2*height/3-15)
    vertex(-65, 2*height/3-15)
    endShape()
    fill("#85846f")



    textSize(10.5)
    // var holenum = floor(random(9999))
    text(""+(holenum), -63, 2*height/3-19.75)
    pop()
    
  })
  
  
  noFill()
  // ground.color = color(255)
  // strokeWeight(1)
  ground.draw()
  // strokeWeight(0)
  ball.draw()
  
  pop()
  
  strokeWeight(0)
  fill(255)
  textSize(20)
  var strokes = strokecount
  if(skips == 0)
    text(strokes, width/2 - textWidth(strokes)/2, 30)
  else
    text(strokes+" ("+skips+")", width/2 - textWidth(strokes+" ("+skips+")")/2, 30)
  
  strokeWeight(0)
  textSize(15)
  text("Q: Skip Hole", 10, 18)
  
  // textSize(14)
  // strokes = "click to refresh"
  // text(strokes, width/2 - textWidth(strokes)/2, 50)
  
  

  if(mouse.pressing() && !mouseHeld){
    // print("mouse held")
    mouseHeld = true
    strokeStart = [mouse.x, mouse.y]
  }

  if(mouseHeld){
    drawArrow()
  }
  
  
  if(mouse.released()){
    // print("released")
    mouseHeld = false
    
    if(abs(ball.vel.x) < 0.1 && abs(ball.vel.y) < 0.1){
    
      var vec = createVector(strokeStart[0]-mouse.x, strokeStart[1]-mouse.y, 0)
      vec.limit(maxArrowLength)
      if(vec.mag() > 1){
        ball.vel.x = lerp(0, 10, vec.x/maxArrowLength)
        ball.vel.y = lerp(0, 10, vec.y/maxArrowLength)
        strokecount++
      }
    }
    strokeStart = []
  }
  
  if(!holeTransition && ball.overlapping(holeTrigger) && ball.vel.x == 0 && ball.vel.y == 0){
    // ball.vel.x = 0
    
    holeFiller.x = holeTrigger.x
    holeFiller.y = holeTrigger.y + 20
    holeTransition = true
    holeFill = 0
    
    hue+=5
    
  }
  
  if(ball.x > newWidth+150 || ball.x < newWidth-width || ball.y > height){
    //sound?
    
    ball.x = ballResetPos
    ball.y = 2*height/3-4
    ball.vel.x = 0
    ball.vel.y = 0
  }
  else if(ball.colliding(ground)){
    if(ball.vel.x < 0){
      ball.vel.x *= 0.95
    }
    else if(ball.vel.x > 0){
      ball.vel.x *= 0.95
    }
    
  }
  
  if(abs(ball.vel.x) < 0.1){
      ball.vel.x = 0
    }

  if(kb.released('space')){
     addNewStage()
  }
  
  if(kb.released('q')){
    ball.x = holeTrigger.x
    ballResetPos = holeTrigger.x
    ball.y = holeTrigger.y - 20
    ball.vel.x = 0
    ball.vel.y = 0
    skips++
  }
  
  if(kb.released('w')){
    clearOldStage()
  }
  
  strokeWeight(0)
  
}



function drawArrow(){
  var fx = strokeStart[0]
  var fy = strokeStart[1]
  
  var mouseVector = createVector(fx-mouse.x, fy-mouse.y, 0);
  // var mouseVector = createVector(fx-mouse.x, fy-mouse.y, 0);
  
  mouseVector.limit(maxArrowLength)
  
  strokeWeight(3)
  stroke(255)
  line(fx, fy, fx+mouseVector.x, fy+mouseVector.y)
  
  // line(fx, fy, fx+mouseVector.x, fy+mouseVector.y)
  
  var arrowHeadPoint = p5.Vector.normalize(mouseVector)
  

  
}

var oldStageLength

var newWidth

var oldX = 0 

var firstStage = true



function addNewStage(){
  if(!firstStage){
    clearOldStage()
    oldX += width-150
  }
  else{
    oldX += width
    firstStage = false
  }
  
  oldStageLength = worldPoints.length-8
  
  //extend the right-hand vertex across
  anchorRight[0] += width - 150
  
  newWidth += width - 150
  
  
  var xp = oldX
  let yp = 2*height/3
  
  worldPoints.push([xp-50, yp+height/3])
  worldPoints.push([xp-50, yp])
  
  
  // print(xp)
  // print(newWidth-150-minxjump)
  while(xp < newWidth-150-minxjump){
    worldPoints.push([xp, yp])
    var ox = xp
    var oy = yp
    xp += minxjump + random(maxxjump)
    var yd = minyjump + random(maxyjump)
    if(random() < 0.5)
      yd *= -1
    if(random() < 0.3)
      yd = 0
    if(yp + yd < minHeight){
      yd *= -1
    }
    yp += yd
    if(yp > maxHeight){
      worldPoints.push([ox, height+20])
      worldPoints.push([xp, height+20])
      yp = minHeight + random(maxHeight-minHeight)
    }
  }
  
  worldPoints.push([newWidth-150, 2*height/3])
  worldPoints.push([newWidth-100, 2*height/3])
  worldPoints.push([newWidth-100, 2*height/3+20])
  worldPoints.push([newWidth-85, 2*height/3+25])
  worldPoints.push([newWidth-70, 2*height/3+20])
  worldPoints.push([newWidth-70, 2*height/3])
  worldPoints.push([newWidth+10, 2*height/3])
  
  worldPoints.push([anchorRight[0], anchorRight[1]])
  worldPoints.push([anchorLeft[0], anchorLeft[1]])
  
  flaglocs = [newWidth]
  holenum++
  
  ground = new Sprite(worldPoints);
  ground.collider = 'kinematic';
  
  scrollCount = width-150
}

function clearOldStage(){
  worldPoints.splice(0, oldStageLength)
}

function collidesWith(ball, x1, y1, x2, y2){
  
}