/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function goToClickerScreen(){
	hideAll();
	document.getElementById('ClickerScreen').style.visibility = "visible";
	document.getElementById('ClickerScreen').style.width = "auto";
	document.getElementById('ClickerScreen').style.height = "auto";
}
function goToBuildingScreen(){
	hideAll();
	document.getElementById('BuildingScreen').style.visibility = "visible";
	document.getElementById('BuildingScreen').style.width = "auto";
	document.getElementById('BuildingScreen').style.height = "auto";
}
function goToUpgradeScreen(){
	hideAll();
	document.getElementById('UpgradeScreen').style.visibility = "visible";
	document.getElementById('UpgradeScreen').style.width = "auto";
	document.getElementById('UpgradeScreen').style.height = "auto";
}

function hideAll(){
	document.getElementById('ClickerScreen').style.visibility = "hidden";
	document.getElementById('ClickerScreen').style.width = "0";
	document.getElementById('ClickerScreen').style.height = "0";
	document.getElementById('BuildingScreen').style.visibility = "hidden";
	document.getElementById('BuildingScreen').style.width = "0";
	document.getElementById('BuildingScreen').style.height = "0";
	document.getElementById('UpgradeScreen').style.visibility = "hidden";
	document.getElementById('UpgradeScreen').style.width = "0";
	document.getElementById('UpgradeScreen').style.height = "0";
}

function printButtons(){
	var oldElement = document.getElementById("removeMe");
	if (oldElement!==null){
		document.getElementById("BuildingScreen").removeChild(oldElement);
	}else{
		console.log(oldElement +" could not be removed");
	}
		
	var element = document.createElement("div");
	element.setAttribute("id", "removeMe");
	for (var i in game.timeBasedBuildings){
			var button = generateButton(i);
			element.appendChild(button);
//			console.log(button);
//			console.log(element);
		}
	document.getElementById("BuildingScreen").appendChild(element);
	
	printButtonText();
};

function generateButton(i){
	var divBox = document.createElement("li");
//	divBox.setAttribute("title", "something");
	divBox.setAttribute("id", "buyButtonTBB"+i.toString());
	divBox.setAttribute("class", "buyBox");
	
	var buyCost = document.createElement("span");
	buyCost.setAttribute("id", "costTBB"+i.toString());
	var textNode = document.createTextNode("current cost");
	buyCost.appendChild(textNode);
	divBox.appendChild(buyCost);
	
	var br = document.createElement("br");
	divBox.appendChild(br);
	
	var amount = document.createElement("span");
	amount.setAttribute("id", "amountTBB"+i.toString());
	var textNode = document.createTextNode("amount");
	amount.appendChild(textNode);
	divBox.appendChild(amount);
	
	var br = document.createElement("br");
	divBox.appendChild(br);
	
	var amount = document.createElement("span");
	amount.setAttribute("id", "productionTBB"+i.toString());
	var textNode = document.createTextNode("production");
	amount.appendChild(textNode);
	divBox.appendChild(amount);
	
	var br = document.createElement("br");
	divBox.appendChild(br);
	
	var newButton = document.createElement("button");
	newButton.setAttribute("onclick", "buyTBB("+i+")");
	var node = document.createTextNode("buy TBB "+i);
	newButton.appendChild(node);
	divBox.appendChild(newButton);
	divBox.style.width = "30%";
	divBox.style.border = "black solid 2px";
	return divBox;
};


function printCurrentRessources(){
	document.getElementById("money").innerHTML = game.money;
	document.getElementById("moneyPerSecond").innerHTML = game.moneyPerSecond;
	document.getElementById("inflation").innerHTML = game.inflation;
	printButtonText();
};

function printAll(){
	printCurrentRessources();
}

function printButtonText(){
	for (var i in game.timeBasedBuildings){
		var costTBB = document.getElementById("costTBB"+i.toString());
		if (costTBB !==null){
			costTBB.innerHTML = "cost: " + game.timeBasedBuildings[i].currentCost.toString();
		}
		costTBB = document.getElementById("amountTBB"+i.toString());
		if (costTBB !==null){
			costTBB.innerHTML = "amount: " + game.timeBasedBuildings[i].amount.toString();
		}
		costTBB = document.getElementById("productionTBB"+i.toString());
		if (costTBB !==null){
			costTBB.innerHTML = "production: " + game.timeBasedBuildings[i].baseProduction.toString();
		}
	}
};

/*
 * creates a nicely formated string from a number
 * 
 * @param number
 * @returns string
 */
function niceNumbers(number){
	var digits = 2;
	
	var e10=0;
	while(number>1000){
		e10++;
		number/=1000;
	}
	number *= Math.pow(10, digits);
	number = Math.floor(number) / Math.pow(10, digits);
	
	return number.toString()+"e"+e10.toString();
};