import {isBoardCellConfirmed} from "./isBoardCellConfirmed";

export function getSecondaryHintedChars(chars, board) {
    const {words, entries} = chars

    const hintedChars = []
    const hintedWords = []

    words?.forEach(word => {
        const char = word[0]
        const index = entries.findIndex((entry, index) => entry.char === char && !hintedChars.includes(index) && (!entry.cell || !isBoardCellConfirmed(entry.cell, board)))

        if (~index && !entries[index].cell) {
            hintedChars.push(index)
            hintedWords.push(word)
        }
    })

    return {entries: hintedChars, words: hintedWords}
}