import {getFirst} from "./getFirst";
import {getLast} from "./getLast";

export function parseBoard(board) {
    const entries = []

    board.chars.forEach((row, y) => {
        row.forEach((char, x) => {
            if (!char) {
                return
            }

            const hasPrevVerticalChar = board.chars[y - 1]?.[x]
            const hasPrevHorizontalChar = board.chars[y]?.[x - 1]

            if (hasPrevVerticalChar) {
                const meta = entries.find(({positions}) => {
                    const first = getFirst(positions)
                    const last = getLast(positions)
                    return first[0] === x && last[0] === x && last[1] === y - 1
                })

                if (meta) {
                    meta.word += char
                    meta.positions.push([x, y])
                }
            }

            if (hasPrevHorizontalChar) {
                const meta = entries.find(({positions}) => {
                    const first = getFirst(positions)
                    const last = getLast(positions)
                    return first[1] === y && last[0] === x - 1 && last[1] === y
                })

                if (meta) {
                    meta.word += char
                    meta.positions.push([x, y])
                }
            }

            if (!hasPrevVerticalChar && !hasPrevHorizontalChar) {
                entries.push({word: char, positions: [[x, y]]})
            }
        })
    })

    const newEntries = entries.filter(({positions}) => positions.some(([x, y]) => !board.confirmed[y]?.[x]))
    console.log(entries, newEntries);
    return {entries, newEntries}
}