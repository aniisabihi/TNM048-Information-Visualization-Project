import {svg, path, data, colorScale, g} from './mapSetup.js';

function InitalLoadAndDraw(selectedOption){

    // Load external data and boot
    d3.queue()
        .defer(d3.json, "http://enjalot.github.io/wwsd/data/world/world-110m.geojson")
        .defer(d3.csv, "hfi_cc_2018.csv", function(d) {
            data.set(d.ISO_code, +d[selectedOption]);
        }}


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
