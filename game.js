
// BOOLEANS
var leftArrow = false;
var rightArrow = false;
var serve = false;
var switchItem = false;
var cycleComplete = false;
var spawn = true;

// WINSCREEN
var winScreen = document.getElementById("win");
var cont = document.getElementById('cont');

// ZOMBIES
var table1 = document.getElementById("table1");
var table2 = document.getElementById("table2");
var table3 = document.getElementById("table3");
var table4 = document.getElementById("table4");
var table5 = document.getElementById("table5");

// Thought Bubble - tb
var tb1 = document.getElementById("tb1");
var tb2 = document.getElementById("tb2");
var tb3 = document.getElementById("tb3");
var tb4 = document.getElementById("tb4");
var tb5 = document.getElementById("tb5");

// ANGER LEVELS
var angerLevel1 = 0;
var angerLevel2 = 0;
var angerLevel3 = 0;
var angerLevel4 = 0;
var angerLevel5 = 0;

// HOARD COUNTER
var zombieCount = document.getElementById("zombieCount");
var deadZombies = 0;
var count = zombieCount.innerHTML;
var hoardSize = 5;

// KITCHEN ITEMS
var itemSelected = 0;


// PLAYER
var player = document.getElementById('player');
var lives = document.getElementById('lives');
var livesCount = lives.innerHTML.split("x").pop();
var winning = false;

// TIMER
var playerTimer;
var gameTimer;
var spawnTimer;

var timer0;
var timer1;
var timer2;
var timer3;
var timer4;

//Game Logic
var startScreen = document.getElementById('start');
var startButton = document.getElementById('startButton');

var gameOver = document.getElementById('gameOver');
var retryButton = document.getElementById('retry-btn');

// ARRAYS
var zombieGender = ["images/z-boy_normal.png",
	"images/z-girl_normal.png"];

var tablesArray = [false,
	false,
	false,
	false,
	false];

var trayEmptyArray = [true,
	true,
	true,
	true,
	true,
	true];

var servedFood = [0, 0, 0, 0, 0];

var itemsArray = [document.getElementById("item1"),
document.getElementById("item2"),
document.getElementById("item3"),
document.getElementById("item4")];

var trayArray = [document.getElementById("tray1"),
document.getElementById("tray2"),
document.getElementById("tray3"),
document.getElementById("tray4"),
document.getElementById("tray5")];

// EVENT LISTENERS
document.addEventListener("keydown", function (event) {
	switch (event.keyCode) {
		//left arrow key
		case 37:
			leftArrow = true;
			break;

		//right arrow		
		case 39:
			rightArrow = true;
			break;

		// space bar - to serve meals to zombies
		case 32:
			serve = true;
			break;

		// shift - to select next item
		case 16:
			switchItem = true;
			break;
	}

});

startButton.addEventListener("click", startGame);
retryButton.addEventListener("click", reset);

function reset() {
	gameOver.style.visibility = "hidden";
	livesCount = 4;
	leftArrow = false;
	rightArrow = false;
	serve = false;
	switchItem = false;
	cycleComplete = false;
	spawn = true;

	angerLevel1 = 0;
	angerLevel2 = 0;
	angerLevel3 = 0;
	angerLevel4 = 0;
	angerLevel5 = 0;

	deadZombies = 0;
	count = 5;
	zombieCount.innerHTML = "5";
	hoardSize = 5;
	itemSelected = 0

	lives.innerHTML = "x4";
	livesCount = 4;
	winning = false;

	clearInterval(timer0);
	clearInterval(timer1);
	clearInterval(timer2);
	clearInterval(timer3);
	clearInterval(timer4);

	tablesArray = [false,
		false,
		false,
		false,
		false];

	trayEmptyArray = [true,
		true,
		true,
		true,
		true,
		true];

	servedFood = [0, 0, 0, 0, 0];

	table1.innerHTML = ' ';
	table2.innerHTML = ' ';
	table3.innerHTML = ' ';
	table4.innerHTML = ' ';
	table5.innerHTML = ' ';

	tb1.innerHTML = ' ';
	tb2.innerHTML = ' ';
	tb3.innerHTML = ' ';
	tb4.innerHTML = ' ';
	tb5.innerHTML = ' ';

	startGame();
}

function startGame() {
	startScreen.style.visibility = "hidden";
	playerTimer = setInterval(movePlayer, 30);
	gameTimer = setInterval(selectItem, 30);
	spawnTimer = setInterval(zombieSpawn, 1000);
}

function showGameOver() {
	gameOver.style.visibility = "visible";
	clearInterval(playerTimer);
	clearInterval(gameOver);
	clearInterval(spawnTimer);
}


function movePlayer() {

	if (leftArrow) {
		// moves player left
		if (player.offsetLeft >= 310) {
			player.style.left = player.offsetLeft - 260 + "px";
			// flips player depending on which side of the center they are located
			if (player.offsetLeft <= 570) {
				player.className = "playerflip";
			} else {
				player.className = "player";
			}
		}
		leftArrow = false;
	}

	if (rightArrow) {
		// moves player right
		if (player.offsetLeft <= 830) {
			player.style.left = player.offsetLeft + 260 + "px";

			// flips player based on which side of screen they are located.
			if (player.offsetLeft <= 570) {
				player.className = "playerflip";
			} else {
				player.className = "player";
			}
		}
		rightArrow = false;
	}

	if (serve) {
		// INDEX 
		var seatNum;

		// SETS INDEX BASED ON PLAYER POSITION
		switch (player.offsetLeft) {
			case 50:
				seatNum = 0;
				break;
			case 310:
				seatNum = 1;
				break;
			case 570:
				seatNum = 2;
				break;
			case 830:
				seatNum = 3;
				break;
			case 1090:
				seatNum = 4;
				break;
		}

		// IF THE TRAY IS EMPTY & ZOMBIE IS SEATED
		if (trayEmptyArray[seatNum] && tablesArray[seatNum]) {
			// PLACES ITEM IN THE TRAY
			trayArray[seatNum].innerHTML = itemsArray[itemSelected].innerHTML;
			servedFood[seatNum] = itemSelected + 1;

			// TRAY IS FULL
			trayEmptyArray[seatNum] = false;
		}
		// stops if statement from looping
		serve = false;
	}
}


