import {shuffleArray} from "./shuffleArray";
import {isBoardCellConfirmed} from "./isBoardCellConfirmed";

export function getPrimaryHintedChars(chars, board) {
    const {words, entries} = chars

    const hintedChars = []
    const word = shuffleArray(words)[0]

    word.split('').forEach(char => {
        const index = entries.findIndex((entry, index) => entry.char === char && !hintedChars.includes(index) && (!entry.cell || !isBoardCellConfirmed(entry.cell, board)))

        if (~index) {
            hintedChars.push(index)
        }
    })

    return hintedChars
}