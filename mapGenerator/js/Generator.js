/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var height = 20;
var width = 60;

function initializeMap(){
	
	var map = document.getElementById("map");
	
	var table = document.createElement("table");
	table.setAttribute("border","1");
	
	for (i=0;i<height; i++){
		var row = document.createElement("tr");
		for (j=0;j<width;j++){
			var field = document.createElement("td");
			field.setAttribute("id", i.toString()+"_"+j.toString());
			row.appendChild(field);
		}
		table.appendChild(row);
	}
	if (map.childElementCount===0){
		map.appendChild(table);
	}else{
		map.removeChild(map.childNodes[0]);
		map.appendChild(table);
	}
};

function passThrough(){
	for (i=0;i<height; i++){
		for (j=0;j<width;j++){
			var field = document.getElementById(i.toString()+"_"+j.toString());
			var text = document.createTextNode("#");
			field.appendChild(text);
			color = randomFieldColor();
			field.style.color = color;
			field.style.backgroundColor= color;
		}
	}
};

function randomFieldColor(){
	return '#'+(Math.random()*0xFFFFFF<<0).toString(16);
}