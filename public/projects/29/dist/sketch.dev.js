"use strict";

var WIDTH = 500,
    HEIGHT = 500;

function setup() {
  createCanvas(WIDTH, HEIGHT);
  pixelDensity(1);
}

function draw() {
  scale(1, -1);
  translate(0, -height / 2);
  rect(0, 0, width, height / 2);
  circle(0, 0, 4);
  push();
  {
    translate(0, height / 4);
    line(0, 0, width, 0);
    fill('red');
    noStroke();

    for (var x = 0; x <= width; x += 5) {
      var radian = x / width * TWO_PI;
      var y = sin(radian) * 125;
      circle(x, y, 4);
    }
  }
  pop();
  push();
  {
    translate(0, -height * 1 / 4);
    line(0, 0, width, 0);
    fill('blue');
    noStroke();

    for (var _x = 0; _x <= width; _x += 5) {
      var _radian = _x / width * TWO_PI;

      var _y = sin(_radian) * 125;

      circle(_x, _y, 4);
    }
  }
  pop(); // translate(-width / 2, height / 4)
  // circle(0, 0, 4)

  noLoop();
}