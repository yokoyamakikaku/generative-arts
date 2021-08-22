class Casper extends Computer {
  constructor() {
    super(
      Computer.pointsToVectors("256 320 352 416 352 520 56 520 56 320 256 320"),
      Computer.pointsToVectors("58 518 58 322 255.17 322 350 416.83 350 518 58 518"),
    )
  }

  showLabel() {
    super.showLabel(
      "CASPER 3",
      204, 445
    )
  }
}
