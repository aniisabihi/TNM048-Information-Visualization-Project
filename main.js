import {buttonTitles} from './buttonData.js';
import {svg, path, dataSet, dataSetSecondary} from './mapSetup.js';
import{generateFillGraphics} from './fillPatterns.js';
export{mappedTitles, ReloadMap};
import{DrawButtons, primaryTitle, secondaryTitle, primaryID, secondaryID} from './ButtonListsSetup.js'
import { drawCustomLegend } from './createLegends.js';


let mappedTitles; 

//On application start
InitalLoad(primaryID, secondaryID); //has default value from ButtonListSetup.js

//Set up buttons
DrawButtons();

//Draw map from data on start, create <buttonTitles,buttonIDS> Map
function InitalLoad(primaryID, secondaryID) {

    let gotLines = false;

    /* d3.queue() 
        - Load external data synchronically
        - defer adds things to the queue
        - results from the requests are returned in order they were requested */
    d3.queue()
     .defer(d3.json, "http://enjalot.github.io/wwsd/data/world/world-110m.geojson")
     .defer(d3.csv, "hfi_cc_2018.csv", function(d) {

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
        .attr("d", path);

    //Create legend
    drawCustomLegend(primaryTitle, secondaryTitle);
}

