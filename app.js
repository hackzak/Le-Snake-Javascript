const canvas  = document.getElementById('canvas');
const ctx = canvas .getContext('2d');



//Variables

//Vitesses sur X
vx = 0;

//vitesse sur Y
vy = -10;
//pommeX
let pommeX = 0;
//pommeY
let pommeY = 0;
//score 
let score = 0;

let snake = [ {x:140, y:150}, {x:130, y:150}, {x:120, y:150}, {x:110, y:150} ]

function animation(){

    setTimeout(function(){

        nettoieCanvas();

        faireAvencerLeSnake();

        dessineLeSnake();
        // animation du snake
        animation();

        dessinePomme();

    }, 100);

}

animation();

function nettoieCanvas(){

    ctx.fillStyle = "white";
    ctx.strokeStyle = "black";
    ctx.fillRect(0,0,canvas.width, canvas.height);
    ctx.strokeRect(0,0,canvas.width, canvas.height);
    
}


function dessineLesMorceaux(morceau) {

    ctx.fillStyle = "yellow";
    ctx.strokeStyle = 'black';
    ctx.fillRect(morceau.x, morceau.y, 10, 10);
    ctx.strokeRect(morceau.x, morceau.y, 10, 10);

}

function dessineLeSnake(){
    snake.forEach(morceau => {
        dessineLesMorceaux(morceau);
    })
}



function faireAvencerLeSnake(){

    const head = {x: snake[0].x + vx, y: snake[0].y + vy};
    snake.unshift(head);
    

    const snakeMangePomme = snake[0].x === pommeX && snake[0].y === pommeY;

    if(snakeMangePomme){
        score += 10;
        document.getElementById('score').innerHTML = score;

        creerPomme();
    } else {
        snake.pop();
    }

}

dessineLeSnake();

document.addEventListener('keydown', changerDirection);

function changerDirection(event) {
    console.log(event);

    const FLECHE_GAUCHE = 37;
    const FLECHE_DROITE = 39;
    const FLECHE_ENHAUT = 38;
    const FLECHE_ENBAS = 40;

    const direction = event.keyCode;

    const monter = vy === 10;
    const descendre = vy === -10;
    const adroite = vx === 10;
    const agauche = vx === -10;

    if(direction === FLECHE_GAUCHE && !adroite) { vx = -10; vy = 0; }
    if(direction === FLECHE_ENHAUT && !descendre) { vx = 0; vy = -10; }
    if(direction === FLECHE_DROITE && !agauche) { vx = 10; vy = 0; }
    if(direction === FLECHE_ENBAS && !monter) { vx = 0; vy = 10; }


}


function random(){

    return Math.round((Math.random() * 290) / 10) * 10;

}

function creerPomme(){

    pommeX = random();
    pommeY = random();
    // console.log(pommeX, pommeY);

    snake.forEach(function(part){

        const snakeSurPomme = part.x == pommeX && part.y == pommeY;

        if(snakeSurPomme) {
            creerPomme();
        }

    })

}

creerPomme();

function dessinePomme(){

    ctx.fillStyle = 'red';
    ctx.strokeStyle = 'black';
    ctx.fillRect(pommeX, pommeY, 10, 10);
    ctx.beginPath();
    ctx.arc(pommeX + 5, pommeY + 5, 5, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();

}

function finDuJeu(){

    let snakeSansTete = snake.slice(1, -1);
    let morudu = false;
    snakeSansTete.forEach(morceau => {
        if(morceau.x === snake[0].x && morceau.y === snake[0].y){
            mordu = true;
        }
    })


    return mordu;
}


