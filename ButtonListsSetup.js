import{mappedTitles, LoadAndDraw} from './main.js';
import {buttonTitles} from './buttonData.js';
export {DrawButtons, listButton, listButton2}

// Initialize button
let listButton = d3.select("#UI2")
let listButton2 = d3.select("#UI3")
let lastClicked;

function buttonClick(){
    let selectedTitle = d3.select(this).property("value");
    let selectedID = mappedTitles.get(selectedTitle);
       
    console.log("updating to parameter:" + selectedID);

    if(d3.select(this).attr("class") == "button1"){
        d3.selectAll(".button1").style("background-color", "#fff")
    }
    else  {
        d3.selectAll(".button2").style("background-color", "#fff") 
    }  
   
    d3.select(this).style("background-color", "plum")
   
    // When the button is changed, redraw the map according to selected option
    LoadAndDraw(selectedID);

}


function DrawButtons(){

    // add the options to the button
    listButton
    .selectAll("myOptions")
    .data(buttonTitles).enter()
    .append("option")
    .attr("type","button")
    .attr("class","button1")
    .text(function (d) { return d; }) // text showed in the menu
    .attr("value", function (d) {return d;})
    .style("cursor", "pointer")
    .on("click", buttonClick); // recover the option that has been chosen

   
    // add the options to the button
    listButton2
    .selectAll("myOptions")
    .data(buttonTitles).enter()
    .append("option")
    .attr("type","button")
    .attr("class","button2")
    .text(function (d) { return d; }) // text showed in the menu
    .attr("value", function (d) {return d;})
    .on("click",  buttonClick);

    d3.selectAll(".button1").style("background-color", "#fff")
    d3.selectAll(".button2").style("background-color", "#fff")
    
}
  
