const WIDTH = 500,
  HEIGHT = 500

function setup() {
  createCanvas(WIDTH, HEIGHT)
  pixelDensity(1)
}

const speed = 20

function draw() {
  background(255)

  translate(width /2, height/2)
  scale(1, -1)

  noFill()
  stroke('red')
  circle(0, 0, 128)

  line(-64, -64, -64, -height / 2)
  line( 64, -64,  64, -height / 2)

  line( 64, -64, width / 2, -64)
  line( 64,  64, width / 2,  64)

  let radian = frameCount / speed,
      cx = cos(radian) * 64,
      cy = sin(radian) * 64,
      radius = 8

  fill(0)
  noStroke()

  circle(cx, cy, radius)

  noFill()
  stroke('blue')
  line(0, 0, cx, cy)

  line(
    cx, cy,
    width / 2, cy
  )

  line(
    cx, cy,
    cx, -height / 2
  )

  fill(0)
  circle(64, cy, 8)
  for(let i = 0; i < width / 2 - 64; i += 4) {
    let x = 64 + i
    let y = sin(radian - i / speed) * 64
    circle(x, y, 2)
  }


  circle(cx, -64, 8)
  for(let i = 0; i < height / 2 - 64; i += 4) {
    let x = cos(radian - i / speed) * 64
    let y = - 64 - i
    circle(x, y, 2)
  }

}
