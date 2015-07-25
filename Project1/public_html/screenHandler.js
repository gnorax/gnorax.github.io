/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global  TimeBasedBuilding*/

var createBuilding = function (building) {
	if (!building instanceof TimeBasedBuilding) {
		throw "Exception";
	}
	// add a div for the new building
	// add different divs inside

	//main box
	var box = document.createElement("div");
	box.setAttribute("id", building.name);

	//cost
	var cost = document.createElement("div");
	cost.setAttribute("id", "cost_" + building.name);
	cost.innerHTML = building.getCost();
	//progess
	var progres = document.createElement("progress");
	progres.setAttribute("id", "progess_" + building.name);
	progres.setAttribute("value", getMoney());
	progres.setAttribute("max", building.getCost());
	//production
	var production = document.createElement("div");
	production.setAttribute("id", "production_" + building.name);
	production.innerHTML = building.getProduction();
	//buy
	var buy = document.createElement("button");
	buy.setAttribute("id", "buy_" + building.name);
	buy.setAttribute("onclick", building.add);
	buy.innerHTML = "buy";
	//amount
	var amount = document.createElement("div");
	amount.setAttribute("id", "amount_" + building.name);
	amount.innerHTML = building.getAmount();

	box.appendChild(cost);
	box.appendChild(progres);
	box.appendChild(production);
	box.appendChild(buy);
	box.appendChild(amount);

	return box;
};

//find the right place
