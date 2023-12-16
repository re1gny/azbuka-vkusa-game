import {BOARD_COLUMNS, BOARD_ROWS} from "../constants/game";

export function createBoard(initialState) {
    const chars = Array(BOARD_ROWS).fill(null).map(() => Array(BOARD_COLUMNS).fill(null))
    const confirmed = {}
    const selected = null

    if (initialState) {
        initialState.forEach((row, y) => {
            row.forEach((cell, x) => {
                if (cell) {
                    chars[y][x] = cell
                    if (!confirmed[y]) {
                        confirmed[y] = {}
                    }
                    confirmed[y][x] = true
                }
            })
        })
    }

    return {chars, confirmed, selected}
}