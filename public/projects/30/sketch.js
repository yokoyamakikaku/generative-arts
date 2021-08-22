function setup() {
  createCanvas(512, 512)
  pixelDensity(1)
}

function draw() {
  background(230)

  translate(width / 2, height / 2)
  scale(1 + sin(frameCount / 100) * 0.5)

  noFill()
  stroke('red')
  circle(0, 0, width)

  noFill()
  stroke('black')

  circle(0, 0, width)
  for(var i = 0; i < width; i += width / 32) {
    var offset = frameCount + i,
        topSize = offset % width,
        bottomSize = width - offset % width
    arc(-width / 2 + topSize / 2, 0, topSize, topSize, PI, TWO_PI)
    arc(width / 2 - bottomSize / 2, 0, bottomSize, bottomSize, 0, PI)
  }


}
