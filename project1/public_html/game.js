/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

// just like jquery
var $ = function (id) {
	return document.getElementById(id);
};

var data = {
	money: 0,
	production: 0,
	inflation: 0,
	buildings: new Array()
};

var setMoney = function (i) {
	data.money = i;
	printMoney();
};
var decreaseMoney = function (i) {
	assert(getMoney() >= i);
	setMoney(getMoney() - i);
};
var getMoney = function () {
	return data.money;
};
var printMoney = function () {
	$("money").innerHTML = getMoney();
	for (var i = 0; i < data.buildings.length; i++) {
		// update progress
		$("progress_" + i).value = getMoney();
		//update button
		var b = data.buildings[i];
		if (b.getCost() > getMoney()) {
			$("buy_" + i).disabled = true;
		}else{
			$("buy_" + i).disabled = false;
		}


	}
};
var setGlobalProduction = function (i) {
	data.production = i;
	printProduction();
};
var getGlobalProduction = function () {
	return data.production;
};
var printProduction = function () {
	var ids = ["production"];
	for (var i = 0; i < ids.length; i++) {
		var id = ids[i];
		$(id).innerHTML = getGlobalProduction();
	}
};
var setInflation = function (i) {
	data.inflation = i;
	printInflation();
};
var getInflation = function () {
	return data.inflation;
};
var printInflation = function () {
	var ids = ["inflation"];
	for (var i = 0; i < ids.length; i++) {
		var id = ids[i];
		$(id).innerHTML = getInflation();
	}
};


var gamestep = function () {
	setMoney(getMoney() + getGlobalProduction());
	applyInflation();
};

var applyInflation = function () {

};

var buy = function (buildingID) {
//	assert(buildingID instanceof Number);
	var building = data.buildings[buildingID];
	building.add();

	var prod = 0;
	for (var i = 0; i < data.buildings.length; i++) {
		var b = data.buildings[i];
		prod += b.getAmount() * b.getProduction();
	}
	setGlobalProduction(prod);
};


var assert = function (t) {
	if (!t) {
		throw "Exception";
	}
}