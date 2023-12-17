import {getFirst} from "./getFirst";
import {getLast} from "./getLast";

export function parseBoard(board) {
    const entries = []

    board.chars.forEach((row, y) => {
        row.forEach((char, x) => {
            if (!char) {
                return
            }

            if (board.chars[y - 1]?.[x]) {
                const prevEntry = entries.find(({positions}) =>
                    getFirst(positions)[0] === x
                    && getLast(positions)[0] === x
                    && getLast(positions)[1] === y - 1
                )

                if (prevEntry) {
                    prevEntry.word += char
                    prevEntry.positions.push([x, y])
                } else {
                    entries.push({word: board.chars[y - 1][x] + char, positions: [[x, y - 1], [x, y]]})
                }
            }

            if (board.chars[y]?.[x - 1]) {
                const prevEntry = entries.find(({positions}) =>
                    getFirst(positions)[1] === y
                    && getLast(positions)[0] === x - 1
                    && getLast(positions)[1] === y
                )

                if (prevEntry) {
                    prevEntry.word += char
                    prevEntry.positions.push([x, y])
                } else {
                    entries.push({word: board.chars[y][x - 1] + char, positions: [[x - 1, y], [x, y]]})
                }
            }

            if (!board.chars[y - 1]?.[x] && !board.chars[y]?.[x - 1]) {
                entries.push({word: char, positions: [[x, y]]})
            }
        })
    })

    const newEntries = entries.filter(({positions}) => positions.some(([x, y]) => !board.confirmed[y]?.[x]))

    return {entries, newEntries}
}