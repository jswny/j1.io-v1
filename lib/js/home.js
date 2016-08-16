require("../sass/main.scss");
require("../sass/pages/home.scss");
var home = require("../handlebars/home.hbs");
var layout = require("../handlebars/main.hbs");

document.addEventListener("DOMContentLoaded", function() {
  var div = document.createElement('div');
  div.innerHTML = layout({
    body: home({name: "Joe"}),
  });
  document.body.appendChild(div);
});