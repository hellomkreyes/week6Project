"use strict";

var hiddenBox = $("#bannerMessage");
$("#buttonContainer button").on("click", function (event) {
  hiddenBox.show();
});