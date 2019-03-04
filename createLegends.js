import { colorScale, colorScaleSecondary} from './mapSetup.js';
export function drawCustomLegend(primaryOption, secondaryOption){
    let labels = ['0-1 (not free)', '2-3', '4-5', '5-6', '7-8', '8-9', '10 (free)'];

    $("#map-legend-primary").empty();
    $("#map-legend-primary").append('<div class="legend-title">'+
                                        primaryOption +'</div>');
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
                                        secondaryOption +'</div>');
    for (var i=0;i<labels.length;i++){    
        $("#map-legend-secondary").append('<div class="legend-label"></div>');
        let tempLabel = $("#map-legend-secondary .legend-label:last-child");
        tempLabel.append('<div class="legend-label-color"></div>')
        tempLabel.append('<div class="legend-label-text"></div>');
        tempLabel.children('.legend-label-color').css('background', colorScaleSecondary(i*2));
        tempLabel.children(".legend-label-text").last().text(labels[i]); 
    }
}