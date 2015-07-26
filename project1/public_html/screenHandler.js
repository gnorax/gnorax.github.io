/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global  TimeBasedBuilding, data*/

var createBuilding = function (building) {
	if (!building instanceof TimeBasedBuilding) {
		throw "Exception";
	}
	// add a div for the new building
	// add different divs inside

	//main box
	var box = document.createElement("div");
	box.setAttribute("id", building.name);
	box.setAttribute("class", "box");

	//cost
	var cost = document.createElement("div");
	cost.setAttribute("id", "cost_" + building.name);
	cost.setAttribute("class", "cost");
	cost.innerHTML = building.getCost();
	//progess
	var progres = document.createElement("progress");
	progres.setAttribute("id", "progress_" + building.name);
	progres.setAttribute("value", getMoney());
	progres.setAttribute("max", building.getCost());
	//production
	var production = document.createElement("div");
	production.setAttribute("id", "production_" + building.name);
	production.setAttribute("class", "production");
	production.innerHTML = building.getProduction();
	//buy
	var buy = document.createElement("button");
	buy.setAttribute("id", "buy_" + building.name);
	buy.setAttribute("disabled", true);
	buy.setAttribute("onclick", "buy(" + building.name + ")");
	buy.innerHTML = "buy";
	//amount
	var amount = document.createElement("div");
	amount.setAttribute("id", "amount_" + building.name);
	amount.setAttribute("class", "amount");
	amount.innerHTML = building.getAmount();

	box.appendChild(cost);
	box.appendChild(progres);
	box.appendChild(production);
	box.appendChild(buy);
	box.appendChild(amount);

	return box;
};

var addNewBuilding = function () {
	var name = data.buildings.length;
	var cost = 10 * (data.buildings.length+1);
	var base = 2 * (data.buildings.length+1);
	var building = new TimeBasedBuilding(name, cost, base);
	var bbox = createBuilding(building);
	// add to page
	$('main').appendChild(bbox);
	// add to data
	data.buildings.push(building);
};
//find the right place
