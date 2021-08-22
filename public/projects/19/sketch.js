var WIDTH = 512,
  HEIGHT = 512,
  tables = {
    xCount: 16,
    yCount: 16,
    positionToGroup: [],
    groupToPosition: {},
    groupToColor: {},
    current: [],
    next: []
  }

function setup() {
  createCanvas(WIDTH, HEIGHT)

  const {
    positionToGroup,
    groupToPosition,
    current, next,
    groupToColor,
    xCount, yCount
  } = tables

  for (var x = 0; x < xCount; x ++) {
    positionToGroup[x] = []
    for (var y = 0; y < yCount; y ++) {
      const group = max(x,y)
      positionToGroup[x][y] = group
      groupToPosition[group] = groupToPosition[group] || []
      groupToPosition[group].push({ x, y })
    }
  }

  colorMode(HSL)
  Object.entries(groupToPosition).forEach(([ group ], index, groups)=> {
    const c = color((index / groups.length) * 360, 75, 50)
    groupToColor[group] = c
  })
  colorMode(RGB)

  for (var x = 0; x < xCount; x ++) {
    current[x] = []
    next[x] = []
    for (var y = 0; y < yCount; y ++) {
      current[x][y] = 0
      next[x][y] = 0
    }
  }
}

function draw() {
  background(244)

  const {
    xCount, yCount,
    positionToGroup, groupToPosition,
    current, groupToColor
  } = tables,
  cellWidth =  (width / 2) / xCount,
  cellHeight =  (height / 2) / yCount

  push()
  {
    translate(width / 2 * 0, height / 2 * 0)

    current.forEach((column, x) => {
      column.forEach((value, y) => {
        push()

        translate(x * cellWidth, y * cellHeight)

        if (value === 1) {
          fill(200)
        } else {
          fill(255)
        }
        stroke(200)
        strokeWeight(1)
        rect(0, 0, cellWidth, cellHeight)

        fill(0)
        noStroke()
        textAlign(CENTER, BOTTOM)
        text(value, cellWidth / 2, cellHeight - 2)

        pop()
      })
    })
  }
  pop()

  push()
  {
    translate(width / 2 * 1, height / 2 * 0)

    positionToGroup.forEach((column, x) => {
      column.forEach((group, y) => {
        push()
        const value = current[x][y]
        translate(x * cellWidth, y * cellHeight)

        fill(groupToColor[group])
        noStroke()
        rect(0, 0, cellWidth, cellHeight)

        fill(0)
        noStroke()
        textAlign(CENTER, BOTTOM)
        text(value, cellWidth / 2, cellHeight - 2)
        // text(group, cellWidth / 2, cellHeight - 2)
        // text(current[x][y], cellWidth / 2, cellHeight - 2)

        stroke(41)
        noFill()
        strokeWeight(2)
        if(x > 0 && positionToGroup[x-1][y] !== group) line(0,0,0,cellHeight)
        if(y > 0 && positionToGroup[x][y-1] !== group) line(0,0,cellWidth,0)

        pop()
      })
    })
  }
  pop()

  push()
  {
    translate(width / 2 * 0, height / 2 * 1)
    positionToGroup.forEach((column, x) => {
      column.forEach((group, y) => {
        push()
        translate(x * cellWidth, y * cellHeight)

        const c = 41 + group * 12
        fill(c)
        noStroke()
        strokeWeight(1)
        rect(0, 0, cellWidth, cellHeight)

        fill(c > 128 ? 0 : 255)
        noStroke()
        textSize(8)
        textAlign(CENTER, BOTTOM)
        text(group, cellWidth / 2, cellHeight - 2)

        stroke(41)
        noFill()
        strokeWeight(2)
        if(x > 0 && positionToGroup[x-1][y] !== group) line(0,0,0,cellHeight)
        if(y > 0 && positionToGroup[x][y-1] !== group) line(0,0,cellWidth,0)

        pop()
      })
    })
  }
  pop()

  push()
  {
    translate(width / 2 * 1, height / 2 * 1)

    current.forEach((column, y) => {
      column.forEach((_value, x) => {

        push()
        translate(x * cellWidth, y * cellHeight)

        const group = positionToGroup[x][y]
        const value = average(groupToPosition[group].map(({x,y}) => current[x][y]))

        noStroke()
        fill(value <= 0.2 ? color('blue') : (value >= 0.8 ? color('red') : color('black')))
        strokeWeight(1)
        rect(0, 0, cellWidth, cellHeight)

        fill(color('white'))
        noStroke()
        textSize(8)
        textAlign(CENTER, BOTTOM)
        text(value.toFixed(1), cellWidth / 2, cellHeight - 2)

        stroke(41)
        noFill()
        strokeWeight(2)
        if(x > 0 && positionToGroup[x-1][y] !== group) line(0,0,0,cellHeight)
        if(y > 0 && positionToGroup[x][y-1] !== group) line(0,0,cellWidth,0)

        pop()
      })
    })

  }
  pop()

  noFill()
  stroke('red')
  strokeWeight(1)
  line(0, height / 2, width, height / 2)
  line(width / 2, 0, width / 2, height)

  update()

  noLoop()
}

function update() {
  const { current, next } = tables


  tables.current = next
  tables.next = current
}


function average (numbers) {
  return numbers.reduce((sum, number) => sum + number, 0) / numbers.length
}
