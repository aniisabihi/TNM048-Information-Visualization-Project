export {generateFillGraphics};
import {dataSetSecondary, dataSet, colorScale, colorScaleSecondary} from './mapSetup.js';

function generateFillGraphics(countryId){

    let freedomIndexPrimary = dataSet.get(countryId) || 0;
    let freedomIndexSecondary = dataSetSecondary.get(countryId) || 0;
    let baseColor = colorScale(freedomIndexPrimary);
    let secondaryColor = colorScaleSecondary(freedomIndexSecondary);

    //return 'url(#firegradient)';
    return createGradient(baseColor, secondaryColor, freedomIndexPrimary, freedomIndexSecondary);
}

function createGradient(baseColor, secondaryColor, freedomIndexPrimary, freedomIndexSecondary){
    let mapSvg = ($('svg')[0]);
    let svgNS = mapSvg.namespaceURI;
    let grad  = document.createElementNS(svgNS,'linearGradient');
    let id = 'gradient-' + freedomIndexPrimary + '-' + freedomIndexSecondary;
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
    console.log("kör create gradient");

    return 'url(#' + id + ')'; 
  }