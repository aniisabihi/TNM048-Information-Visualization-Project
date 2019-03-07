export{year, displayYear};
import{ReloadMap} from "./main.js";
import{primaryID, secondaryID} from "./ButtonListsSetup.js";

//Default value
let year = 'indexData/hfi_cc_2016.csv';
let displayYear = '2016';

$("#year08").click(function() {
    year = 'indexData/hfi_cc_2008.csv';
    displayYear = '2008';
    document.getElementById("year08").disabled = true;
    document.getElementById("year09").disabled = false;
    document.getElementById("year10").disabled = false;
    document.getElementById("year11").disabled = false;
    document.getElementById("year12").disabled = false;
    document.getElementById("year13").disabled = false;
    document.getElementById("year14").disabled = false;
    document.getElementById("year15").disabled = false;
    document.getElementById("year16").disabled = false;
    ReloadMap(primaryID,secondaryID,year);
    console.log(year)
});

$("#year09").click(function() {
    year = 'indexData/hfi_cc_2009.csv';
    displayYear = '2009';
    document.getElementById("year08").disabled = false;
    document.getElementById("year09").disabled = true;
    document.getElementById("year10").disabled = false;
    document.getElementById("year11").disabled = false;
    document.getElementById("year12").disabled = false;
    document.getElementById("year13").disabled = false;
    document.getElementById("year14").disabled = false;
    document.getElementById("year15").disabled = false;
    document.getElementById("year16").disabled = false;
    ReloadMap(primaryID,secondaryID,year);
    console.log(year)
});

$("#year10").click(function() {
    year = 'indexData/hfi_cc_2010.csv';
    displayYear = '2010';
    document.getElementById("year08").disabled = false;
    document.getElementById("year09").disabled = false;
    document.getElementById("year10").disabled = true;
    document.getElementById("year11").disabled = false;
    document.getElementById("year12").disabled = false;
    document.getElementById("year13").disabled = false;
    document.getElementById("year14").disabled = false;
    document.getElementById("year15").disabled = false;
    document.getElementById("year16").disabled = false;
    ReloadMap(primaryID,secondaryID,year);
    console.log(year)
});

$("#year11").click(function() {
    year = 'indexData/hfi_cc_2011.csv';
    displayYear = '2011';
    document.getElementById("year08").disabled = false;
    document.getElementById("year09").disabled = false;
    document.getElementById("year10").disabled = false;
    document.getElementById("year11").disabled = true;
    document.getElementById("year12").disabled = false;
    document.getElementById("year13").disabled = false;
    document.getElementById("year14").disabled = false;
    document.getElementById("year15").disabled = false;
    document.getElementById("year16").disabled = false;
    ReloadMap(primaryID,secondaryID,year);
    console.log(year)
});

$("#year12").click(function() {
    year = 'indexData/hfi_cc_2012.csv';
    displayYear = '2012';
    document.getElementById("year08").disabled = false;
    document.getElementById("year09").disabled = false;
    document.getElementById("year10").disabled = false;
    document.getElementById("year11").disabled = false;
    document.getElementById("year12").disabled = true;
    document.getElementById("year13").disabled = false;
    document.getElementById("year14").disabled = false;
    document.getElementById("year15").disabled = false;
    document.getElementById("year16").disabled = false;
    ReloadMap(primaryID,secondaryID,year);
    console.log(year)
});

$("#year13").click(function() {
    year = 'indexData/hfi_cc_2013.csv';
    displayYear = '2013';
    document.getElementById("year08").disabled = false;
    document.getElementById("year09").disabled = false;
    document.getElementById("year10").disabled = false;
    document.getElementById("year11").disabled = false;
    document.getElementById("year12").disabled = false;
    document.getElementById("year13").disabled = true;
    document.getElementById("year14").disabled = false;
    document.getElementById("year15").disabled = false;
    document.getElementById("year16").disabled = false;
    ReloadMap(primaryID,secondaryID,year);
    console.log(year)
});

$("#year14").click(function() {
    year = 'indexData/hfi_cc_2014.csv';
    displayYear = '2014';
    document.getElementById("year08").disabled = false;
    document.getElementById("year09").disabled = false;
    document.getElementById("year10").disabled = false;
    document.getElementById("year11").disabled = false;
    document.getElementById("year12").disabled = false;
    document.getElementById("year13").disabled = false;
    document.getElementById("year14").disabled = true;
    document.getElementById("year15").disabled = false;
    document.getElementById("year16").disabled = false;
    ReloadMap(primaryID,secondaryID,year);
    console.log(year)
});

$("#year15").click(function() {
    year = 'indexData/hfi_cc_2015.csv';
    displayYear = '2015';
    document.getElementById("year08").disabled = false;
    document.getElementById("year09").disabled = false;
    document.getElementById("year10").disabled = false;
    document.getElementById("year11").disabled = false;
    document.getElementById("year12").disabled = false;
    document.getElementById("year13").disabled = false;
    document.getElementById("year14").disabled = false;
    document.getElementById("year15").disabled = true;
    document.getElementById("year16").disabled = false;
    ReloadMap(primaryID,secondaryID,year);
    console.log(year)
});

$("#year16").click(function() {
    year = 'indexData/hfi_cc_2016.csv';
    displayYear = '2016';
    document.getElementById("year08").disabled = false;
    document.getElementById("year09").disabled = false;
    document.getElementById("year10").disabled = false;
    document.getElementById("year11").disabled = false;
    document.getElementById("year12").disabled = false;
    document.getElementById("year13").disabled = false;
    document.getElementById("year14").disabled = false;
    document.getElementById("year15").disabled = false;
    document.getElementById("year16").disabled = true;
    ReloadMap(primaryID,secondaryID,year);
    console.log(year)
});