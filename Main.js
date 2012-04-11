window.onload = init;
document.onkeydown = function(event){ nextMove(event); }
//1=left; 2=right; 3=up; 4=down;

const FPS = 30;
const SECONDSBETWEENFRAMES = 1 / FPS;
const HALFIMAGEDIMENSION = 75;
const HALFCANVASWIDTH = 300;
const HALFCANVASHEIGHT = 200;
const TILEWIDTH = 32;
const TILEHEIGHT = 32;
//const MAPAREAX = 140;
//const MAPAREAY = 40;
const MAPAREAX = 0;
const MAPAREAY = 0;
// w=wall; i=inside; s=sidewalk; n=nurse; p=inmate; j=janitor; d=door;

const GRID_WIDTH = 40;
const GRID_HEIGHT = 40;
var gameMap = [
				['w','w','w','w','w','w','w','w','w','w','w','w','w','w','w','w','w','w','w','w','w','w','w','w','w','w','w','w','w','w','w','w','w','w','w','w','w','w','w','w'],
				['w','i','i','i','i','i','i','i','i','i','n','w','s','s','w','i','i','i','w','s','s','w','i','i','i','w','s','s','w','i','i','i','i','i','w','s','w','i','i','w'],
				['w','i','i','i','i','n','i','i','i','i','i','w','s','s','w','i','i','i','w','s','s','w','i','i','i','w','s','s','w','i','i','i','p','i','w','s','w','i','i','w'],
				['w','i','i','i','i','i','i','i','i','i','i','w','s','s','w','i','i','i','w','s','s','w','i','i','i','w','s','s','w','i','i','i','i','i','w','s','w','i','i','w'],
				['w','w','w','s','w','w','w','w','s','w','w','w','s','s','w','w','s','w','w','s','s','w','w','s','w','w','s','s','w','w','w','s','w','w','w','s','w','s','w','w'],
				['w','s','s','s','s','s','s','s','s','s','s','s','s','s','s','s','s','s','s','s','s','s','p','s','s','s','s','s','s','s','s','s','s','s','s','s','s','s','s','w'],
				['w','s','s','s','s','s','s','s','s','s','s','s','s','s','s','s','s','s','s','s','s','s','s','s','s','s','s','s','s','s','s','s','s','s','s','s','s','s','s','w'],
				['w','w','w','w','w','s','s','w','w','w','w','w','s','s','w','w','w','w','w','w','w','s','w','w','s','s','w','w','s','w','w','s','w','w','w','s','w','w','w','w'],
				['w','i','i','i','w','s','s','w','i','i','i','w','s','s','w','i','i','i','i','i','i','i','j','w','s','s','w','i','i','i','w','i','i','i','w','s','w','i','i','w'],
				['w','i','i','i','w','s','s','s','i','i','i','s','s','s','w','i','i','i','i','i','i','i','i','w','s','s','w','i','i','i','w','i','i','i','w','s','w','i','i','w'],
				['w','i','i','i','s','s','s','w','i','i','i','w','s','s','w','i','i','i','i','i','i','i','i','w','s','s','w','i','i','i','w','i','i','i','w','s','w','i','i','w'],
				['w','i','i','i','w','s','s','w','w','w','w','w','s','s','w','w','s','w','w','w','w','w','w','w','s','s','w','w','w','w','w','w','w','w','w','s','w','w','w','w'],
				['w','i','i','i','w','s','s','s','s','p','s','s','s','s','s','s','s','s','s','s','s','s','p','s','s','s','s','s','s','s','s','s','s','s','s','s','s','j','s','w'],
				['w','i','i','i','s','s','s','s','s','s','s','s','s','s','s','s','s','s','s','s','s','s','s','s','s','s','s','s','s','s','s','s','s','s','s','s','s','s','s','w'],
				['w','i','i','i','w','s','s','w','w','w','w','w','s','s','w','w','w','w','w','w','w','s','w','w','s','s','w','w','w','w','s','s','w','w','w','w','w','w','w','w'],
				['w','i','i','i','w','s','s','w','i','i','i','w','s','s','w','i','i','i','i','i','i','i','i','w','s','s','w','i','i','w','s','s','w','i','i','i','i','i','i','w'],
				['w','w','w','w','w','s','s','w','w','w','w','w','s','s','w','s','w','w','w','w','w','w','w','w','s','s','s','i','i','w','s','s','w','i','i','i','i','i','i','w'],
				['w','s','s','s','s','s','s','s','p','s','s','s','s','s','s','s','s','s','s','s','s','s','s','s','s','s','w','w','w','w','s','s','w','w','w','w','w','w','w','w'],
				['w','s','s','s','s','s','s','s','s','s','s','s','s','s','s','s','n','s','s','s','s','s','s','s','s','s','s','s','s','s','s','s','s','s','s','s','s','s','s','w'],
				['w','w','w','w','w','w','w','w','w','w','w','w','s','s','w','w','w','w','w','w','w','w','w','w','s','s','s','s','s','s','s','s','s','s','s','s','s','s','s','w'],
				['w','i','i','i','i','i','i','i','i','i','i','w','s','s','w','i','i','i','w','i','i','i','i','w','s','s','w','w','w','w','w','s','w','s','w','w','w','w','w','w'],
				['w','i','i','i','i','i','i','i','i','i','i','w','s','s','w','i','i','i','w','i','i','i','i','w','s','s','w','i','i','i','w','s','w','i','i','i','i','i','i','w'],
				['w','i','i','i','i','i','i','i','i','i','i','w','s','s','w','i','i','i','w','i','i','i','i','w','s','s','w','i','i','i','s','s','w','i','i','i','i','i','i','w'],
				['w','i','i','i','i','i','i','i','i','i','i','w','s','s','w','i','i','i','w','i','i','i','i','w','s','s','w','i','i','i','w','s','w','i','i','i','i','i','i','w'],
				['w','w','w','w','w','w','w','w','s','w','w','w','s','s','w','w','w','w','w','s','w','w','w','w','s','s','w','w','w','w','w','s','w','w','s','w','w','w','w','w'],
				['w','s','s','s','s','s','s','j','s','s','s','s','s','s','s','s','s','s','s','s','s','n','s','s','s','s','s','s','s','s','s','s','s','s','s','s','s','s','s','w'],
				['w','s','s','s','s','s','s','s','s','s','s','s','s','s','s','s','s','s','s','s','s','s','s','s','s','s','s','s','s','s','s','s','s','s','s','s','s','s','s','w'],
				['w','w','w','w','w','s','s','w','w','w','w','w','w','w','s','w','w','w','w','w','w','w','w','w','s','s','w','w','w','w','w','s','s','w','w','w','w','w','w','w'],
				['w','i','i','i','w','s','s','w','i','i','i','i','i','w','i','i','i','i','i','i','i','i','i','w','s','s','w','i','i','i','w','s','s','w','i','i','i','i','i','w'],
				['w','i','i','i','w','s','s','w','i','i','i','i','i','w','i','i','i','i','i','i','i','i','i','w','s','s','w','i','i','i','w','s','s','w','i','i','i','i','i','w'],
				['w','i','i','i','w','s','s','w','i','i','i','i','i','w','i','i','i','i','i','i','i','i','p','w','s','s','w','i','i','i','w','s','s','w','i','i','i','i','i','w'],
				['w','i','i','i','w','s','s','w','w','w','w','w','w','w','w','w','w','w','w','w','w','w','w','w','s','s','w','w','s','w','w','s','s','w','w','w','w','w','w','w'],
				['w','i','i','i','w','s','s','s','s','s','s','s','s','s','s','s','s','s','s','s','s','s','s','s','s','s','s','s','s','s','s','s','s','s','s','s','s','s','s','w'],
				['w','i','i','i','w','s','s','s','s','p','s','s','s','s','s','s','s','s','s','p','s','s','s','s','s','s','s','s','s','s','s','s','n','s','s','s','s','s','s','w'],
				['w','i','i','i','w','s','s','w','w','w','w','w','w','w','w','w','w','w','s','w','w','w','w','w','s','s','w','w','w','w','s','s','w','w','s','w','w','w','w','w'],
				['w','i','i','i','w','s','s','w','i','i','i','i','i','i','w','i','i','i','i','i','i','i','i','w','s','s','w','i','i','w','s','s','w','i','i','i','i','i','i','w'],
				['w','i','i','i','s','s','s','s','i','i','i','i','i','i','w','i','i','i','i','i','i','i','i','w','s','s','w','i','i','w','s','s','w','i','i','i','i','i','i','w'],
				['w','i','i','i','w','s','s','w','i','i','i','i','i','i','w','i','i','i','i','i','i','i','i','w','s','s','w','i','i','w','s','s','w','i','i','i','i','i','i','w'],
				['w','i','i','i','w','s','s','w','i','i','i','i','i','i','s','i','i','i','i','i','i','i','i','w','s','s','w','w','w','w','s','s','w','i','i','i','i','i','i','w'],
				['w','w','w','w','w','w','w','w','w','w','w','w','w','w','w','w','w','w','w','w','w','w','w','w','w','w','w','w','w','w','w','w','w','w','w','w','w','d','w','w']
			  ];
