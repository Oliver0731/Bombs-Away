// animation tionto

//setup cansav and grafica contecxt
let cnv = document.getElementById("myCanvas");
let ctx = cnv.getContext("2d");
let img = document.getElementById("imgEl");
let char = document.getElementById("img2El");
let charI = document.getElementById("img3El");
let red = document.getElementById("red");
let redI = document.getElementById("redI");
let bomb = document.getElementById("bomb");
cnv.height = 603;
cnv.width = 597;

//global variable
let rectX = 250;
let rectY = 200;
let rectSize = 50;

let animateR = false;
let animateL = false;
let animateD = false;
let animateU = false;
let animateP = false;
let radius = 30;
let x = Math.random() * 500 + 100;
let y = radius;
let speedY = 15;
let speedX = 8;
let random = Math.random() * 2;
let damage = 100;
let dead = "YOUR DEAD";
let point = 0;
let Mantrue = false;
let MantrueI = false;

requestAnimationFrame(loop);
function loop() {
  point++;
  //move right

  if (animateL == true) {
    //update variable
    document.getElementById("img2El").src = "img/army Inverted.png";
    ctx.drawImage(charI, rectX, rectY, 100, 100);
    Mantrue = true;
    mantrueI = false;
    if (rectX >= 0) {
      rectX -= 5;
    }
  }
  if (animateR == true) {
    //update variable
    document.getElementById("img2El").src = "img/army man.png";
    Mantrue = false;
    mantrueI = true;
    if (rectX <= 500) {
      rectX += 5;
    }
    //move left
  }
  //move down
  if (animateD == true) {
    if (rectY <= 500) rectY += 5;
  }
  //move up
  if (animateU == true) {
    //update variable
    if (rectY >= 0) {
      rectY -= 5;
    }
  }
  //stop moving
  if (animateP == true) {
    reset();
  }
  //draw background

  ctx.drawImage(img, 0, 0);

  //draw char
  ctx.drawImage(char, rectX, rectY, 100, 100);
  if (random > 1) {
    y += speedY;
    x += speedX;
  } else {
    y += speedY;
    x -= speedX;
  }
  ////
  ////
  ////
  ////

  //bomb draw
  ctx.fillStyle = "rgba(155,155,155, 0)";
  ctx.fontSize = "30px";
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, 2 * Math.PI);
  ctx.drawImage(bomb, x - bomb.height / 6, y - bomb.height / 4, 70, 70);
  ctx.fill();
  //lives
  ctx.font = "30px Arial";
  ctx.fillStyle = "red";
  ctx.fillText(point, 10, 30);
  if (damage > 0) {
    ctx.fillText(damage, 10, 570);
  } else {
    ctx.fillText(dead, 10, 570);
  }

  // move bomb
  if (y > cnv.height - radius || y < radius) {
    speedY = -speedY;
  }

  if (x > cnv.width - radius || x < radius) {
    speedX = -speedX;
  }
  if (x > cnv.width - radius) {
    x = cnv.width - radius;
  }
  // if the ball hits you
  if (
    ((rectX + 100 >= x - radius && rectX <= x - radius) ||
      (rectX + 100 >= x + radius && rectX <= x + radius)) &&
    ((rectY + 100 >= y - radius && rectY <= y - radius) ||
      (rectY + 100 >= y + radius && rectY <= y + radius))
  ) {
    ctx.fillStyle = "rgba(255, 0, 0, 0.5)";
    // ctx.fillRect(rectX, rectY, 100, 100);
    if (Mantrue === true) {
      ctx.drawImage(redI, rectX, rectY, 100, 100);
    } else {
      ctx.drawImage(red, rectX, rectY, 100, 100);
    }

    damage--;
    console.log(damage);
  }

  //Out of health
  if (damage < 1) {
    ctx.fillStyle = "rgba(255,255,255, 0.7)";
    ctx.fillRect(150, 150, 300, 300);
    ctx.fillStyle = "red";
    ctx.fillText("GAME OVER!", 200, 250);
    point--;
    ctx.fillText("Your Score Is " + point, 180, 300);

    damage = 0;
    speedX = 0;
    speedy = 0;
  }
  requestAnimationFrame(loop);

  //if the sqaure hots the edge
} //event stuff
document.addEventListener("keydown", keydownHandler);

function keydownHandler(event) {
  if (event.code == "ArrowRight") {
    animateR = true;
  }
  if (event.code == "ArrowLeft") {
    animateL = true;
  }
  if (event.code == "ArrowDown") {
    animateD = true;
  }
  if (event.code == "ArrowUp") {
    animateU = true;
  }
  if (event.code == "Space") {
    animateP = true;
  }
}

document.addEventListener("keyup", keyupHandler);

function keyupHandler(event) {
  if (event.code == "ArrowRight") {
    animateR = false;
  }
  if (event.code == "ArrowLeft") {
    animateL = false;
  }
  if (event.code == "ArrowDown") {
    animateD = false;
  }
  if (event.code == "ArrowUp") {
    animateU = false;
  }
  if (event.code == "Space") {
    animateP = false;
  }
}
// (rectX < 20 && rectY - y < 20 && rectX - x > -50 && rectY - y > -50)
document.getElementById("btn").addEventListener("click", reset);

function reset() {
  location.reload();
}
