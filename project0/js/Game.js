/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var game = {
	money:0,
	moneyPerSecond:0,
	
	timeBasedBuildings:[],
	lastSave: undefined
};

function init(){
	// what do I load
	console.log(localStorage.getItem('storedGame'));
	
	if (localStorage.getItem('storedGame')!==null){
		load();
	}else{
		newGame();
	}
}

function newGame(){
	game.money =0;
	game.moneyPerSecond = 0;
	game.lastSave =  undefined;
	game.timeBasedBuildings = [];
	
	game.timeBasedBuildings[0] = new TimeBasedBuilding(10,1);
	game.timeBasedBuildings[0].name = "TBB 0";
}

function globalProduction(){
	var gProd = 0;
	for (var i in game.timeBasedBuildings){
		var building = game.timeBasedBuildings[i];
		gProd += building.produce();
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
	if (localStorage.getItem('storedGame')!==null){
		game = JSON.parse(window.localStorage['storedGame']);
		for (var i in game.timeBasedBuildings){
			var b = game.timeBasedBuildings[i];
			newB = new TimeBasedBuilding(b.costInSeconds, b.baseProduction);
			newB.amount = b.amount;
			newB.name = b.name;
			newB.currentCost = b.currentCost;
			game.timeBasedBuildings[i]=newB;
		}
	}
};

function wipe() {
	if (confirm("do you want to wipe your save state")){
		localStorage.removeItem('storedGame');
		newGame();
	}
};


var TickTimer = window.setInterval(function(){tick();}, 1000);

function tick(){
	game.money += game.moneyPerSecond;
	printAll();
	if (game.timeBasedBuildings[game.timeBasedBuildings.length-1].amount>2){
		addBuilding();
	}
}

var SaveTimer = window.setInterval(function(){save();}, 15*1000);

function getMoney(){
	game.money += 1*1000;
	printAll();
};


function getAutomaton(number){
	b = game.timeBasedBuildings[number];
	console.log(b);
	if (b instanceof TimeBasedBuilding){
		b.add();
	}else{throw "Is not A TBB anymore";}
	game.timeBasedBuildings[number]=b;
	game.moneyPerSecond = globalProduction();
	printAll();
};


function addBuilding(){
	var currBuilding= game.timeBasedBuildings[game.timeBasedBuildings.length-1];
	var newBuilding = new TimeBasedBuilding(currBuilding.costInSeconds*2, currBuilding.baseProduction*3);
	newBuilding.name = "TBB " + (game.timeBasedBuildings.length).toString();
	game.timeBasedBuildings[game.timeBasedBuildings.length] = newBuilding;
	printButtons();
};