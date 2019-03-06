export {generateFillGraphics};
import {dataSetSecondary, dataSet, colorScale, colorScaleSecondary} from './mapSetup.js';

let animationType = "moving-gradient";

$( "#animation-toggle" ).click(function() {
    animationType = "shiny-stripe";
});

function generateFillGraphics(countryId){

    let freedomIndexPrimary = dataSet.get(countryId) || 0;
    let freedomIndexSecondary = dataSetSecondary.get(countryId) || 0;
    let baseColor = colorScale(freedomIndexPrimary);
    let secondaryColor = colorScaleSecondary(freedomIndexSecondary);

    //return 'url(#firegradient)';
    //return createGradient(baseColor, secondaryColor, freedomIndexPrimary, freedomIndexSecondary);
    return createShinyStripe();
}

function createGradient(baseColor, secondaryColor, freedomIndexPrimary, freedomIndexSecondary){
    let mapSvg = ($('svg')[0]);
    let svgNS = mapSvg.namespaceURI;
    let grad  = document.createElementNS(svgNS,'linearGradient');
    let id = 'gradient-' + freedomIndexPrimary + '-' + freedomIndexSecondary;

    //kolla, om id finns, skapa inte nya element!
    grad.setAttribute('id',id);
    grad.setAttribute('gradientTransform', 'rotate(90)');  

    let stops = [
        {offset:'20%', 'stop-color': baseColor},
        {offset:'90%','stop-color': secondaryColor}
      ]
    for (var i=0;i<stops.length;i++){
      let attrs = stops[i];
      let stop = document.createElementNS(svgNS,'stop');
      for (var attr in attrs){
        if (attrs.hasOwnProperty(attr)) stop.setAttribute(attr,attrs[attr]);
      }
      grad.appendChild(stop);
    }

    let animAttrs = {   attributeName: 'x1', dur: freedomIndexSecondary*1000 + 'ms' /*'1000ms'*/, 
                        from: '90%', to: '0%', repeatCount: 'indefinite' }; 

    let anim = document.createElementNS(svgNS,'animate');
    for (var attr in animAttrs){
        if (animAttrs.hasOwnProperty(attr)) anim.setAttribute(attr,animAttrs[attr]);
      }
    grad.appendChild(anim);
    

    let defs = mapSvg.querySelector('defs') ||
                 mapSvg.insertBefore( document.createElementNS(svgNS,'defs'), svg.firstChild);

    defs.appendChild(grad);
    return 'url(#' + id + ')'; 
  }

function createShinyStripe(baseColor, secondaryColor, freedomIndexPrimary, freedomIndexSecondary){
    let mapSvg = ($('svg')[0]);
    let svgNS = mapSvg.namespaceURI;
    let pattern  = document.createElementNS(svgNS,'pattern');
    let id = 'stripes-' + freedomIndexPrimary + '-' + freedomIndexSecondary;

    let w = 7.5;
    let h = 7.5;

    pattern.setAttribute('id', id);
    pattern.setAttribute('patternUnits', 'userSpaceOnUse');
    pattern.setAttribute('patternTransform', 'rotate(45)');
    pattern.setAttribute('width', w);
    pattern.setAttribute('height', h);


  
  
  return 'url(#stripes)';
}