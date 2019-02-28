import {svg, path, data, colorScale, g} from './mapSetup.js';


//BUTTONS LIST
let buttonTitles = [];
// Initialize button
let listButton = d3.select("#UI2")

//On application start
InitalLoadAndDraw("pf_ss_disappearances_disap");


//Draw map from data on start, create buttontitles
function InitalLoadAndDraw(selectedOption){

    let gotLines = false;

    // Load external data and boot
    d3.queue()
        .defer(d3.json, "http://enjalot.github.io/wwsd/data/world/world-110m.geojson")
        .defer(d3.csv, "hfi_cc_2018.csv", function(d) {
            data.set(d.ISO_code, +d[selectedOption]);

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

    // Draw the map
    svg.append("g")
        .attr("class", "countries")
        .selectAll("path")
        .data(topo.features)
        .enter().append("path")
        .attr("fill", function (d){
            // Set the color
            return generateFillGraphics(data.get(d.id) || 0);
        })
        .attr("d", path);
}

function generateFillGraphics(dataId){

    let mapSvg = $('svg')[0];
    //console.log(mapSvg);
    let baseColor = colorScale(dataId);

    // Set the color
    //return 'url(#firegradient)';
    return createGradient(mapSvg, baseColor, dataId);
}

function createGradient(svg, baseColor, mapId){
    let svgNS = svg.namespaceURI;
    let grad  = document.createElementNS(svgNS,'linearGradient');
    let id = 'gradient-' + mapId;
    grad.setAttribute('id',id);
    grad.setAttribute('gradientTransform', 'rotate(90)');  

    let stops = [
        {offset:'20%', 'stop-color': baseColor},
        {offset:'90%','stop-color':'blue'}
      ]
    for (var i=0;i<stops.length;i++){
      let attrs = stops[i];
      let stop = document.createElementNS(svgNS,'stop');
      for (var attr in attrs){
        if (attrs.hasOwnProperty(attr)) stop.setAttribute(attr,attrs[attr]);
      }
      grad.appendChild(stop);
    }

    let animAttrs = {   attributeName: 'x1', dur: '1000ms', 
                        from: '90%', to: '0%', repeatCount: 'indefinite' }; 

    let anim = document.createElementNS(svgNS,'animate');
    for (var attr in animAttrs){
        if (animAttrs.hasOwnProperty(attr)) anim.setAttribute(attr,animAttrs[attr]);
      }
    grad.appendChild(anim);
  
    let defs = svg.querySelector('defs') ||
        svg.insertBefore( document.createElementNS(svgNS,'defs'), svg.firstChild);
    defs.appendChild(grad);

    return 'url(#' + id + ')'; 
  }