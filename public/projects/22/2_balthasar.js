class Balthasar extends Computer {
  constructor() {
    super(
      Computer.pointsToVectors("536 288 536 96 264 96 264 288 352 376 448 376 536 288"),
      Computer.pointsToVectors("352.83 374 266 287.17 266 98 534 98 534 287.17 447.17 374 352.83 374"),
    )
  }

  showLabel() {
    super.showLabel(
      "BALTHASAR 2",
      400, 260
    )
  }
}
