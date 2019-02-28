 import {svg, path, data, colorScale, g} from './mapSetup.js';

//BUTTONS
var buttonTitles = ["pf_ss_homicide", 'pf_ss_disappearances_disap'];

// Initialize the button
var dropdownButton = d3.select("#UI")
  .append('select')

// add the options to the button
dropdownButton // Add a button
  .selectAll('myOptions') // Next 4 lines add 6 options = 6 colors
 	.data(buttonTitles)
  .enter()
	.append('option')
  .text(function (d) { return d; }) // text showed in the menu
  .attr("value", function (d) { return d; }) // corresponding value returned by the button


// A function that update the color of the circle
function updateMap(selectedOption) {
        console.log("updating to :" + selectedOption);    
            // Load external data and boot
            d3.queue()
            .defer(d3.json, "world-110m.geojson")
            .defer(d3.csv, "hfi_cc_2018.csv", function(d) { 
                data.set(d.ISO_code, +d[selectedOption]); })
            .await(ready);

            function ready(error, topo) {
            if (error) throw error;

                
            // Draw the map
            svg.append("g")
                .attr("class", "countries")
                .selectAll("path")
                .data(topo.features)
                .enter().append("path")
                .attr("fill", function (d){
                    // Pull data for this country
                    d.selectedOption = data.get(d.id) || 0;
                    // Set the color
                    return colorScale(d.selectedOption);
                })
                .style("fill", function (d){
                    // Pull data for this country
                    d.selectedOption = data.get(d.id) || 0;
                    // Set the color
                    if(d.selectedOption == 10) return "url(#fireGradient)"
                    else if(d.selectedOption == 0) return "url(#circles-2)";
            
                })
                .attr("d", path);
            }

}

// When the button is changed, run the updateChart function
dropdownButton.on("change", function(d) {

    // recover the option that has been chosen
    var selectedOption = d3.select(this).property("value")

    // run the updateChart function with this selected option
    updateMap(selectedOption)
})
