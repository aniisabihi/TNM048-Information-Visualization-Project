import{mappedTitles, ReloadMap} from './main.js';
import {buttonTitles} from './buttonData.js';
export {DrawButtons,  primaryTitle, secondaryTitle, primaryID, secondaryID} //listButton, listButton2,
import {year} from "./Timeline.js";

// Initialize button
let listButton = d3.select("#UI2")
let listButton2 = d3.select("#UI3")

//Default values, used on InitialLoad
let primaryTitle = "State control over Internet access";
let secondaryTitle = "Political pressures and controls on media content";
let primaryID = "pf_expression_internet";
let secondaryID = "pf_expression_control";

function buttonClick(){

    //Button is in primary list 
    if(d3.select(this).attr("class") == "button1"){
        primaryTitle = d3.select(this).property("value");
        primaryID = mappedTitles.get(primaryTitle);

        //deselect other buttons
        d3.selectAll(".button1").style("background-color", "#f1f1f1")
        console.log("updating to parameter:" + primaryID);
    }
    else  { //Button is in secondary list
        secondaryTitle = d3.select(this).property("value");
        secondaryID = mappedTitles.get(secondaryTitle);

        //deselect other buttons
        d3.selectAll(".button2").style("background-color", "#f1f1f1")
        console.log("updating to parameter:" + secondaryID);
    }  
   
    //select clicked button
    if(d3.select(this).attr("class") == "button1"){
        d3.select(this).style("background-color", "plum");
    }
    else{
        d3.select(this).style("background-color", "palevioletred");
    }
    ReloadMap(primaryID, secondaryID, year);
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

    d3.selectAll(".button1").style("background-color", "#f1f1f1")
    d3.selectAll(".button2").style("background-color", "#f1f1f1")
}
  