//name; maxdamage; addhealth; addmagic; addrage;
var playerMoves = [
					["slap", 20, 0, 0, -5],
					["Breathe Fire", 80, 0, -25, 0],
					["Rage", 10, 0, 0, 25],
					["Recover", 0, 40, -10, 0]
				];
//enemy moves
//name; basedmg; addhealth; addmagic; addrage;
var inmateHealth = 35;
var inmateMoves = [
					["Bite", 15, 0, 0, 4],
					["Flail", 1, 0, 0, 0]
				  ];
var nurseHealth = 65;
var nurseMoves = [
					["Restrain", 20, 0, 0, -5],
					["Calm Rationale", 0, 0, -5, -15]
				 ];
var janitorHealth = 70;
var janitorMoves = [
					 ["Wet Floor", 20, 0, 0, 5],
					 ["Criticize", 10, 0, 0, 20]
				   ];
var cameraTopLeftX = 0;
var cameraTopLeftY = 0;
const PLAYERSPAWNX = 5;
const PLAYERSPAWNY = 1;
var canvas = null;
var context2D = null;

var playerImg = new Image();
playerImg.src = "Player.png";
var inmateImg = new Image();
inmateImg.src = "Inmate.png";
var nurseImg = new Image();
nurseImg.src = "Nurse.png";
var janitorImg = new Image();
janitorImg.src = "Janitor.png";
var background = new Image();
background.src = "Background.png";
var buildingImg = new Image();
buildingImg.src = "Building.png";
var streetImg = new Image();
streetImg.src = "Street.png";
var wallImg = new Image();
wallImg.src = "Wall.png";
var doorImg = new Image();
doorImg.src = "Door.png";

