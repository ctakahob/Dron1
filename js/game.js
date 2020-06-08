const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const ground = new Image();
 ground.src = "img/background.png";
 
 const beerImg = new Image();
 beerImg.src = "img/beer.png";

 const DronImg = new Image
 DronImg.src = "img/dron.png";

 let box = 32;
 let score = 0;

 let nice = new Audio();
 let wot = new Audio();
 let kaz = new Audio();

 const upAud = new Audio();
 const downAud = new Audio();
 const leftAud = new Audio();
 const rightAud = new Audio();

 rightAud.src = "audio/sfx-1.mp3";
 leftAud.src = "audio/sfx-2.mp3";
 upAud.src = "audio/up.mpeg";
 downAud.src = "audio/down.mpeg";

 nice.src = "audio/point.mpeg";
 wot.src = "audio/die.mpeg";
 kaz.src = "audio/kaz.mp3";

 let beer = {
     x: Math.floor((Math.random() * 17 + 1)) * box,
     y: Math.floor((Math.random() * 15 + 3)) * box,
 };

 let dron = [];
 dron[0] = {
     x: 9 * box,
     y: 10 * box
 };
document.addEventListener("keydown", direction);
    let dir;
function direction(event) {
    if (event.keyCode == 37 && dir != "right")
     dir = "left", leftAud.play();
     else if(event.keyCode == 38 && dir != "down")
     dir = "up", upAud.play();
     else if(event.keyCode == 39 && dir != "left")
     dir = "right", rightAud.play();
     else if(event.keyCode == 40 && dir != "up")
     dir = "down", downAud.play();
    
};

function eatBrther (head, arr){
    for (let i = 0; i < arr.length; i++) {
        if(head.x == arr[i].x && head.y == arr[i].y)
        clearInterval(game);
    }
};

 function drawGame() {
    ctx.drawImage(ground, 0, 0);
    ctx.drawImage(beerImg, beer.x, beer.y);

    for(let i = 0; i < dron.length; i++){
        ctx.drawImage(DronImg, dron[i].x, dron[i].y)
 }

    ctx.fillStyle = "white";
    ctx.font = "25px Arial";
    ctx.fillText(score, box * 2.5, box * 0.9 )

    let dronX = dron[0].x;
    let dronY = dron[0].y;

    if(dronX == beer.x && dronY == beer.y){
        score++;
        nice.play();
        beer = {
            x: Math.floor((Math.random() * 17 + 1)) * box,
            y: Math.floor((Math.random() * 15 + 3)) * box,
        };
        

    } else {
        dron.pop();
    };

    if(dronX < box || dronX > box * 17 ||
         dronY < 3 * box || dronY > box * 17)
        wot.play();

        if(dronX < box || dronX > box * 17 ||
            dronY < 3 * box || dronY > box * 17)
           clearInterval(game);
        
        
    if (dir == "left") dronX -= box
    if (dir == "right") dronX += box
    if (dir == "up") dronY -= box
    if (dir == "down") dronY += box

    let newHead = {
        x: dronX,
        y: dronY
    };
    eatBrther(newHead, dron);

    dron.unshift(newHead); 
};


let game = setInterval(drawGame, 300)