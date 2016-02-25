//TO DO:
//REVIEW VARIABLE NAMES FOR DREW-NESS 
//WRITE CHART CODE (GETTING DATA FROM OUR RESULTS ARRAYS AND FEED INTO CHART DATASETS)
//FIND A WAY TO  RESET CHART INFORMATION
//SET DEFAULT CHART VALUES TO 0
//WHEN A BUTTON IS SELECTED, LOAD THE CORRESPONDING DATASET INTO THE CHART

//DECLARE GLOBAL APP VARIABLE
var app = {};
app.typeSelection = ""; //FOR CHART SELECT BUTTON
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
]; //URLS FOR DIFFERENT ENDPOINTS

// Get data on page load, THROW IT INTO DISPLAYDATA FUNCTION
app.getData = function() {
//FOREACH ENDPOINT, DO A CALL
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
    //PUT EACH RESULT THROUGH THE DISPLAYDATA METHOD
   app.displayData(result, app.endpoints[i].data);
    });
  });//END ENDPOINTS.FOREACH
};//END GETDATA

//GLOBAL VARIABLE FOR HOLDING DATA
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
// Taking in the entire object and isolating the Array at index 1; looping through each object in the Array and filtering out the null values. Then, split RESULTS up based on the country AND DELIVER TO APP.RESULTS

//START AT SECOND LOCATION OF TOTAL RESULTS, MEANS WE DON'T GET BAD DATA
val[1].forEach(function(val, i) {
//IF THE OBJECT ENTRY HAS A NULL VALUE, FILTER IT OUT. ALSO FILTER NULL COUNTRIES AND NULL VAL.VALUES
    if (val.country.id !== null && val.data !== null && val.value !== null) {
//RESULT ARRAY, SHOULD HAVE NO NULL VALUES
      app.results[type][val.country.id].push({year: val.date, dataValue: val.value});
      //SORT BASED ON YEAR OF DATA ASCENDING
        app.results[type][val.country.id].sort(function(a,b) {
          return a.year - b.year
         });
      };
  });
};//END APP.DISPLAYDATA




//GLOBAL CHART DATA VARIABLE
app.chartData = {
    labels: ["1990", "1991", "1992", "1993", "1994", "1995", "1996", "1997", "1998", "1999", "2000", "2001", "2002", "2003", "2004", "2005", "2006", "2007", "2008", "2009", "2010", "2011", "2012"    
    ],
    datasets: [
        {
            label: "One",
            fillColor: "rgba(220,220,220,0.2)",
            strokeColor: "rgba(220,220,220,1)",
            pointColor: "rgba(220,220,220,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: [65, 59, 80, 81, 56, 55, 40]
        },
        {
            label: "Two",
            fillColor: "rgba(151,187,205,0.2)",
            strokeColor: "rgba(151,187,205,1)",
            pointColor: "rgba(151,187,205,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(151,187,205,1)",
            data: [28, 48, 40, 19, 86, 27, 90]
        },
        {
            label: "Three",
            fillColor: "rgba(220,220,220,0.2)",
            strokeColor: "rgba(220,220,220,1)",
            pointColor: "rgba(220,220,220,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: [65, 59, 80, 81, 56, 55, 40]
        },
        {
            label: "Four",
            fillColor: "rgba(220,220,220,0.2)",
            strokeColor: "rgba(220,220,220,1)",
            pointColor: "rgba(220,220,220,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: [65, 59, 80, 81, 56, 55, 40]
        },
        {
            label: "Five",
            fillColor: "rgba(220,220,220,0.2)",
            strokeColor: "rgba(220,220,220,1)",
            pointColor: "rgba(220,220,220,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: [65, 59, 80, 81, 56, 55, 40]
        },
        {
            label: "Six",
            fillColor: "rgba(220,220,220,0.2)",
            strokeColor: "rgba(220,220,220,1)",
            pointColor: "rgba(220,220,220,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: [65, 59, 80, 81, 56, 55, 40]
        },
        {
            label: "Seven",
            fillColor: "rgba(220,220,220,0.2)",
            strokeColor: "rgba(220,220,220,1)",
            pointColor: "rgba(220,220,220,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: [65, 59, 80, 81, 56, 55, 40]
        },
        {
            label: "Eight",
            fillColor: "rgba(220,220,220,0.2)",
            strokeColor: "rgba(220,220,220,1)",
            pointColor: "rgba(220,220,220,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: [65, 59, 80, 81, 56, 55, 40]
        }        
    ]
};

//GLOBAL CHART OPTION VARIABLE
app.chartOptions = {
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

//CHART FUNCTION. INSTANTIATES CHART, BUT DOES NOT FEED DATA UNTIL BUTTON CLICK
app.chartSet = function() {
  var ctx = $('#myChart').get(0).getContext("2d");
  var myNewChart = new Chart(ctx).Line(app.chartData, app.chartOptions);

  //on button push, 
  $('button').on('click', function(e) {
    e.preventDefault();
    //ASSIGNS TYPESELECTION TO DATA VALUE OF BUTTON
    app.typeSelection = $(this).data("energy");
    console.log(app.typeSelection);
      //VARIABLE FOR LOOP TO KNOW LOCATION IN CHART DATASET ARRAY
      var whatever = 0;
      //FOR LOOP UPDATES LABELS OF CHART DATASETS TO COUNTRY IDS
    for (item in app.results[app.typeSelection]) {
      console.log(item);
      app.chartData.datasets[whatever].label = item;
      whatever ++;
  } //END FOR ITEM IN APP LOOP


  // app.results[app.typeSelection].forEach(function(val, i) {
  //   val[i].forEach(function(obj, n) {
  //     app.chartData.datasets[i].push(dataValue);
  //   });//END VAL[I].FOREACH
  // });//END APP.RESULTS.FOREACH 
  // chartData.datasets[0]  = app.results[fuelT].forEach(function() {
  //   [val.country.id]
  // });    
  })//END BUTTON 

};//END CHARTSET

//INIT FUNCTION
app.init = function() {
  app.getData();
  app.chartSet();
};

//DOC READY
$(function() {
  app.init();
});