var battleScreen = new Image();
battleScreen.src = "BattleScreen.png";
var winScreen = new Image();
winScreen.src = "YouWin.png";
var loseScreen = new Image();
loseScreen.src = "YouLose.png";

var statusBars = new Image();
statusBars.src = "StatusBars.png";
var healthIcon = new Image();
healthIcon.src = "HealthIcon.png";
var rageIcon = new Image();
rageIcon.src = "RageIcon.png";
var magicIcon = new Image();
magicIcon.src = "MagicIcon.png";

var playerX = 0;
var playerY = 0;
var playerHealth = 100;
var playerRage = 50;
var playerMagic = 100;
var direction = 0;//0 = stop
var playerHasKey = false;

var frameCount = 0;
var clearTextTime = 0;

var rageBtn;
var slapBtn;
var recoverBtn;
var breathefireBtn;
	
//0=map; 1=fight;
var gameState = 0;
var currentEnemy = "";
var currentEnemyHealth;
var playersTurn = true;
var battleVictory = false;
// 0=none selected; 1=slap; 2=breathefire; 3=rage; 4=recover;
var currentOption = 0;
var textLines = [ "", "", "", ""];

var keyHolderX = 7;
var keyHolderY = 25;

var turnSwitch = false;

function init(){
	canvas = document.getElementById('canvas');
	context2D = canvas.getContext('2d');
	setInterval(update, SECONDSBETWEENFRAMES * 1000);
	playerX = PLAYERSPAWNX;
	playerY = PLAYERSPAWNY;
	context2D.drawImage(background, 0, 0);
	var buttonPanel = document.getElementById("controls");
	buttonPanel.style.display = 'none';
}

function nextMove(event){
		// left
        if (event.keyCode == 37){ direction = 1; }
        // right
        if (event.keyCode == 39){ direction = 2; }
         // up
        if (event.keyCode == 38){ direction = 3; }
        // down
        if (event.keyCode == 40){ direction = 4; }
}

