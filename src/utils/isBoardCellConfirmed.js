export function isBoardCellConfirmed(current, board) {
    return !!board.confirmed?.[current[1]]?.[current[0]]
}
