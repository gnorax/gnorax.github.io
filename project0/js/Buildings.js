/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function GeneralBuilding(name){
	this.name = name;
	this.amount = 0;
	
	this.add = function(){
		throw "should be overwritten by special Buildings"
	};
	this.produce = function(){
		throw "should be overwritten by special Buildings"
	};
}

function TimeBasedBuilding(costInSeconds, baseProduction){
	this.costInSeconds = costInSeconds;
	this.baseProduction = baseProduction;
	this.currentCost = baseProduction*10;
}

TimeBasedBuilding.prototype = new GeneralBuilding();


function DerivedBuilding(baseCost, costType, baseProduction){
	this.baseCost = baseCost;
	this.costType = costType;
	this.baseProduction = baseProduction;
}

DerivedBuilding.prototype = new GeneralBuilding();




TimeBasedBuilding.prototype.add = function(){
	//check if buyable
	if (game.money>=this.currentCost){
		// remove money
		game.money -= this.currentCost;
		// add to amount
		this.amount += 1;		
		// calculate new cost
		this.currentCost = globalProduction()*this.costInSeconds;
	}else{
		console.log(this.name + " was too expensive");
	}
};

TimeBasedBuilding.prototype.produce = function(){
	return this.amount*this.baseProduction;	
};