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


//BUTTONS LIST
var buttonTitles = [];
// Initialize button
var listButton = d3.select("#UI2")

//On application start
InitalLoadAndDraw("pf_rol_procedural");


//Draw map from data on start, create buttontitles
function InitalLoadAndDraw(selectedOption){

    var gotLines = false;

     // Load external data and boot
     d3.queue()
     .defer(d3.json, "http://enjalot.github.io/wwsd/data/world/world-110m.geojson")
     .defer(d3.csv, "hfi_cc_2018.csv", function(d) { 
        data.set(d.ISO_code, +d[selectedOption]); 
        
        //get the headers aka categories to add to buttons in gui, only once
        if(!gotLines){   
            var dataHeaders = d3.keys(d);
        
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
              
                var selectedOption = d3.select(this).property("value")

                console.log("updating to :" + selectedOption);
         
                // When the button is changed, redraw the map according to selected option
                LoadAndDraw(selectedOption)
            })       

            gotLines = true;
        }
    }).await(ready);

     
     function ready(error, topo){
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
         .attr("d", path);
     }
     
}

//Load data and draw map
function LoadAndDraw(selectedOption){

    // Load external data and boot
    d3.queue()
    .defer(d3.json, "http://enjalot.github.io/wwsd/data/world/world-110m.geojson")
    .defer(d3.csv, "hfi_cc_2018.csv", function(d) { 
            data.set(d.ISO_code, +d[selectedOption]); })
    .await(ready);

    function ready(error, topo) {
        if (error) throw error;
   
           //console.log(data.columns);
   
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
            .attr("d", path);
        }

}

