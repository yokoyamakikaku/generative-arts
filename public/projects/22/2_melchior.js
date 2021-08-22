class Melchior extends Computer {
  constructor() {
    super(
      Computer.pointsToVectors("544 320 448 416 448 520 744 520 744 320 544 320"),
      Computer.pointsToVectors("450 518 450 416.83 544.83 322 742 322 742 518 450 518")
    )
  }

  showLabel() {
    super.showLabel(
      "MELCHIOR 1",
      596, 445
    )
  }
}