function showMap(){
	var i, j;
	for(i = 0 + cameraTopLeftX; i < cameraTopLeftX + 10; i++){
		for(j = 0 + cameraTopLeftY; j < cameraTopLeftY + 10; j++){
			if( j < 40 && j > -1 && i < 40 && i > -1){
				if( gameMap[i][j] ===  'w' ){ context2D.drawImage(wallImg, ( (j - cameraTopLeftY) * TILEWIDTH ) + MAPAREAX, ( (i - cameraTopLeftX) * TILEHEIGHT ) + MAPAREAY); }
				else if( gameMap[i][j] ===  's' ){ context2D.drawImage(streetImg, ( (j - cameraTopLeftY) * TILEWIDTH ) + MAPAREAX, ( (i - cameraTopLeftX) * TILEHEIGHT) + MAPAREAY ); }
				else if( gameMap[i][j] ===  'i' ){ context2D.drawImage(buildingImg, ( (j - cameraTopLeftY) * TILEWIDTH ) + MAPAREAX, ( (i - cameraTopLeftX) * TILEHEIGHT) + MAPAREAY ); }
				else if( gameMap[i][j] ===  'p' ){ context2D.drawImage(inmateImg, ( (j - cameraTopLeftY) * TILEWIDTH ) + MAPAREAX, ( (i - cameraTopLeftX) * TILEHEIGHT) + MAPAREAY ); }
				else if( gameMap[i][j] ===  'n' ){ context2D.drawImage(nurseImg, ( (j - cameraTopLeftY) * TILEWIDTH ) + MAPAREAX, ( (i - cameraTopLeftX) * TILEHEIGHT) + MAPAREAY ); }
				else if( gameMap[i][j] ===  'j' ){ context2D.drawImage(janitorImg, ( (j - cameraTopLeftY) * TILEWIDTH ) + MAPAREAX, ( (i - cameraTopLeftX) * TILEHEIGHT) + MAPAREAY ); }
				else if( gameMap[i][j] ===  'd' ){ context2D.drawImage(doorImg, ( (j - cameraTopLeftY) * TILEWIDTH ) + MAPAREAX, ( (i - cameraTopLeftX) * TILEHEIGHT) + MAPAREAY ); }
				if( i === playerY && j === playerX ){ context2D.drawImage(playerImg, ( ( (j - cameraTopLeftY) % 10) * TILEWIDTH ) + MAPAREAX, ( ( (i - cameraTopLeftX) % 10) * TILEHEIGHT) + MAPAREAY ); }
			}
		}
	}
}

function movePlayer(){
	if( direction === 1 ){ 
		if( gameMap[playerY][playerX-1] != 'w' && gameMap[playerY][playerX-1] != 'd' ){ playerX -= 1;  }
		if( gameMap[playerY][playerX-1] === 'd' && playerHasKey ){ playerX -= 1; }
		if( gameMap[playerY][playerX-1] === 'd' && !playerHasKey ){ textLines[0] = "You need the key."; }
	} // left
	else if( direction === 2 ){ 
		if( gameMap[playerY][playerX+1] != 'w' && gameMap[playerY][playerX+1] != 'd' ){ playerX += 1; }
		if( gameMap[playerY][playerX+1] === 'd' && playerHasKey ){ playerX += 1; }
		if( gameMap[playerY][playerX+1] === 'd' && !playerHasKey ){ textLines[0] = "You need the key."; }
	} // right
	else if( direction === 3 ){ 
		if( gameMap[playerY-1][playerX] != 'w' && gameMap[playerY-1][playerX] != 'd' ){ playerY -= 1; }
		if( gameMap[playerY-1][playerX] === 'd' && playerHasKey ){ playerY -= 1; }
		if( gameMap[playerY-1][playerX] === 'd' && !playerHasKey ){ textLines[0] = "You need the key."; }
	} // up
	else if( direction === 4 ){ 
		if( gameMap[playerY+1][playerX] != 'w' && gameMap[playerY+1][playerX] != 'd' ){ playerY += 1; }
		if( gameMap[playerY+1][playerX] === 'd'){ 
			if( playerHasKey ){ playerY += 1; }
			else{ textLines[0] = "You need the key."; clearTextTime = frameCount;}
		}
	} // down
	if( gameMap[playerY][playerX] === 'p' ){ gameState = 1; currentEnemy = "Psychopath"; currentEnemyHealth = inmateHealth; }
	if( gameMap[playerY][playerX] === 'n' ){ gameState = 1; currentEnemy = "Nurse"; currentEnemyHealth = nurseHealth; }
	if( gameMap[playerY][playerX] === 'j' ){ gameState = 1; currentEnemy = "Janitor"; currentEnemyHealth = janitorHealth; }
	if( gameMap[playerY][playerX] === 'd' ){ // player has
		//put in special dialog box
		gameState = 3;
	}
	cameraTopLeftY = 10 * Math.floor( playerX/10 );
	cameraTopLeftX = 10 * Math.floor( playerY/10 );
	direction = 0;
}

