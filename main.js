 // The svg
 var svg = d3.select("svg"),
 width = +svg.attr("width"),
 height = +svg.attr("height");

// Map and projection
var path = d3.geoPath();
var projection = d3.geoNaturalEarth()
 .scale(width / 2 / Math.PI)
 .translate([width / 2, height / 2])
var path = d3.geoPath()
 .projection(projection);

// Data and color scale
var data = d3.map();
var colorScheme = d3.schemeReds[6];
colorScheme.unshift("#eee")
var colorScale = d3.scaleThreshold()
 .domain([1, 2, 4, 6, 8, 10])
 .range(colorScheme);

// Legend
var g = svg.append("g")
 .attr("class", "legendThreshold")
 .attr("transform", "translate(20,20)");
g.append("text")
 .attr("class", "caption")
 .attr("x", 0)
 .attr("y", -6)
 .text("Freedom");
var labels = ['0-1', '2-3', '4-5', '5-6', '7-8', '8-9', '10',];
var legend = d3.legendColor()
 .labels(function (d) { return labels[d.i]; })
 .shapePadding(4)
 .scale(colorScale);
svg.select(".legendThreshold")
 .call(legend);


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
            .defer(d3.json, "http://enjalot.github.io/wwsd/data/world/world-110m.geojson")
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
