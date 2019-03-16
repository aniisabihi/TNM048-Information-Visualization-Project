export {svg, path, dataSet, colorScale, colorScaleSecondary, dataSetSecondary}


// The svg
let svg = d3.select("svg");
let width = +d3.select('#UI1').style('width').slice(0, -2);
let height = +d3.select('#UI1').style('height').slice(0, -2);

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

d3.select(window).on('load', resize);
d3.select(window).on('resize', resize);

function resize() { //responsiveness on window change

    let width = +d3.select('#UI1').style('width').slice(0, -2);
    let height = +d3.select('#UI1').style('height').slice(0, -2);
    width = width*1.1;
    height = height*1.1;
  

   projection
   .scale(width / 2 / Math.PI)
   	.translate([width / 2.2, height / 2]);
    
   d3.select("svg").attr("width",width).attr("height",height);
   d3.selectAll("path").attr('d', path);

}