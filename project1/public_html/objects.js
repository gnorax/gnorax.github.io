/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function Building(name){
	this.name = name;
	this.amount = 0;
	this.currentCost = 0;
	
	this.setName=function (name){
		this.name=name;
	};
	
	this.getName=function(){
		return this.name;
	};
	this.getCost=function(){
		return this.currentCost;
	};
	this.getAmount=function(){
		return this.amount;
	};
	this.incrementAmount=function(){
		this.amount=this.getAmount()+1;
		$("amount_"+this.name).innerHTML=this.amount;
	};
	this.setCost=function(cost){
		this.currentCost=cost;
		$("cost_"+this.name).innerHTML=this.currentCost;
		$("progress_"+this.name).max=this.currentCost;
	};
/*
 * increments amount, decreases money, refreshes costs
 * 
 * @returns {undefined}
 */
	this.add = function(){
		//check if buyable
		if (getMoney()>=this.currentCost){
			// remove money
			decreaseMoney(this.currentCost);
			// add to amount
//			this.amount += 1;
			this.incrementAmount();
			// calculate new cost
			this.setCost(this.calculateCurrentCost());

		}else{
			console.log(this.name + " was too expensive");
		}
	};
	this.produce = function(){
		throw "should be overwritten by special Buildings";
	};
	this.calculateCurrentCost = function(){
		throw "should be overwritten by special Buildings";
	};
};
/*
 * 
 * @param {type} costInSeconds
 * @param {type} baseProduction
 * @returns {TimeBasedBuilding}
 */
function TimeBasedBuilding(name, costInSeconds, baseProduction){
	this.costInSeconds = costInSeconds;
	this.baseProduction = baseProduction;
	this.currentCost = baseProduction*10;
	this.multiplier = 1;
	
	this.name=name;
	
	this.getProduction = function(){
		return this.baseProduction;
	};
}

TimeBasedBuilding.prototype = new Building();

TimeBasedBuilding.prototype.calculateCurrentCost = function(){
	return this.costInSeconds*getGlobalProduction();
};

TimeBasedBuilding.prototype.produce = function(){
	return this.amount * this.baseProduction * this.multiplier;	
};
