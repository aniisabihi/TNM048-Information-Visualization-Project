import {buttonTitles} from './buttonData.js';
import {svg, path, dataSet, dataSetSecondary} from './mapSetup.js';
import{generateFillGraphics} from './fillPatterns.js';
export{mappedTitles, LoadAndDraw};
import{DrawButtons} from './ButtonListsSetup.js'


//import {DrawButtons, listButton, listButton2} from './ButtonListsSetup.js';
//export {mappedTitles};

let mappedTitles; 

//Secondary Data set option (temporary - ska väljas)
const selectedOptionSecondary = "pf_ss_disappearances_fatalities";
const selectedOption = "pf_rol_civil";
//On application start
InitalLoad(selectedOption, selectedOptionSecondary);

//Set up buttons
DrawButtons();


//Draw map from data on start, create buttontitles
function InitalLoad(selectedOption, selectedOptionSecondary){

    let gotLines = false;

    /* d3.queue() 
        - Load external data synchronically
        - defer adds things to the queue
        - results from the requests are returned in order they were requested */
    d3.queue()
     .defer(d3.json, "http://enjalot.github.io/wwsd/data/world/world-110m.geojson")
     .defer(d3.csv, "hfi_cc_2018.csv", function(dataFreedom) {

            dataSet.set(dataFreedom.ISO_code, +dataFreedom[selectedOption]);
            dataSetSecondary.set(dataFreedom.ISO_code, +dataFreedom[selectedOptionSecondary]); 
            
            
            //get the headers aka categories to add to buttons in gui, only once
            if(!gotLines){

                let dataHeaders = d3.keys(dataFreedom); //d3.keys(dataFreedom);
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
                 
                //only do once
                gotLines = true;
            }
        }).await(ready); //callback called when every request done
}

//Load data and draw map
function LoadAndDraw(selectedOption){

    //reload data
    d3.queue()
    .defer(d3.json, "http://enjalot.github.io/wwsd/data/world/world-110m.geojson")
    .defer(d3.csv, "hfi_cc_2018.csv", function(d) {
         dataSet.set(d.ISO_code, +d[selectedOption]); 
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
        .attr("fill", function (d){
            // Set the color
            return generateFillGraphics(d.id);
        })
        .attr("d", path);
}