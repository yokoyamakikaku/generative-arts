const environment = {
  initialized: false,
  magi: null,
  angel: null
}

function setup() {
  createCanvas(WIDTH, HEIGHT)
  pixelDensity(1)
}

function draw() {
  background(BLACK)

  // TOOD: preload
  // if (
  //   !document.fonts.check(`16px ${FONT_SERIF_JP}`)
  //   || !document.fonts.check(`16px ${FONT_SERIF_EN}`)
  //   || !document.fonts.check(`16px ${FONT_SANS_SERIF}`)
  // ) return

  if (!environment.initialized) {
    environment.initialized = true
    environment.magi = new Magi(environment)
    environment.angel = new Angel(environment)
    return
  }

  const { magi, angel } = environment

  magi.show()
  angel.update()
}
