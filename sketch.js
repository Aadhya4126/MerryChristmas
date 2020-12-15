var monkey, monkey_running;
var ground, backGround, backGroundimage;
var banana, bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score = 0;
var survivalTime = 0;
var banana, obstacle;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var ovimage;

function preload() {

  //animation for monkey
  monkey_running = loadImage("child.jpg");

  //images for banana and obstacle
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("stone.png");

  backGroundimage = loadImage("jungle.png");

  grassImage = loadImage("grass.jpg")

  ovimage = loadImage("ovi.jpg");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  backGround = createSprite(windowWidth/2, windowHeight/2);
  backGround.addImage(backGroundimage);

  //create monkey
  monkey = createSprite(width-530, 390, 20, 20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.06 ;
  //monkey.debug=true;
  monkey.setCollider("circle",0,0,300)

  //create moving ground
  ground = createSprite(250, 600, 1000, 10);
  ground.addImage(grassImage);
  ground.velocityX = -4;
  ground.visible = false;

  //making groups
  FoodGroup = createGroup();
  obstacleGroup = createGroup();

}

function draw() {
  background("cyan");

  if (gameState === PLAY) {

    food();
    obstacle();

    //moving ground
    if (ground.x < 200) {
      ground.x = 250;
    }

    //jumping the monkey
    if (touches.lenghth<0||keyDown("space") && monkey.y >= 200) {
      monkey.velocityY = -10;
      touches = [];
    }

    //giving gravity to monkey 
    monkey.velocityY = monkey.velocityY + 0.5;
    monkey.collide(ground);

    //increase score
    if (monkey.isTouching(FoodGroup)) {
      FoodGroup.destroyEach();
      score = score + 1;
    }

    switch (score) {
      case 10:
        monkey.scale = 0.063;
        break;
      case 20:
        monkey.scale = 0.066;
        break;
      case 30:
        monkey.scale = 0.069;
        break;
      case 40:
        monkey.scale = 0.072;
        break;
      default:
        break;
    }

    //changing gameState
    if (monkey.isTouching(obstacleGroup)) {
      obstacleGroup.destroyEach();
      
      gameState = END;
    }
  }

  if (gameState === END) {
    FoodGroup.destroyEach();
    monkey.x = 1000;
    ground.x = 1000;
    backGround.addImage(ovimage);
    textSize(30);
    text("Game", 170, 190);
    textSize(30);
    text("Over", 175, 250);
  }
  drawSprites();

  if (gameState === PLAY) {

    stroke("black");
    textSize(18);
    fill("black");
    text("Score: " + score, width-250, height/10);
    stroke("black");
    textSize(18);
    fill("black");
    survivalTime = Math.round((frameCount / frameRate()));
    text("Survival Time: " + survivalTime, 30, 50);
  }
}

function food() {
  if (frameCount % 90 === 0) {
    banana = createSprite(width+550, Math.round(random(100, 200)), 20, 20)
    banana.addImage(bananaImage);
    banana.velocityX = -5;
    banana.scale = 0.2;
    banana.liIfetiIme = 300;
    banana.setCollider("circle", 10, 0, 200);
    FoodGroup.add(banana);
  }
}

function obstacle() {
  if (frameCount % 300 === 0) {
    obstacles = createSprite(width+550, Math.round(random(100,200, 20, 20)))
    obstacles.addImage(obstacleImage);
    obstacles.velocityX = -5;
    obstacles.scale = 0.14;
    obstacles.lifetime = 300;
    obstacles.setCollider("circle", 0, 0, 155)
    obstacleGroup.add(obstacles);
  }
}