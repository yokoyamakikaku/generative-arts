const WIDTH = 512
const HEIGHT = 512

function setup () {
  createCanvas(WIDTH, HEIGHT)
  pixelDensity(1)
}

function draw () {
  background(41)

  translate(0, height / 2)

  noFill()
  stroke(244)

  for (let i = 0; i < 32; i++) {
    beginShape()
    for (let x = 0; x < width; x++) {
      const radian = (x + noise(i) * 128) / width * TWO_PI
      const y = sin(radian) * height / 4 * (i + 32) / 48 * noise(frameCount / 100)
      vertex(x, y)
    }
    endShape()
  }

  // noLoop()
}
