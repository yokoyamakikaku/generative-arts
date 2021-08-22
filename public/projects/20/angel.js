class Tentacle {
  constructor ({computer, position }) {
    this.computer = computer

    this.direction = TWO_PI / 8
    this.position = position
    this.area = {
      x1: position.x,
      y1: position.y,
      x2: position.x + 1,
      y2: position.y + 1
    }

    this.bornedAt = frameCount
    this.diedAt = null
  }

  get age() {
    return frameCount - this.bornedAt
  }

  get power () {
    return constrain(floor((this.age / 5)), 1, 8)
  }

  get isDied () {
    return this.diedAt !== null
  }

  get views () {
    const {
      computer,
      position: { x, y },
    } = this,
    length = constrain(this.power / 10, 3, 10),
    views = []

    for (let radian = 0; radian < TWO_PI; radian += TWO_PI / 8) {
      const view = {
        radian,
        vector: Tentacle.radianToVector(radian),
        score: 0,
        areas: []
      }
      const { x: vx, y: vy } = view.vector
      for (let l = 1; l <= length; l++) {
        const area = {
          x: x + vx * l,
          y: y + vy * l,
        }

        if (!computer.exists(area.x, area.y)) continue

        view.score += 1 - computer.get(area.x, area.y)
        view.areas.push(area)
      }
      views.push(view)
    }

    return views
  }

  get nextView () {
    let maxScore

    const scoreToView = {}
    this.views.forEach(view => {
      const { score } = view
      if(!scoreToView[score]) {
        scoreToView[score] = []
      }
      maxScore = maxScore && maxScore > score ? maxScore : score
      scoreToView[score].push(view)
    })

    return random(scoreToView[maxScore])
  }

  get task () {
    const {
      isDied,
      computer,
      area,
      child,
      age,
      position: { x, y }
    } = this

    if (isDied) return null

    if (area === null) return Tentacle.TASK_PLAN

    if (computer.equalTo(x, y, v => v < 1)) return Tentacle.TASK_EROSION

    const { x1, y1, x2, y2 } = area
    if (computer.some((value) => value !== 1, x1, y1, x2, y2)) return Tentacle.TASK_MOVE

    if (computer.some(value => value !== 1)) return Tentacle.TASK_PLAN

    return Tentacle.TASK_DIE
  }

  plan () {
    const {
      power,
      nextView: {
        radian,
        vector: {
          x: vx,
          y: vy
        }
      },
      computer: {
        xCount, yCount
      },
      position: {
        x: baseX,
        y: baseY
      }
    } = this

    const d = floor(constrain(random(1, power), 0, min(xCount, yCount))),
          x1 = constrain(baseX + vx * d, 0, xCount),
          y1 = constrain(baseY + vy * d, 0, yCount),
          x2 = constrain(x1 + floor(random(2, min(d * 1.5, xCount * 0.8 ))), 0, xCount),
          y2 = constrain(y1 + floor(random(2, min(d * 1.2, yCount * 0.8 ))), 0, yCount)

    this.direction = radian
    this.area = { x1, y1, x2, y2 }
  }

  erosion () {
    const {
      area: { x1, y1, x2, y2 },
      position: { x, y },
      computer
    } = this

    computer.forEach((value, x, y) => {
      computer.set(x, y, value + 0.01)
    }, x1, y1, x2, y2)
    computer.set(x, y, value => value + 0.1)
  }

  move() {
    const { direction, area, computer } = this

    const xOffset = cos(direction) > 0 ? 1 : -1,
          yOffset = sin(direction) > 0 ? 1 : -1,
          [x1, x2] = xOffset > 0 ? ([area.x1, area.x2]) : ([area.x2 - 1, area.x1 - 1]),
          [y1, y2] = yOffset > 0 ? ([area.y1, area.y2]) : ([area.y2 - 1, area.y1 - 1]),
          conditionX = x => xOffset > 0 ? x < x2 : x > x2,
          conditionY = y => yOffset > 0 ? y < y2 : y > y2

    for (let x = x1; conditionX(x); x += xOffset) {
      for (let y = y1; conditionY(y); y += yOffset) {
        if (computer.get(x, y) < 1) {
          this.position = { x, y }
          return
        }
      }
    }
  }

  die () {
    this.diedAt = frameCount
  }

  update() {
    if (this.child) this.child.update()

    if(this.isDied)  return

    switch(this.task) {
      case Tentacle.TASK_PLAN:
        return this.plan()
      case Tentacle.TASK_MOVE:
        return this.move()
      case Tentacle.TASK_EROSION:
        return this.erosion()
      case Tentacle.TASK_DIE:
      default:
        return this.die()
    }
  }

  show () {
    if(this.child) this.child.show()
    this.showBody()
    // this.showViews()
  }

  showBody() {
    const {
      isDied,
      position: { x, y },
      direction,
      computer: {
        position: { x: cx, y: cy },
        cellWidth: w,
        cellHeight: h
      }
    } = this,
    c = isDied ? 'gray': 'red'

    push()

    translate(
      cx + (x + 0.5) * w,
      cy + (y + 0.5) * h
    )

    noFill()
    stroke(c)
    strokeWeight(1)
    line(0,0, cos(direction) * 8, sin(direction) * 8)

    stroke(c)
    fill('white')
    circle(0, 0, 6)
    circle(0, 0, 2)

    pop()
  }

  showViews () {
    const {
      views,
      computer: {
        position: { x: cx, y: cy },
        cellWidth: w,
        cellHeight: h
      }
    } = this

    push()
    translate(cx, cy)

    views.forEach(({ areas, score }) => {
      areas.forEach(({ x: ax, y: ay }, index) => {
        push()
        translate(ax * w, ay * h)

        strokeWeight(1)
        stroke('skyblue')
        noFill()
        rect(0, 0, w, h)

        if (index === 0) {
          textAlign(CENTER, CENTER)
          fill('blue')
          noStroke()
          textSize(h * 0.5)
          text(score.toFixed(1), w / 2, h / 2)
        }
        pop()
      })
    })

    pop()
  }
}

Tentacle.TASK_PLAN = "PLAN"
Tentacle.TASK_EROSION = "EROSION"
Tentacle.TASK_MOVE = "MOVE"
Tentacle.TASK_DIE = "DIE"
Tentacle.TASK_BORN = "BORN"

Tentacle.radianToVector = function(radian) {
  return createVector(
    constrain(floor((cos(radian) + 1) * 1.5) - 1, -1, 1),
    constrain(floor((sin(radian) + 1) * 1.5) - 1, -1, 1)
  )
}

class Angel {
  constructor(computer) {
    this.computer = computer
    this.tentacles = []
  }

  append () {
    const { computer } = this

    this.tentacles.push(
      new Tentacle({
        computer,
        position: {
          x: 0,
          y: 0
        }
      })
    )
  }

  show() {
    this.tentacles.forEach(tentacle => tentacle.show())
  }

  update() {
    if (frameCount % 60 === 1) this.append()
    this.tentacles.forEach(tentacle => tentacle.update())
  }
}
