var WIDTH = 512,
  HEIGHT = 512,
  t

function setup() {
  createCanvas(WIDTH, HEIGHT)
  t = 0
}

function draw() {
  background(244)
  translate(width / 2, height / 2)

  noFill()
  stroke(0, 0, 0, 128)
  for (var i = 0; i < 64; i++) {
    push()
    var radian = (t + i) / 50
    translate((cos(radian) * width) / 8, 0)
    strokeWeight(2)
    circle(0, 0, 128 - sin(radian) * 128)
    pop()
  }

  t += 1
}
