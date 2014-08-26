/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function goToClickerScreen(){
	hideAll();
	document.getElementById('ClickerScreen').style.display = "block";
}
function goToBuildingScreen(){
	hideAll();
	document.getElementById('BuildingScreen').style.display = "block";
}
function goToUpgradeScreen(){
	hideAll();
	document.getElementById('UpgradeScreen').style.display = "block";
}

function hideAll(){
	document.getElementById('ClickerScreen').style.display = "none";
	document.getElementById('BuildingScreen').style.display = "none";
	document.getElementById('UpgradeScreen').style.display = "none";
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
			var button = generateTBBButton(i);
			element.appendChild(button);
//			console.log(button);
//			console.log(element);
		}
	document.getElementById("BuildingScreen").appendChild(element);
	
	printButtonText();
};

function generateTBBButton(i){
	var divBox = document.createElement("li");
//	divBox.setAttribute("title", "something");
	divBox.setAttribute("id", "buyButtonTBB"+i.toString());
	divBox.setAttribute("class", "buyBox");
	
	var name = document.createElement("span");
	name.setAttribute("id", "nameTBB"+i.toString());
	var textNode = document.createTextNode("name");
	name.appendChild(textNode);
	divBox.appendChild(name);
	
	var br = document.createElement("br");
	divBox.appendChild(br);	
	
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
	document.getElementById("money").innerHTML = niceNumbers(game.money);
	document.getElementById("moneyPerSecond").innerHTML = niceNumbers(game.moneyPerSecond);
	document.getElementById("inflation").innerHTML = niceNumbers(game.inflation);
	printButtonText();
};

function printAll(){
	printCurrentRessources();
	printInflation();
};

function printInflation(){
	if (game.inflationBuildings.length !== 1){
		throw "Not just 1 Type of inflation buildings";
	}
	var infBuilding = game.inflationBuildings[0];
	document.getElementById("inflationCost").innerHTML = niceNumbers(infBuilding.currentCost);
	document.getElementById("inflationAmount").innerHTML = niceNumbers(infBuilding.amount);
	document.getElementById("halfLife").innerHTML = niceNumbers(infBuilding.halfLife);
};

function printButtonText(){
	for (var i in game.timeBasedBuildings){
		var costTBB = document.getElementById("nameTBB"+i.toString());
		if (costTBB !==null){
			costTBB.innerHTML = game.timeBasedBuildings[i].name;
		}
		var costTBB = document.getElementById("costTBB"+i.toString());
		if (costTBB !==null){
			costTBB.innerHTML = "cost: " + niceNumbers(game.timeBasedBuildings[i].currentCost);
		}
		costTBB = document.getElementById("amountTBB"+i.toString());
		if (costTBB !==null){
			costTBB.innerHTML = "amount: " + niceNumbers(game.timeBasedBuildings[i].amount);
		}
		costTBB = document.getElementById("productionTBB"+i.toString());
		if (costTBB !==null){
			costTBB.innerHTML = "production: " + niceNumbers(game.timeBasedBuildings[i].baseProduction);
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
	var digits = 3;
	
	var e10=0;
	while(number>=1000){
		e10+=3;
		number/=1000;
	}
	number *= Math.pow(10, digits);
	number = Math.floor(number) / Math.pow(10, digits);
	
	var ret = number.toString();
	if (e10!==0){
		 ret += " e"+e10.toString();
	}
	return ret;
};