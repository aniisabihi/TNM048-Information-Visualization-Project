export {svg, path, dataSet, colorScale, colorScaleSecondary, dataSetSecondary}

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
let dataSet = d3.map();
let colorScheme = d3.schemeGreens[6];
colorScheme.unshift("#eee")
let colorScale = d3.scaleThreshold()
    .domain([0, 2, 4, 6, 8, 10])
    .range(colorScheme);

let dataSetSecondary = d3.map();
let colorSchemeSecondary = d3.schemeBlues[6];   //Blå
//schemeRdBu Röd-Blå,  schemeRdYlBu Röd gul blå -- https://github.com/d3/d3-scale-chromatic
colorSchemeSecondary.unshift("#eee")
let colorScaleSecondary = d3.scaleThreshold()
    .domain([0, 2, 4, 6, 8, 10])
    .range(colorSchemeSecondary);