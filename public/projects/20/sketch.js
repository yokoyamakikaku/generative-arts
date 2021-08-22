const WIDTH = 512,
  HEIGHT = 512

const state = {}

function setup() {
  createCanvas(WIDTH, HEIGHT)
  // frameRate(1)

  const computer = new Computer(32, 32, 448, 448, 32, 32),
        angel = new Angel(computer)

  state.computer = computer
  state.angel = angel
}

function draw() {
  const { angel, computer } = state

  background(color("#0D0D0D"))

  computer.show()
  angel.show()

  angel.update()
}
