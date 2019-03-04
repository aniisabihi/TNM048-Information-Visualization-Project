import { buttonTitles } from './buttonData.js';
import { svg, path, data, dataSetSecondary } from './mapSetup.js';
import { generateFillGraphics } from './fillPatterns.js';
import { drawCustomLegend } from './createLegends.js';

var categoryMap = new Map();

// setting the values (but do this for all values in buttonTitles and data)
categoryMap.set("keystring", "value associated with 'keystring'");

//BUTTONS LIST
var buttonIDs = []; //initialized in InitalLoadAndDraw
// Initialize button
let listButton = d3.select("#UI2")
let listButton2 = d3.select("#UI3")

//Secondary Data set option
let selectedOptionSecondary = "pf_ss_disappearances_fatalities";
let primaryOption = "Procedural justice";
let secondaryOption = "Disapperances";

//On application start
InitalLoadAndDraw(primaryOption);


//Draw map from data on start, create buttontitles
function InitalLoadAndDraw(selectedOption) {

    let gotLines = false;

    // Load external data asynchronically and boot

    /* d3.queue() 
        - defer adds things to the queue
        - await, callback called when everything is complete
        - results from the requests are returned in order they were requested */
    d3.queue()
        .defer(d3.json, "http://enjalot.github.io/wwsd/data/world/world-110m.geojson")
        .defer(d3.csv, "hfi_cc_2018.csv", function (d) {
            data.set(d.ISO_code, +d[selectedOption]);
            dataSetSecondary.set(d.ISO_code, +d[selectedOptionSecondary]);
            //get the headers aka categories to add to buttons in gui, only once
            if (!gotLines) {

                let dataHeaders = d3.keys(d);

                //store header titles related to index in buttonTitles
                dataHeaders.forEach(function (item, index) {
                    if (index >= 4) {
                        buttonIDs.push(item);
                    }
                });

                //Map IDs to buttontitles
                var mappedTitlesArray = buttonTitles.map(function (ID, i) {
                    return [ID, buttonIDs[i]];
                });

                var mappedTitles = new Map(mappedTitlesArray);

                console.log("map :", mappedTitles);

                // add the options to the button
                listButton
                    .selectAll("myOptions")
                    .data(buttonTitles).enter()
                    .append("option")
                    .attr("type", "button")
                    .attr("class", "button")
                    .text(function (d) { return d; }) // text showed in the menu
                    .attr("value", function (d) { return d; })
                    .style("cursor", "pointer")
                    .on("click", function () {  // recover the option that has been chosen

                        var selectedTitle = d3.select(this).property("value");
                        var selectedID = mappedTitles.get(selectedTitle);
                        primaryOption = selectedTitle;
                        console.log("updating to : " + selectedID);

                        // When the button is changed, redraw the map according to selected option
                        LoadAndDraw(selectedID, selectedOptionSecondary);
                    })

                // add the options to the button
                listButton2
                    .selectAll("myOptions")
                    .data(buttonTitles).enter()
                    .append("option")
                    .attr("type", "button")
                    .attr("class", "button")
                    .text(function (d) { return d; }) // text showed in the menu
                    .attr("value", function (d) { return d; })
                    .on("click", function () {  // recover the option that has been chosen

                        let selectedTitle = d3.select(this).property("value")
                        // ska ej rita om 
                        //var selectedID = mappedTitles.get(selectedTitle);

                        selectedOptionSecondary = selectedID;
                        secondaryOption = selectedTitle;
                        console.log("updating to : " + selectedID);

                        //bgcolor
                        d3.select(this).style("background-color", "#fff")

                        // When the button is changed, redraw the map according to selected option
                        LoadAndDraw(selectedID, selectedOptionSecondary)
                        this.style.borderStyle;
                    })

                //first draw
                let selectedID = mappedTitles.get(selectedOption);
                console.log("updating to :" + selectedID);
                LoadAndDraw(selectedID, selectedOptionSecondary)
                gotLines = true;
            }
        }).await(ready);
}

//Load data and draw map
function LoadAndDraw(selectedOption, selectedOptionSecondary) {

    // Load external data and boot
    d3.queue()
        .defer(d3.json, "http://enjalot.github.io/wwsd/data/world/world-110m.geojson")
        .defer(d3.csv, "hfi_cc_2018.csv", function (d) {
            data.set(d.ISO_code, +d[selectedOption]);
            dataSetSecondary.set(d.ISO_code, +d[selectedOptionSecondary]);
        })
        .await(ready);

}

function ready(error, topo) {
    if (error) throw error;

    // Draw the map
    svg.append("g")
        .attr("class", "countries")
        .selectAll("path")
        .data(topo.features)
        .enter().append("path")
        .attr("fill", function (d) {
            //Fill map with color
            return generateFillGraphics(d.id);
        })
        .attr("d", path);

    //Create legend
    drawCustomLegend(primaryOption, secondaryOption);
}

