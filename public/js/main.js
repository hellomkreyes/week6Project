'use strict';

//TO DO:
//REVIEW VARIABLE NAMES FOR DREW-NESS

//DECLARE GLOBAL APP VARIABLE
var app = {};
// app.hiddenBox = $( "#bannerMessage" );
app.typeSelection = ""; //FOR CHART SELECT BUTTON

//URLS FOR DIFFERENT ENDPOINTS
app.endpoints = [{
  endpoint: 'http://api.worldbank.org/countries/CAN;USA;FRA;DEU;ITA;JPN;RUS;GBR/indicators/3.1.9_BIOGAS.CONSUM/',
  data: 'BIOGAS'
}, {
  endpoint: 'http://api.worldbank.org/countries/CAN;USA;FRA;DEU;ITA;JPN;RUS;GBR/indicators/3.1.5_WIND.CONSUM',
  data: 'WIND'
}, {
  endpoint: 'http://api.worldbank.org/countries/CAN;USA;FRA;DEU;ITA;JPN;RUS;GBR/indicators/3.1.7_GEOTHERMAL.CONSUM',
  data: 'GEOTHERMAL'
}, {
  endpoint: 'http://api.worldbank.org/countries/CAN;USA;FRA;DEU;ITA;JPN;RUS;GBR/indicators/3.1.3_HYDRO.CONSUM',
  data: 'HYDRO'
}, {
  endpoint: 'http://api.worldbank.org/countries/CAN;USA;FRA;DEU;ITA;JPN;RUS;GBR/indicators/3.1.6_SOLAR.CONSUM',
  data: 'SOLAR'
}];

// Get data on page load, THROW IT INTO DISPLAYDATA FUNCTION
app.getData = function () {
  //FOREACH ENDPOINT, DO A CALL
  app.endpoints.forEach(function (val, i) {
    $.ajax({
      url: 'http://proxy.hackeryou.com',
      method: 'GET',
      dataType: 'json',
      data: {
        reqUrl: val.endpoint,
        per_page: 500,
        format: 'json'
      }
    }).then(function (result) {
      //PUT EACH RESULT THROUGH THE DISPLAYDATA METHOD
      app.displayData(result, app.endpoints[i].data);
    });
  }); //END ENDPOINTS.FOREACH
}; //END GETDATA

//GLOBAL VARIABLE FOR HOLDING DATA & ORGANIZING IT FROM THE API
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
};

//DISPLAY DATA
app.displayData = function (val, type) {
  // Taking in the entire object and isolating the Array at index 1; looping through each object in the Array and filtering out the null values. Then, split RESULTS up based on the country AND DELIVER TO APP.RESULTS

  //START AT SECOND LOCATION OF TOTAL RESULTS, MEANS WE DON'T GET BAD DATA (INDEX 1 NOT 0)
  val[1].forEach(function (val, i) {
    //IF THE OBJECT ENTRY DOES NOT HAVE A DATA VALUE, COUNTRY ID AND YEAR (MUST HAVE ALL THREE) FILTER IT OUT
    if (val.country.id !== null && val.data !== null && val.value !== null) {
      //RESULT ARRAY, FILTERED OUT USELESSNESS
      app.results[type][val.country.id].push({ year: val.date, dataValue: val.value });
      //SORT BASED ON YEAR OF DATA ASCENDING (1990 -> 2012)
      app.results[type][val.country.id].sort(function (a, b) {
        return a.year - b.year;
      });
    };
  });
}; //END APP.DISPLAYDATA

//GLOBAL CHART DATA VARIABLE
app.chartData = {
  labels: ["1990", "1991", "1992", "1993", "1994", "1995", "1996", "1997", "1998", "1999", "2000", "2001", "2002", "2003", "2004", "2005", "2006", "2007", "2008", "2009", "2010", "2011", "2012"],
  datasets: [{
    label: "One",
    fillColor: "rgba(128, 146, 117, 0.2)",
    strokeColor: "#809275",
    pointColor: "#809275",
    pointStrokeColor: "#fff",
    pointHighlightFill: "#fff",
    pointHighlightStroke: "rgba(220,220,220,1)",
    data: []
  }, {
    label: "Two",
    fillColor: "rgba(163, 175, 244, 0.2)",
    strokeColor: "#A3AFF4",
    pointColor: "#A3AFF4",
    pointStrokeColor: "#fff",
    pointHighlightFill: "#fff",
    pointHighlightStroke: "rgba(151,187,205,1)",
    data: []
  }, {
    label: "Three",
    fillColor: "rgba(241, 137, 230, 0.2)",
    strokeColor: "#F189E6",
    pointColor: "#F189E6",
    pointStrokeColor: "#fff",
    pointHighlightFill: "#fff",
    pointHighlightStroke: "rgba(220,220,220,1)",
    data: []
  }, {
    label: "Four",
    fillColor: "rgba(241, 89, 77, 0.2)",
    strokeColor: "#F1594D",
    pointColor: "#F1594D",
    pointStrokeColor: "#fff",
    pointHighlightFill: "#fff",
    pointHighlightStroke: "rgba(220,220,220,1)",
    data: []
  }, {
    label: "Five",
    fillColor: "rgba(191, 220, 176, 0.2)",
    strokeColor: "#BFDCB0",
    pointColor: "#BFDCB0",
    pointStrokeColor: "#fff",
    pointHighlightFill: "#fff",
    pointHighlightStroke: "rgba(220,220,220,1)",
    data: []
  }, {
    label: "Six",
    fillColor: "rgba(129, 202, 202, 0.2)",
    strokeColor: "#81CACA",
    pointColor: "#81CACA",
    pointStrokeColor: "#fff",
    pointHighlightFill: "#fff",
    pointHighlightStroke: "rgba(220,220,220,1)",
    data: []
  }, {
    label: "Seven",
    fillColor: "rgba(240, 174, 171, 0.2)",
    strokeColor: "#F0AEAB",
    pointColor: "#F0AEAB",
    pointStrokeColor: "#fff",
    pointHighlightFill: "#fff",
    pointHighlightStroke: "rgba(220,220,220,1)",
    data: []
  }, {
    label: "Eight",
    fillColor: "rgba(239, 226, 50, 0.2)",
    strokeColor: "#EFE232",
    pointColor: "#EFE232",
    pointStrokeColor: "#fff",
    pointHighlightFill: "#fff",
    pointHighlightStroke: "rgba(220,220,220,1)",
    data: []
  }]
};

