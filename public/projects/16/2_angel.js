class AngelTask {
  constructor (execute, shouldExecute, isFinished) {
    this.startedAt = null
    this.functions = {
      execute,
      shouldExecute,
      isFinished
    }
  }

  get isExcuted() {
    return !!this.startedAt
  }

  execute() {
    const f = this.functions.execute
    if (typeof f === "function") f(this)
    this.startedAt = frameCount
    return
  }

  shouldExecute() {
    const f = this.functions.shouldExecute
    if (typeof f === "function") return f(this)
    return true
  }

  isFinished() {
    const f = this.functions.isFinished
    if (typeof f === "function") return f(this)
    return this.isExcuted
  }
}

class Angel {
  constructor ({ target }) {
    this.target = target

    this.current = 0

    this.tasks = [
      new AngelTask(() => {
        target.setDecision({
          code: 263,
          file: 'MAGI_SYS',
          extension: 2004,
          exMode: false,
          priority: 'AAA',
        })
      }, () => frameCount === 10),
      new AngelTask(() => {
        const { melchior } = target
        const {　current, xCount, yCount　} = melchior.memories
        for(let x = xCount - 5; x < xCount; x++) {
          for(let y = yCount - 5; y < yCount; y++) {
            current[x][y] = 1
          }
        }
      }),
      new AngelTask(() => {
        const { melchior } = target
        const {　current, xCount, yCount　} = melchior.memories
        const x = floor(random(0, xCount))
        const y = floor(random(0, yCount))
        if (current[x][y] === -1) return
        current[x][y] = 1
      }, () => true, () => {
        const { melchior } = target
        return melchior.isNegative
      }),
      new AngelTask(() => {
        const { balthasar } = target
        const {　current, xCount, yCount　} = balthasar.memories

        for (var i = 1; i <= xCount; i++) {
          let x = xCount - i,
              y = yCount - i

          if (current[x][y] === 0) {
            current[x][y] = 1
            break
          }
        }
      }),
      new AngelTask(() => {
        const { balthasar } = target
        const {　current, xCount, yCount　} = balthasar.memories
        const x = floor(random(0, xCount))
        const y = floor(random(0, yCount))
        if (current[x][y] === -1) return
        current[x][y] = 1
      }, () => true, () => {
        const { balthasar } = target
        return balthasar.isNegative
      }),
      new AngelTask(() => {
        const { casper } = target
        const {　current, xCount} = casper.memories

        for (var i = 1; i <= xCount; i++) {
          let x = xCount - i,
              y = 0
          if (current[x][y] === 0) {
            current[x][y] = 1
            break
          }
        }
      }),
      new AngelTask(() => {
        const { casper } = target
        const {　current, xCount, yCount　} = casper.memories
        const x = floor(random(0, xCount))
        const y = floor(random(0, yCount))
        if (current[x][y] === -1) return
        current[x][y] = 1
      }, () => true, () => {
        const { casper } = target
        return casper.isNegative
      })
    ]
  }

  get currentTask() {
    return this.tasks[this.current]
  }

  update () {
    const { currentTask } = this

    if(!currentTask) return

    if (currentTask.shouldExecute()) {
      currentTask.execute()
    }

    if (currentTask.isFinished()) {
      this.current++
    }
  }

}
