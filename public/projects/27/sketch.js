const WIDTH = 512,
  HEIGHT = 512

function setup() {
  createCanvas(WIDTH, HEIGHT)
  pixelDensity(1)
}

function draw() {

  stroke("blue")
  line(0, height / 2, width, height / 2)
  line(width / 2, 0, width / 2, height)

  translate(width / 2, height / 2)

  noFill()
  stroke("red")
  rect(-32, 0, 64, 64)

  for(let i = 0; i < 4; i++) {

  }



  circle(  0,  0, 4)
  circle( 32, 32, 4)
  circle(  0, 64, 4)
  circle(-32, 32, 4)


  beginShape()
  bezier(
    0.00 * 32, 0.00 * 32,
    0.55 * 32, 0.00 * 32,
    1.00 * 32, 0.55 * 32,
    1.00 * 32, 1.00 * 32,
  )
  bezier(
    1.00 * 32, 1.00 * 32,
    1.00 * 32, 1.00 * 32,
    1.00 * 32, 1.00 * 32,
    1.00 * 32, 1.00 * 32,
 )

  endShape(CLOSE)



  noLoop()
}
