var WIDTH = 512,
  HEIGHT = 512

function setup() {
  createCanvas(WIDTH, HEIGHT)
}

function draw() {
  background(255)

  translate(width / 2, height / 2)
  noFill()

  stroke(255, 0, 0, 128)

  circle(0, 0, 64)

  for (var i = 0; i < 2; i++) {
    push()
    var radian = (TWO_PI * i) / 2
    translate(cos(radian) * 64, 0)
    rotate(radian + PI)
    circle(0, 0, 64)
    rotate(TWO_PI / 4)
    for (var j = 0; j < 3; j++) {
      push()
      var radian = (TWO_PI * j) / 4
      translate(cos(radian) * 32, sin(radian) * 32)
      circle(0, 0, 4)
      pop()
    }
    pop()
  }
  noLoop()
}
