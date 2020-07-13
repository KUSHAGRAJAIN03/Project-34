//Create variables here
var dog,dogimg,happyDog,database,FoodS,foodStock;  

function preload()
{
  //load images here
  dogimg = loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png");
}

function setup() {
  database=firebase.database();
	createCanvas(500,500);
  dog=createSprite(250,375);
  dog.addImage(dogimg);
  dog.scale=0.3;
  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
}


function draw() {
  background(46,139,87);

  if (keyWentDown(UP_ARROW))
  {
    writeStock(FoodS);
    dog.addImage(happyDog);
  }

  drawSprites();
  //add styles here
  fill("white");
  text("Food remaining:"+FoodS,180,220);
  fill("red");
  text("Note:press UP_ARROW to feed Bruno :)",150,50);
}

function readStock(data)
{
 FoodS=data.val();
}

function writeStock(x)
{

  if (x<=0)
  {
    x=0;
  }else{
    x=x-1;
  }

  database.ref('/').update({
    Food:x
  })
}


