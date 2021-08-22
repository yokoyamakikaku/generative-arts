const WIDTH = 800, HEIGHT = 450

let gScale, curves

function preload() {
  font = loadFont('./Roboto-Medium.ttf')
}

function setup() {
  pixelDensity(2)
  createCanvas(WIDTH, HEIGHT)
  textFont(font)

  gScale = new Scale(font)
  curves = [
    new NerveCurve({ color: color(255, 255, 255, 128), speed: 2.0, position: 0 }),
    new NerveCurve({ color: color(255, 255, 255, 128), speed: 2.2, position: 20 }),
    new NerveCurve({ color: color(255, 255, 255, 128), speed: 2.6, position: 40 }),
    new NerveCurve({ color: color(255, 255, 255, 128), speed: 2.7, position: 60 }),
    // new NerveCurve({ color: color(255, 255, 255, 128), speed: 2.8, position: 80 }),
  ]
}

function draw() {
  background(0)

  // blendMode(ADD)
  curves.forEach(curve => {
    curve.update()
    curve.show()
  })
  // blendMode(BLEND)
  gScale.show()

  // noLoop()
}
