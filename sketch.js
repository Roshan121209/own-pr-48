var rocketShip, rocketShipImg,  backgroundImg, ufo, meteors, background1, meteorsImg, ufoImg;
var stars, starsImg;
var meteorsG, ufoG, starsG;
var score = 0;

var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload () {
  backgroundImg = loadImage("space.jpg");
  rocketShipImg = loadImage("Rocket ship.png");
  ufoImg = loadImage("Ufo.png");
  meteorsImg = loadImage("Metors.png");
  starsImg = loadImage("Star.png")
}

function setup() {
  createCanvas(800, 400);

  background1 = createSprite(400,200, 800, 400);
  background1.addImage(backgroundImg);
  background1.velocityX = -5;

  rocketShip= createSprite(40,20, 50, 50);
  rocketShip.addImage(rocketShipImg);
  rocketShip.scale = 0.1

  meteorsG = new Group();
  ufoG = new Group();
  starsG = new Group();

}

function draw() {
  background(220);

  

  if (gameState === PLAY){
    if(background1.x < 0){
      background1.x = background1.width/8;
    }

    

    //code to create movements for the rocket ship.

  if (keyIsDown(DOWN_ARROW)){
    rocketShip.y = rocketShip.y + 10;
  }

  if (keyIsDown(UP_ARROW)){
    rocketShip.y = rocketShip.y - 10;
  }

  if (keyIsDown(RIGHT_ARROW)){
    rocketShip.x = rocketShip.x + 10;
  }

  if (rocketShip.x > 800){
    rocketShip.x = 750;
  }

  if (meteorsG.isTouching(rocketShip) || ufoG.isTouching(rocketShip)){
    meteorsG.destroyEach();
    ufoG.destroyEach();
    gameState = END;
    gameOver();
  }

  if (starsG.isTouching(rocketShip)){
    starsG.destroyEach();
    score = score + 1;
  }
    
  
  

  createMeteors();
  createUfo();
  createStars();

  drawSprites();
  
  fill("white")
  textSize(20)
  text("Score : " + score, 700, 50);
  

}

if (score === 2){
  background("white");
  gameState = END;
  gameWon(); 
}

  if (gameState === END){ 
    background("white")
    meteors.setVelocityXEach(0);
    ufo.setVelocityXEach(0);
    stars.setVelocityXEach(0);
}



}

function createMeteors() {
  
    if (frameCount % 80 == 0) {
    var meteors = createSprite(800, Math.round(random(50, 350), 20, 20));
    meteors.addImage(meteorsImg);
    meteors.scale = 0.1;
    meteors.velocityX = -20;
    meteors.lifetime = 270;
    meteorsG.add(meteors);
   }
}

function createUfo() {
  
  if (frameCount % 100 == 0) {
  var ufo = createSprite(800, Math.round(random(50, 350), 20, 20));
  ufo.addImage(ufoImg);
  ufo.scale = 0.2;
  ufo.velocityX = -20;
  ufo.lifetime = 270;
  ufoG.add(ufo);
 }
}

function createStars() {
  
  if (frameCount % 175 == 0) {
  var stars = createSprite(800, Math.round(random(50, 350), 50, 50));
  stars.addImage(starsImg);
  stars.scale = 0.02;
  stars.velocityX = -20;
  stars.lifetime = 270;
  starsG.add(stars);
 }
}

function gameOver(){
  swal(
    {
      title : `Game Over!`, 
      text : "Better luck next time!",
      imageUrl : "boom.png",
      imageSize : "50 x 50",
      confirmButtonText : "Retry"
    },

    function (isConfirm){
      
      if (isConfirm){
        location.reload();
      }
    }
 )
}

function gameWon(){
  swal(
    {
      title : `Good job!`, 
      imageUrl : "thumbs_up.png",
      imageSize : "50 x 50",
      confirmButtonText : "Press to play again"
    },

    function (isConfirm){
      
      if (isConfirm){
        location.reload();
      }
    }
 )

}
  



