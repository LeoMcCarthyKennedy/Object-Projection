var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var width = window.innerWidth;
var height = window.innerHeight;

canvas.width = width;
canvas.height = height;

var framerate = 60;

var engine = new Engine();

setInterval(engine.update, 1000 / framerate);

document.addEventListener("keydown", function (event) {
    engine.input(event);
});