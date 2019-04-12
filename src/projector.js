const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const framerate = 60;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

setInterval(update, 1000 / framerate);

const projectionDistance = 50; // distance from projection plane to camera 

var time = 0;

function update() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = "red";

    var p = new pyramid(new vector(0, Math.sin(time), 10), new vector(0, 0, 0), (Math.sin(time) + 2));

    ctx.strokeStyle = "yellow";

    var c = new cube(new vector(Math.sin(time * 10), 0, 10), new vector(0, 0, 0), (Math.sin(time) - 2));

    time += 1 / framerate;
}

function project(vertices, order) {
    ctx.beginPath();

    var verts = vertices;

    for (var i = 0; i < vertices.length; i++) {
        var projection = vertices[i];

        var scalar = projectionDistance / projection.z;

        projection.x *= scalar;
        projection.y *= scalar;
        projection.z *= scalar;

        verts[i].x = projection.x * 10 + canvas.width / 2;
        verts[i].y = projection.y * 10 + canvas.height / 2;
    }

    ctx.moveTo(verts[0].x, verts[0].y);

    for (var i = 0; i < order.length; i++) {
        ctx.lineTo(verts[order.charAt(i)].x, verts[order.charAt(i)].y);
        ctx.moveTo(verts[order.charAt(i)].x, verts[order.charAt(i)].y);
    }

    ctx.stroke();
}