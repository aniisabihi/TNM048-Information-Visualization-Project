export {svg, path, data, colorScale, g}

// The svg
let svg = d3.select("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height");

// Map and projection
let projection = d3.geoNaturalEarth()
    .scale(width / 2 / Math.PI)
    .translate([width / 2, height / 2])
var path = d3.geoPath()
    .projection(projection);

// Data and color scale
let data = d3.map();
let colorScheme = d3.schemeGreens[6];
colorScheme.unshift("#eee")
let colorScale = d3.scaleThreshold()
    .domain([0, 2, 4, 6, 8, 10])
    .range(colorScheme);

// Legend
let g = svg.append("g")
    .attr("class", "legendThreshold")
    .attr("transform", "translate(20,20)");
g.append("text")
    .attr("class", "caption")
    .attr("x", 0)
    .attr("y", -6)
    .text("Colorscale of Freedom");
let labels = ['0-1', '2-3', '4-5', '5-6', '7-8', '8-9', '10',];
let legend = d3.legendColor()
    .labels(function (d) { return labels[d.i]; })
    .shapePadding(4)
    .scale(colorScale);
svg.select(".legendThreshold")
    .call(legend);