//TO DO:
//SET GLOBAL VARIABLES TO BE FILLED BY DATA FROM API'S
//REWRITE API CALL INTO A LOOP THAT GOES THROUGH EACH AJAX ENDPOINT AND DUMPS DATA INTO THOSE GLOBAL VARIABLES WE DECLARED ABOVE
//REWRITE DISPLAYDATA TO PUT DATA INTO RESULTS VARIABLES
//EDIT VARIABLE NAMES. 
//WRITE CHART CODE (BOTH IMPLEMENTING CHART AND GETTING DATA FROM OUR RESULTS ARRAYS INTO IT)


//DECLARE GLOBAL APP VARIABLE
var app = {};

//ENDPOINTS
app.endpointBiogas = 'http://api.worldbank.org/countries/CAN;USA;FRA;DEU;ITA;JPN;RUS;GBR/indicators/3.1.9_BIOGAS.CONSUM';
app.endpointWind = 'http://api.worldbank.org/countries/CAN;USA;FRA;DEU;ITA;JPN;RUS;GBR/indicators/3.1.5_WIND.CONSUM';
app.endpointGeo = 'http://api.worldbank.org/countries/CAN;USA;FRA;DEU;ITA;JPN;RUS;GBR/indicators/3.1.7_GEOTHERMAL.CONSUM';
app.endpointHydro = 'http://api.worldbank.org/countries/CAN;USA;FRA;DEU;ITA;JPN;RUS;GBR/indicators/3.1.3_HYDRO.CONSUM';
app.endpointSolar = 'http://api.worldbank.org/countries/CAN;USA;FRA;DEU;ITA;JPN;RUS;GBR/indicators/3.1.6_SOLAR.CONSUM';



// Get data on page load, THROW IT INTO DISPLAYDATA FUNCTION
app.getData = function() {
  
 $.ajax( {
  url: 'http://proxy.hackeryou.com',
    method: 'GET',
    dataType: 'json',
    data: {
      reqUrl: app.endpointBiogas,
      format: 'json',
  }
 }).then(function(result) {
  console.log(result);
  app.displayData(result);
 });
 
 // Wind
 //  $.ajax( {
 //   url: 'http://proxy.hackeryou.com',
 //   method: 'GET',
 //     dataType: 'json',
 //     data: {
 //     reqUrl: app.endpointWind,
 //     format: 'json'
 //   }
 // }).then(function(result) {
 //   console.log(result);
 //   app.displayData(result);
 // });
 
 // // Geothermal 
 // $.ajax( {
 //   url: 'http://proxy.hackeryou.com',
 //     method: 'GET',
 //     dataType: 'json',
 //     data: {
 //     reqUrl: app.endpointGeo,
 //     format: 'json'
 //   }
 // }).then(function(result) {
 //   console.log(result);
 //   app.displayData(result);
 // });
 
 // // Hydro
 //  $.ajax( {
 //   url: 'http://proxy.hackeryou.com',
 //     method: 'GET',
 //     dataType: 'json',
 //     data: {
 //       reqUrl: app.endpointHydro,
 //       format: 'json'
 //   }
 // }).then(function(result) {
 //  // console.log(result);
 //   app.displayData(result);
 // });
 
 // // Solar 
 //  $.ajax( {
 //   url: 'http://proxy.hackeryou.com',
 //     method: 'GET',
 //     dataType: 'json',
 //     data: {
 //     reqUrl: app.endpointSolar,
 //     format: 'json'
 //   }
 // }).then(function(result) {
 //   //console.log(result);
 //   app.displayData(result);
 // });
};


app.displayData = function (val) {

//VAR TO HOLD ARRAY ITEMS WITH NULL VALUES FILTERED OUT
var good = [];
//RESULTS VAR TO HOLD FINAL RESULTS. REPLACE WITH GLOBAL VARIABLES DEFINED ABOVE
var results = {
  canada: [],
  germany: [] 
};

// Taking in the entire object and isolating the Array at index 1; looping through each object in the Array and filtering out the null values. Then, push the good values to good.forEach where we split it up based on the country(results)

//START AT SECOND LOCATION OF TOTAL RESULTS
val[1].forEach(function(val, i) {
//IF THE OBJECT ENTRY HAS A NULL VALUE, FILTER IT OUT
    if (val.value !== null) {
//RESULT ARRAY, SHOULD HAVE NO NULL VALUES
      good.push(val)
    }
});

//GO THROUGH THE RESULT ARRAY, 
good.forEach(function(val, i) {
//NORMALIZE COUNTRY NAMES TO LOWERCASE
  var country = val.country.value.toLowerCase();
//PUSH ALL RESULTS TO CORRESPONDING COUNTRY ARRAYS
  results[country].push(val)
});
console.log(results)
};

//WHEN A BUTTON IS SELECTED, LOAD THE CORRESPONDING DATASET INTO THE CHART
//NEED TO LOAD TWO VALUES: X-AXIS IS [COUNTRY[I]].VALUE AND Y AXIS IS [COUNTRY[I].DATE]
//HOW WILL WE DO SO ON AN ASCENDING BASIS? 
//DO WE LOOP THROUGH THE FINAL RESULTS ARRAY AND PULL OUT MATCHING VALUES BETWEEN 1990-2012? 
//DO WE CREATE STAGING ARRAYS FOR THE CHART? 8 ARRAYS WITH OBJECTS CONTAINING DATES 1990-2012, AND THEN WE LOOP THROUGH THE RESULTS ARRAY, MATCHING THE DATE AND PLACING THE VALUE? ADAM VOTES FOR THIS SOLUTION BECAUSE THIS MEANS WE ONLY HAVE TO WRITE THE CHART ONCE, AND WE CAN USE 0 VALUES, WHICH MAKES IT EASY IF WE DON'T GET VALUES BACK FROM THE API
//CHART FUNCTION

//INIT FUNCTION
app.init = function() {
  app.getData();
};

//DOC READY
$(function() {
  app.init();
});

// Run data through chart.js or c3js

// Display data on the page


//REFERENCE ITEMS
// Country
// CAN - Canada
// USA - USA
// FRA - France
// DEU - Germany
// ITA - Italy
// JPN - Japan
// RUS - Russia
// GBR - UK
// Energy
// 3.1.9_BIOGAS.CONSUM
// 3.1.5_WIND.CONSUM
// 3.1.7_GEOTHERMAL.CONSUM
// 3.1.3_HYDRO.CONSUM
// 3.1.6_SOLAR.CONSUM

// BIOGAS :: http://api.worldbank.org/countries/[country]/indicators/[energy]?format=json
// WIND :: http://api.worldbank.org/countries/[country]/indicators/[energy]?format=json
// GEOTHERMAL :: http://api.worldbank.org/countries/[country]/indicators/[energy]?format=json
// HYDRO :: http://api.worldbank.org/countries/[country]/indicators/[energy]?format=json
// SOLAR :: http://api.worldbank.org/countries/[country]/indicators/[energy]?format=json