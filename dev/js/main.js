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
var chartData = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
        {
            label: "My First dataset",
            fillColor: "rgba(220,220,220,0.2)",
            strokeColor: "rgba(220,220,220,1)",
            pointColor: "rgba(220,220,220,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: [65, 59, 80, 81, 56, 55, 40]
        },
        {
            label: "My Second dataset",
            fillColor: "rgba(151,187,205,0.2)",
            strokeColor: "rgba(151,187,205,1)",
            pointColor: "rgba(151,187,205,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(151,187,205,1)",
            data: [28, 48, 40, 19, 86, 27, 90]
        }
    ]
};
var chartOptions = {

    ///Boolean - Whether grid lines are shown across the chart
    scaleShowGridLines : true,

    //String - Colour of the grid lines
    scaleGridLineColor : "rgba(0,0,0,.05)",

    //Number - Width of the grid lines
    scaleGridLineWidth : 1,

    //Boolean - Whether to show horizontal lines (except X axis)
    scaleShowHorizontalLines: true,

    //Boolean - Whether to show vertical lines (except Y axis)
    scaleShowVerticalLines: true,

    //Boolean - Whether the line is curved between points
    bezierCurve : true,

    //Number - Tension of the bezier curve between points
    bezierCurveTension : 0.4,

    //Boolean - Whether to show a dot for each point
    pointDot : true,

    //Number - Radius of each point dot in pixels
    pointDotRadius : 4,

    //Number - Pixel width of point dot stroke
    pointDotStrokeWidth : 1,

    //Number - amount extra to add to the radius to cater for hit detection outside the drawn point
    pointHitDetectionRadius : 20,

    //Boolean - Whether to show a stroke for datasets
    datasetStroke : true,

    //Number - Pixel width of dataset stroke
    datasetStrokeWidth : 2,

    //Boolean - Whether to fill the dataset with a colour
    datasetFill : true,

    //String - A legend template
    // legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"

};

var chartSet = function() {
// Get context with jQuery - using jQuery's .get() method.
var ctx = $("#myChart").get(0).getContext("2d");
// var ctx = document.getElementById("myChart");
var ctxt = ctx.getContext("2d");
// This will get the first returned node in the jQuery collection.
var myLineChart = new Chart(ctx).Line(chartData);
  
}

//INIT FUNCTION
app.init = function() {
  app.getData();
  app.chartSet();
};

//DOC READY
$(function() {
  app.init();
});

// Run data through chart.js or c3js

// Display data on the page
