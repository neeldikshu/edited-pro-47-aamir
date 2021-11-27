let ground;
let lander;
var lander_img;
var bg_img,bg,bg2,bg2_img;
var rock,rockimg,rockGroup;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
//var gameState = END;
var score = 0;
var gameOverImg,restartImg,gameOver;
var star,star_img,starGroup,as,as_img;
var al,al_img,fias,fias_img;
var mission = false;
var vx = 0;
var g = 0;
var vy = 0;
var bullets = 70;

function preload()
{
  lander_img = loadImage("normal.png");
  bg_img = loadImage("bg.png");
  rockimg = loadImage("rock.png")
  restartImg = loadImage("restart.png")
  gameOverImg = loadImage("gameOver.png")
  star_img =loadImage("star.png")
  bg2_img = loadImage("bg_2.png")
  as_img = loadImage("as.png")
  al_img = loadImage("al.png")
  fias_img = loadImage("fias.png")
}

function setup() {
  createCanvas(1000,700);
  frameRate(80);

  bg = createSprite(500,0,10,1500)
  bg.addImage(bg_img);
  bg.scale = 2;

  bg2 = createSprite(500,400,700,1000)
  bg2.addImage(bg2_img)


  gameOver = createSprite(500,350);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(500,380);
  restart.addImage(restartImg);

  lander = createSprite(100,250,30,30);
  lander.addImage(lander_img);
  lander.scale = 0.1;

  as = createSprite(700,550);
  as.addImage(as_img);
  as.scale = 0.5;

  fias = createSprite(50,500);
  fias.addImage(fias_img);
  fias.scale = 0.5;

 
  gameOver.visible = false;
restart.visible = false;
as.visible = false;
bg2.visible = false;
fias.visible = false;

rockGroup = new Group()
starGroup = new Group()
alGroup = new Group()
bulletGroup = new Group()

  rectMode(CENTER);
  textSize(15);
}

function draw() 
{
  background(51);
  mission = false;
  fias.visible = false;
 // image(bg_img,0,0);

 

  if(bg.y>1000){
    bg.y = height/2;
  }

  bg.velocityY = 4;

  if(score >10 && gameState=== PLAY ){
    bg.visible = false;
    bg2.visible = true;
    as.visible = true;
    vy +=g;
        
        fias.position.y+=vy;
        fias.position.x+=vx;
      spawnAl();
      if(fias.isTouching(alGroup)){
        gameState = END
  
      }
  }

     if (score <= 10 && gameState === PLAY){
      bg.visible = true;
      bg2.visible = false;
      as.visible = false;
    
   // spawnRocks()
      spawnStars()
      if(lander.isTouching(rockGroup)){
        gameState = END
       }
      
    if(starGroup.isTouching(lander)){
    score = score+1;
    
    }
        

        vy +=g;
        lander.position.y+=vy;
        lander.position.x+=vx;
  }

  drawSprites();
 
  
    //if (gameState===END){

    
    //textSize(40)
  //fill("white")
  //strokeWeight(4)
  //text("Astronaut saved",450,350)
    //}
  //fias.visible = true;
  //vy +=g;
  //fias.position.y+=vy;
  //fias.position.x+=vx;


  push()
  fill(255);
  text("Vertical Velocity: "+round(vy),800,75);
  text ("score:"+score ,800,95);
  pop();
  if( gameState === END){
   // text ("gameover",500,300)
   lander.visible = false;
   fias.visible = false;
   as.visible = false;
    lander.position.x = 500
    lander.position.y= 350
    bg.velocityY = 0
    lander.velocityY = 0
    lander.velocityX = 0
    gameOver.visible = true
    restart.visible = true
    rockGroup.destroyEach()
    starGroup.destroyEach()
    alGroup.destroyEach()

    if(mousePressedOver(restart)){
      reset()
    }
  }
}


function keyPressed()
{
if(keyCode==UP_ARROW){
upward_thrust()
}
if(keyCode==RIGHT_ARROW){
  right_thrust()
}
if(keyCode==LEFT_ARROW){
  left_thrust()
}
if(keyCode==DOWN_ARROW){
  down_thrust()
}

}

function right_thrust(){
  vx = vx+3;
}

function left_thrust(){
  vx = vx-3;
}

function upward_thrust()
{
vy = -1;
}

function down_thrust()
{
  vy = +1
}


//if(lander.isTouching(rockGroup)){
  //gameState = END
//}

function reset(){
  gameState =PLAY;
  
gameOver.visible = false;
restart.visible = false;
starGroup.destroyEach();
rockGroup.destroyEach();
score =0;
}

function spawnRocks(){
  if(World.frameCount%60===0){
rock = createSprite(200,5)
rock.addImage(rockimg)
rock.scale=0.1
rock.velocityY=3
rock.x=Math.round(random(10,900))
rockGroup.add(rock)
  }
}

  function spawnStars(){
    if(World.frameCount%60===0){
  star = createSprite(200,5)
  star.addImage(star_img)
  star.scale=0.2
  star.velocityX=-3
  star.y=Math.round(random(20,1000))
  starGroup.add(star)
  }
}

function spawnAl(){
if(World.frameCount%60===0){
al = createSprite(random(200,800),random(150,650))
al.addImage(al_img)
al.scale= 0.3
al.velocityX = -3
//al.y=Math.round(random(50,1000))
alGroup.add(al)
}
}

/*gameOver() {
  swal({
    title: `Game Over`,
    text: "Oops you lost the race....!!!",
    imageUrl:
      "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
    imageSize: "100x100",
    confirmButtonText: "Thanks For Playing"
  });
}*/