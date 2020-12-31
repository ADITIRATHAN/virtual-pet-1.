var dog, happyDog, database,foodStock, dogImage,FoodImage, Food;
var foodS = 100;

function preload()
{
  dogImage = loadImage("dogImg.png");
  dogHappy = loadImage("dogImg1.png");
 
  FoodImage = loadImage("milk.png");
 
  
}

function setup() {

  database = firebase.database();

  createCanvas(800, 650);


  
    
  dog = createSprite(400,580,50,50);
  dog.addImage("dog",dogImage);
  dog.scale = 0.2;

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
}


function draw() {  
  background(46,139,87);

  if(keyWentDown(UP_ARROW) && foodS >=1){
    writeStock(foodS);
    happyDog = createSprite(400,590,50,50);
    happyDog.addImage("happyDog",dogHappy);
    happyDog.scale=0.2;

    Food = createSprite(340,630,50,50);
    Food.addImage("Food",FoodImage);
    Food.scale=0.06;

    dog.visible = false;
   
  }
  if(keyWentUp(UP_ARROW)){
    dog.visible = true;
    happyDog.visible = false;
    Food.visible = false;
  }
  if(foodS == 0){
  dog.visible=true;
  foodS = 1000;

}

  drawSprites();
  textSize(24);
  stroke("black");
  fill("black");
  text("Note Press UP_ARROW Key To Feed Drago Milk!", 150,25);
  text("Food Remaining:"+ foodS, 300,200);

}
function readStock(data){
  foodS=data.val();
}
function writeStock(x){

  if(x<=0){
    x=0;
  }else{
    x=x-1;
  }

  database.ref('/').update({
    Food:x
  })
}




