const WIDTH = 512,
  HEIGHT = 512

function setup() {
  createCanvas(WIDTH, HEIGHT)
  pixelDensity(1)
}

function draw() {
  background(41)

  translate(width / 2, 0)
  fill('white')
  noStroke()
  circle(0, 0, 8)

  stroke('white')
  noFill()

  let length = 100

  while(length > 0) {
    line(0, 0, 0, length)
    translate(0, length * random(0.2, 0.9))
    rotate(random(-0.5, 0.5))
    length -= random(1, 5)
  }

}
