const WIDTH = 512,
  HEIGHT = 512,
  ROW = 48,
  COLUMN = 48

let area = null

class Area {
  constructor(x, y, width, height, age) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.children = []

    this.bornedAt = frameCount
    this.splitedAt = (this.width > 4) ? frameCount + floor(random(20, 100)) : null
  }

  show() {
    const { x, y, width, height } = this
    rect(x, y, width, height)

    this.children.forEach(child => child.show())
  }

  update() {

    if (this.splitedAt === frameCount) {
      const { x, y } = this,
            w = this.width / 2,
            h = this.height / 2
      this.children = [
        new Area(x + w * 0, y + h * 0, w, h),
        new Area(x + w * 1, y + h * 0, w, h),
        new Area(x + w * 0, y + h * 1, w, h),
        new Area(x + w * 1, y + h * 1, w, h),
      ]
    }

    this.children.forEach(child => child.update())
  }
}

function setup() {
  createCanvas(WIDTH, HEIGHT)
  pixelDensity(1)

  area = new Area(32, 32, width - 64, height - 64)
}

function draw() {
  background(244)

  stroke(244)
  fill(41)
  area.show()
  area.update()
  // noLoop()
}
