
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
var table1 =document.getElementById("table1");
var table2 =document.getElementById("table2");
var table3 =document.getElementById("table3");
var table4 =document.getElementById("table4");
var table5 =document.getElementById("table5");

// Thought Bubble - tb
var tb1 =document.getElementById("tb1");
var tb2 =document.getElementById("tb2");
var tb3 =document.getElementById("tb3");
var tb4 =document.getElementById("tb4");
var tb5 =document.getElementById("tb5");

// ANGER LEVELS
var angerLevel1 = 0;
var angerLevel2 = 0;
var angerLevel3 = 0;
var angerLevel4 = 0;
var angerLevel5 = 0;

// HOARD COUNTER
var zombieCount = document.getElementById("zombieCount");

// KITCHEN ITEMS
var itemSelected = 0;


// PLAYER
var player = document.getElementById('player');
var count = zombieCount.innerHTML;

// TIMER
var playerTimer = setInterval(movePlayer,30);
var gameTimer = setInterval(selectItem,30);
var gameTime = setInterval(checkSpawn,30);


function checkSpawn(){
	if(spawn){
		var spawnTimer = setInterval(zombieSpawn, 15000);
	}else{
		clearInterval(spawnTimer);
		win();
	}
}


var timer0;
var timer1;
var timer2;
var timer3;
var timer4;

//create a thoughts array: this is where thought bubbles with food will be stored


// ARRAYS
var zombieGender = ["images/z-boy_normal.png",
					"images/z-girl_normal.png"];

var tablesArray = [false, 
					false, 
					false, 
					false, 
					false];

var trayEmptyArray =[true,
						true,
						true,
						true,
						true,
						true];

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
document.addEventListener("keydown", function(event){
	switch(event.keyCode){
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


function movePlayer(){

	if(leftArrow){
		// moves player left
		if(player.offsetLeft>=310){
			player.style.left = player.offsetLeft - 260 + "px";
			// flips player depending on which side of the center they are located
			if(player.offsetLeft <= 570){
				player.className = "playerflip";
			}else{
				player.className = "player";
			}
		}
		leftArrow = false;
	}

	if(rightArrow){
		// moves player right
		if(player.offsetLeft<=830){
			player.style.left = player.offsetLeft + 260 + "px";
			
			// flips player based on which side of screen they are located.
			if(player.offsetLeft <= 570){
				player.className = "playerflip";
			}else{
				player.className = "player";
			}
		}
		rightArrow = false;
	}

	if(serve){
		// INDEX 
		var seatNum;

		// SETS INDEX BASED ON PLAYER POSITION
		switch(player.offsetLeft){
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
		if(trayEmptyArray[seatNum] && tablesArray[seatNum]){
			// PLACES ITEM IN THE TRAY
			trayArray[seatNum].innerHTML= itemsArray[itemSelected].innerHTML;

			// TRAY IS FULL
			trayEmptyArray[seatNum]=false;
		}
		// stops if statement from looping
		serve = false;
	}
}

function zombieSpawn(){

	var seat = Math.floor(Math.random()*5);
	// If table is empty, then put a zombie there!
	if(!tablesArray[seat]){
		// declares table is taken
		tablesArray[seat] = true;



		switch(seat){
		
		// places zombie in seat 
		case 0:
			angerSeat(table1, 0, angerLevel1, timer0,tb1);
			break;	
		case 1:
			angerSeat(table2, 1, angerLevel2, timer1, tb2);
			break;	
		case 2:
			angerSeat(table3, 2, angerLevel3, timer2, tb3);
			break;
		case 3:
			angerSeat(table4, 3, angerLevel4, timer3, tb4);
			break;
		case 4:
			angerSeat(table5, 4, angerLevel5, timer4, tb5);
			break;	
		}

		// decreases hoard count
		count--;
		zombieCount.innerHTML = count;
		
		if (count <=0) {
			win();
			spawn = false;
			console.log(spawn);
		}
	}
}

function selectItem(){

	if(switchItem){
		itemsArray[itemSelected].className="item-icon";
		itemSelected ++;
		
		if(itemSelected == 4){
			itemSelected = 0;
		}

		itemsArray[itemSelected].className="item-icon selected";

		switchItem=false;
	}
}


function angerSeat(table, index, angerLevel, timer,tb){
// generates random gender
	var gender = Math.floor(Math.random()*2);
	//pick random food

	timer = setInterval(function(event){
	// function here



	if(gender == 1){

		// BOY
		switch(angerLevel){
			case 0:
				//check if food on table matches food in thought bubble
				tb.innerHTML='<img src="images/order.png">';
				table.innerHTML= '<img src="images/z-boy_normal.png">';
				angerLevel++;
				break;
			case 1:
				//check if food on table matches food in thought bubble
				table.innerHTML= '<img src="images/z-boy_angry.png">';
				angerLevel++;
				break;
			case 2:
				//check if food on table matches food in thought bubble, break
				table.innerHTML= '<img src="images/z-boy_shot.png">';
				tb.innerHTML = ' ';
				angerLevel++;
				//lose life
				break;
			case 3:
				table.innerHTML= ' ';
				angerLevel=0;
				tablesArray[index] = false;
				cycleComplete = true;
				break;

		}
	}else{

		// GIRL
		switch(angerLevel){
			case 0:
				//check if food on table matches food in thought bubble
				tb.innerHTML='<img src="images/order.png">';
				table.innerHTML= '<img src="images/z-girl_normal.png">';
				angerLevel++;
				break;
			case 1:
				//check if food on table matches food in thought bubble
				table.innerHTML= '<img src="images/z-girl_angry.png">';
				angerLevel++;
				break;
			case 2:
			    //check if food on table matches food in thought bubble, break
				table.innerHTML= '<img src="images/z-girl_shot.png">';
				tb.innerHTML = ' ';
				angerLevel++;
				//lose life
				break;
			case 3:
				table.innerHTML= ' ';
				angerLevel=0;
				tablesArray[index] = false;
				cycleComplete = true;
				break;

		}

		
	}
	if(cycleComplete){
		clearInterval(timer);
		cycleComplete = false;
	}
	}, 5000);
}

function win(){
	winScreen.style.visibility="visible";
	cont.addEventListener("click", continueGame);
	clearInterval(gameTime);
}

function continueGame(){
	winScreen.style.visibility = "hidden";
}
