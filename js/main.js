var app = {};

app.responseTest = {};

app.endpointBiogas = 'http://api.worldbank.org/countries/CAN;USA;FRA;DEU;ITA;JPN;RUS;GBR/indicators/3.1.9_BIOGAS.CONSUM';
app.endpointWind = 'http://api.worldbank.org/countries/CAN;USA;FRA;DEU;ITA;JPN;RUS;GBR/indicators/3.1.5_WIND.CONSUM';
app.endpointGeo = 'http://api.worldbank.org/countries/CAN;USA;FRA;DEU;ITA;JPN;RUS;GBR/indicators/3.1.7_GEOTHERMAL.CONSUM';
app.endpointHydro = 'http://api.worldbank.org/countries/CAN;USA;FRA;DEU;ITA;JPN;RUS;GBR/indicators/3.1.3_HYDRO.CONSUM';
app.endpointSolar = 'http://api.worldbank.org/countries/CAN;USA;FRA;DEU;ITA;JPN;RUS;GBR/indicators/3.1.6_SOLAR.CONSUM';


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

// BIOGAS
// http://api.worldbank.org/countries/[country]/indicators/[energy]?format=json
// WIND
// http://api.worldbank.org/countries/[country]/indicators/[energy]?format=json
// GEOTHERMAL
// http://api.worldbank.org/countries/[country]/indicators/[energy]?format=json
// HYDRO
// http://api.worldbank.org/countries/[country]/indicators/[energy]?format=json
// SOLAR
// http://api.worldbank.org/countries/[country]/indicators/[energy]?format=json

// // Get data on page load. API calls: 1 call per fuel type per country. e.g. for loop
//API calls can be written to pull in all data per country, so we can do 1 call per fuel type that will bring in all our countries

app.getData = function() {
	
 // Biogas
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
 // 	url: 'http://proxy.hackeryou.com',
 //  	method: 'GET',
 //   	dataType: 'json',
 //   	data: {
 //    	reqUrl: app.endpointWind,
 //  		format: 'json'
 // 	}
 // }).then(function(result) {
 // 	console.log(result);
 // 	app.displayData(result);
 // });
 
 // // Geothermal 
 // $.ajax( {
 // 	url: 'http://proxy.hackeryou.com',
 //   	method: 'GET',
 //   	dataType: 'json',
 //   	data: {
 //  		reqUrl: app.endpointGeo,
 //  		format: 'json'
 // 	}
 // }).then(function(result) {
 // 	console.log(result);
 // 	app.displayData(result);
 // });
 
 // // Hydro
 //  $.ajax( {
 // 	url: 'http://proxy.hackeryou.com',
 //   	method: 'GET',
 //   	dataType: 'json',
 //   	data: {
 //   		reqUrl: app.endpointHydro,
 //   		format: 'json'
 // 	}
 // }).then(function(result) {
 //  // console.log(result);
 // 	app.displayData(result);
 // });
 
 // // Solar 
 //  $.ajax( {
 // 	url: 'http://proxy.hackeryou.com',
 //   	method: 'GET',
 //   	dataType: 'json',
 //   	data: {
 //  		reqUrl: app.endpointSolar,
 //  		format: 'json'
 // 	}
 // }).then(function(result) {
 // 	//console.log(result);
 // 	app.responseTest = result;
 // 	app.displayData(result);
 // });
};


// Store all of the data in variables 



// Run data through chart.js or c3js

// Display data on the page

app.displayData = function (val) {


var good = [];
var results = {
	canada: [],
	germany: []	
};

// Taking in the entire object and isolating the Array at index 1; looping through each object in the Array and filtering out the null values. Then, push the good values to good.forEach where we split it up based on the country(results)

val[1].forEach(function(val, i) {
  	if (val.value !== null) {
  		good.push(val)
  	}
});

good.forEach(function(val, i) {
	var country = val.country.value.toLowerCase();
	results[country].push(val)
});

console.log(results)

};


app.init = function() {
	app.getData();
};

$(function() {
  app.init();
});