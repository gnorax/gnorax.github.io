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
	game.money =0;
	game.moneyPerSecond = 0;
	game.lastSave =  undefined;
	game.buildings = [];
	
	game.buildings[0] = new TimeBasedBuilding(10,1);
	game.buildings[0].name = "Tier 1 TBB";
}

function globalProduction(){
	var gProd = 0;
	for (var i in game.buildings){
		var building = game.buildings[i];
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
	if (localStorage.getItem('storedGame')!==null){
		game = JSON.parse(window.localStorage['storedGame']);
		for (var i in game.buildings){
			var b = game.buildings[i];
			if (b.type==="TimeBasedBuilding"){
				newB = new TimeBasedBuilding(b.costInSeconds, b.baseProduction);
				newB.amount = b.amount;
				newB.name = b.name;
				game.buildings[i]=newB;
			}else if(b.type==="DerivedBuilding"){
				newB = new DerivedBuilding(b.baseCost, b.costType, b.baseProduction);
				newB.amount = b.amount;
				newB.name = b.name;
				game.buildings[i]=newB;
			}else{
				throw "unknown building"
			}
		}
	}
}
function wipe() {
	localStorage.removeItem('storedGame');
	newGame();
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

function getAutomaton(number){
	b = game.buildings[number];
	console.log(b);
	if (b instanceof TimeBasedBuilding){
		b.add();
	}else{throw "Is not A TBB anymore";}
	game.buildings[number]=b;
	game.moneyPerSecond = globalProduction();
	printCurrentPrices();
};


function addBuilding(){
	var currentLastBuildingInndex = game.buildings.length-1;
	var currBuilding= game.buildings[game.buildings.length-1];
	var newBuilding = new TimeBasedBuilding(currBuilding.costInSeconds*2, currBuilding.baseProduction*1.5);
	newBuilding.name = "TBB " + game.buildings.length-1;
	game.buildings[game.buildings.length] = newBuilding;
	
	
	var newButton = document.createElement("button");
    newButton.setAttribute("onclick", "getAutomaton("+currentLastBuildingInndex+")");
	var node = document.createTextNode("add "+currentLastBuildingInndex);
	newButton.appendChild(node);
	var element = document.getElementById("BuildingScreen");
	element.appendChild(newButton);
}