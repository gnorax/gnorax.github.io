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
	inflation: 0
};

var setMoney = function (i) {
	data.money = i;
	printMoney();
};
var getMoney = function () {
	return data.money;
};
var printMoney = function () {
	var ids = ["money"];
	for (var i = 0; i < ids.length; i++) {
		var id = ids[i];
		$(id).innerHTML = getMoney();
	}
	$("box1_progress").value=getMoney();
};
var setProduction = function (i) {
	data.production = i;
	printProduction();
};
var getProduction = function () {
	return data.production;
};
var printProduction = function () {
	var ids = ["production"];
	for (var i = 0; i < ids.length; i++) {
		var id = ids[i];
		$(id).innerHTML = getProduction();
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
	setMoney(getMoney() + getProduction());
	applyInflation();
};

var applyInflation = function () {

};