function showStatusBars(){
	//Health Bar
	var healthFill = 10 + (100 - playerHealth);
	var rageFill = 10 + (100 - playerRage);
	var magicFill = 10 + (100 - playerMagic);
	context2D.drawImage(statusBars, 426, 9);
	context2D.fillStyle = '#FF0000';
	context2D.fillRect( 427, healthFill, 20, playerHealth );
	context2D.drawImage(healthIcon, 421, 115);
	//Rage Bar
	context2D.drawImage(statusBars, 469, 9);
	context2D.fillStyle = '#FF0000';
	context2D.fillRect( 470, rageFill, 20, playerRage );
	context2D.drawImage(rageIcon, 464, 115);
	//Magic Bar
	context2D.drawImage(statusBars, 511, 9);
	context2D.fillStyle = '#00FF00';
	context2D.fillRect( 512, magicFill, 20, playerMagic );
	context2D.drawImage(magicIcon, 506, 115);
}

function update(){
	frameCount++;
	if( (frameCount - clearTextTime) % 60 === 0 && gameState != 1){ for(var i = 0; i < 4; i ++){ textLines[i] = ""; } }
	if( battleVictory ){ winFight(); }
	if( gameState != 2 && gameState != 3 ){// if you havnt lost the game
		if( frameCount % 3 === 0 && gameState != 1 ){ movePlayer(); }
		draw();
	}
	else if(turnSwitch){ turnSwitch = false; context2D.fillStyle = '#00f'; context2D.font = 'bold 15px sans-serif'; var baseY = 195; for( var i = 0; i < 4; i++ ){ context2D.fillText( textLines[i], 330, baseY + ( 30 * i) ); } sleep(3000);}
	else if( gameState === 2 ){ loseGame(); }
	else if( gameState === 3 ){ winGame(); }
}

function winGame() {
	var buttonPanel = document.getElementById("controls");
	buttonPanel.style.display = 'none';
	context2D.drawImage( winScreen, 0, 0 ); 
}
function loseGame(){
	var buttonPanel = document.getElementById("controls");
	buttonPanel.style.display = 'none';
	context2D.drawImage( loseScreen, 0, 0 ); 
}

function winFight(){
	if(playerX === keyHolderX && playerY === keyHolderY){ playerHasKey = true; textLines[0] = "You now have the exit key."; }
	sleep(3000);
	battleVictory = false;
}
// 1=slap; 2=breathefire; 3=rage; 4=recover;
function rageClick(){ currentOption = 3; doAttack(); }
function slapClick(){ currentOption = 1; doAttack(); }
function recoverClick(){ 
	if( (playerMagic + playerMoves[3][3]) >= 0 ){ currentOption = 4; doAttack(); }
	else{ textLines[0] = "You don't have enough magic for that."; textLines[1] = ""; textLines[2] = ""; textLines[3] = "";}
}
function breathefireClick(){ 
	if( (playerMagic + playerMoves[1][3]) >= 0 ){ currentOption = 2; doAttack(); }
	else{ textLines[0] = "You don't have enough magic for that."; textLines[1] = ""; textLines[2] = ""; textLines[3] = "";}
}
function enemyAttack(){
	//enemy moves
	//name; basedmg; addhealth; addmagic; addrage;
	var moveName; var moveDamage; var moveAddHealth; var moveAddMagic; var moveAddRage; 
	if( currentEnemy == "Psychopath" ){
		var rnd = Math.floor(Math.random()*2);
		moveName = inmateMoves[rnd][0];
		moveDamage = inmateMoves[rnd][1];
		moveAddHealth = inmateMoves[rnd][2];
		moveAddMagic = inmateMoves[rnd][3];
		moveAddRage = inmateMoves[rnd][4];
	}
	if( currentEnemy == "Nurse" ){
		var rnd = Math.floor(Math.random()*2);
		moveName = nurseMoves[rnd][0];
		moveDamage = nurseMoves[rnd][1];
		moveAddHealth = nurseMoves[rnd][2];
		moveAddMagic = nurseMoves[rnd][3];
		moveAddRage = nurseMoves[rnd][4];
	}
	if( currentEnemy == "Janitor" ){
		var rnd = Math.floor(Math.random()*2);
		moveName = janitorMoves[rnd][0];
		moveDamage = janitorMoves[rnd][1];
		moveAddHealth = janitorMoves[rnd][2];
		moveAddMagic = janitorMoves[rnd][3];
		moveAddRage = janitorMoves[rnd][4];
	}
	if( currentEnemy == "Psychiatrist" ){
		//hopefully I get to add this boss battle
	}
	var totalDamage = ( moveDamage - moveAddHealth);
	playerHealth -= totalDamage;
	playerMagic  += moveAddMagic;
	playerRage	 += moveAddRage;
	textLines[0] = currentEnemy + " used the move " + moveName + " against you.";
	textLines[1] = "You take " + totalDamage + " damage.";
	textLines[2] = "-extraHealth: " + Math.abs(moveAddHealth) + " -Magic: " + Math.abs(moveAddMagic) + " -Rage: " + Math.abs( moveAddRage );
	if(playerHealth <= 0 || playerRage > 100 || playerRage < 0) { gameState = 2; }
	playersTurn = true;
	turnSwitch = true;
}

