import { colorScale, colorScaleSecondary} from './mapSetup.js';
import {generatePatternLegends} from './fillPatterns.js';
export function drawCustomLegend(primaryOption, secondaryOption, animType){
    let labels = ['0-1 (not free)', '2-3', '4-5', '5-6', '7-8', '8-9', '10 (free)'];

    $("#map-legend-primary").empty();
    $("#map-legend-primary").append('<div class="legend-title">'+
                                        primaryOption +'</div>').css({color:'plum'});
    for (var i=0;i<labels.length;i++){
        $("#map-legend-primary").append('<div class="legend-label"></div>');
        let tempLabel = $("#map-legend-primary .legend-label:last-child");
        tempLabel.append('<div class="legend-label-color"></div>')
        tempLabel.append('<div class="legend-label-text"></div>');
        tempLabel.children('.legend-label-color').css('background', colorScale(i*2));
        tempLabel.children(".legend-label-text").last().text(labels[i]);
    }

    $("#map-legend-secondary").empty();
    $("#map-legend-secondary").append('<div class="legend-title">'+
                                        secondaryOption +'</div>').css('color', 'palevioletred');
    for (var i=0;i<labels.length;i++){    
        $("#map-legend-secondary").append('<div class="legend-label"></div>');
        let tempLabel = $("#map-legend-secondary .legend-label:last-child");
        //tempLabel.append('<svg class="legend-label-color" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"></svg>');


        let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute('class',"legend-label-color" );

        let rect  = document.createElementNS("http://www.w3.org/2000/svg",'rect');
        rect.setAttribute('width', 100);
        rect.setAttribute('height', 100);
        rect.setAttribute('style','fill: ' + generatePatternLegends(i*2, animType));
    
        svg.appendChild(rect);

        tempLabel.append(svg);
        
        tempLabel.append('<div class="legend-label-text"></div>');
        tempLabel.children(".legend-label-text").last().text(labels[i]); 
    }
}