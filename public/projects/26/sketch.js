const WIDTH = 512,
  HEIGHT = 512

function setup() {
  createCanvas(WIDTH, HEIGHT)
  pixelDensity(1)

}

function draw() {
  background(244)



  translate(width / 2, height / 2)

  stroke(0)
  noFill()

  for(let radius = 80; radius < width; radius += 8) {
    beginShape()
    arc(0, 0, radius, radius, (frameCount + radius) / 100, PI + QUARTER_PI + (frameCount + radius) / 100);
    endShape()
  }





}
