const WIDTH = 512,
  HEIGHT = 512

function setup() {
  createCanvas(WIDTH, HEIGHT)
  pixelDensity(1)
  background(24)
}

function draw() {
  translate(width / 2, 0)

  fill(255, 128)
  noStroke()
  for(let y = 0; y < height; y += 2) {
    circle(
      noise(frameCount * height + y) * frameCount,
      y,
      2
    )
  }


  if(frameCount > width / 2) noLoop()
}
