//TO DO:
//EDIT VARIABLE NAMES. 
//WRITE CHART CODE (BOTH IMPLEMENTING CHART AND GETTING DATA FROM OUR RESULTS ARRAYS INTO IT)


//DECLARE GLOBAL APP VARIABLE
var app = {};



app.endpoints = [ 
  {
    endpoint: 'http://api.worldbank.org/countries/CAN;USA;FRA;DEU;ITA;JPN;RUS;GBR/indicators/3.1.9_BIOGAS.CONSUM/',
    data: 'BIOGAS'
  },
  {
    endpoint: 'http://api.worldbank.org/countries/CAN;USA;FRA;DEU;ITA;JPN;RUS;GBR/indicators/3.1.5_WIND.CONSUM',
    data: 'WIND'
  }, 
  {
    endpoint: 'http://api.worldbank.org/countries/CAN;USA;FRA;DEU;ITA;JPN;RUS;GBR/indicators/3.1.7_GEOTHERMAL.CONSUM',
    data: 'GEOTHERMAL'
  }, 
  {
    endpoint: 'http://api.worldbank.org/countries/CAN;USA;FRA;DEU;ITA;JPN;RUS;GBR/indicators/3.1.3_HYDRO.CONSUM',
    data: 'HYDRO'
  }, 
  {
    endpoint: 'http://api.worldbank.org/countries/CAN;USA;FRA;DEU;ITA;JPN;RUS;GBR/indicators/3.1.6_SOLAR.CONSUM',
    data: 'SOLAR'
  },  
];

// Get data on page load, THROW IT INTO DISPLAYDATA FUNCTION
app.getData = function() {

app.endpoints.forEach(function(val, i) {
  $.ajax( {
   url: 'http://proxy.hackeryou.com',
     method: 'GET',
     dataType: 'json',
     data: {
       reqUrl: val.endpoint,
       per_page: 500,
       format: 'json'
   }
  }).then(function(result) {
   app.displayData(result, app.endpoints[i].data);
    });
  });//END ENDPOINTS.FOREACH
};//END GETDATA


app.results = {
  BIOGAS: {
    CA: [],
    JP: [],
    DE: [],
    RU: [],
    IT: [],
    FR: [],
    US: [],
    GB: []
  },
  WIND: {
    CA: [],
    JP: [],
    DE: [],
    RU: [],
    IT: [],
    FR: [],
    US: [],
    GB: []
  },
  GEOTHERMAL: {
    CA: [],
    JP: [],
    DE: [],
    RU: [],
    IT: [],
    FR: [],
    US: [],
    GB: []
  },
  HYDRO: {
    CA: [],
    JP: [],
    DE: [],
    RU: [],
    IT: [],
    FR: [],
    US: [],
    GB: []
  },
  SOLAR: {
    CA: [],
    JP: [],
    DE: [],
    RU: [],
    IT: [],
    FR: [],
    US: [],
    GB: []
  }
}

app.displayData = function(val, type) {
// Taking in the entire object and isolating the Array at index 1; looping through each object in the Array and filtering out the null values. Then, push the good values to good.forEach where we split it up based on the country(results)

//START AT SECOND LOCATION OF TOTAL RESULTS
val[1].forEach(function(val, i) {
//IF THE OBJECT ENTRY HAS A NULL VALUE, FILTER IT OUT. ALSO FILTER NULL COUNTRIES AND NULL VAL.VALUES
    if (val.country.id !== null && val.data !== null && val.value !== null) {
//RESULT ARRAY, SHOULD HAVE NO NULL VALUES
      app.results[type][val.country.id].push({year: val.date, dataValue: val.value})
      }
  });
};//END APP.DISPLAYDATA


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
