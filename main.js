import {svg, path, data, dataSetSecondary} from './mapSetup.js';
import{generateFillGraphics} from './fillPatterns.js';


//BUTTONS LIST
let buttonTitles = [];
// Initialize button
let listButton = d3.select("#UI2")
let listButton2 = d3.select("#UI3")

//On application start
InitalLoadAndDraw("pf_ss_disappearances_disap");

//Secondary Data set option (temporary - ska väljas)
const selectedOptionSecondary = "pf_ss_disappearances_fatalities";

//Draw map from data on start, create buttontitles
function InitalLoadAndDraw(selectedOption){

    let gotLines = false;

    // Load external data and boot
    d3.queue()
        .defer(d3.json, "http://enjalot.github.io/wwsd/data/world/world-110m.geojson")
        .defer(d3.csv, "hfi_cc_2018.csv", function(d) {
            data.set(d.ISO_code, +d[selectedOption]);
            dataSetSecondary.set(d.ISO_code, +d[selectedOptionSecondary]);
            //get the headers aka categories to add to buttons in gui, only once
            if(!gotLines){

                let dataHeaders = d3.keys(d);

                //store header titles related to index in buttonTitles
                dataHeaders.forEach(function(item, index) {
                    if(index >= 4){
                        buttonTitles.push(item);
                    }
                });

                console.log("buttonTitles:", buttonTitles);

                // add the options to the button
                listButton
                    .selectAll("myOptions")
                    .data(buttonTitles).enter()
                    .append("option")
                    .attr("type","button")
                    .attr("class","button")
                    .text(function (d) { return d; }) // text showed in the menu
                    .attr("value", function (d) {return d;})
                    .on("click", function() {  // recover the option that has been chosen

                        let selectedOption = d3.select(this).property("value")

                        console.log("updating to :" + selectedOption);

                        // When the button is changed, redraw the map according to selected option
                        LoadAndDraw(selectedOption)
                    })

                // add the options to the button
                listButton2
                    .selectAll("myOptions")
                    .data(buttonTitles).enter()
                    .append("option")
                    .attr("type","button")
                    .attr("class","button")
                    .text(function (d) { return d; }) // text showed in the menu
                    .attr("value", function (d) {return d;})
                    .on("click", function() {  // recover the option that has been chosen

                        let selectedOption = d3.select(this).property("value")

                        console.log("updating to :" + selectedOption);

                        // When the button is changed, redraw the map according to selected option
                        LoadAndDraw(selectedOption)
                    })

                gotLines = true;
            }
        }).await(ready);
}

//Load data and draw map
function LoadAndDraw(selectedOption){

    // Load external data and boot
    d3.queue()
        .defer(d3.json, "http://enjalot.github.io/wwsd/data/world/world-110m.geojson")
        .defer(d3.csv, "hfi_cc_2018.csv", function(d) {
            data.set(d.ISO_code, +d[selectedOption]); })
        .await(ready);

}

function ready(error, topo) {
    if (error) throw error;

    //second data set
    
    
    // Draw the map
    svg.append("g")
        .attr("class", "countries")
        .selectAll("path")
        .data(topo.features)
        .enter().append("path")
        .attr("fill", function (d){
            // Set the color
            return generateFillGraphics(d.id);
        })
        .attr("d", path);
}
