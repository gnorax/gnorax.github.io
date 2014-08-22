/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var game = {
	money:0,
	moneyPerSecond:0,
	
	buildings:[],
	lastSave: undefined
};

function init(){
		console.log(localStorage.getItem('storedGame'));
	if (localStorage.getItem('storedGame')!==null){
		load();
	}else{
		newGame();
	}
}

function newGame(){
	
	game.buildings[0] = new TimeBasedBuilding(10,1);
	game.buildings[0].name = "Tier 1 TBB";
}

function globalProduction(){
	var gProd = 0;
	for (var i in game.buildings){
		building = game.buildings[i];
		if (building instanceof TimeBasedBuilding){
			gProd += building.produce();
		}else{
			console.log(building instanceof TimeBasedBuilding);
			console.log(building);
		}
	}
	return gProd;
}


function save(){
	var d = new Date();
	localStorage.setItem("storedGame", JSON.stringify(game));
	game.lastSave = d.toLocaleTimeString();
	document.getElementById("lastSave").innerHTML = game.lastSave;
}
function load() {
	if (localStorage.getItem('storedGame')!==undefined){
		game = JSON.parse(window.localStorage['storedGame']);
	}
}
function wipe() {
	localStorage.removeItem('storedGame');
}


var TickTimer = window.setInterval(function(){tick();}, 1000);

function tick(){
	game.money += game.moneyPerSecond;
	printCurrentRessources();
}

var SaveTimer = window.setInterval(function(){save();}, 15*1000);

function getMoney(){
	game.money += 1;
	printCurrentRessources();
};

function printCurrentRessources(){
	document.getElementById("money").innerHTML = game.money;
	document.getElementById("auto").innerHTML = game.buildings[0].amount;
	printCurrentPrices();
};

function printCurrentPrices(){
	document.getElementById("autoPrice").innerHTML = game.buildings[0].currentCost;
};

function getAutomaton(){
	b = game.buildings[0];
	console.log(b);
	if (b instanceof TimeBasedBuilding){
		b.add();
	}else{throw "Is not A TBB anymore";}
	game.buildings[0]=b;
	game.moneyPerSecond = globalProduction();
	printCurrentPrices();
};