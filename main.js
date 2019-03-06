import {buttonTitles} from './buttonData.js';
import {svg, path, dataSet, dataSetSecondary} from './mapSetup.js';
import{generateFillGraphics} from './fillPatterns.js';
export{mappedTitles, ReloadMap};
import{DrawButtons, primaryTitle, secondaryTitle, primaryID, secondaryID} from './ButtonListsSetup.js'
import { drawCustomLegend } from './createLegends.js';


let mappedTitles; 
let totFreedomSet = d3.map();
let totFreedomID = "hf_score";

//On application start
InitalLoad(primaryID, secondaryID, totFreedomID); //has default value from ButtonListSetup.js

//Set up buttons
DrawButtons();

//Tooltip test
var tooltip = d3.select("body").append("div") 
        .attr("class", "tooltip")       
        .style("opacity", 0);

//Draw map from data on start, create <buttonTitles,buttonIDS> Map
function InitalLoad(primaryID, secondaryID, totFreedomID) {

    let gotLines = false;

    /* d3.queue() 
        - Load external data synchronically
        - defer adds things to the queue
        - results from the requests are returned in order they were requested */
    d3.queue()
     .defer(d3.json, "http://enjalot.github.io/wwsd/data/world/world-110m.geojson")
     .defer(d3.csv, "hfi_cc_2018.csv", function(d) {

            totFreedomSet.set(d.ISO_code, +d[totFreedomID]);
            dataSet.set(d.ISO_code, +d[primaryID]);
            dataSetSecondary.set(d.ISO_code, +d[secondaryID]); 
                   
            //get the headers aka categories to add to buttons in gui, only once
            if (!gotLines) {

                let dataHeaders = d3.keys(d);
                let buttonIDs = []; 

                //store header titles
                dataHeaders.forEach(function(item, index){
                    if(index >= 4){
                        buttonIDs.push(item);
                    }
                });

                console.log("buttonIDs: ", buttonIDs);

                //Zip the IDs and buttonTitles
                let mappedTitlesArray = buttonTitles.map(function(ID, i) {
                    return [ID, buttonIDs[i]];  
                });
                
                //Make array into Map with <key, valye> pairs
                mappedTitles = new Map(mappedTitlesArray); 
                 
                gotLines = true;
            }

        }).await(ready); //callback called when every request done
}

//Load data and draw map
function ReloadMap(primaryID, secondaryID) {

    //reload data
    d3.queue()
    .defer(d3.json, "http://enjalot.github.io/wwsd/data/world/world-110m.geojson")
    .defer(d3.csv, "hfi_cc_2018.csv", function(d) {
         dataSet.set(d.ISO_code, +d[primaryID]); 
         dataSetSecondary.set(d.ISO_code, +d[secondaryID]);
    }).await(ready);

}


function ready(error, jsonData){
    
    if (error) throw error;

        // Draw the map
        svg.append("g")
        .attr("class", "countries")
        .selectAll("path")
        .data(jsonData.features)
        .enter().append("path")
        .attr("fill", function (d) {
            //Fill map with color
            return generateFillGraphics(d.id);
        })
        .attr("d", path)
        .on("mouseover", function(d) { //show facts about country on hover
            tooltip.transition()    
            .duration(200)    
            .style("opacity", 0.9);    
            tooltip.html("<b>" + d.properties.name + "</b>" + "<br>" + primaryTitle + ": " 
            + displayIndex(d, dataSet) + "<br>" + secondaryTitle + ": "
            + displayIndex(d, dataSetSecondary) + "<br> Total Freedom: " 
            + parseFloat(totFreedomSet.get(d.id).toFixed(2)))
            .style("left", (d3.event.pageX) + "px")   
            .style("top", (d3.event.pageY - 28) + "px");
          })          
          .on("mouseout", function(d) {   
            tooltip.transition()    
            .duration(500)    
            .style("opacity", 0); 
          });

    //Create legend
    drawCustomLegend(primaryTitle, secondaryTitle);
}

//Rounds index to 2 decimals and handles unavailable data on display
function displayIndex(data, theDataSet) {

    if(!theDataSet.get(data.id)){ //data undefined
        return "No data";
    }
    else {
        return parseFloat(theDataSet.get(data.id).toFixed(2)); 
    }
}
