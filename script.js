const grid = document.querySelector('.grid');
const results = document.querySelector('.results');
let currentShooterIndex = 202;
let width = 15;
let direction = 1;
let result = 0;
let goingRight = true;
let aliensRemoved = [];
let invadersID;
for(let i = 0;i < 225;i++){
     const div = document.createElement('div');
     grid.appendChild(div);
}
const gridDiv = Array.from(document.querySelectorAll('.grid div'));
const alienInvaders = [0,1,2,3,4,5,6,7,8,9,15,16,17,18,19,20,21,22,23,24,30,31,32,33,34,35,36,37,38,39];
function draw(){
     for(let i = 0;i < alienInvaders.length;i++){
          if(!aliensRemoved.includes(i)){
               gridDiv[alienInvaders[i]].classList.add('invader');
          }
     }
}
draw();
function remove(){
     for(let i = 0;i < alienInvaders.length;i++){
          gridDiv[alienInvaders[i]].classList.remove('invader');
     }
}
gridDiv[currentShooterIndex].classList.add('shooter');
function moveShooter(event){
     gridDiv[currentShooterIndex].classList.remove('shooter');
     switch(event.key){
          case 'ArrowLeft':
               if(currentShooterIndex % width !== 0){
                    currentShooterIndex -= 1;
               }
               break;
          case 'ArrowRight':
               if(currentShooterIndex % width < width -1){
                    currentShooterIndex += 1;
               }
               break;
     }
     gridDiv[currentShooterIndex].classList.add('shooter');
}
document.addEventListener('keydown',moveShooter);
function moveInvaders(){
     const leftEdge = alienInvaders[0] % width === 0;
     const rightEdge = alienInvaders[alienInvaders.length - 1] % width === width -1;
     remove();
     if(rightEdge && goingRight){
          for(let i = 0;i < alienInvaders.length;i++){
               alienInvaders[i] += width +1;
               direction = -1;
               goingRight = false;
          }
     }
     if(leftEdge && !goingRight){
          for(let i = 0;i < alienInvaders.length;i++){
               alienInvaders[i] += width -1;
               direction = 1;
               goingRight = true;
          }
     }
     for(let i = 0;i < alienInvaders.length;i++){
          alienInvaders[i] += direction;
     }
     draw();
     if(gridDiv[currentShooterIndex].classList.contains('invader','shooter')){
          results.innerHTML = 'Game Over';
          clearInterval(invadersID);
     }
     for(let i = 0;i < alienInvaders.length;i++){
          if(alienInvaders[i] > (gridDiv.length)){
               results.innerHTML = 'Game Over';
               clearInterval(invadersID);
          }
     }
     if(aliensRemoved.length === alienInvaders.length){
          results.innerHTML = 'You Win';
          clearInterval(invadersID);
     }
}
invadersID = setInterval(moveInvaders,600);
function shoot(event){
     let laserID;
     let currentLaserIndex = currentShooterIndex;
     function moveLaser(){
          gridDiv[currentLaserIndex].classList.remove('laser');
          currentLaserIndex -= width;
          gridDiv[currentLaserIndex].classList.add('laser');
          if(gridDiv[currentLaserIndex].classList.contains('invader')){
               gridDiv[currentLaserIndex].classList.remove('laser');
               gridDiv[currentLaserIndex].classList.remove('invader');
               gridDiv[currentLaserIndex].classList.add('boom');
               setTimeout(() => gridDiv[currentLaserIndex].classList.remove('boom'),300);
               clearInterval(laserID);
               const alienRemoved = alienInvaders.indexOf(currentLaserIndex);
               aliensRemoved.push(alienRemoved);
               result++;
               results.innerHTML = result;
          }
     }
     switch(event.key){
          case 'ArrowUp':
               laserID = setInterval(moveLaser,100);
     }
}
document.addEventListener('keydown',shoot);