//GLOBAL CHART OPTION VARIABLE - THESE ARE EXTRA FEATURES FROM CHART.JS
app.chartOptions = {
  ///Boolean - Whether grid lines are shown across the chart
  scaleShowGridLines: true,
  scaleFontColor: "#FFF",
  //String - Colour of the grid lines
  scaleGridLineColor: "rgba(0,0,0,.05)",
  //Number - Width of the grid lines
  scaleGridLineWidth: 1,
  //Boolean - Whether to show horizontal lines (except X axis)
  scaleShowHorizontalLines: true,
  //Boolean - Whether to show vertical lines (except Y axis)
  scaleShowVerticalLines: true,
  //Boolean - Whether the line is curved between points
  bezierCurve: true,
  //Number - Tension of the bezier curve between points
  bezierCurveTension: 0.4,
  //Boolean - Whether to show a dot for each point
  pointDot: true,
  //Number - Radius of each point dot in pixels
  pointDotRadius: 4,
  //Number - Pixel width of point dot stroke
  pointDotStrokeWidth: 1,
  //Number - amount extra to add to the radius to cater for hit detection outside the drawn point
  pointHitDetectionRadius: 20,
  //Boolean - Whether to show a stroke for datasets
  datasetStroke: true,
  //Number - Pixel width of dataset stroke
  datasetStrokeWidth: 2,
  //Boolean - Whether to fill the dataset with a colour
  datasetFill: true,
  //String - A legend template
  // legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"
  //responsive
  responsive: true
};

//ON BUTTON CLICK, LABEL & DATA VALUES IN CHART DATA ARE REASSIGNED TO OUR FILTERED INFO FROM THE API
app.chartShow = function () {
  $('.energy__listItems li').on('click', function (e) {
    e.preventDefault();
    $('#bannerMessage').hide();
    $('#bannerMessage h3').html($(this).data('title'));
    $('#bannerMessage p').html($(this).data('text'));
    $('#bannerMessage').slideToggle();
    //ASSIGNS TYPESELECTION TO DATA VALUE OF BUTTON
    app.typeSelection = $(this).data("energy");
    console.log(app.typeSelection);
    //VARIABLE FOR LOOP TO KNOW LOCATION IN CHART DATASET ARRAY
    var index = 0;
    //FOR LOOP UPDATES LABELS OF CHART DATASETS TO COUNTRY IDS
    console.log(app.results[app.typeSelection]);
    for (var item in app.results[app.typeSelection]) {
      var dataset = app.chartData.datasets[index];
      console.log(item);
      console.log(app.results[app.typeSelection]);
      dataset.label = item;
      dataset.data = app.results[app.typeSelection][item];
      dataset.data = dataset.data.map(function (data) {
        return Math.floor(data.dataValue);
      });
      index++;
    } //END FOR ITEM IN APP LOOP
    app.chartSet();
  });
};

//HAMBURGER NAV FUNCTIONALITY!
app.hamburger = function () {
  $('.hamburger__icon').on('click', function (e) {
    e.preventDefault();
    $('nav').fadeIn(500).show();
  });
  $('.fa-times-circle').on('click', function (e) {
    e.preventDefault();
    $('nav').fadeOut(500).hide();
  });
  $('.nav__listItems a').on('click', function () {
    $('nav').fadeOut(500).hide();
  });
};

//CHART FUNCTION. CREATES CHART ON OUR PAGE
app.chartSet = function () {
  var ctx = $('#myChart').get(0).getContext("2d");
  var myNewChart = new Chart(ctx).Line(app.chartData, app.chartOptions);
}; //END CHARTSET

//INIT FUNCTION
app.init = function () {
  app.getData();
  app.chartShow();
  app.hamburger();
};

//DOC READY
$(function () {
  app.init();
});