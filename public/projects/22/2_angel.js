class Task {
  constructor (execute, shouldExecute, isFinished) {
    this.startedAt = null
    this.functions = { execute, shouldExecute, isFinished }
  }

  get isExcuted() {
    return !!this.startedAt
  }

  get age () {
    return frameCount - this.startedAt
  }

  shouldExecute() {
    const f = this.functions.shouldExecute
    if (typeof f === "function") return f(this)
    return true
  }

  execute() {
    const f = this.functions.execute
    if (!this.startedAt) this.startedAt = frameCount
    if (typeof f === "function") f(this)
    return
  }

  isFinished() {
    const f = this.functions.isFinished
    if (typeof f === "function") return f(this)
    return this.isExcuted
  }
}

class Tentacle {
  constructor(board, x, y, width = 1, height = 1) {
    this.board = board
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.bornedAt = frameCount
  }

  get age () {
    return frameCount - this.bornedAt
  }

  update() {
    const {
      x, y, width, height, board
    } = this

    let isFinished = true
    const power = random(0.05, 0.05 + this.age * 0.05)
    board.forEach(x, y, width, height, (old, { x, y }) => {
      if (old < 0) return
      board.set(x, y, constrain(old + power, 0, 1))
      isFinished = board.get(x, y) === 1 && isFinished
    })

    if (isFinished) {
      const { column, row } = board
      this.x = floor(random(0, column - 9))
      this.y = floor(random(0, row - 9))
      this.width = min(this.age + 2, column - this.x)
      this.height = min(this.age + 2, row - this.y)
    }
  }
}

class Angel {
  constructor (environment) {
    this.step = 0
    this.bornedAt = frameCount
    this.tentacles = []

    const { magi } = environment

    this.tasks = [
       // decision
      new Task(() => {
        const decision = new Decision(
          ["提訴", "決議"],
          "263",
          "MAGI_SYS",
          "2004",
          false,
          "AAA"
        )

        decision.status = Decision.NEUTRAL
        decision.statusLabel = "審議中"

        magi.decision = decision

        magi.melchior.board.setAll(0)
        magi.balthasar.board.setAll(0)
        magi.casper.board.setAll(0)
      }, () => this.age > 50),
       // Reset tentacles
      new Task(() => {
        this.tentacles = []
      }),
      // tentacles - melchior
      new Task(({ age }) => {
        const { melchior: { board } } = magi

        this.tentacles.forEach(tentacle => tentacle.update())

        if (age % 5 !== 1) return

        this.tentacles.push(
          new Tentacle(board, board.column - 4, board.row - 4, 4, 4)
        )
      }, null, () => magi.melchior.board.every(1)),
      // Reset tentacles
      new Task(() => {
        this.tentacles = []
      }),
      // tentacles - balthasar
      new Task(({ age }) => {
        const { balthasar: { board } } = magi
        this.tentacles.forEach(tentacle => tentacle.update())

        if (age % 5 !== 1) return

        this.tentacles.push(
          new Tentacle(board, board.column - 4, board.row - 4, 4, 4)
        )
      }, null, () => magi.balthasar.board.every(1)),
      // Reset tentacles
      new Task(() => {
        this.tentacles = []
      }),
      // tentacles - casper
      new Task(({ age }) => {
        const { casper: { board } } = magi
        this.tentacles.forEach(tentacle => tentacle.update())

        if (age % 5 !== 1) return

        this.tentacles.push(
          new Tentacle(board, board.column - 4, board.row - 4, 4, 4)
        )
      }, null, () => magi.casper.board.every(1)),
      new Task(() => {
        this.tentacles = []
      }),
      new Task(({ age }) => {
        const {
          casper,
          melchior,
          balthasar
        } = magi

        const radius = age * 8,
              cx = casper.board.x + Board.CELL_SIZE * 0,
              cy = casper.board.y + Board.CELL_SIZE * casper.board.row

        const boards = [
          casper.board,
          melchior.board,
          balthasar.board
        ]

        boards.forEach(board => {
          const bx = board.x,
                by = board.y
          board.forEach((value, {x,y}) => {
            if(value <= 0) return

            const px = bx + x * Board.CELL_SIZE,
                  py = by + y * Board.CELL_SIZE,
                  d  = floor(dist(cx, cy, px, py)),
                  r  = floor(radius * random(0.9, 1.1))

            if (d > r) return
            board.set(x, y, constrain(value - 0.2, 0, 1))
          })
        })
      }, null, () => (
        magi.melchior.board.every(0)
        && magi.balthasar.board.every(0)
        && magi.casper.board.every(0)
      )),
      new Task(() => {
        magi.decision.status = Decision.POSITIVE
        magi.decision.statusLabel = "否決"
      }, null, ({age}) => age > 100),
      new Task(() => {
        magi.decision = null
        magi.melchior.board.setAll(2)
        magi.balthasar.board.setAll(2)
        magi.casper.board.setAll(2)
      }),
    ]
  }

  get age () {
    return frameCount - this.bornedAt
  }

  update () {
    const task = this.tasks[this.step]
    if(!task) return

    if (task.shouldExecute()) task.execute()
    if (!task.isFinished()) return

    this.step++
  }
}
