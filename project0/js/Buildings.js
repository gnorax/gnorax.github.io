/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/*
 * 
 * @param {type} name
 * @returns {GeneralBuilding}
 */
function GeneralBuilding(name){
	this.name = name;
	this.amount = 0;
	this.CurrentCost = 0;
	
	
/*
 * increments amount, decreases money, refreshes costs
 * 
 * @returns {undefined}
 */
	this.add = function(){
		//check if buyable
		if (game.money>=this.currentCost){
			// remove money
			game.money -= this.currentCost;
			// add to amount
			this.amount += 1;		
			// calculate new cost
			this.currentCost = this.calculateCurrentCost();
		}else{
			console.log(this.name + " was too expensive");
		}
	};
	this.produce = function(){
		throw "should be overwritten by special Buildings"
	};
	this.calculateCurrentCost = function(){
		throw "should be overwritten by special Buildings"
	};
};

/*
 * 
 * @param {type} costInSeconds
 * @param {type} baseProduction
 * @returns {TimeBasedBuilding}
 */
function TimeBasedBuilding(costInSeconds, baseProduction){
	this.costInSeconds = costInSeconds;
	this.baseProduction = baseProduction;
	this.currentCost = baseProduction*10;
}

TimeBasedBuilding.prototype = new GeneralBuilding();

/*
 * 
 * @param {type} baseCost
 * @param {type} power
 * @returns {InflationBuilding}
 */
function InflationBuilding(baseCost, power){
	this.baseCost = baseCost;
	this.power = power;
	this.currentCost = baseCost;
	this.halfLife = 30;
	this.inflationPower = 1;
}

InflationBuilding.prototype = new GeneralBuilding();

function DerivedBuilding(baseCost, costType, baseProduction){
	this.baseCost = baseCost;
	this.costType = costType;
	this.baseProduction = baseProduction;
}

DerivedBuilding.prototype = new GeneralBuilding();

/* functions
 * 
 */



TimeBasedBuilding.prototype.calculateCurrentCost = function(){
	return this.costInSeconds*globalProduction();
};

TimeBasedBuilding.prototype.produce = function(){
	return this.amount*this.baseProduction;	
};

InflationBuilding.prototype.calculateCurrentCost = function(){
	return this.baseCost * Math.pow(2,this.amount);
};

/*
 * sets this.halfLife to the new value
 * @returns {undefined}
 */
InflationBuilding.prototype.calculateHalfLife = function(infPowBase){
	var offset = 10;
	var maxHalfLife = 30;
	var minHalfLife = 1;

	var scalingFunction = offset/(offset+infPowBase); // {1 .. 0}

//	calculate the half life

	this.halfLife = (maxHalfLife-minHalfLife) * scalingFunction + minHalfLife; //{maxHalfLife..minHalfLife)}
};

InflationBuilding.prototype.calculateInflationPower = function(){
	var infPowBase = this.amount * this.power; // {0..infinity}
//	base case
	if (infPowBase===0){
		this.inflationPower = 1;
		return;
	}
//	interesting one
	this.calculateHalfLife(infPowBase);
	var inflation = Math.pow(0.5, 1/this.halfLife); // the halfLife-th root of 0.5
//	assert pow(inflation, halfLife) = 0.5
	
	this.inflationPower = inflation;
};

/*
 * reduce the currentcost of TBBs
 */
InflationBuilding.prototype.produce = function(){
	this.calculateInflationPower();
//	var inflationPower = this.inflationPower;// value between 0 and 1
	for (var i in game.timeBasedBuildings){
		var building = game.timeBasedBuildings[i];
		building.currentCost *= this.inflationPower;
		game.timeBasedBuildings[i] = building;
	}
};