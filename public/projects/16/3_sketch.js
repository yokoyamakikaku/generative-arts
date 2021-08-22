const WIDTH = 820,
  HEIGHT = 620

let magi = null

function setup() {
  createCanvas(WIDTH, HEIGHT)
  // frameRate(32)
  magi = new Magi(800, 600)
  angel = new Angel({ target: magi })
}

function draw() {
  translate(width / 2, height / 2)

  magi.show()

  angel.update()
  magi.update()

  // noLoop()
}
