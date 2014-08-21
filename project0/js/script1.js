/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var Timer = window.setInterval(function(){tick();}, 1000);

function tick(){
	money+=auto;
	printCurrentRessources();
}

var money = 0;
var auto = 0;

function getMoney(){
	money += 1+auto;
	printCurrentRessources();
};

function printCurrentRessources(){
	document.getElementById("money").innerHTML = money;
	document.getElementById("auto").innerHTML = auto;
};

function calcAutoPrice(){
	return auto*10;
};

function printCurrentPrices(){
	document.getElementById("autoPrice").innerHTML = calcAutoPrice();
};

function getAutomaton(){
	if (money >= calcAutoPrice()){
		money -= calcAutoPrice();
		auto+=1;
		printCurrentPrices();
		printCurrentRessources();
	}
};