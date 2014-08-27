/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var game = {
	money:0,
	moneyPerSecond:0,
	inflation:1,
	autobuySelection:0,
	
	timeBasedBuildings:[],
	inflationBuildings:[],
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
	game.inflation = 1;
	game.autobuySelection = 0;
	game.lastSave =  undefined;
	game.timeBasedBuildings = [];
	game.inflationBuildings = [];
	
	game.timeBasedBuildings[0] = new TimeBasedBuilding(10,1);
	game.timeBasedBuildings[0].name = "TBB 0";
	
	game.inflationBuildings[0] = new InflationBuilding(100,1);
	game.inflationBuildings[0].name = "Inf 0";
};

function globalProduction(){
	var gProd = 0;
	for (var i in game.timeBasedBuildings){
		var building = game.timeBasedBuildings[i];
		gProd += building.produce();
	}
	return gProd;
};
function globalInflation(){
	var gInf = 1;
	for (var i in game.inflationBuildings){
		var building = game.inflationBuildings[i];
		gInf *= building.inflationPower;
	}
	return gInf;
};


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
			var newB = new TimeBasedBuilding(b.costInSeconds, b.baseProduction);
			if (b.amount===undefined){b.amount=0;}
			newB.amount = b.amount;
			newB.name = b.name;
			newB.currentCost = b.currentCost;
			game.timeBasedBuildings[i]=newB;
		}
		for (var i in game.inflationBuildings){
			var b = game.inflationBuildings[i];
			var newB = new InflationBuilding(b.baseCost, b.power);
			if (b.amount===undefined){b.amount=0;}
			newB.amount = b.amount;
			newB.name = b.name;
			newB.currentCost = b.currentCost;
			game.inflationBuildings[i]=newB;
		}
	}
};

function wipe() {
	if (confirm("do you want to wipe your save state")){
		localStorage.removeItem('storedGame');
		newGame();
		printButtons();
	}
};


var TickTimer = window.setInterval(function(){tick();}, 1000);

function tick(){
//	production
	game.money += game.moneyPerSecond;
//	inflation
	for (var i in game.inflationBuildings){
		game.inflationBuildings[i].produce();
	}
//	autobuy
	if (game.autobuySelection!==0){
		autobuy();
	}
//	adding new tbbs
	if (game.timeBasedBuildings[game.timeBasedBuildings.length-1].amount>2){
		addTBB();
	}
//	print changes
	printAll();
}

var SaveTimer = window.setInterval(function(){save();}, 15*1000);

function getMoney(){
	game.money += 1*1000;
	printAll();
};


function buyTBB(number){
	var b = game.timeBasedBuildings[number];
	console.log(b);
	if (b instanceof TimeBasedBuilding){
		b.add();
	}else{throw "Is not A TBB anymore";}
	game.timeBasedBuildings[number]=b;
	game.moneyPerSecond = globalProduction();
	printAll();
};
function buyInflation(number){
	if (number===undefined){number=0;}
	var b = game.inflationBuildings[number];
	console.log(b);
	if (b instanceof InflationBuilding){
		b.add();
		b.calculateInflationPower();
	}else{throw "Is not an IB anymore";}
	game.inflationBuildings[number]=b;
	game.inflation = globalInflation();
	printAll();
};


function addTBB(){
	var currBuilding= game.timeBasedBuildings[game.timeBasedBuildings.length-1];
	var newBuilding = new TimeBasedBuilding(currBuilding.costInSeconds*2, currBuilding.baseProduction*3);
	newBuilding.name = "TBB " + (game.timeBasedBuildings.length).toString();
	game.timeBasedBuildings[game.timeBasedBuildings.length] = newBuilding;
	printButtons();
};

function setAutobuySelection(){
	var select = document.getElementById("autobuySelect");
	game.autobuySelection =	select.options[select.selectedIndex].value;
};

function autobuy(){
	for (i=game.timeBasedBuildings.length-1;i>=0;i--){
		var b = game.timeBasedBuildings[i];
		var maxCost = calculateMaxCost(b);
		if (b.currentCost <=maxCost){
//			TODO: maybe check for game.money for speedup?
//			b.add();
			buyTBB(i);
		}
	}
};

function calculateMaxCost(building){
	switch (game.autobuySelection){
		case "1":
			return building.amount*building.baseProduction;
		case "2":
			return game.moneyPerSecond;
		case "3":
			return game.money;
		default:
			return 0;
	}
};

function addAutobuyLvl(){
	throw "not implemented"
}