function doAttack(){
	//name; maxdamage; addhealth; addmagic; addrage;
	//var playerMoves 
	var damage = playerMoves[currentOption-1][1] - ( Math.floor( Math.abs( playerRage - 50 ) / 3 ) );
	var addHealth = playerMoves[currentOption-1][2];
	var addMagic = playerMoves[currentOption-1][3];
	var addRage = playerMoves[currentOption-1][4];
	playerHealth += addHealth;
	playerMagic += addMagic;
	playerRage += addRage;
	textLines[0] = "You have used the move " + playerMoves[currentOption-1][0];
	textLines[1] = "you have done " + damage + " damage to " + currentEnemy + ".";
	textLines[2] =  "+Health: " + addHealth + " +Magic: " + addMagic + " +Rage: " + addRage;
	currentEnemyHealth -= damage;
	rageBtn.removeEventListener('click', rageClick, false);
	slapBtn.removeEventListener('click', slapClick, false);
	recoverBtn.removeEventListener('click', recoverClick, false);
	breathefireBtn.removeEventListener('click', breathefireClick, false);
	if(playerHealth <= 0 || playerRage > 100 || playerRage < 0) { gameState = 2; }
	if( currentEnemyHealth <= 0 ){ 
		battleVictory = true;
		textLines[3] = "You have defeated the " + currentEnemy + ".";
		var baseY = 195;
		for( var i = 0; i < 4; i++ ){ context2D.fillText( textLines[i], 330, baseY + ( 30 * i) ); }
		gameState = 0;
		for( var j = 0; j < 4; j++ ){ textLines[j] = ""; }
		var streets = 0; var insides = 0;
		if( gameMap[playerY+1][playerX] === 'i' ){ insides++;} else{ streets++; }
		if( gameMap[playerY-1][playerX] === 'i' ){ insides++;} else{ streets++; }
		if( gameMap[playerY][playerX+1] === 'i' ){ insides++;} else{ streets++; }
		if( gameMap[playerY][playerX-1] === 'i' ){ insides++;} else{ streets++; }
		if( streets >= insides ){ gameMap[playerY][playerX] = 's'; } else{ gameMap[playerY][playerX] = 'i'; }
	}
	var buttonPanel = document.getElementById("controls");
	buttonPanel.style.display = 'none';
	playersTurn = false;
	turnSwitch = true;
}

function doBattle(){
	currentOption = 0;
	if(playersTurn){
		var buttonPanel = document.getElementById("controls");
		buttonPanel.style.display = "";
		rageBtn = document.getElementById("rage");
		slapBtn = document.getElementById("slap");
		recoverBtn = document.getElementById("recover");
		breathefireBtn = document.getElementById("breathefire");
		rageBtn.addEventListener('click', rageClick, false);
		slapBtn.addEventListener('click', slapClick, false);
		recoverBtn.addEventListener('click', recoverClick, false);
		breathefireBtn.addEventListener('click', breathefireClick, false);
	}
	else{
		enemyAttack(); 
	}
	
}

function draw(){
	context2D.clearRect(0, 0, canvas.width, canvas.height);
	context2D.drawImage(background, 0, 0);
	if( gameState != 1 ){ showMap(); }
	else{ context2D.drawImage(battleScreen, 0, 0); doBattle(); }
	context2D.fillStyle = '#00f';
	context2D.font = 'bold 15px sans-serif';
	var baseY = 195;
	for( var i = 0; i < 4; i++ ){ context2D.fillText( textLines[i], 330, baseY + ( 30 * i) ); }
	showStatusBars();
}

function sleep(ms)
{
	var dt = new Date();
	dt.setTime(dt.getTime() + ms);
	while (new Date().getTime() < dt.getTime());
}
