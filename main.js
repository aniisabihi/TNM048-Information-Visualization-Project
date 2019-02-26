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
 .text("Homocide");
var labels = ['0-1', '2-3', '4-5', '5-6', '7-8', '8-9', '10',];
var legend = d3.legendColor()
 .labels(function (d) { return labels[d.i]; })
 .shapePadding(4)
 .scale(colorScale);
svg.select(".legendThreshold")
 .call(legend);

// Load external data and boot
d3.queue()
 .defer(d3.json, "world-110m.geojson")
 .defer(d3.csv, "hfi_cc_2018.csv", function(d) { data.set(d.ISO_code, +d.pf_ss_disappearances_disap); })
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
         d.pf_ss_disappearances_disap = data.get(d.id) || 0;
         // Set the color
         return colorScale(d.pf_ss_disappearances_disap);
     })
     .attr("d", path);
}

 this.tooltip = function(d) {
     //Helper function for including information tool_tip
     // Defining tooltip for hovering points
     var tooltip = d3.select("#tooltip")
     tooltip
         .select("#country")
         .text("Country: " + d.properties.countries)

     tooltip
         .select("#region")
         .text("Region: " + d.properties.region)

     tooltip
         .select("#desapperancess")
         .text("Disappearances: " + d.properties.pf_ss_disappearances_disap)
 }