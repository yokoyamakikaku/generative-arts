const WIDTH = 500,
  HEIGHT = 500

function setup() {
  createCanvas(WIDTH, HEIGHT)
  pixelDensity(1)
}

function draw() {
  scale(1, -1)

  push()
  {
    translate(0, -height / 2)
    noFill()
    stroke(0)
    rect(0, 0, width, height / 2)

    translate(0, height / 4)
    line(0, 0, width, 0)

    fill('red')
    noStroke()
    for(let x = 0; x <= width; x += 2) {
      let radian = x / width * TWO_PI
      let y = sin(radian) * 125
      circle(x, y, 4)
    }
  }
  pop()

  push()
  {
    translate(0, -height)
    noFill()
    stroke(0)
    rect(0, 0, width, height / 2)

    translate(0, height / 4)
    line(0, 0, width, 0)

    fill('red')
    noStroke()
    for(let x = 0; x <= width; x += 2) {
      let radian = x / width * TWO_PI * 2
      let y = cos(radian) * 125
      circle(x, y, 4)
    }
  }
  pop()






  noLoop()
}
