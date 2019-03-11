export {generateFillGraphics, clearFillGraphics};
import {dataSetSecondary, dataSet, colorScale, colorScaleSecondary} from './mapSetup.js';




function clearFillGraphics(){
  let defs = $('#fill-defs');
  defs.empty();
}
function generateFillGraphics(countryId, animationType){

    let freedomIndexPrimary = dataSet.get(countryId) || -1;
    let freedomIndexSecondary = dataSetSecondary.get(countryId) || -1;

    let baseColor = colorScale(freedomIndexPrimary);
    let secondaryColor = colorScaleSecondary(freedomIndexSecondary);


    if(freedomIndexPrimary == -1){
      baseColor = "#EAEAEA"; //make grey if no data
    }
    if(freedomIndexSecondary == -1){
      secondaryColor = "#EAEAEA";
    }

    
    if(animationType == 1) return createShinyStripe(baseColor, secondaryColor, freedomIndexPrimary, freedomIndexSecondary);
    else if (animationType == 2) return createGradient(baseColor, secondaryColor, freedomIndexPrimary, freedomIndexSecondary);
    else if (animationType == 3) return createCirclePattern1(baseColor, secondaryColor, freedomIndexPrimary, freedomIndexSecondary);
    else if (animationType == 4) return createCirclePattern2(baseColor, secondaryColor, freedomIndexPrimary, freedomIndexSecondary);
    else return 'url(#firegradient)';
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
        {offset:'0%', 'stop-color': baseColor},
        {offset:'100%','stop-color': secondaryColor}
      ]
    for (var i=0;i<stops.length;i++){
      let attrs = stops[i];
      let stop = document.createElementNS(svgNS,'stop');
      for (var attr in attrs){
        if (attrs.hasOwnProperty(attr)) stop.setAttribute(attr,attrs[attr]);
      }
      grad.appendChild(stop);
    }

    let animAttrs = {   attributeName: 'x1', dur: '800ms' /*'1000ms'*/, 
                        from: freedomIndexSecondary*10 + '%', to: '0%', repeatCount: 'indefinite' }; 

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

function createCirclePattern1(baseColor, secondaryColor, freedomIndexPrimary, freedomIndexSecondary){
  let mapSvg = ($('svg')[0]);
    let svgNS = mapSvg.namespaceURI;
    let pattern  = document.createElementNS(svgNS,'pattern');
    let id = 'circles-' + freedomIndexPrimary + '-' + freedomIndexSecondary;

    let dim = 5;

    pattern.setAttribute('id', id);
    pattern.setAttribute('patternUnits', 'userSpaceOnUse');
    pattern.setAttribute('width', dim);
    pattern.setAttribute('height', dim);

    let circle  = document.createElementNS(svgNS,'circle');
    circle.setAttribute('cx', 2);
    circle.setAttribute('cy', 2);
    circle.setAttribute('r', 1);
    circle.setAttribute('style', 'stroke: none; fill: ' + secondaryColor);

    pattern.appendChild(circle);

    let animate  = document.createElementNS(svgNS,'animate');
    animate.setAttribute('attributeName', 'r');
    animate.setAttribute('calcmode', 'spline');
    animate.setAttribute('keySplines', '0.3 0 0.7 1;0.3 0 0.7 1');
    animate.setAttribute('to', '45');
    animate.setAttribute('values', '1;5;1');
    animate.setAttribute('keyTimes', '0;0.5;1');
    animate.setAttribute('dur', '5s');
    animate.setAttribute('repeatCount', 'indefinite');

    circle.appendChild(animate);


    let defs = mapSvg.querySelector('defs') ||
                 mapSvg.insertBefore( document.createElementNS(svgNS,'defs'), svg.firstChild);

    defs.appendChild(pattern);   
  return 'url(#' + id + ')'; 
}

function createCirclePattern2(baseColor, secondaryColor, freedomIndexPrimary, freedomIndexSecondary){
  let mapSvg = ($('svg')[0]);
    let svgNS = mapSvg.namespaceURI;
    let pattern  = document.createElementNS(svgNS,'pattern');
    let id = 'circles-' + freedomIndexPrimary + '-' + freedomIndexSecondary;

    let dim = 5;

    pattern.setAttribute('id', id);
    pattern.setAttribute('patternUnits', 'userSpaceOnUse');
    pattern.setAttribute('width', dim);
    pattern.setAttribute('height', dim);

    let circle  = document.createElementNS(svgNS,'circle');
    circle.setAttribute('cx', 2);
    circle.setAttribute('cy', 2);
    circle.setAttribute('r', 1);
    circle.setAttribute('style', 'stroke: none; fill: blue');

    pattern.appendChild(circle);

    let animate  = document.createElementNS(svgNS,'animate');
    animate.setAttribute('attributeName', 'r');
    //animate.setAttribute('calcmode', 'spline');
    //animate.setAttribute('keySplines', '0.3 0 0.7 1;0.3 0 0.7 1');
    animate.setAttribute('values', '1;5;1');
    animate.setAttribute('keyTimes', '0;0.5;1');
    animate.setAttribute('dur', 10/freedomIndexSecondary + 's');
    animate.setAttribute('repeatCount', 'indefinite');

    circle.appendChild(animate);


    let defs = mapSvg.querySelector('defs') ||
                 mapSvg.insertBefore( document.createElementNS(svgNS,'defs'), svg.firstChild);

    defs.appendChild(pattern);   
  return 'url(#' + id + ')'; 
}