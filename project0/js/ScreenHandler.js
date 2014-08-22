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
	for (var i in game.buildings){
			var button = generateButton(i);
			element.appendChild(button);
//			console.log(button);
//			console.log(element);
		}
	document.getElementById("BuildingScreen").appendChild(element);
};

function generateButton(i){
	var newButton = document.createElement("button");
	newButton.setAttribute("onclick", "getAutomaton("+i+")");
	newButton.setAttribute("title", "something");
	var node = document.createTextNode("add "+i);
	newButton.appendChild(node);
	return newButton;
};