function zombieSpawn() {

	if (spawn) {
		var seat = Math.floor(Math.random() * 5);

		// If table is empty, then put a zombie there!
		if (!tablesArray[seat]) {
			// declares table is taken
			tablesArray[seat] = true;


			switch (seat) {

				// places zombie in seat 
				case 0:
					angerSeat(table1, 0, angerLevel1, timer0, tb1, trayArray[0]);
					break;
				case 1:
					angerSeat(table2, 1, angerLevel2, timer1, tb2, trayArray[1]);
					break;
				case 2:
					angerSeat(table3, 2, angerLevel3, timer2, tb3, trayArray[2]);
					break;
				case 3:
					angerSeat(table4, 3, angerLevel4, timer3, tb4, trayArray[3]);
					break;
				case 4:
					angerSeat(table5, 4, angerLevel5, timer4, tb5, trayArray[4]);
					break;
			}

			// decreases hoard count

			count--;
			zombieCount.innerHTML = count;

			if (count <= 0) {
				spawn = false;
			}

		}
	}
	else {
		if (deadZombies == hoardSize && !winning) {
			win();
		}
	}


}

function selectItem() {

	if (switchItem) {
		itemsArray[itemSelected].className = "item-icon";
		itemSelected++;

		if (itemSelected == 4) {
			itemSelected = 0;
		}

		itemsArray[itemSelected].className = "item-icon selected";

		switchItem = false;
	}
}



function angerSeat(table, index, angerLevel, timer, tb, tray) {
	// generates random gender
	var gender = Math.floor(Math.random() * 2);
	var food = Math.floor(Math.random() * 4) + 1;
	var foodString;

	switch (food) {
		case 1:
			foodString = '<img src="images/heart_order.png">';
			break;
		case 2:
			foodString = '<img src="images/eye_order.png">';
			break;
		case 3:
			foodString = '<img src="images/brain_order.png">';
			break;
		case 4:
			foodString = '<img src="images/tongue_order.png">';
			break;
	}



	//pick random food
	timer = setInterval(function (event) {
		// function here

		if (!trayEmptyArray[index] && food == servedFood[index]) {
			angerLevel = 3;
			tray.innerHTML = ' ';
			servedFood[index] = 0;
			trayEmptyArray[index] = true;
		}
		else if (!trayEmptyArray[index] && food != servedFood[index]) {
			angerLevel = 2;
			tray.innerHTML = ' ';
			servedFood[index] = 0;
			trayEmptyArray[index] = true;
		}

		if (gender == 1) {


			// BOY
			switch (angerLevel) {
				case 0:
					tb.innerHTML = foodString;
					table.innerHTML = '<img src="images/z-boy_normal.png">';
					angerLevel++;
					break;
				case 1:
					table.innerHTML = '<img src="images/z-boy_angry.png">';
					angerLevel++;
					break;
				case 2:
					table.innerHTML = '<img src="images/z-boy_shot.png">';
					tb.innerHTML = ' ';
					angerLevel++;
					//lose life
					livesCount--;
					lives.innerHTML = "x" + livesCount;
					break;
				case 3:
					tb.innerHTML = ' ';
					table.innerHTML = ' ';
					tray.innerHTML = ' ';
					angerLevel = 0;
					tablesArray[index] = false;
					deadZombies++;
					clearInterval(timer);
					break;

			}
		} else {

			// GIRL
			switch (angerLevel) {
				case 0:
					tb.innerHTML = foodString;
					table.innerHTML = '<img src="images/z-girl_normal.png">';
					angerLevel++;
					break;
				case 1:
					table.innerHTML = '<img src="images/z-girl_angry.png">';
					angerLevel++;
					break;
				case 2:
					table.innerHTML = '<img src="images/z-girl_shot.png">';
					tb.innerHTML = ' ';
					angerLevel++;
					//lose life
					livesCount--;
					lives.innerHTML = "x" + livesCount;
					break;
				case 3:
					tb.innerHTML = ' ';
					table.innerHTML = ' ';
					tray.innerHTML = ' ';
					angerLevel = 0;
					tablesArray[index] = false;
					deadZombies++;
					clearInterval(timer);
					break;

			}
		}

		if (livesCount == 0) {
			showGameOver();
		}

	}, 5000);
}

function win() {
	livesCount++;
	lives.innerHTML = "x" + livesCount;
	winning = true;
	winScreen.style.visibility = "visible";
	cont.addEventListener("click", continueGame);
	clearInterval(gameTimer);
}

function continueGame() {
	winScreen.style.visibility = "hidden";

	deadZombies = 0;
	spawn = true;
	hoardSize += 5;
	count = hoardSize;
	winning = false;
}
