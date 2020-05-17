const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var box1, friend1,friend3;
var backgroundImg,platform;
var player, slingshot;

var gameState = "onSling";
var bg = "sprites/bg.png";
var score = 0;


function preload() {
    getbackgroundImg();
}

function setup(){
    var canvas = createCanvas(1200,400);
    engine = Engine.create();
    world = engine.world;


    ground = new Ground(600,height,1200,20);
    platform = new Ground(150, 305, 300, 170);

    box1 = new Box(700,320,70,70);
    box2 = new Box(920,320,70,70);
    friend1 = new friend(810, 350);
    log1 = new Log(810,260,300, PI/2);

    box3 = new Box(700,240,70,70);
    box4 = new Box(920,240,70,70);
    friend3 = new friend(810, 220);

    log3 =  new Log(810,180,300, PI/2);

    box5 = new Box(810,160,70,70);
    log4 = new Log(760,120,150, PI/7);
    log5 = new Log(870,120,150, -PI/7);

    player = new Player(200,50);

    //log6 = new Log(230,180,80, PI/2);
    slingshot = new SlingShot(player.body,{x:200, y:50});
}

function draw(){
    if(backgroundImg){
    background(backgroundImg);
    }
    noStroke();
    textSize(35);
    fill("white");
    text("SCORE : "+score,width-300,50);
    Engine.update(engine);
    //strokeWeight(4);
    box1.display();
    box2.display();
    ground.display();
    friend1.display();
    friend1.score();
    log1.display();

    box3.display();
    box4.display();
    friend3.display();
    friend3.score();
    log3.display();

    box5.display();
    log4.display();
    log5.display();

    player.display();
    platform.display();
    //log6.display();
    slingshot.display();    

}

function mouseDragged(){
    if (gameState!=="launched"){
        Matter.Body.setPosition(player.body, {x: mouseX , y: mouseY});
    }
}


function mouseReleased(){
    slingshot.fly();
    gameState = "launched";
}

function keyPressed(){
    if(keyCode === 32){
        gameState = "onSling"
       slingshot.attach(player.body);
    }
}
 
async function getbackgroundImg(){
    var response =  await fetch("https://worldtimeapi.org/api/timezone/Asia/Kolkata");
    var responseJSON = await response.json();
    console.log(responseJSON);
    var datetime = responseJSON.datetime;
    console.log(datetime);
    var hour = datetime.slice(11,13);
    console.log(hour);

    if(hour >= 10 && hour <= 16){
        bg = "sprites/bg.png";
    }
      else if(hour >= 16 && hour <= 20){
          bg = "sprites/bg3.jpg";
      }
      else{
        bg = "sprites/bg2.jpg";
    }
      backgroundImg = loadImage(bg);
      console.log(backgroundImg);
}