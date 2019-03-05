import{mappedTitles, ReloadMap} from './main.js';
import {buttonTitles} from './buttonData.js';
export {DrawButtons,  primaryTitle, secondaryTitle, primaryID, secondaryID} //listButton, listButton2,

// Initialize button
let listButton = d3.select("#UI2")
let listButton2 = d3.select("#UI3")

//Default values, used on InitialLoad
let primaryTitle = "Disappearances";
let secondaryTitle = "Civil Justice";
let primaryID = "pf_ss_disappearance";
let secondaryID = "pf_rol_civil";

function buttonClick(){
    

    //Button is in primary list 
    if(d3.select(this).attr("class") == "button1"){
        primaryTitle = d3.select(this).property("value");
        primaryID = mappedTitles.get(primaryTitle);

        //deselect other buttons
        d3.selectAll(".button1").style("background-color", "#fff")
        console.log("updating to parameter:" + primaryID);
    }
    else  { //Button is in secondary list
        secondaryTitle = d3.select(this).property("value");
        secondaryID = mappedTitles.get(secondaryTitle);

        //deselect other buttons
        d3.selectAll(".button2").style("background-color", "#fff") 
        console.log("updating to parameter:" + secondaryID);
    }  
   
    //select clicked button
    d3.select(this).style("background-color", "plum")
    ReloadMap(primaryID, secondaryID);

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
  
