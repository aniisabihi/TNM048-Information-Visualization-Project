export {generateFillGraphics, clearFillGraphics};
import {dataSetSecondary, dataSet, colorScale, colorScaleSecondary} from './mapSetup.js';

let animationType = "moving-gradient";

$( "#animation-toggle" ).click(function() {
    animationType = "shiny-stripe";
});

function clearFillGraphics(){
  let defs = $('#fill-defs');
  defs.empty();
}
function generateFillGraphics(countryId){

    let freedomIndexPrimary = dataSet.get(countryId) || 0;
    let freedomIndexSecondary = dataSetSecondary.get(countryId) || 0;
    let baseColor = colorScale(freedomIndexPrimary);
    let secondaryColor = colorScaleSecondary(freedomIndexSecondary);

    //return 'url(#firegradient)';
    //return 'url(#stripes-0-0)';
    //return createGradient(baseColor, secondaryColor, freedomIndexPrimary, freedomIndexSecondary);
    return createShinyStripe(baseColor, secondaryColor, freedomIndexPrimary, freedomIndexSecondary);
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

    let dim = 7.5;

    pattern.setAttribute('id', id);
    pattern.setAttribute('patternUnits', 'userSpaceOnUse');
    pattern.setAttribute('width', dim);
    pattern.setAttribute('height', dim);

    let animTrans  = document.createElementNS(svgNS,'animateTransform');
    animTrans.setAttribute('attributeName', 'patternTransform');
    animTrans.setAttribute('type', 'translate');
    animTrans.setAttribute('from', '0 0');
    animTrans.setAttribute('to', freedomIndexSecondary*10 + ' ' + freedomIndexSecondary*10);
    animTrans.setAttribute('dur', '5s');
    animTrans.setAttribute('repeatCount', 'indefinite');

    pattern.appendChild(animTrans);

    animTrans  = document.createElementNS(svgNS,'animateTransform');
    animTrans.setAttribute('attributeName', 'patternTransform');
    animTrans.setAttribute('type', 'rotate');
    animTrans.setAttribute('from', '45');
    animTrans.setAttribute('to', '45');
    animTrans.setAttribute('additive', 'sum');
    pattern.appendChild(animTrans);

    let line = document.createElementNS(svgNS,'line');
    line.setAttribute('y2', dim);
    line.setAttribute('stroke', secondaryColor);
    line.setAttribute('stroke-width', 3);
    pattern.appendChild(line);

    let defs = mapSvg.querySelector('defs') ||
                 mapSvg.insertBefore( document.createElementNS(svgNS,'defs'), svg.firstChild);

    defs.appendChild(pattern);    
  
  return 'url(#' + id +')';
}